<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Freight technology</h3>
    </div>
    <div id="lever-info-content">
      <p>The freight vehicle technology mix lever sets the technology mix (e.g. Internal Combustion Engine (ICE), Battery Electric Vehicle (BEV), Plug-in Hybrid Vehicle (PHEV), Fuel Cell Electric Vehicle (FCEV), etc.) in the new vehicle sales for road, rail, sea and air. Based on this lever, and on historical fleet data, the model is able to compute the share of each technology in the total vehicle fleet and then compute the vehicle-kilometers by mode into vehicle-kilometers by mode and by technology. </p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Freight technology" chartfilename="lever_freight_technology-share_new.js"
      ></component>
      <p>Transport is one of the major contributors to global emissions, and is still heavily reliant on fossil fuels. The problem is more acute in the freight sector where low- and zero-emission alternatives to fossil-fuel engines are currently harder to implement (e.g. it is hard to have fully electric trucks powered with batteries due to the significant amount of batteries needed and their weight). </p>
      <p>For the same vehicle distance, expressed in vehicle-kilometers, a higher technology share will be translated in a higher number of vehicle-kilometers travelled by low-emissions technologies (e.g. BEV, FCEV, etc.). The impact of the “technology” lever will depend on how the electricity or hydrogen used to power these vehicles is generated (this is taken into account in EUCalc). The impact of the lever will also be affected by the level of transport demand in the user’s pathway.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>10% of new truck sales.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>40% of new truck sales.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>70% of new truck sales.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>100% of new truck sales.</p></li></ul>
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
  name: 'lever_freight_technology-share_new',
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
      let fileName = 'lever_freight_technology-share_newChart.vue';

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
