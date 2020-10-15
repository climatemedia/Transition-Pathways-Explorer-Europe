<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Climate smart crop production</h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the ambition regarding the crop production system, from intensive to agroecology approach.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Climate smart crop production" chartfilename="lever_climate-smart-crop.js"
      ></component>
      <p>The agriculture sector emits 438 MtCO2 equivalent, around 10% of the European Union GHG emissions. Crop cultivation represents about 40% of the agriculture sector emissions (UNFCCC inventory, 2015). The European agricultural production system is mostly driven by the Common Agricultural Policy (CAP), it is therefore assumed that the production system pattern will follow the current trends until 2021. The overarching concern is to sustainably feed people while supplying non-food agricultural commodities to substitute fossil-based energy and material, as well as preserving and enhancing the sustainable use of natural resources, the agricultural resilience to climate change and of course contributing to climate change mitigation.</p>
      <p>The ‘climate-smart crop’ lever addresses the food waste and losses from the production side. The practices that are used for crop production (e.g. agroforestry, crop-rotation) including fertilizer-use, pesticide-use, crop yields, energy-use, and so on.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>Continued adoption of conventional crop production practices leads to increased productivity through continued intensification patterns, but it comes with an environmental cost (soil quality, emissions) given the intensification of input uses (fertilizer, pesticides, energy). In this scenario, food waste and losses are increasing, agriculture residue collection remains at an unsustainable rate for those countries already in an unsustainable situation in the reference year. Given the intensification, the land requirement is lower per output unit, which enables to spare land that can be used for forests, natural prairies, or that can remain unmanaged.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>In 2050 sustainable intensification crop production systems remain limited compared to conventional practices. Though lower than the previous level the intensification of the crop production system enables to increase the yields and input uses in line with historical trends. In this scenario, food wastes and losses are reduced but still at 2015 levels. Given the intensification, the land requirement is lower per output unit, which enables to spare land that can be used for forests, natural prairies, or that can remain unmanaged.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>In 2050 sustainable intensification crop production system is fully deployed. Crop yields are increasing slightly compared to 2015, but much less compared with the previous levels. In this scenario, food waste and losses are limited to about half the 2015 level. The land requirement is slightly lower per output unit compared to 2015, but much higher compared to previous levels. Thus, spare lands are limited but the production system enables the soil carbon capture to be higher, and the emissions to be lower thanks to the decrease of inputs such as synthetic fertilizer and pesticides.</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>The whole European agricultural production system follows the agroecology standards. Chemicals are fully banned, replaced by integrated pest management. Food waste and losses are limited to a third of the previous level or about 6 times lower compared with 2015. The extensive approach leads to a decrease in yield by 20-40% compared with 2015, but the agriculture land potential for carbon storage is fully exploited (4 for 1000 initiative; www.4p1000.org/). </p></li></ul>
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
  name: 'lever_climate-smart-crop',
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
      let fileName = 'lever_climate-smart-cropChart.vue';

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
