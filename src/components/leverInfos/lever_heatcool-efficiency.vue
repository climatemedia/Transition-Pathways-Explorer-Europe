<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Heating and cooling efficiency</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the average energy loss in heating, cooling and ventilation systems.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Heating and cooling efficiency" chartfilename="lever_heatcool-efficiency.js"
      ></component>
      <p>Heating, ventilation and air conditioning (HVAC) systems have become more energy efficient. The replacement of one technology by another, for example through a hybrid system, is not included in this lever but in the technology and fuel share lever. Although most of the technologies are in a mature phase, the diffusion into the buildings stock makes this lever offer increased efficiency and leads to lower emissions. </p>
      <p>European and National policies for technologies substitution rate can have an impact on the average efficiency. Important aspects here would be the replacement of old and inefficient equipment, together with increased awareness for regular maintenance. This lever is expected to affect the three main components of HVAC systems – energy transformation, energy distribution, and system control.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The efficiency of boilers increases slowly across the stock to an average of 85% for gas boilers, 81% for oil boilers and 65% for wood boilers.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The efficiency of boilers increases slowly across the stock to an average of 87% for gas boilers, 83% for oil boilers and 66% for wood boilers.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The efficiency of boilers increases slowly across the stock to an average of 91% for gas boilers, 87% for oil boilers and 69% for wood boilers.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The efficiency of boilers increases slowly across the stock to an average of 97% for gas boilers, 93% for oil boilers and 74% for wood boilers.</p></li></ul>
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
  name: 'lever_heatcool-efficiency',
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
      let fileName = 'lever_heatcool-efficiencyChart.vue';

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
