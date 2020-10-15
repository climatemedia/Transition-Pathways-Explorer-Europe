<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Technology and fuel share</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the mix of technologies used for space heating.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Technology and fuel share" chartfilename="lever_heatcool-technology-fuel.js"
      ></component>
      <p>A variety of different fuels and technologies are used for space heating in buildings. These technologies can have very different efficiencies and emissions associated with them. Today, the most common forms of heating in urban areas are district heating and gas boilers. In rural areas, solid fuel boilers are most common. The fossil fuel share for heating buildings (excluding electricity and district heating) is about 40% across Europe.</p>
      <p>National policies on fossil fuel phase out may impact the evolution of the energy carriers and the technologies used for heating. The phased out fossil fuels will be replaced with alternative technologies, which are also covered by this lever. It thus touches another important element of the EU climate change objectives: the contribution of renewable energy sources.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Fossil fuel use reduction in 2050: gas -5%; coal -10%; oil -30%. These fuels are substituted by heat pumps (30%), biomass (65%) and other renewable sources. </p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Fossil fuel use reduction in 2050: gas -50%; coal -50%; oil -80%. These fuels are substituted by heat pumps (40%), biomass (50%) and other renewable sources. </p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Fossil fuel use reduction in 2050: gas -65%; coal -65%; oil -90%. These fuels are substituted by heat pumps (50%), biomass (35%), solar (9%) and other renewable sources.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Fossil fuel use reduction in 2050: gas -95%; coal -95%; oil -95%. These fuels are substituted by heat pumps (60%), biomass (20%) , solar (12%), geothermal (4%),  biogas (2%), biofuel (2%).</p></li></ul>
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
  name: 'lever_heatcool-technology-fuel',
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
      let fileName = 'lever_heatcool-technology-fuelChart.vue';

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
