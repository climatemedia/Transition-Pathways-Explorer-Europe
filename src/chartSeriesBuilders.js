// TODO:
// restructure this module for more readability
// findNullstellen should only accept a single series and only require the series with x and y values as a single parameter

export function buildChartData(countryCode, chartDef, outputs, withNegative) {
  var timeAxis;
  var series = [];
  var totalData = [];

  // chartDef.outputs only contains the keys (strings) used in outputs
  chartDef.outputs.forEach((outp) => {

    // skip custom outputs
    if(outp.custom) {
      return;
    }

    // outputs[outp] might exist (created from frontend config file),
    // but outputs[outp].data or outputs[outp].timeAxis might not exist (if this output is unknown to the API)
    // if an output is unknown to API and it wasn't listed in the Outputs config constant, then outputs[outp] is undefined
    // outputs that are not listed in the Outputs config constant only get initialized into outputs on a succesful API fetch
    if(!outputs[outp.id] || !outputs[outp.id].data) {
      return;
    }
    if(!timeAxis) {
      // outp.timeAxis can still be undefined (if output is unknown to API),
      // but then it is looked for one on the next iteration
      timeAxis = outputs[outp.id].timeAxis;
    }

    if(timeAxis) {
      let data = outputs[outp.id].data[countryCode];

      if(data.length) {
        data = data.map((value, index) => {

          // side-effect: also sum up the total-data
          if(withNegative) {
            if(!totalData[index]) {
              totalData[index] = {
                x: timeAxis[index],
                y: 0
              };
            }
            totalData[index].y += value;
          }

          // modify the data format from [xValue,yValue] to {x:xValue, y:yValue}
          return {
            x: timeAxis[index],
            y: chartDef.modifier ? chartDef.modifier(value) : value
          };
        });

        if(data.length === timeAxis.length) {
          series.push({
            name: outp.title ? outp.title : outputs[outp.id].title,
            id: outp.id, //necessary for chart update
            color: outp.color ? outp.color : undefined,
            data: data
          });
        }
      }
    }
  });

  // if API data is not available yet, this case is caught outisde of this function already
  // but this check is still kept for security reasons
  if(!timeAxis) {
    return;
  }

  if(withNegative) {
    series = formatSeriesWithNullstellen(timeAxis, series);

    let totalSeries = {
      type: 'line',
      name: chartDef.totalTitle ? chartDef.totalTitle : 'total',
      id: 'total',
      color: '#f44141',
      data: totalData
    };
    series.push(totalSeries);
  }

  return {
    series: series,
    title: chartDef.title,
    unit: chartDef.unit,
    timeAxis: timeAxis.slice() // ditch observer
  }
}

function formatSeriesWithNullstellen(timeAxis, series) {
  // timeAxis: [..,2012,2013,2014,..]
  // series: [{name: "", id: "", color: "", data: [{x:1,y:2}, {x:2,y:3}, ..]}, ..]
  // all series-data should be sanitized/filtered already!
  // timeAxis.length must match all data.length

  let [nullstellen, nullStellenBySeriesId] = findNullstellen(timeAxis, series);
  // nullstellen does not contain any values which are already part of the timeAxis

  // calculate intermediate values for all series (necessary, otherwise gaps appear in areas where no data is defined)
  nullstellen.forEach((nullst) => {

    series.forEach((ser) => {
      let seriesContainsEntry = ser.data.some((point) => {
        return point.x === nullst.x;
      });
      if(!seriesContainsEntry) {
        let y;

        if(nullStellenBySeriesId[ser.id] && nullStellenBySeriesId[ser.id].indexOf(nullst.x) >= 0) {
          y = 0;
        } else {
          //linear interpolation
          let pointBefore = ser.data.find((point) => point.x === nullst.xBefore);
          let pointAfter = ser.data.find((point) => point.x === nullst.xAfter);
          y = linearInterpolatePoint(nullst.x, nullst.xBefore, nullst.xAfter, pointBefore.y, pointAfter.y);
        }

        if(typeof y !== "undefined") {
          ser.data.push({
            x: nullst.x,
            y: y,
            // states: {hover: {enabled: false}},
            // marker: {enabled: false},
            marker: {
              states: {
                hover: {
                  enabled: false
                }
              }
            },
            noTooltip: true
          });
        }
      }
    });
  });

  // sort all data arrays of all series (Highcharts need data to be sorted by x)
  series.forEach((ser)=> {
    ser.data.sort(function compare(a, b) {
      if (a.x < b.x) {
        return -1;
      }
      if (a.x > b.x) {
        return 1;
      }
      // a must be equal to b
      return 0;
    })
  });

  // split seriesData according to positive or negative stack
  // important! The series.data need to be sorted already!
  let [positiveSeries, negativeSeries] = splitSeriesData(series);

  series = positiveSeries.concat(negativeSeries);

  return series;
}

