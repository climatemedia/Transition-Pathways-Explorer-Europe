<template>
  <div class="pie-chart-container">
    <div class="pie-chart" ref="chart"></div>
  </div>
</template>

<script>
import highcharts from "highcharts";

export default {
  name: 'PieChart',
  props: ['chartData'], //chartData.title, chartData.timeAxis, chartData.series
  watch: {
    chartData: {
      handler() {
        this.updateChart();
      }
      //doesn't need to be a deep watch, because the whole object gets replaced
    }
  },
  methods: {
    updateChart() {
      this.chart.update({
        plotOptions: {
          pie: {
            size: this.chartData.size ? this.chartData.size : null,
          }
        },
        series: this.chartData.series
      });
    }
  },
  mounted() {
    var container = this.$refs.chart;

    this.chart = new highcharts.Chart({
      chart: {
        renderTo: container,
        type: 'pie',
        spacingBottom: 30,
        width: this.chartData.width ? this.chartData.width : 300,
        height: this.chartData.height ? this.chartData.height : 300
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: this.chartData.title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
      },
      plotOptions: {
        pie: {
          size: this.chartData.size ? this.chartData.size : null,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.y:.1f}',
            distance: -50,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 3
            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 300
          }
        }]
      },
      series: this.chartData.series
    });
  },
  beforeDestroy() {
    //dirty, timeout as long as CSS fade-view transition
    setTimeout(() => {
      if(this.chart) {
        this.chart.destroy();
      }
    }, 200);
  }
}
</script>

<style>
.pie-chart-container {
  height: 100%;
}
.pie-chart {
  height: 100%;
}
</style>
