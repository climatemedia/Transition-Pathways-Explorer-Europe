<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">District heating share</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the percentage of heating energy demand covered by district heating.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="District heating share" chartfilename="lever_district-heating-share.js"
      ></component>
      <p>District heating (DH) can facilitate the decarbonisation of the building stock in dense urban areas, even with a decreasing heat density. Buildings in dense urban areas are particularly difficult to decarbonise, partly due to historic settings or special restrictions. On a European average, 8% of the final consumption is currently provided with derived heat. This lever influences how important the DH share will be in the pathways. </p>
      <p>By using DH, exhausts from individual boilers are relocated to centralised chimneys, which can reduce local pollutants such as dust, fine particles, sulphur dioxide and nitrogen oxides. Compared with individual boilers, a central energy production can offer far more effective pollution prevention and control measures. DH is often based on the use of surplus heat which would otherwise be lost (surplus heat from industry, CHP, etc.) and thereby avoids the use of fossil fuels and related emissions. DH does not depend on a specific fuel and is known as being very reliable because the heat is produced at multiple production facilities using a variety of fuels. DH also contributes to GHG reduction because of its long lifetime and high efficiency.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>No increase in district heating with the share in building heating supply following the historical trend pre 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The share of district heating is 10% lower than the share reported in the Heat Roadmap Europe project (https://heatroadmap.eu/).</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The share of district heating is as reported in the Heat Roadmap Europe project (https://heatroadmap.eu/).</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The share of district heating is 10% higher than the share reported in the Heat Roadmap Europe project (https://heatroadmap.eu/).</p></li></ul>
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
  name: 'lever_district-heating-share',
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
      let fileName = 'lever_district-heating-shareChart.vue';

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
