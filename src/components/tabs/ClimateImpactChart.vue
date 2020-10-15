<template>
  <div class="subtab-content">
    <AreaRange v-if="chart1Data" :chart-data="chart1Data"/>
    <component v-if="infoComponent" :is="infoComponent"/>
  </div>
</template>

<script>
import AreaRange from '../../charts/AreaRange.vue';

export default {
  name: 'ClimateImpactChart',
  components: {AreaRange},
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chart1Data: undefined,
      infoComponent: undefined
    }
  },
  methods: {
    buildData() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];

      // the chart definition has to have only one output (the global temperature)
      let tempOutput = this.outputs[currChart.outputs[0].id];

      if(!tempOutput) {
        return;
      }

      // find index of 2100
      let index2100 = tempOutput.timeAxis.indexOf(2100);
      let temp2100 = tempOutput.data["EU"][index2100];
      // console.log('buildData ', tempOutput, currChart.outputs[0], index2100, temp2100);

      this.chart1Data  = {
        title: currChart.title,
        unit: currChart.unit,
        series: currChart.series,
        temp2100: temp2100
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
    this.loadInfoComponent();
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
