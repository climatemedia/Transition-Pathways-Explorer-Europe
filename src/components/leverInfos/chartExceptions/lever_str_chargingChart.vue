<template>
  <div class="chart-container">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import highcharts from "highcharts";
import seriesLabels from "highcharts/modules/series-label";

// hardcoded chart for lever_str_charging
// https://www.highcharts.com/forum/viewtopic.php?t=39007

export default {
  name: 'lever_str_chargingChart',
  // props are not needed here but always passed by default from parent element
  props: ['chartTitle','chartfilename'],
  data: function() {
    return {
    }
  },
  methods: {
    buildChart() {
      var container = this.$refs.chart;
      // console.log('LineChartLeverInfo ', this.chartData, container);

      seriesLabels(highcharts);

      this.chart = new highcharts.Chart({
        chart: {
          renderTo: container,
          type: 'column',
          spacingBottom: 30
        },
        credits: {
          enabled: false
        },
        title: {
          text: 'Charging profiles - Ambition levels 1 - 4'
        },
        xAxis: {
          // tickmarkPlacement: 'on',
          // title: {
          //   enabled: false
          // },
          categories: [2020, 2025, 2030, 2035, 2040, 2045, 2050],
          labels: {
            y: 35
          }
        },
        yAxis: {
          title: {
            text: "%"
          },
          stackLabels: {
            enabled: true,
            verticalAlign: 'bottom',
            crop: false,
            overflow: 'none',
            y: 20,
            formatter: function() {
              return this.stack;
            },
            style: {
              fontSize: '9px'
            }
          }
        },
        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
        tooltip: {
          // split: true
        },
        series:[
          {
            name: 'home',
            data: [50,45,40,35,30,25,20],
            stack: '1',
            color: 'black',
            id: 'home'
          },
          {
            name: 'home',
            data: [50,45,40,35,30,25,20],
            stack: '2',
            color: 'black',
            linkedTo: 'home'
          },
          {
            name: 'home',
            data: [50,43,36,29,22,15,8],
            stack: '3',
            color: 'black',
            linkedTo: 'home'
          },
          {
            name: 'home',
            data: [50,43,36,29,22,15,8],
            stack: '4',
            color: 'black',
            linkedTo: 'home'
          },
          {
            name: 'delayed',
            data: [5,11,17,23,29,35,41],
            stack: '1',
            color: 'yellow',
            id: 'delayed'
          },
          {
            name: 'delayed',
            data: [5,9.5,14,18.5,23,27.5,32],
            stack: '2',
            color: 'yellow',
            linkedTo: 'delayed'
          },
          {
            name: 'delayed',
            data: [5,8,11,14,17,20,23],
            stack: '3',
            color: 'yellow',
            linkedTo: 'delayed'
          },
          {
            name: 'delayed',
            data: [5,6.5,8,9.5,11,12.5,14],
            stack: '4',
            color: 'yellow',
            linkedTo: 'delayed'
          },
          {
            name: 'home & work',
            data: [45,41,37,33,29,25,21],
            stack: '1',
            color: 'red',
            id: 'homework'
          },
          {
            name: 'home & work',
            data: [45,39.5,34,28.5,23,17.5,12],
            stack: '2',
            color: 'red',
            linkedTo: 'homework'
          },
          {
            name: 'home & work',
            data: [45,40,35,30,25,20,15],
            stack: '3',
            color: 'red',
            linkedTo: 'homework'
          },
          {
            name: 'home & work',
            data: [45,38.5,32,25.5,19,12.5,6],
            stack: '4',
            color: 'red',
            linkedTo: 'homework'
          },
          {
            name: 'intelligent',
            data: [0,3,6,9,12,15,18],
            stack: '1',
            color: 'blue',
            id: 'intelligent'
          },
          {
            name: 'intelligent',
            data: [0,6,12,18,24,30,36],
            stack: '2',
            color: 'blue',
            linkedTo: 'intelligent'
          },
          {
            name: 'intelligent',
            data: [0,9,18,27,36,45,54],
            stack: '3',
            color: 'blue',
            linkedTo: 'intelligent'
          },
          {
            name: 'intelligent',
            data: [0,12,24,36,48,60,72],
            stack: '4',
            color: 'blue',
            linkedTo: 'intelligent'
          }
        ],
        caption: {
          text: "<b>Charging patterns of EVs, %</b>",
          align: 'center'
        }
      });
    }
  },
  mounted() {
    this.buildChart();
  },
  beforeDestroy() {
    if(this.chart) {
      this.chart.destroy();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
