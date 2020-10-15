<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">EU emissions after 2050</h3>
    </div>
    <div id="lever-info-content">
      <p>This levers sets the emission trend after 2050.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="EU emissions after 2050" chartfilename="lever_ems-after-2050.js"
      ></component>
      <p>The lever in EUCalc only set ambitions to 2050, this lever then allows the climate (and impacts) to evolve until 2100 based on the lever assumptions for emissions post 2050.</p>
      <p>As most of EUCalc only deals with the period up to 2050, but the lag in the climate and impacts run until 2100, then this lever allows the user to make assumptions as to how much the emissions will continue (positive or negative) from 2050 - 2100.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Emissions will remain at the level reached in 2050 until 2100.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Ambitions to further reduce emissions will continue at 1/3rd of the rate between 2035 and 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Ambitions to further reduce emissions will continue at 2/3rd of the rate between 2035 and 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Ambitions to further reduce emissions will continue at the rate between 2035 and 2050.</p></li></ul>
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
  name: 'lever_ems-after-2050',
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
      let fileName = 'lever_ems-after-2050Chart.vue';

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
