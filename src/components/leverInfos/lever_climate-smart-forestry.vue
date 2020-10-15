<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Forestry practices </h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the ambition regarding the deployment of climate smart forestry.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Forestry practices " chartfilename="lever_climate-smart-forestry.js"
      ></component>
      <p>The European forests enabled the capture of 419 MtCO2e in 2016 in the EU 28+Switzerland, which represents almost 8% of GHG emissions. Climate smart forestry includes a set of enhanced management practices (such as full grown coppice, sustainable harvest rate) that can enable an additional 440 MtCO2 mitigation potential by 2050.</p>
      <p>The ‘climate-smart forestry’ lever sets the ambition for the deployment of enhanced forest management practices. It affects the gross biomass increment, natural losses (including resilience against natural disturbances) and the harvest-rate.
</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Continued adoption of sustainable forestry management practices leads to enhance the forest carbon pool potential (ceteris paribus) but it does not maximise the European potential. The biomass growth increment and harvesting rates follow the current trends.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Climate smart forestry practices are deployed in public forests by 2050 (approximately 40% of European forests), leading to increased biomass production and carbon pool potential.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Climate smart forestry practices are deployed in public forests and in the larger private forests by 2050 (approximately 70% of European forests), leading to increased biomass production and a carbon pool potential, twice as large compared with the current European forest long term strategy.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Climate smart forestry practices are deployed in all European forests by 2050, leading to maximise biomass production and carbon pool potential in Europe.</p></li></ul>
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
  name: 'lever_climate-smart-forestry',
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
      let fileName = 'lever_climate-smart-forestryChart.vue';

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
