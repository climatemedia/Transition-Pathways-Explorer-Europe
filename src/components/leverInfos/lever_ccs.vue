<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Carbon Capture ratio in power</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the ratio of emissions captured.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Carbon Capture ratio in power" chartfilename="lever_ccs.js"
      ></component>
      <p>Carbon capture technologies capture CO2 emitted from power plants and industrial facilities. The goal of carbon capture is to prevent CO2 from reaching the atmosphere, and to either store it in suitable underground geological formations or use it in chemical conversion processes. For those scenarios where fossil fuels will still be used in the power generation mix, carbon capture has a role to play in reaching climate objectives. However, with the growing share of renewable energy and policy intentions aimed at a quick phase-out of coal, these promises may not be valid and investments in carbon capture may well become stranded assets. Moreover, as of 2018, there are no existing, commercially viable uses of carbon capture and storage projects in the EU.</p>
      <p>As stated in “A Clean Planet for all - A European strategic long-term vision for a prosperous, modern, competitive and climate neutral economy. COM(2018)773,” a 2018 communication from the European Commission, carbon capture was previously seen as a major decarbonisation option for the power sector but today this potential appears lower. Carbon capture deployment has however still a role to play, especially in energy intensive industries and - in the transitional phase - for the production of carbon-free hydrogen. Thus, the main application area of carbon capture is not power generation anymore, due to phase-out plans. In the European Calculator by setting the coal phase-out timing, the user can also reach scenarios when most of the coal based power generation is closing before 2050, leaving no space for carbon capture investment.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>No carbon capture scale-up by 2050, thus negligible emissions captured (except a few projects already in the pipeline).</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Carbon capture is slowly spreading, only 25% of the emissions are captured in 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Carbon capture is on an intermediate track and 50% of the emissions are captured in 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Carbon capture is gaining market share quickly, 80% of the emissions are captured in 2050.</p></li></ul>
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
  name: 'lever_ccs',
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
      let fileName = 'lever_ccsChart.vue';

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
