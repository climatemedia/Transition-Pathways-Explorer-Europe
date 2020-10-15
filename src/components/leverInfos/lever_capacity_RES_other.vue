<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Hydro, geo &amp; tidal</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the new hydropower, geothermal and marine power capacities.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Hydro, geo & tidal" chartfilename="lever_capacity_RES_other.js"
      ></component>
      <p>With this lever the user can choose what amount of combined marine, geothermal and hydropower capacities are in the electricity production mix, influencing the production and emissions of the sector. The installation of these technologies can in some cases play an important  role in decarbonization pathways. The reason for merging these three technologies into one lever is that the potential of adding new capacities is limited to only certain countries. As hydropower provides the largest source of renewable electricity production in the European Union, the hydropower market is highly developed. In 2015, the EU28+Switzerland had a total 120 GW of hydropower (excluding pumped storage) with 86 GW of that found in only 6 countries: Austria, France, Italy, Spain, Sweden and Switzerland. Unlike hydropower, penetration of geothermal and marine energy capacities is low (neither of them reach 1 GW at EU level), as it is limited to countries with certain geographical and geological conditions. The term marine energy includes multiple technologies but the only significant installation within the  EU is found in France with 240 MW capacity. Also the bulk of geothermal capacities in the EU is limited to one country: Italy has 879 MW of geothermal electricity production. A few small plants ranging 1-27 MW are in Austria, Cyprus, France, Germany, Greece, Portugal and Romania.</p>
      <p>Investments in the hydropower sector are primarily focused on pumped storage projects, as it is currently the only flexible carbon free tool in the electricity system that exists in large scale. As such, in the architecture of the EUCalc, pumped storage capacities are considered in the storage module as a tool for system flexibility.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Total hydropower, geothermal and marine capacities follow the current trends thus exceeding 100 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Total hydropower, geothermal and marine capacities are getting close to 200 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Total hydropower, geothermal and marine capacities exceed 200 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Total hydropower, geothermal and marine capacities are getting close to 300 GW by 2050.</p></li></ul>
      </div>
      <p>
        For more details on the definition of the ambition levels for this lever and on the context and
        modelling assumptions, please refer to the <a href="http://www.european-calculator.eu/documentation/" target="_blank"><b>technical documentation</b></a>.
      </p>
    </div>
  </div>
</template>

<script>
import LineChartLeverInfo from '../../charts/LineChartLeverInfo.vue';

export default {
  name: 'lever_capacity_RES_other',
  components: {
    LineChartLeverInfo
  },
  data() {
    return {
      componentInstance: undefined
    }
  },
  methods: {
    loadChartComponent() {
      let fileName = 'lever_capacity_RES_otherChart.vue';

      // import() only works with partial paths, it doesn't take a single variable, like import(filePath).
      // import() is not a function!! It just looks like one
      // This rest is a bit hacky, but well.
      // The first import() looks if the file exists, if not a default component is loaded.
      // If it exists, a second import needs to be started because <component> cannot work directly with the answer of the
      // first succesful fetch. It can only work with a function like this (for dynamic imports):
      // componentInstance = () => import(`../chartExceptions/${fileName}`)
      import(`./chartExceptions/${fileName}`)
      .then(() => {
        this.componentInstance = () => import(`./chartExceptions/${fileName}`);
       })
       .catch(() => {
         this.componentInstance = LineChartLeverInfo;
       });
    }
  },
  created() {
    this.loadChartComponent();
  }
}
</script>

<style>
.lever-info-chart {
  height: 400px;
}
</style>
