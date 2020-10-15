<template>
  <div class="subtab-content">
    <BarRangeChart v-if="chart1Data" :chart-data="chart1Data"/>

    <!-- <div class="chart-info">
      <p>
        Each sector is affected directly and indirectly by the transition. For instance, if individuals purchase less cars (group of levers “Key behaviours - Travel”), then the industrial production of vehicles decrease (direct effect).
      </p>
    </div> -->
  </div>
</template>

<script>
import BarRangeChart from '../../../charts/BarRangeChart.vue';

export default {
  name: 'MineralAvailability',
  components: {BarRangeChart},
  props: ['subtab','outputs','chartDefinitions','countrycode','appState'],
  data() {
    return {
      chart1Data: undefined
    }
  },
  methods: {
    buildData() {
      let currChart = this.chartDefinitions[this.subtab.charts[0]];

      let data = [];
      let categories = [];

      currChart.outputs.forEach((outp) => {

        if(!this.outputs[outp.id] || !this.outputs[outp.id].data) {
          return;
        }

        let title = this.outputs[outp.id].title ? this.outputs[outp.id].title : outp.id;

        categories.push(title);

        let outputData = this.outputs[outp.id].data[this.countrycode];

        let value = outputData[outputData.length-1];
        data.push(
          // Range charts in Highcharts cover a range, so two values are needed
          value < 0 ? [value,0] : [0,value]
        );

      });

      // console.log(categories,data);
      if(data.length) {
        this.chart1Data = {
          series: [{
            data: data
          }],
          title: currChart.title,
          unit: currChart.unit,
          categories: categories
        };
      }
    }
  },
  created() {
    this.buildData();
  },
  watch: {
    'appState.lastAPIResponse': function() {
      this.buildData();
    },
    countrycode: function() {
      this.buildData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
