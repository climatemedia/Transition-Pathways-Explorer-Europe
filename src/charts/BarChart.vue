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


export default {
  name: 'BarChart',
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
    more(highcharts);

    this.chart = new highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'bar',
        spacingBottom: 30
      },
      credits: {
        enabled: false
      },
      title: {
        text: this.chartData.title
      },
      xAxis: {
        categories: this.chartData.categories
      },
      yAxis: {
        title: {
          useHTML: true,
          text: this.chartData.unit
        }
      },
      tooltip: {
        // headerFormat: "",
        // pointFormatter: function() {
        //   let value = this.low === 0 ? '+'+this.high : this.low;
        //   return '<b>'+this.category+': '+value+'%</b>';
        // }
      },
      plotOptions: {
        series: {
          minPointLength: 3
        },
        line: {
          label: {
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
