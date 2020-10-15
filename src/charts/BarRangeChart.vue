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

//https://api.highcharts.com/highcharts/plotOptions.series.label
//Series labels are placed as close to the series as possible in a natural way, seeking to avoid other series.
//The goal of this feature is to make the chart more easily readable, like if a human designer placed the labels in the optimal position.
import seriesLabels from "highcharts/modules/series-label";

export default {
  name: 'BarRangeChart',
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
        type: 'columnrange',
        inverted: true,
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
        headerFormat: "",
        pointFormatter: function() {
          let value = this.low === 0 ? '+'+this.high : this.low;
          return '<b>'+this.category+': '+value+'%</b>';
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          minPointLength: 3
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
