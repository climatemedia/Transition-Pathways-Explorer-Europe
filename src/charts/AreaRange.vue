<template>
  <div class="chart-container">
    <div class="chart" :class="{'fixed-axis': axisFixed, 'free-axis': !axisFixed}" ref="chart"></div>
  </div>
</template>

<script>
import chartFixFreeAxisMixin from '../mixins/chartFixFreeAxisMixin.js';

import highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import more from 'highcharts/highcharts-more';

export default {
  name: 'AreaRange',
  mixins: [chartFixFreeAxisMixin],
  props: ['chartData'], //chartData.title, chartData.timeAxis, chartData.series
  data: function() {
    return {
      axisFixed: false
    }
  },
  watch: {
    chartData: {
      // doesn't need to be a deep watch, because the whole object gets replaced
      handler() {
        this.updatePlotline();
      }
    }
  },
  methods: {
    highlightLinkedSeries(evt) {
      if(this.chartData.series.length < 3) {
        return;
      }

      let target = evt.target;

      let linkedSeries;
      if(target.linkedSeries && target.linkedSeries[0]) {
        linkedSeries = target.linkedSeries[0];
      }
      if(linkedSeries) {
        linkedSeries.update({
          fillOpacity: 0.6
        });
      }
    },
    unhighlightLinkedSeries(evt) {
      if(this.chartData.series.length < 3) {
        return;
      }

      let target = evt.target;

      let linkedSeries;
      if(target.linkedSeries && target.linkedSeries[0]) {
        linkedSeries = target.linkedSeries[0];
      }
      if(linkedSeries) {
        // linkedSeries.options.opacity = 0.3;
        // --> this doesn't work properly, don't access properties directly, use highcharts internal functions like below:

        linkedSeries.update({
          fillOpacity: 0.1
        });
      }
    },
    updatePlotline() {
      // this component doesn't get rendered with just empty data
      // on updates only the plotline changes
      this.chart.xAxis[0].options.plotLines[0].value = this.chartData.temp2100;
      this.chart.xAxis[0].update();
    }
  },
  mounted() {
    var container = this.$refs.chart;

    exporting(highcharts);
    exportData(highcharts);
    more(highcharts);

    var that = this;

    this.chart = new highcharts.Chart({
      chart: {
        renderTo: container,
        inverted: true,
        spacingBottom: 30,
        animation: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: this.chartData.title
      },
      xAxis: {
        tickmarkPlacement: 'on',
        title:{
          text: "°C"
        },
        min: 0,
        max: 4.6,
        reversed: false, // is set to true when chart.inverted == true
        tickInterval: 1,
        plotLines: [{
          color: '#FF0000',
          width: 2,
          value: this.chartData.temp2100,
          label: {
            text: "T in 2100",
            y: -5,
            x: 5,
            style: {
              color: 'red',
              fontWeight: 'bold'
            }
          }
        }]
      },
      yAxis: {
        crosshair: {
          width: 2,
          snap: false
        },
        title: {
          useHTML: true,
          text: this.chartData.unit,
          margin: 10
        },
        lineWidth: 1
      },
      tooltip: {
        useHTML: true,
        formatter: function() {
          // this.point.index is undocumented, might change in future releases of highcharts !!
          let xIndex = this.point.index;

          let linkedSeries = this.series.linkedSeries[0];
          let rangeLow = linkedSeries.data[xIndex].low;
          let rangeHigh = linkedSeries.data[xIndex].high;

          let tooltipString = `
            <div>
              <span style='font-weight: bold; color: `+this.series.color+`'>`+this.series.name+`:</span>
              <span style='font-weight: bold;'>`+this.y+`</span>
              <b>
            </div>
            <div>
              <span>Bounds of estimates:</span>
              <span>`+rangeLow+` - `+rangeHigh+`</span>
            </div>
          `;

          return tooltipString;
        }
      },
      plotOptions: {
        series: {
          label: {
            enabled: false
          }
        },
        areasplinerange: {
          fillOpacity: this.chartData.series.length > 2 ? 0.1 : 0.5,
          lineWidth: 0,
          enableMouseTracking: false, // disables the tooltip
          marker: {
            enabled: false
          }
        },
        spline: {
          events: {
            mouseOver: function (evt) {
              that.highlightLinkedSeries(evt);
            },
            mouseOut: function (evt) {
              that.unhighlightLinkedSeries(evt);
            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          }
        }]
      },
      exporting: {
        menuItemDefinitions: {
          // Custom definition
          fixAxis: {
            onclick: this.fixAxis,
            text: 'Fixed axis'
          },
          freeAxis: {
            onclick: this.freeAxis,
            text: 'Auto axis'
          }
        },
        buttons: {
          contextButton: {
            menuItems: [
              "fixAxis",
              "freeAxis",
              "separator",
              "printChart",
              "separator",
              "downloadPNG",
              "downloadJPEG",
              "downloadPDF",
              "downloadSVG",
              "separator",
              "downloadCSV",
              "downloadXLS"
            ]
          }
        }
      },
      series: this.chartData.series
    });
  },
  beforeDestroy() {
    if(this.chart) {
      this.chart.destroy();
    }
  },
}
</script>

<style>
</style>
