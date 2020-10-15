<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Global mitigation effort</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets how the rest of the world may decarbonise.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Global mitigation effort" chartfilename="lever_temp.js"
      ></component>
      <p></p>
      <p></p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The rest of the world does not make any changes.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The rest of the world increases their ambitions to reduce emissions and thus shift to a pathway which would lead to 3.2°C of global warming.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The rest of the world increases their ambitions to reduce emissions and thus shift to a pathway which would lead to 2.0°C of global warming.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The rest of the world increases their ambitions to reduce emissions and thus shift to a pathway which would lead to 1.5°C of global warming.</p></li></ul>
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
  name: 'lever_temp',
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
      let fileName = 'lever_tempChart.vue';

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
