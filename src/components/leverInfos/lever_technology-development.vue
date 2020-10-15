<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Energy efficiency </h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the decrease in energy consumption through technology based energy efficiency measures.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Energy efficiency " chartfilename="lever_technology-development.js"
      ></component>
      <p>A number of technology improvements can be applied across different sectors to increase efficiency and reduce emissions. There are cross-cutting technologies, which are relevant for more than one sector, like increasing boiler efficiency, employing operation &amp; control techniques, using energy efficient motors, using variable speed drivers, reducing compressed air system leaks and efficient load management.
Some sector specific measures include upgrading steam cracking plants to best practice technology in the chemicals sector, improved furnace design for iron and steel making or the usage of dry systems with preheaters and pre-calciners for the production of cement.</p>
      <p>Some new technologies require large amounts of energy, such as the use of hydrogen for steel production, which requires a large amount of electric power for the production of hydrogen through electrolysis. The high demand for electricity can be met by using a decarbonised electricity mix. This technology can reduce emissions by up to 95% and decrease energy demand by up to 20%. This higher electricity demand is accounted in the Energy Supply module, where the hydrogen production is modelled. The lever refers to the manufacturing and production sector. </p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>No major energy efficiency measures in the manufacturing and production sector are observed. Following historic trends the estimated range of increased energy efficiency is between 3 and 8% across sectors.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Some more ambitious energy efficiency measures in the manufacturing and production sector are observed. The estimated range of increased energy efficiency is between 5% (wood products) and 16% (food, beverages and tobacco) across sectors.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Ambitious energy efficiency measures in the manufacturing and production sector are observed. The estimated range of increased energy efficiency, especially in energy-intensive sectors, goes from 8% for wood and wood products, 15 to 18% in the iron and steel sector, up to 25% for food beverages and tobacco.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Most ambitious energy efficiency measures in the manufacturing and production sector are implemented. The estimated range of increased energy efficiency is between 10% (wood products) up to 35% (food, beverages and tobacco). In energy-intensive sectors the range is between 13% and 24%.</p></li></ul>
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
  name: 'lever_technology-development',
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
      let fileName = 'lever_technology-developmentChart.vue';

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
