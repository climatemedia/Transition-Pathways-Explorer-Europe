<template>
  <div class="subtab-content">
    <SankeyChart v-if="chartData" :chart-data="chartData"/>
  </div>
</template>

<script>
import SankeyChart from '../../../charts/SankeyChart.vue';
import {SankeyFlows, SankeyColumns} from './sankeyStructure.json';

// duplicate keys:
// bld_energy-demand_alluses_solid-bio[TWh]
// tra_elec-road[TWh]
// tra_elec-rail[TWh]
// tra_elec-other[TWh]


export default {
  name: 'EnergyFlows',
  components: {SankeyChart},
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chartData: undefined
    }
  },
  methods: {
    buildData() {

      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      // console.log('buildData', Sankey);

      let data = [];
      let nodes = [];

      SankeyFlows.forEach((flow) => {
        if(!this.outputs[flow.output] || !this.outputs[flow.output].data) {
          return;
        }

        let dataRow = this.outputs[flow.output].data[this.countrycode];
        let value;

        if(dataRow && dataRow.length) {
          value = dataRow[this.dataIndex];
        }
        if(typeof value === 'undefined') {
          return;
        }

        data.push({
          from: flow.from,
          to: flow.to,
          weight: value
        });


        if(SankeyColumns[flow.from]) {
          nodes.push({
            id: flow.from,
            column: SankeyColumns[flow.from]
          });
        }

        if(SankeyColumns[flow.to]) {
          nodes.push({
            id: flow.to,
            column: SankeyColumns[flow.to]
          });
        }


      });


      let sankeyData = {
        series: [{
          keys: ['from', 'to', 'weight'],
          data: data,
          clip: false,
          type: 'sankey',
          name: 'flows',
          nodes: nodes
        }],
        title: currChart.title
      };

      this.chartData = sankeyData;
    }
  },
  created() {
    this.dataIndex = 32; // 2050 value
    this.buildData();
  },
  watch: {
    'appState.lastAPIResponse': function() {
      this.buildData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
