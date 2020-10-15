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
import seriesLabels from "highcharts/modules/series-label";

export default {
  name: 'LineChart',
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

    exporting(highcharts);
    exportData(highcharts);
    seriesLabels(highcharts);

    this.chart = new highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'line',
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
        plotBands: [{
          color: 'rgba(255,255,255,0.6)',
          from: 2015,
          to: 2019.91,
          zIndex: 4
        }],
        title: {
          enabled: false
        },
        tickInterval: 5 // 5 years
      },
      yAxis: {
        title: {
          useHTML: true,
          text: this.chartData.unit
        }
      },
      tooltip: {
        split: true
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        },
        arearange: {
          color: "white",
          fillOpacity: 0.5,
          enableMouseTracking: false
        },
        series: {
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
