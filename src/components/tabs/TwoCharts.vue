<template>
  <div class="subtab-content">
    <div class="tsasbs-cont">
      <div class="tsasbs-chart">
        <component v-bind:is="chart1Component"
          v-if="Object.keys(chart1Data).length"
          :chart-data="chart1Data"
        ></component>
      </div>
      <div class="tsasbs-chart">
        <component v-bind:is="chart2Component"
          v-if="Object.keys(chart2Data).length"
          :chart-data="chart2Data"
        ></component>
      </div>
    </div>
    <component v-if="infoComponent" :is="infoComponent"/>
  </div>
</template>

<script>
import * as outputsService from '../../outputsService.js';
import {buildChartData} from '../../chartSeriesBuilders.js';

export default {
  name: 'TwoCharts',
  components: {
    'StackedAreaChart': () => import('../../charts/StackedAreaChart.vue'),
    'LineChart': () => import('../../charts/LineChart.vue'),
    'StackedAreaChart100Percent': () => import('../../charts/StackedAreaChart100Percent.vue')
  },
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chart1Data: {},
      chart2Data: {},
      chart1Component: undefined,
      chart2Component: undefined,
      infoComponent: undefined
    }
  },
  computed: {
    chart1HasNegativeData() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      return currChart.type === "StackedAreaNegative";
    },
    chart2HasNegativeData() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      return currChart.type === "StackedAreaNegative";
    }
  },
  methods: {
    buildDataForChart1() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      let chartData = buildChartData(this.countrycode, currChart, this.outputs, this.chart1HasNegativeData);
      if(chartData) {
        this.chart1Data = chartData;
      }
      //possible to add color info, css classes, sort the series etc
    },
    buildDataForChart2() {
      let currChart = this.chartDefinitions[this.subtab.charts[1]];
      let chartData = buildChartData(this.countrycode, currChart, this.outputs, this.chart2HasNegativeData);
      if(chartData) {
        this.chart2Data = chartData;
      }
      //possible to add color info, css classes, sort the series etc
    },
    loadChart1Component() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      // console.log('loadChartComponent ', currChart, this.subtab, this.chartDefinitions);
      if(currChart) {
        this.chart1Component = outputsService.chartTypeToComponentMap[currChart.type];
      }
    },
    loadChart2Component() {
      let currChart = this.chartDefinitions[this.subtab.charts[1]];
      // console.log('loadChartComponent ', currChart, this.subtab, this.chartDefinitions);
      if(currChart) {
        this.chart2Component = outputsService.chartTypeToComponentMap[currChart.type];
      }
    },
    loadInfoComponent() {
      let fileName = this.subtab.charts[0]+'.vue';

      //import() only works with partial paths, it doesn't take a single variable, like import(filePath). import() is not a function!! It just looks like one
      //This rest is a bit hacky, but well.
      //The first import() looks if the file exists, if not the error is silently caught.
      //If it exists, a second import needs to be started because <component> cannot work directly with the answer of the
      //first succesful fetch. It can only work with a function like this (for dynamic imports):
      //infoComponent = () => import(`../content/${fileName}`)
      import(`./content/${fileName}`)
      .then(() => {
        this.infoComponent = () => import(`./content/${fileName}`);
      })
      .catch(() => {
        // console.log('info component not found');
      });
    }
  },
  created() {
    this.loadChart1Component();
    this.loadChart2Component();
    if(this.appState.lastAPIResponse) {
      // only call buildDataForChart when data is already available!
      this.buildDataForChart1();
      this.buildDataForChart2();
    }
    this.loadInfoComponent();
  },
  watch: {
    'appState.lastAPIResponse': function() {
      this.buildDataForChart1();
      this.buildDataForChart2();
    },
    countrycode: function() {
      this.buildDataForChart1();
      this.buildDataForChart2();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
