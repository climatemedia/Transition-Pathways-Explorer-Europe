<template>
  <div class="chart-container">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import chartUpdateAddSeriesMixin from '../mixins/chartUpdateAddSeriesMixin.js';

import highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import seriesLabels from "highcharts/modules/series-label";

export default {
  name: 'StackedAreaChart100Percent',
  mixins: [chartUpdateAddSeriesMixin],
  props: ['chartData'], //chartData.title, chartData.timeAxis, chartData.series
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
        tickInterval: 5 // 5 years
      },
      yAxis: {
        title: {
          text: this.chartData.unit
        },
        max: 100
      },
      tooltip: {
        split: true
      },
      plotOptions: {
        area: {
          stacking: 'percent',
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
          pointStart: this.chartData.timeAxis ? this.chartData.timeAxis[0] : undefined,
          marker: {
            enabled: false
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
        buttons: {
          contextButton: {
            menuItems: [
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
