<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Use of paper and packaging</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the use of paper for printing and sanitary purposes, and the plastic, paper, aluminium and glass used for packaging.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Use of paper and packaging" chartfilename="lever_paperpack.js"
      ></component>
      <p>In 2015 the global demand of paper for print declined and the fall in demand for this product in Europe over the past five years has been more pronounced than even the most pessimistic forecasts. The use of paper packaging, on the other hand, is growing in Europe along with the use of tissue paper, and the use of pulp for hygiene products. The demand for plastic products in 2017 totalled 52.1 Mt (Plastics Europe, 2017) or circa 15% of the global production.</p>
      <p>Of the several uses plastic can have in Europe the main use is for packaging (circa 40% of total production) followed by building and construction (circa 20%) and finally the demand from the  automotive industry (circa 10%).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>For level 1, the change in paper used for printing arrive in 2050 to the negative trend proposed in Hänninen et al., (2014) for 2030 - 26% reduction from 2015 level. For sanitary paper this level assumes a growth in 17% by 2050 compared to 2015. The evolution of plastic and aluminum packaging reflect the growth scenario highlighted in Lebreton and Andrady (2019) which estimates a 25% increase in demand. Glass packaging is set at a yearly rate of 1.6% as implied in the 2012-2017 growth rate reported in FAVE 2019. This would yield a rise in about 50% in 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>For level 2 we extend the Hänninen et al., (2014) scenario regarding the demand of paper for printing to a reduction of 36% by 2050. For sanitary paper, the growth is set at 1%, reflecting the possibility of Eastern European countries curbing their growth faster than Wester European countries did in the past. For plastic and aluminum package demand, this level assumes a 12% increase for each, an intermediate level between the changes reported for level 1 and 3.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Level 3 is an intermediate scenario between level 2 and 4. Demand of Paper for printing is reduced by 46% in relation to 2015 while the demand of paper for sanitary purposes rises by 4% from 2015. This level assumes a stagnation of 2015 level of plastic and aluminium packaging. Finally, the demand for glass packaging increases by 65%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>For level 4 we extend the reduction in demand for paper in level 2 to 56% by 2050, reflecting the additional feasibility expressed in Calloway and Michel, (2003) and Moberg et al., (2010). For sanitary paper we assume a complete stagnation of sanitary paper use, which would be extremely ambitious. The technical feasibility of reducing plastic and aluminum packaging consumption by 10% in Moran et al., (2018) is used in this level. A growth of 70% in glass packaging is assumed in order to compensate for the drop in plastic and aluminium.</p></li></ul>
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
  name: 'lever_paperpack',
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
      let fileName = 'lever_paperpackChart.vue';

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
