<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Urban population</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the fraction of total population living in urban areas.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Urban population" chartfilename="lever_urbpop.js"
      ></component>
      <p>According to Eurostat (Eurostat 2015), urban areas - defined as cities, towns and suburbs - provide a home to 72% of the EU-28’s population; 41% live in cities and 31% in towns and suburbs in 2014.</p>
      <p>Over the past 50 years, the urban population has continued to grow with considerable differences in the size and spatial distribution of urban developments between member states. More compact cities favour less need for transport and were demonstrated to have a significant impact on transport emissions.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>In level 1 the fraction of persons living in urban area increases considerably reflecting the continuation of the global mega-trend of more people moving into urban areas, aligned with the SSP1 scenario. For the EU28+Switzerland this would imply a rise in the percentage of the population living in urban areas to 83% in 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>This level is linked to the SSP2 urbanization scenario. Under this assumption the percentage of urban population in EU28+Switzerland continues to rise but at a lower rate than that observed in level 1, totaling 80% in the year 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>This level is constructed as an intermediate level between level 2 and level 3.</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>In this level the percentage of urban population in EU28+Switzerland increases only very slightly from 2015 values to 76% by 2050. This scenario is similar in magnitude to the SSP3 urbanization scenario.</p></li></ul>
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
  name: 'lever_urbpop',
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
      let fileName = 'lever_urbpopChart.vue';

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
