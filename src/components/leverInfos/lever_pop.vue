<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Population</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the amount of population living in the EU28+Switzerland.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Population" chartfilename="lever_pop.js"
      ></component>
      <p>Between 1960 and 2018, the population of the EU grew from 407 million to 513 million, an increase of 106 million people. In the year 2018, the population of the European Union (EU) was estimated at 512.6 Million, 1.2 Million more than in 2017.</p>
      <p>Population is one of the main drivers of GHG emissions globally and also one where future projections are particularly robust when evaluated at the continental scale.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>This level is assumed to be the level half way between the High Migration scenario and Baseline scenario in Eurostat (2015) projections.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>This level is aligned with the baseline population projection in Eurostat (2018). Under this scenario a recovering fertility for Europe takes place increasing to 1.65 children per woman. Decreasing mortality rates lead to an increase in life expectancy at birth, for both women (87.5 by 2050) and men (82.8 years by 2050). Additionally, all countries have a positive net migration (more immigration than emigration) after 2030, though lower than in level 1.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>This level is set as an intermediate level between level 2 (baseline) and level 4 (low fertility).</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>This level is aligned with the low fertility variant of the Eurostat projections (2015). Under this scenario the European population declines due to a persistency of low fertility rates at circa 1.5 children per woman, which cannot compensate the moderate increase in inmigration taking place until 2050.</p></li></ul>
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
  name: 'lever_pop',
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
      let fileName = 'lever_popChart.vue';

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
