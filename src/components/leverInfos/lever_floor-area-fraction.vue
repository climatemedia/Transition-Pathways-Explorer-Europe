<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Percentage of cooled living space</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the per-capita fraction (percentage) of residential living space cooled.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Percentage of cooled living space" chartfilename="lever_floor-area-fraction.js"
      ></component>
      <p>In 2015, the amount of residential living space area cooled varied between values of more than 50% in Malta and Cyprus to less than 0.5% in countries such as Finland or Germany. The variation reflects the main driver for requiring cooling (high outside temperatures) although it is also noted that income levels also play a role.</p>
      <p>For large parts of Europe, increases in cooling energy demand due to global warming is said to outweigh the expected reductions in energy for heating. Depending on the generation mix, in some countries, the net effect on CO2 emissions may be an increase even where overall demand for delivered energy is reduced. Given that a certain amount of global warming between today and 2050 is unavoidable (given the large amount of emissions already in the atmosphere), this lever considers that for any level an increase of cooled area in residential buildings is required.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>In level 1 country-specific shares of cooled floor space are the same as those projected in the Heat Roadmap Europe project (https://heatroadmap.eu/). In this level increased incomes and warming lead the cooled fraction of floor space to reach 21.8%</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Lever 2 is set at 30% lower than the assumptions in level 1.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Lever 3 is set at 50% lower than the assumption in level 1.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>In level 4, the percentage of residential floor space cooled increases by 10% compared to 2015. This has been done in order to safeguard the growing fraction of vulnerable population to heat stress, namely the elderly.</p></li></ul>
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
  name: 'lever_floor-area-fraction',
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
      let fileName = 'lever_floor-area-fractionChart.vue';

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
