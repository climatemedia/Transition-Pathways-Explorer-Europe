<template>
  <div class="chart-container">
    <div class="chart" :class="{'fixed-axis': axisFixed, 'free-axis': !axisFixed}" ref="chart"></div>
  </div>
</template>

<script>
import chartFixFreeAxisMixin from '../mixins/chartFixFreeAxisMixin.js';
import chartUpdateAddSeriesMixin from '../mixins/chartUpdateAddSeriesMixin.js';

import highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import more from 'highcharts/highcharts-more';

// https://api.highcharts.com/highcharts/plotOptions.series.label
// Series labels are placed as close to the series as possible in a natural way, seeking to avoid other series.
// The goal of this feature is to make the chart more easily readable, like if a human designer placed the labels in the optimal position.
import seriesLabels from "highcharts/modules/series-label";

export default {
  name: 'StackedAreaChart',
  mixins: [chartFixFreeAxisMixin, chartUpdateAddSeriesMixin],
  props: ['chartData'], //chartData.title, chartData.timeAxis, chartData.series
  data: function() {
    return {
      axisFixed: false
    }
  },
  watch: {
    chartData: {
      handler() {
        this.updateChart();
      }
      //doesn't need to be a deep watch, because the whole object gets replaced
    }
  },
  mounted() {
    var container = this.$refs.chart;

    // activate highcharts plugins
    exporting(highcharts);
    exportData(highcharts);
    seriesLabels(highcharts);
    more(highcharts);

    this.chart = new highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'area',
        spacingBottom: 30
      },
      credits: {
        enabled: false
      },
      title: {
        text: this.chartData.title
      },
      xAxis: {
        tickmarkPlacement: 'on',
        plotBands: [{ // mark the weekend
          color: 'rgba(255,255,255,0.6)',
          from: 2015,
          to: 2019.91,
          zIndex: 4
        }],
        title: {
          enabled: false
        },
        tickInterval: 5 //5 years
      },
      yAxis: {
        title: {
          useHTML: true,
          text: this.chartData.unit
        }
      },
      tooltip: {
        split: true,
        formatter: function() {
          // The first returned item is the header, subsequent items are the
          // points
          let isNullstelle;
          let res = ['<b>' + this.x + '</b>'].concat(
              this.points.map(function (point) {
                // console.log('point ', point);
                if(point.point && point.point.noTooltip) {
                  isNullstelle = true;
                  return false;
                }
                if(Number.isInteger(point.y)) {
                  return point.series.name + ': ' + point.y;
                } else {
                  return point.series.name + ': ' + point.y.toFixed(2);
                }
              })
          );

          if(isNullstelle) {
            return false;
          } else {
            return res;
          }
        }
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 0,
          connectNulls: true, // important, otherwise the areas connecting to null values can be cut off
        },
        arearange: {
          color: "white",
          fillOpacity: 0.5,
          enableMouseTracking: false
        },
        series: {
          marker: {
            enabled: false
          },
          pointStart: this.chartData.timeAxis ? this.chartData.timeAxis[0] : undefined
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
