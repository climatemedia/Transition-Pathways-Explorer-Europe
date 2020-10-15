<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Fuel mix</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the percentage of energy used along each energy carrier (electricity, coal, oil, gas, biomass, waste, and hydrogen) for each technology.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Fuel mix" chartfilename="lever_energy-carrier-mix.js"
      ></component>
      <p>The energy carrier mix for each industry typically varies from one technology to the other. For example, in the steel industry the BF-BOF (blast furnace - basic oxygen furnace) route uses mainly coal for the steel production, while the scrap-EAF (electric arc furnaces) route uses mainly electricity.
One important decarbonisation option for the European manufacturing and production sectors is the substitution of fossil fuels used for energy and for feedstock, with low carbon alternatives. There are several possibilities to reach this goal. The first one is the electrification of heat, which can be obtained by replacing furnaces, boilers, heat pumps running on fossil fuels with electric ones. A second possibility is the use of zero-carbon hydrogen to replace certain fuels used for energy or feedstock and the last one is the switch to sustainable biomass.</p>
      <p>The availability of low-cost zero-carbon electricity and biomass will influence the feasibility of these decarbonisation options. Availability can vary considerably among locations. Countries with high electricity prices and without biomass resources will have to rely on renewable electricity transmitted over long distances or imported biomass and zero-carbon hydrogen.
In the EUCalc model, the availability of biomass at a national level is determined by the Agriculture module and is based on the demand of transport, buildings, industry, and power sectors. If the biomass demand cannot be satisfied, a warning in the pathway explorer will signal it to the user.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The energy carrier mix in each industry typically varies from one technology to the other. For example, in the steel industry the blast furnace - basic oxygen furnace (BF-BOF) route uses mainly coal for steel production, while the scrap-EAF (electric arc furnace) route uses mainly electricity. At this level no major shifts are expected to take place.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>A slight increase of the electrification of heat, use of zero-carbon hydrogen and a switch to sustainable biomass in energy-intensive sectors can be observed.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Increased electrification of heat, use of zero-carbon hydrogen and a switch to sustainable biomass are expected to take place.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Full potential of electrification of heat, use of zero-carbon hydrogen and a switch to sustainable biomass are expected to take place in all manufacturing and production sectors, leaving very small shares of fossil-fuels in the energy mix.</p></li></ul>
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
  name: 'lever_energy-carrier-mix',
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
      let fileName = 'lever_energy-carrier-mixChart.vue';

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
