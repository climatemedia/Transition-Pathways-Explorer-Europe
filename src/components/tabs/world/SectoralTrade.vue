<template>
  <div class="subtab-content">
    <BarChart v-if="chart1Data && isExamplePathway && !noData" :chart-data="chart1Data"/>

    <NoPathwayNotification
      :no-data="noData"
      :app-state="appState"
    />

  </div>
</template>

<script>
import BarChart from '../../../charts/BarChart.vue';
import NoPathwayNotification from './NoPathwayNotification.vue';

import * as inputsService from '../../../inputsService.js';
import {ExamplePathways} from '../../../config/examplePathways.js';

import {WorldData} from './worldData.js';

export default {
  name: 'SectoralTrade',
  components: {
    BarChart,
    NoPathwayNotification
  },
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chart1Data: undefined,
      isExamplePathway: this.appState.pathwayIndex > -1,
      noData: undefined
    }
  },
  methods: {
    buildData() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];

      let currentPathwayName = ExamplePathways[this.appState.pathwayIndex].title;

      if(!WorldData[currentPathwayName]) {
        this.noData = true;
        return;
      }

      this.noData = false;

      let categories = [];

      let dataExports = [];
      let dataImports = [];
      let dataTradeBalance = [];
      /*
      exports
      imports
      trade balance
      */


      currChart.structure.forEach((row) => {
        categories.push(row.category);
        dataExports.push(WorldData[currentPathwayName][row.variables[0]]);
        dataImports.push(WorldData[currentPathwayName][row.variables[1]]);
        dataTradeBalance.push(WorldData[currentPathwayName][row.variables[2]]);
      });

      // console.log(categories,data);

      this.chart1Data = {
        series: [
          {
            name: "Change in Export",
            data: dataExports
          },
          {
            name: "Change in Import",
            data: dataImports
          },
          {
            name: "Change in Trade Balance",
            data: dataTradeBalance,
            type: 'line',
            lineWidth: 0,
            color: 'red',
            states: {
              hover: {
                enabled: false,
                lineWidth: 0
              }
            }
          }
        ],
        title: currChart.title,
        unit: currChart.unit,
        categories: categories
      };

    }
  },
  created() {
    // inputsService.deactivateGroups(Object.keys(inputsService.leverGroups));
    setTimeout(() => {
      inputsService.deactivateGroups(Object.keys(inputsService.leverGroups));
      inputsService.deactivateCountryZoom();
    },0);
    // inputsService.deactivateCountryZoom();

    if(this.isExamplePathway) {
      this.buildData();
    }
  },
  beforeDestroy() {
    inputsService.activateAllGroups();
    inputsService.activateCountryZoom();
  },
  watch: {
    'appState.pathwayIndex': function() {
      this.isExamplePathway = this.appState.pathwayIndex > -1;
      if(this.isExamplePathway) {
        this.buildData();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
