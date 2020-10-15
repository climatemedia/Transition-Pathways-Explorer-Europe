<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Bioenergy capacity</h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the ambition regarding the bioenergy domestic production capacities per energy-type.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Bioenergy capacity" chartfilename="lever_bioenergy-capacity.js"
      ></component>
      <p>The European Union biofuel (biogas and solid biofuel) based electricity generation capacity was 28 TWh in 2015, with an average increase of 13% per year since 2005. As the extrapolation of these trends is unrealistic, EUref scenario and literature for perspectives of bioenergy capacity trends are used to estimate possible future trends of bioenergy based electricity generation, with a most ambitious scenario of reaching five times existing capacities of 2015.</p>
      <p>The European Union biofuel (biogas and solid biofuel) based electricity generation capacity was 28 TWh in 2015, with an average increase of 13% per year since 2005. As the extrapolation of these trends is unrealistic, EUref scenario and literature for perspectives of bioenergy capacity trends are used to estimate possible future trends of bioenergy based electricity generation, with a most ambitious scenario of reaching five times existing capacities of 2015.
The lever includes biomass-based electricity and heating; biogases (digestor, landfill, wastes, sewage and thermal-biogases); liquid biofuels (biogasoline, biodiesel, biojetfuels).
</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Liquid bioenergy capacity remains unchanged in the future. Biogas and solid biofuel electricity generation capacities will grow according to EU Reference Scenario (2016) and the least ambitious trajectories found in literature, reaching the double of existing  capacities in 2015 – 57 TWh.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Biogas and solid biofuel capacity are set as intermediate values of L1 and L4 levers , slightly exceeding the triple of existing  capacities in 2015 - 89 TWh.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Biogas and solid biofuel capacity are set as intermediate values of L1 and L4 levers, slightly exceeding by four times existing  capacities in 2015 – 121 TWh.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Biogas and solid biofuel electricity generation capacities will grow according to the most ambitious trajectories found in literature, reaching five times existing capacities in 2015 – 153 TWh.</p></li></ul>
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
  name: 'lever_bioenergy-capacity',
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
      let fileName = 'lever_bioenergy-capacityChart.vue';

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
