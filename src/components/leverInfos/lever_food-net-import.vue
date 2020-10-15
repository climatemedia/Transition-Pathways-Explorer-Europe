<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Food production</h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the self-sufficiency ratio for each food group.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Food production" chartfilename="lever_food-net-import.js"
      ></component>
      <p>It is estimated that around 20 to 25% of global CO2 emissions come from the production of goods that are then consumed in a different country, and food products are no exception. The EU’s self-sufficiency level -i.e. The production over consumption ratio - for crop-based food is approximately 81%, and 103% for livestock-based food.</p>
      <p>The lever sets the ambition in terms of ‘food self-sufficiency ratio’ for each food group, including direct and indirect (e.g. livestock feed) food consumption.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>The self-sufficiency ratio decreases to a level of 70% and 90% for plant based (including cakes) and meat-based food products respectively by 2050 compared to 2015. Consequently, although GHG emissions will decrease in European countries, carbon leakages through the embedded GHG emissions in food products will occur.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>The self-sufficiency ratio decreases to a level of 81% and 100% for plant based (including cakes) and meat-based food products respectively by 2050 compared to 2015. Consequently, although GHG emissions will decrease in European countries, carbon leakages through the embedded GHG emissions in food products will occur.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>The self-sufficiency ratio decreases to a level of 100% and 107% for plant based (including cakes) and meat-based food products by 2050 respectively compared to 2015. Consequently, European countries are net exporters therefore limiting the occurrence of carbon leakages through the embedded GHG emissions in food products.</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>The self-sufficiency ratio decreases to a level of 110% and 120% for plant based (including cakes) and meat-based food products by 2050 respectively compared to 2015. Consequently, European countries are net exporters therefore limiting the occurrence of carbon leakages through the embedded GHG emissions in food products.</p></li></ul>
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
  name: 'lever_food-net-import',
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
      let fileName = 'lever_food-net-importChart.vue';

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
