<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Space cooling &amp; heating</h3>
    </div>
    <div id="lever-info-content">
      <p>This level sets the room temperature within residential buildings.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Space cooling & heating" chartfilename="lever_heatcool-behaviour.js"
      ></component>
      <p>Research suggests that energy savings up to15% are possible for each degree of temperature increase or decrease in buildings. In combination with the levers that regulate residential floor space  and the percentage of residential space being cooled, this lever allows to fully explore how temperature settings affect the energy consumption of residential buildings.</p>
      <p>Each country has its so called “comfort temperature” based on variables such as weather, age, structure and population wealth. Current comfort temperatures range from 14 °C in central Europe to 25 °C in southern Spain, and they are significantly higher than annual mean temperatures. At a European level the average comfort temperature is of about 20°C as in Ballester et al, (2011). </p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>In level 1 indoor temperatures are set at 1.5°C degree more/ less than the observed comfort temperature in Ballester et al, (2011).</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>In level 2 indoor temperatures are set at 1°C degree more/less than the observed comfort temperature in Ballester et al, (2011).</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>In level 3 indoor temperatures are set at 0.5°C degree more/less than the observed comfort temperature in Ballester et al, (2011).</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>In level 4 indoor temperatures are set to match the observed comfort temperature in Ballester et al, (2011).</p></li></ul>
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
  name: 'lever_heatcool-behaviour',
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
      let fileName = 'lever_heatcool-behaviourChart.vue';

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
