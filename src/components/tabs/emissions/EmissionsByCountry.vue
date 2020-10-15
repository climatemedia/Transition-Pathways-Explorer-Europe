<template>
  <div class="subtab-content">
    <LineChart :chart-data="chart1Data"/>
  </div>
</template>

<script>
import LineChart from '../../../charts/LineChart.vue';

export default {
  name: 'EmissionsByCountry',
  components: {LineChart},
  props: ['subtab','outputs', 'chartDefinitions','appState'],
  data() {
    return {
      chart1Data: {} //needs to be made reactive here, otherwise change is not propagated to child-component
    }
  },
  methods: {
    buildData() {
  //    console.log('EmissionsByCountry ', this.chartDefinitions[this.subtab.charts[0]], this.outputs, this.subtab);
/*
      //console.log('EmissionsByCountry ', allCountriesResponse);

      let currChart = this.chartDefinitions[this.subtab.charts[0]];
      var timeAxis = allCountriesResponse.timeAxis;
      var series = [];

      //go through countries
      Object.keys(allCountriesResponse.data).forEach((countryCode) => {
        if(countryCode === 'EU') {
          return;
        }
        let data = allCountriesResponse.data[countryCode];
        if(timeAxis && data && data.length === timeAxis.length) {
          data = data.map((value, index) => {
            return [timeAxis[index], value];
          });
        }
        series.push({
          name: countryCode,
          data: data
        });
      });

      if(!timeAxis) {
        return false;
      }

      this.chart1Data  = {
        series: series,
        title: currChart.title,
        unit: currChart.unit,
        timeAxis: timeAxis.slice() //ditch observer, slice() ignores observer
      }

*/


      let currChart = this.chartDefinitions[this.subtab.charts[0]];

      //multiple countries: can only process one output, in this case there is only one
      let outp = currChart.outputs[0];

      if(!this.outputs[outp.id] || !this.outputs[outp.id].data) {
        return;
      }

      var timeAxis = this.outputs[outp.id].timeAxis;
      var series = [];

  //    console.log('buildData ', this.outputs[outp.id].data);
      //go through countries
      Object.keys(this.outputs[outp.id].data).forEach((countryCode) => {
        if(countryCode === 'EU') {
          return;
        }

        let data = this.outputs[outp.id].data[countryCode];
        //console.log('buildData ', countryCode, data);
        if(timeAxis && data && data.length === timeAxis.length) {
          data = data.map((value, index) => {
            return [timeAxis[index], value];
          });
        }
        series.push({
          name: countryCode,
          data: data
        });
      });

      if(!timeAxis) {
        return false;
      }

      this.chart1Data  = {
        series: series,
        title: currChart.title,
        unit: currChart.unit,
        timeAxis: timeAxis.slice() //ditch observer, slice() ignores observer
      }

    }
  },
  created() {
    //fetch all necessary data/references
    //console.log('IndEnergyDemand ', this.charts);
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