export function findNullstellen(timeAxis, seriesData, xTolerance=0.001) {
  // timeAxis: [..,2012,2013,2014,..]
  // seriesData: [{id: "", data: [{y:2}, {y:3}, ..]}, ..]
  // returns all Nullstellen of all series in seriesData merged into one object (intermediateTimes)
  // ignores nullstellen that already land on a timeAxis-Stelle

  let intermediateTimes = []; // [{x: 2012.4, xBefore: 2012, xAfter: 2013}]

  let nullStellenBySeriesId = {}; // {"someId": [2012.4, 2015.6], ..}

  seriesData.forEach((ser) => {

    let activePart = "positive";
    let valueBefore;

    for(let i=0, len=timeAxis.length; i<len; i++) {
      let x = timeAxis[i];
      let value = ser.data[i].y;
      let crossingFound;

      // switch activePart on sign change
      // zero values are ignored, because they are already part of the series
      // and duplicate datapoints would lead to bugs in rendering
      if(value < 0) {
        if(activePart === "positive" && i > 0 && i < len) {
          crossingFound = true;
        }
        activePart = "negative";
      }
      if(value > 0) {
        if(activePart === "negative" && i > 0 && i < len) {
          crossingFound = true;
        }
        activePart = "positive";
      }

      if(crossingFound) {

        let xBefore = timeAxis[i-1];

        let m = (value - valueBefore) / (x-xBefore); // x and xBefore are sometimes more than one unit apart!!
        let x0 = -1*valueBefore/m + xBefore; //y1/m + x1

        // don't add Nullstellen that already exist in the timeAxis, because duplicate datapoints lead to rendering errors
        // also don't add datapoints if the nullStelle is already within tolerance to an already existing datapoint
        if(timeAxis.indexOf(x0) >= 0 || x0 - xBefore < xTolerance || x - x0 < xTolerance) {
          continue;
        }

        // setting toFixed() to 6 is important, if setting toFixed(2) sometimes it hits a round year
        // which results in double entries in data, because parseFloat is ignoring zero decimals.
        // parseFloat(2009.00) =>> 2009
        // also if there are two equal nullstellen which might happen with toFixed(2)
        // it also results in the error, that the highcharts updates are jumpy
        // I haven't been able to fully track down the error, but using .toFixed(6)
        // mitigates it and makes it much less likely to occur

        intermediateTimes.push({
          // x: nullStelle,
          x: x0,
          xBefore: xBefore,
          xAfter: x
        });
        if(nullStellenBySeriesId[ser.id]) {
          nullStellenBySeriesId[ser.id].push(x0);
        } else {
          nullStellenBySeriesId[ser.id] = [x0];
        }

      }
      valueBefore = value;

    }
  });

  return [intermediateTimes, nullStellenBySeriesId];
}


function linearInterpolatePoint(x, xBefore, xAfter, yBefore, yAfter) {
  let y;

  if(typeof xBefore !== 'undefined' && typeof xAfter !== 'undefined' && typeof yBefore !== 'undefined' && typeof yAfter !== 'undefined') {
    let m = (yAfter - yBefore)/(xAfter-xBefore);
    y = m*(x-xBefore) + yBefore;
  }
  // y can be undefined
  return y;
}

function splitSeriesData(seriesData) {
  // all series.data needs to be sorted already


  // [{x:2015, y: 10},{x: 2015.5, y: 0},{x: 2016, y: 0},{x: 2017},{},{},{},{}]
  //
  // only y:0 are relevant
  // when 0 is hit it gets written in the currentactivePart
  // when a sign change happens to negative, the negative value gets written in the negativePart,
  // but also the negativePart needs the 0 in it entered for the xBefore
  //
  // It always hits the 0, it never jumps directly to negative values!
  // If it hits the 0 and the next value has a different sign, then the 0 gets written in both parts.


  let positiveSeries = [];
  let negativeSeries = [];

  seriesData.forEach((series) => {

    let data = series.data;
    let positiveData = [];
    let negativeData = [];

    let activePart = positiveData;

    for(let i=0, len=data.length; i<len; i++) {
      let point = data[i];
      let y = data[i].y;

      if(y > 0) {
        positiveData.push(point);
        activePart = positiveData;
      }
      if(y < 0) {
        negativeData.push(point);
        activePart = negativeData;
      }
      if(y === 0) {
        //ignore when first or last entry
        if(i > 0 && i < len-1) {
          let yBefore = data[i-1].y;
          let yAfter= data[i+1].y;
          if(Math.sign(yBefore) !== Math.sign(yAfter)) {
            // push to both parts, when 0 is followed by a sign change
            // but disable the tooltip for one
            positiveData.push(point);
            negativeData.push({
              ...point, //spread operator
              noTooltip: true
            });
          } else {
            // if no sign change, just push to current active part
            activePart.push(point);
          }
        } else {
          // if 0 is first or last value it gets pushed to the current active part.
          // activePart is positiveData for i==0
          activePart.push(point);
        }
      }
    }

    positiveSeries.push({
      name: series.name,
      type: 'area',
      id: series.id ? series.id : series.name,
      data: positiveData,
      stack: 'positive',
      color: series.color ? series.color : undefined
    });

    negativeSeries.push({
      name: series.name,
      type: 'area',
      linkedTo: series.id,
      id: series.id ? series.id +'neg' : series.name +'neg', //id also necessary for negative series (for animated data update) I guess
      data: negativeData,
      stack: 'negative',
      color: series.color ? series.color : undefined
    });

  });

  return [positiveSeries, negativeSeries];
}
