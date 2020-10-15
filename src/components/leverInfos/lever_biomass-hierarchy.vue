<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Hierarchy for biomass end-uses</h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the hierarchy regarding the agri-food industry byproducts and waste uses.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Hierarchy for biomass end-uses" chartfilename="lever_biomass-hierarchy.js"
      ></component>
      <p>Following the European Union approach to waste management (Waste Framework Directive, 2008/98/EC), a hierarchy can be set for the use of the available biomass between different valorisation pathways. Prevention options include the reduction of waste, the redistribution to people or animals; Recycling options include use in compost, as fertilizer, and possibly anaerobic digestion; Recovery options mainly focus on energy recovery; and finally disposal options include incineration, landfill and sewer.</p>
      <p>The lever drives the biomass towards possible markets (e.g. biofuel, livestock feedstuffs), and enables or disables food-crop based feedstock-use for non-food purposes. The lever follows the European food waste hierarchy, with the first prioritizing recovery options (e.g. combustion, bioenergy feedstock), while the last level focusing on prevention (pet food, livestock feed) and recycling options (fertilizer, compost).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>There is no investment in advanced bioenergy technology, and recovery and disposal methods are prioritized (combustion, landfills) in the food waste management hierarchy.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>The allocation of biomass uses, and the deployment of advanced bioenergy follow historical trends.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>The allocation of biomass uses favours prevention (e.g. bio-sourced materials, animal feeds), and recycling (fertilizers, biogas and digestate). Food crop-based biofuels are limited, but dedicated energy crops are used whenever the potential of residues, agri-food, and wood industry cannot supply the bioenergy demand entirely.</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>The allocation of biomass uses is in favour or prevention (e.g. bio-sourced materials, animal feeds), and recycling (fertilizers, biogas and digestate). Food crop-based biofuels and dedicated energy crops are not used, apart for residues, byproducts and wastes used as bioenergy feedstock, whenever the latter cannot be used as biomaterials or fertilizers.</p></li></ul>
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
  name: 'lever_biomass-hierarchy',
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
      let fileName = 'lever_biomass-hierarchyChart.vue';

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
