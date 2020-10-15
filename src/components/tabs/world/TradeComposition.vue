<template>
  <div class="subtab-content" id="trade-composition">

    <div v-if="chart1Data && isExamplePathway && !noData">
      <h3>{{chart1Data.title}}</h3>
      <table>
        <thead>
          <tr>
            <th class="no-border"></th>
            <th colspan="2">Imports from</th>
            <th colspan="2">Exports to</th>
          </tr>
          <tr>
            <th class="no-border"></th>
            <th>Rest of EU</th>
            <th>Rest of World</th>
            <th>Rest of EU</th>
            <th>Rest of World</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in chart1Data.data" :key="entry.country">
            <td>{{entry.country}}</td>
            <td>{{entry.importsFromEU}} %</td>
            <td>{{100-entry.importsFromEU}} %</td>
            <td>{{entry.exportsToEU}} %</td>
            <td>{{100-entry.exportsToEU}} %</td>
          </tr>
        </tbody>
      </table>
    </div>

    <NoPathwayNotification
      :no-data="noData"
      :app-state="appState"
    />

  </div>
</template>

<script>
import NoPathwayNotification from './NoPathwayNotification.vue';

import * as inputsService from '../../../inputsService.js';
import {ExamplePathways} from '../../../config/examplePathways.js';

import {WorldData} from './worldData.js';


export default {
  name: 'TradeComposition',
  components: {
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

      let data = [];

      currChart.structure.forEach((row) => {
        data.push({
          country: row.country,
          importsFromEU: Math.round(WorldData[currentPathwayName][row.variables[1]]),
          exportsToEU: Math.round(WorldData[currentPathwayName][row.variables[0]])
        })
      });

      this.chart1Data = {
        data: data,
        title: currChart.title
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
#trade-composition h3 {
  text-align: center;
  margin-bottom: 30px;
}
#trade-composition table {
  border-collapse: collapse;
  margin: 0px auto;
}
#trade-composition table th, #trade-composition table td {
  /* border-bottom: 1px solid black; */
  border: 1px solid grey;
  padding: 5px;
}
#trade-composition table .no-border {
  border: none;
}
</style>
