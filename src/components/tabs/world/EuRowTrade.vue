<template>
  <div class="subtab-content" id="eu-row-trade">
    <BarChart v-if="chart1Data && isExamplePathway && !noData" :chart-data="chart1Data"/>

    <div v-if="chart1Data && isExamplePathway && !noData" class="chart-info">
      <table>
        <tbody>
          <tr v-for="entry in chartTableData" :key="entry.title">
            <td>{{entry.title}}</td>
            <td><b>{{entry.value}}</b></td>
            <td>{{entry.unit}}</td>
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
import BarChart from '../../../charts/BarChart.vue';
import NoPathwayNotification from './NoPathwayNotification.vue';


import * as inputsService from '../../../inputsService.js';
import {ExamplePathways} from '../../../config/examplePathways.js';

import {WorldData} from './worldData.js';
import titlesAndUnits from './titlesAndUnits.json';


export default {
  name: 'EuRowTrade',
  components: {
    BarChart,
    NoPathwayNotification
  },
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chart1Data: undefined,
      chartTableData: [],
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

      // let series = [];
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
        dataExports.push(Math.round(WorldData[currentPathwayName][row.variables[0]]));
        dataImports.push(Math.round(WorldData[currentPathwayName][row.variables[1]]));
        dataTradeBalance.push(Math.round(WorldData[currentPathwayName][row.variables[2]]));
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


      //assign data for table beneath the chart
      let tableData = [];

      currChart.variables.forEach((outputId) => {
        tableData.push({
          title: titlesAndUnits[outputId].title,
          value: Math.round(WorldData[currentPathwayName][outputId]),
          unit: titlesAndUnits[outputId].unit
        })
      });

      this.chartTableData = tableData;
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
#eu-row-trade .chart-container {
  min-height: 390px;
  max-height: 600px;
}
#eu-row-trade .chart-info {
  max-width: none;
}
#eu-row-trade h3 {
  text-align: center;
  margin-bottom: 30px;
}
#eu-row-trade table {
  border-collapse: collapse;
  margin: 0px auto;
}
#eu-row-trade table td {
  border: 1px solid grey;
  padding: 5px;
}
</style>
