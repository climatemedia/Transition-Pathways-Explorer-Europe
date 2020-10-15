<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Material production</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the import of manufactured materials.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Material production" chartfilename="lever_material-net-import.js"
      ></component>
      <p>The historical and projected values of the domestic share ratios are provided for the economic baseline scenario, generated with the GTAP-EUCalc CGE model. GTAP-EUCalc projects the 2011 world economy, establishing a likely BAU scenario towards 2050, by using reference projections for GDP, population, labor force and total factor productivity, obtained from the literature.  </p>
      <p>The domestic share lever allows the user to see the impact of trade balance of product and materials on industrial production, energy consumption, and emissions. It is expressed as the ratio (in percentage) of net import over demand.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>This level represents the (net import)/demand ratio. For this level the ratio decreases by 20% compared to business as usual (BAU), that is generated with the GTAP-EUCalc CGE model, based on a BAU baseline scenario projection in 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>This level represents the (net import)/demand ratio, generated with the GTAP-EUCalc CGE model, based on a BAU baseline scenario projection in 2050. The ratio is calculated using value of regional imports, exports and demand at the economy level for aggregated commodities.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>This level represents the (net import)/demand ratio. For this level the ratio increases by 10% compared to BAU, that is generated with the GTAP-EUCalc CGE model, based on a BAU baseline scenario projection in 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>This level represents the (net import)/demand ratio. For this level the ratio increases by 20% compared to BAU, that is generated with the GTAP-EUCalc CGE model, based on a BAU baseline scenario projection in 2050.</p></li></ul>
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
  name: 'lever_material-net-import',
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
      let fileName = 'lever_material-net-importChart.vue';

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
