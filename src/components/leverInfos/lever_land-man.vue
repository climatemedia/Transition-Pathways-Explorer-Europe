<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Land management</h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the ambition level for land-use allocation and dynamics.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Land management" chartfilename="lever_land-man.js"
      ></component>
      <p>Land-use and land-use change are affecting the carbon stocked in the soil and biomass, both positively (e.g. afforestation) and negatively (e.g. deforestation). Land use, land-use change, and forestry (LULUCF) is a key pillar to enable net-zero emission pathways as one cannot completely reach zero emissions. Thanks to the natural carbon cycle, the oceans, lands and forests constitute major natural carbon sinks that can offset CO2 emissions and thus enable to reach net-zero emission pathways. Currently, LULUCF enables offsetting 258 MtCO2eq in the EU.</p>
      <p>The ‘land management’ lever sets the ambition regarding land-use dynamics (e.g. the extent of settlements cropping on forest lands); how will the land available be allocated in terms of use (e.g. abandoned to afforestation). The lever impacts in a large extent the LULUCF associated emissions.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Free lands remain as unmanaged agriculture lands such as those already existing in Central and Eastern Europe. The potential of carbon sequestration remains unused.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Free lands are allocated for 1/3 to forests, and 2/3 to natural prairies.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Free lands are allocated for 2/3 to forests, and 1/3 to natural prairies, which enables a large increase in the soil’s carbon pool.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Free lands are fully allocated to forest to maximise the terrestrial carbon pool.</p></li></ul>
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
  name: 'lever_land-man',
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
      let fileName = 'lever_land-manChart.vue';

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
