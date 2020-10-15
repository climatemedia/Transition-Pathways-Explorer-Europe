<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Area set aside for nature...</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the area set aside for biodiversity protection.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Area set aside for nature..." chartfilename="lever_biodiversity.js"
      ></component>
      <p>The lever increases levels of land preservation based on current Convention on Biological Diversity Targets and then increases taking into account  potential impacts of climate change on plants (habitats) using the  proposed ‘Plan for Nature’ (and potential CBD 2030 goals) and E.O. Wilson’s proposed ‘Half for Nature’.</p>
      <p>Following the Convention on Biological Diversity (CBD) proposed conservation targets for 2020 (established in the Aichi target 11) as the minimum effort (further restricted in that the percentage land preserved must be ‘natural’ and can not include agriculture. As levels of ambition increase the target for preservation becomes more ambitious, by taking into account the potential impacts of climate change on plant distributions (refugia at 2°C, refugia being an area remaining climatically suitable for 75% of the species modelled); and then increasing levels of protection to match the proposed ‘Plan for Nature’ and ‘Half for Nature’, by the proposed dates of 2030 and 2050. The lever is thus tied, as well as possible into international Conventions for biodiversity.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Each country meets their CBD 2020 target 11 by 2020, with the definition of protected being restricted to those areas primarily focused on biodiversity conservation in areas with natural habitat.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Each country meets their CBD 2020 targets in areas classified both as natural and also as a climate refugia (area remaining climatically suitable for >75% of the species modelled) for biodiversity (plants) at 2°C.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Each country meets the proposed 2030 targets (Plan for Nature) for countries protecting 30% of their land surface for biodiversity. As the goal of the target is biodiversity conservation, then this is further modified by the 30% of areas identified as being in natural condition (including pastures) in 2015, and that they also be plant refugia under 2°C warming (where possible).</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>50% of each country is set aside for nature, drawing first from natural habitats, then looking at level of restoration necessary in agricultural habitats (helping meet CBD Aichi target 15). Priority for restoration given to plant refugia at 2°C.</p></li></ul>
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
  name: 'lever_biodiversity',
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
      let fileName = 'lever_biodiversityChart.vue';

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
