<template>
  <div class="subtab-content" id="employment-change">
    <BarRangeChart v-if="chart1Data && isExamplePathway && !noData" :chart-data="chart1Data"/>

    <div v-if="chart1Data && isExamplePathway && !noData" class="chart-info">
      <p>
        The change in employment is computed in the Employment module (Documentation available here:<br>
        <a href="http://www.european-calculator.eu/documentation" target="_blank" rel="noopener"><b>http://www.european-calculator.eu/documentation</b></a>
      </p>
      <p>
        The Employment module uses inputs from all the sectors (Agriculture, Transport, Industry, Electricity supply, Buildings, Lifestyles) in order to reconstruct the state of the economy using a macroeconomic model.
      </p>
      <p>
        An increase in employment could be due to high investment, which stimulates economic growth (for instance the construction of power plants or energy-efficient buildings), or to the substitution of energy intensive goods with labour intensive goods (i.e., the transition could foster sectors that require more employees).
      </p>
      <p>
        A decrease in employment could be linked to changes in lifestyles: if individuals decide to travel less, consume less products and energy, then the production also decreases and firms need less labour. In this example, individuals can satisfy their needs with a lower income, which decreases the number of hours they are willing to work.
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

import {Countries} from '../../../config/countryData.js';

import {EmploymentData} from './employmentData.js';

export default {
  name: 'EmploymentChange',
  components: {BarRangeChart},
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
      // console.log('currentPathwayName ', currentPathwayName);

      if(!EmploymentData[currentPathwayName]) {
        this.noData = true;
        return;
      }

      this.noData = false;

      let data = [];
      let categories = [];

      // there is only one variable for this chart
      let variable = currChart.variables[0];

      let output = EmploymentData[currentPathwayName][variable.id];

      Object.keys(output).forEach((countryCode) => {
        if(countryCode === 'EU') {
          return;
        }
        categories.push(Countries[countryCode].name);
        let value = parseFloat(output[countryCode]);
        data.push(
          value < 0 ? [value,0] : [0,value]
        );
      });

      this.chart1Data = {
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
    setTimeout(() => {
      inputsService.deactivateGroups(Object.keys(inputsService.leverGroups));
    },0);
    // inputsService.deactivateCountryZoom();

    if(this.isExamplePathway) {
      this.buildData();
    }
  },
  beforeDestroy() {
    inputsService.activateAllGroups();
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
#employment-change .chart-container {
  min-height: 600px;
}
</style>
