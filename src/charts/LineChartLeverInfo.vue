<template>
  <div class="chart-container" :class="{'lever-info-chart-empty': isEmpty}">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import highcharts from "highcharts";
import seriesLabels from "highcharts/modules/series-label";

export default {
  name: 'LineChartLeverInfo',
  props: ['chartTitle','chartfilename'],
  data: function() {
    return {
      chartData: undefined,
      isEmpty: false
    }
  },
  methods: {
    loadChartData() {
      let fileName = this.chartfilename;

      //import() only works with partial paths, it doesn't take a single variable, like import(filePath). import() is not a function!! It just looks like one
      import(`../components/leverInfoCharts/${fileName}`)
      .then(module => {
        this.chartData = module.chartData;
        this.buildChart();
       })
       .catch(() => {
         // console.log(err);
         this.isEmpty = true;
       });
    },
    buildChart() {
      var container = this.$refs.chart;

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
          text: this.chartTitle + ' - Ambition levels'
        },
        xAxis: {
          tickmarkPlacement: 'on',
          title: {
            enabled: false
          },
          tickInterval: 5 // 5 years
        },
        yAxis: {
          title: {
            text: this.chartData.unit
          }
        },
        tooltip: {
          split: true
        },
        series: this.chartData.series,
        caption: {
          text: "<b>"+this.chartData.caption+"</b>",
          align: 'center'
        }
      });
    }
  },
  mounted() {
    this.loadChartData(); // called on mounted, because it calls buildChart() which relies on a $ref
  },
  beforeDestroy() {
    if(this.chart) {
      this.chart.destroy();
    }
  },
}
</script>

<style>
.lever-info-chart-empty {
  display: none;
}
</style>
