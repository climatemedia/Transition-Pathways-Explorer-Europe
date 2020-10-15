<template>
  <div class="subtab-content" id="wages-per-skill">
    <div v-if="chart1Data && chart2Data && isExamplePathway && !noData" class="tsasbs-cont">
      <div class="tsasbs-chart">
        <BarRangeChart :chart-data="chart1Data"/>
      </div>
      <div class="tsasbs-chart">
        <BarRangeChart :chart-data="chart2Data"/>
      </div>
    </div>

    <div v-if="chart1Data && chart2Data && isExamplePathway && !noData" class="chart-info">
      <p>
        The workers’ level of education are defined following the International standard classification of education (ISCED):
      </p>
      <ul>
        <li>Unskilled worker: primary and secondary education (ISCED levels 0-4)</li>
        <li>Skilled worker: tertiary education (ISCED levels 5-8)</li>
      </ul>
      <p>
        The change in employment differs depending on the workers’ level of education. Indeed, decarbonization could for instance foster industries that have a higher demand of skilled workers than of unskilled labour.
      </p>
    </div>

    <div v-if="!isExamplePathway" class="subtab-error">
      <p>
        Data for this tab is only available for example pathways.<br>
        Please choose an example pathway.
      </p>
    </div>
    <div v-if="isExamplePathway && noData" class="subtab-error">
      <p>
        There is no data yet available for this example pathway.
      </p>
    </div>
  </div>
</template>

<script>
import BarRangeChart from '../../../charts/BarRangeChart.vue';

import * as inputsService from '../../../inputsService.js';
import {ExamplePathways} from '../../../config/examplePathways.js';

import {EmploymentData} from './employmentData.js';

export default {
  name: 'WagesPerSkill',
  components: {BarRangeChart},
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chart1Data: undefined,
      chart2Data: undefined,
      isExamplePathway: this.appState.pathwayIndex > -1,
      noData: undefined
    }
  },
  methods: {
    buildData(chartIndex) {
      let currChart = this.chartDefinitions[this.subtab.charts[chartIndex]];

      let currentPathwayName = ExamplePathways[this.appState.pathwayIndex].title;

      if(!EmploymentData[currentPathwayName]) {
        this.noData = true;
        return undefined;
      }

      this.noData = false;

      let data = [];
      let categories = [];

      currChart.variables.forEach((variable) => {

        categories.push(variable.title);

        let output = EmploymentData[currentPathwayName][variable.id];
        let value = parseFloat(output[this.countrycode]);
        // value = value === 0 ? 0.5 : value;
        data.push(
          value < 0 ? [value,0] : [0,value]
        );

      });

      // console.log(categories,data);

      return {
        series: [{
          data: data
        }],
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
    },0);
    // inputsService.deactivateCountryZoom();

    if(this.isExamplePathway) {
      this.chart1Data = this.buildData(0);
      this.chart2Data = this.buildData(1);
    }
  },
  beforeDestroy() {
    inputsService.activateAllGroups();
  },
  watch: {
    'appState.pathwayIndex': function() {
      this.isExamplePathway = this.appState.pathwayIndex > -1;
      if(this.isExamplePathway) {
        this.chart1Data = this.buildData(0);
        this.chart2Data = this.buildData(1);
      }
    },
    // important, this component also lets you zoom into a country (dropwdown where the outputs are shown)
    countrycode: function() {
      this.isExamplePathway = this.appState.pathwayIndex > -1;
      if(this.isExamplePathway) {
        this.chart1Data = this.buildData(0);
        this.chart2Data = this.buildData(1);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#wages-per-skill .tsasbs-cont {
  max-height: 400px;
}
.mobile #wages-per-skill .tsasbs-cont {
  max-height: none;
}
</style>
