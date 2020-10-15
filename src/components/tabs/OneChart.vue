<template>
  <div class="subtab-content">
    <component v-bind:is="chartComponent"
      v-if="Object.keys(chart1Data).length"
      :chart-data="chart1Data"
    ></component>
    <component v-if="infoComponent" :is="infoComponent"/>
  </div>
</template>

<script>
import * as outputsService from '../../outputsService.js';
import {buildChartData} from '../../chartSeriesBuilders.js';

export default {
  name: 'OneChart',
  components: {
    'StackedAreaChart': () => import('../../charts/StackedAreaChart.vue'),
    'LineChart': () => import('../../charts/LineChart.vue'),
    'StackedAreaChart100Percent': () => import('../../charts/StackedAreaChart100Percent.vue')
  },
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chart1Data: {},
      chartComponent: undefined,
      infoComponent: undefined
    }
  },
  computed: {
    chartHasNegativeData() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      return currChart.type === "StackedAreaNegative";
    }
  },
  methods: {
    buildDataForChart() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      let chartData = buildChartData(this.countrycode, currChart, this.outputs, this.chartHasNegativeData);
      if(chartData) {
        this.chart1Data = chartData;
      }
      //possible to add color info, css classes, sort the series etc
    },
    loadChartComponent() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      // console.log('loadChartComponent ', currChart, this.subtab, this.chartDefinitions);
      if(currChart) {
        this.chartComponent = outputsService.chartTypeToComponentMap[currChart.type];
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
    this.loadChartComponent();

    if(this.appState.lastAPIResponse) {
      // only call buildDataForChart when data is already available!
      this.buildDataForChart();
    }

    this.loadInfoComponent();
  },
  watch: {
    'appState.lastAPIResponse': function() {
      this.buildDataForChart();
    },
    countrycode: function() {
      this.buildDataForChart();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
