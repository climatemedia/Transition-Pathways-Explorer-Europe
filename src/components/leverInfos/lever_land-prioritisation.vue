<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">...from agriculture or forestry</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the land type which is primarily restored to natural or set aside for preservation.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="...from agriculture or forestry" chartfilename="lever_land-prioritisation.js"
      ></component>
      <p>As conservation levels increase it may be necessary to restore some lands from land use type to ‘natural’, or set aside lands that are currently in forestry use. This lever specifies the stock from which the restoration should be taken or should be moved from forestry to protected.</p>
      <p>Accepting that urban areas are unlikely to be destroyed and restored to a natural state, this lever specifies whether increases in protected lands come from the forestry sector (thus reducing the amount of timber harvest available), or the agricultural sector. Restoration of agricultural lands would, over the long term, have a great mitigation benefit as it both removes the agricultural emissions and enhances the carbon sink.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>Protected areas are primarily taken from natural lands (forests). A use of these areas for intensified forestry is no longer possible.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>Protected areas are mainly taken from agricultural land. A use of these lands for agriculture (food production) is no longer possible.</p></li></ul>
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
  name: 'lever_land-prioritisation',
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
      let fileName = 'lever_land-prioritisationChart.vue';

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
