<template>
  <div class="subtab-content">
    <BarRangeChart v-if="chart1Data && isExamplePathway && !noData" :chart-data="chart1Data"/>

    <div v-if="chart1Data && isExamplePathway && !noData" class="chart-info">
      <p>
        Each sector is affected directly and indirectly by the transition. For instance, if individuals purchase less cars (group of levers “Key behaviours - Travel”), then the industrial production of vehicles decrease (direct effect).
      </p>
      <p>
        But since the car production industry require materials (e.g., iron and steel, plastics, aluminium) as well as energy, the production of these sectors will also decrease (indirect effect).
      </p>
      <p>
        This graph accounts for both effects. More details are available in the Employment module documentation, available here:<br>
        <a href="http://www.european-calculator.eu/documentation" target="_blank" rel="noopener"><b>http://www.european-calculator.eu/documentation</b></a>
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
  name: 'ChangePerSector',
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

      if(!EmploymentData[currentPathwayName]) {
        this.noData = true;
        return;
      }

      this.noData = false;

      let data = [];
      let categories = [];

      currChart.variables.forEach((variable) => {

        categories.push(variable.title);

        let output = EmploymentData[currentPathwayName][variable.id];
        let value = parseFloat(output[this.countrycode]);
        data.push(
          value < 0 ? [value,0] : [0,value]
        );

      });

      // console.log(categories,data);

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
    // inputsService.deactivateGroups(Object.keys(inputsService.leverGroups));
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
    },
    // important, this component also lets you zoom into a country (dropwdown where the outputs are shown)
    countrycode: function() {
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
