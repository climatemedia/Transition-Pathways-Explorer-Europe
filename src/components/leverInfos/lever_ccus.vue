<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Carbon Capture to fuel</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the percentage of utilization of carbon captured.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Carbon Capture to fuel" chartfilename="lever_ccus.js"
      ></component>
      <p>This lever addresses the tradeoff between Carbon Capture and Storage (CCS) and Carbon Capture and Use (CCU). Currently there are no large-scale CCS and CCU facilities in operation in EU28+Switzerland, despite some pilot projects. Several large-scale CCS projects are planned in 2020s (5 projects in the UK and 2 in Netherland). Compared to CCU, CCS requires less investment and energy consumption, while CCU contributes to the mitigation of fossil fuel demand and the alleviation of renewable intermittency by power-to-gas processes.</p>
      <p>This lever defines two extreme scenarios, where only CCS (level 1) or only CCU (level 4) could be deployed. For some countries without geological availability for CCS, only CCU is assumed feasible. The other two levels are defined by linear interpolation between the two extreme scenarios, standing for a smooth transition from CCS to CCU.
The level 4 is assumed ambitious since the CCU has few advantages in terms of technological maturity and economic feasibility compared to CCS under the current energy system. However, the development of CCU is assumed promising in correspondence to the development of intermittent renewable resources due to its potential for contributing to increasing energy storage demand. The output synthetic natural gas can be easily injected in the existing natural gas infrastructure facilitating the coupling of various energy, transport and industry sectors. 
This lever is highly linked to the CC ratio defined in Manufacturing and Supply respectively, which denote the total carbon capture amount by years. The captured carbon can only be sequestrated or used, taking into account the geological feasibility. By consequence, the final CCS and CCU amounts are determined by the three levers defined above.  </p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>All captured carbon is sequestrated underground from 2015-2050, no carbon is used to produce fuels.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>66% of captured carbon is sequestrated and the other 33% is used to produce synthetic natural gas.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>33% of captured carbon is sequestrated and the other 66% is used to produce synthetic natural gas.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>All the captured carbon is used to produce synthetic natural gas, no sequestration.</p></li></ul>
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
  name: 'lever_ccus',
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
      let fileName = 'lever_ccusChart.vue';

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
