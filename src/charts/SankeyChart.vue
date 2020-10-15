<template>
  <div class="chart-container">
    <div class="chart sankey-chart" ref="chart"></div>
  </div>
</template>

<script>
import chartUpdateAddSeriesMixin from '../mixins/chartUpdateAddSeriesMixin.js';

import highcharts from "highcharts";
import sankey from "highcharts/modules/sankey";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import seriesLabels from "highcharts/modules/series-label";

export default {
  name: 'SankeyChart',
  mixins: [chartUpdateAddSeriesMixin],
  props: ['chartData'], //chartData.title, chartData.timeAxis, chartData.series
  data: function() {
    return {
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

    sankey(highcharts);
    exporting(highcharts);
    exportData(highcharts);
    seriesLabels(highcharts);

    this.chart = new highcharts.Chart({
      chart: {
        renderTo: container,
        spacingBottom: 1,
        marginBottom: 55
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span></span>',
        nodeFormatter: function() {
          return '<b>'+this.name+'</b>';
        },
        useHTML: true,
        pointFormatter: function() {
          return '<b>'+this.from + '<span>&rarr;</span> ' + this.to + ' : ' + Math.round(this.weight) + '</b>';
        }
      },
      title: {
        text: this.chartData.title
      },
      exporting: {
        menuItemDefinitions: {
          // Custom definition
        },
        buttons: {
          contextButton: {
            menuItems: [
              "printChart",
              "separator",
              "downloadPNG",
              // "downloadJPEG",
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
.sankey-chart {
  min-height: 500px;
}
.hidden-line {
  opacity: 0;
  pointer-events: none;
}
</style>
