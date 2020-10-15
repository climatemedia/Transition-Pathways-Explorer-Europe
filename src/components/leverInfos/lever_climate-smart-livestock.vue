<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Climate smart livestock </h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the ambition regarding the livestock production system, from intensive to agroecology approach.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Climate smart livestock " chartfilename="lever_climate-smart-livestock.js"
      ></component>
      <p>The agriculture sector emits 438 MtCO2 equivalent, around 10% of the European Union GHG emissions. Livestock represents about 60% of the agriculture sector emissions (UNFCCC inventory, 2015). The European agricultural production system is mostly driven by the CAP - Common Agricultural Policy. Consequently, it is assumed that the production system pattern will follow the current trends until 2021. The overarching concern is to sustainably feed people while supplying non-food agricultural commodities to substitute fossil-based energy and material, while preserving and enhancing the sustainable use of natural resources, the agricultural resilience to climate change and of course contributing to climate change mitigation.</p>
      <p>The ‘climate-smart livestock’ lever considers the food waste and losses from the production side. The practices that are used for livestock production (e.g. sylvopasture) and how they affect livestock yields, slaughter rate, and land-use (e.g. feedlot versus extensive grassland).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>Continued adoption of conventional livestock production practices leads to increased productivity through continued intensification patterns, but it comes with an environmental cost (soil quality, emissions) given the intensification of input uses (fertilizer, energy). In this scenario, food waste and losses are increasing, the grazing livestock intensity is decreasing (land allocated to animals). Due to more intensive systems, manure management is improved as livestock is spending less time outdoors. Given the intensification, the land requirement is lower per output unit, which enables to spare land that can be used for forests, natural prairies, or that can remain unmanaged.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>In 2050 sustainable intensification livestock production system remains limited compared to conventional practices. The intensification of the livestock production system enables to increase the yields and input uses following historical trends. In this scenario, food waste and losses are lower than the previous level, but still at the level of 2015. Given the intensification, the land requirement is lower per output unit, which enables to spare land that can be used for forests, natural prairies, or that can remain unmanaged.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>By 2050 livestock production system is slightly intensified compared to previous levels. Spare lands are limited but sustainable intensification production systems such as silvopasture enables the grassland soil carbon capture to be higher, and the emissions to be lower thanks to the decrease of inputs (e.g. synthetic fertilizer). Livestock yields are slightly higher by 2050 compared to 2015, due to higher animal welfare standards, and an increase of the livestock slaughter age. As with crop production, food losses and waste are halved compared to 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>The whole European agricultural production system follows agroecology standards. Grasslands are used extensively, with a maximum livestock population of 1 Livestock Unit per hectare (LSU/ha). Livestock yields are constant compared with the level of 2015, and an increase of the livestock slaughter age is set to meet organic farming standards. As with crop production, food losses and waste are much lower than in 2015.</p></li></ul>
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
  name: 'lever_climate-smart-livestock',
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
      let fileName = 'lever_climate-smart-livestockChart.vue';

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
