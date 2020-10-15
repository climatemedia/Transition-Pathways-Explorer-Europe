<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Calories consumed</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the intake of daily calories consumed by individuals and comes expressed in kcal/cap/day.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Calories consumed" chartfilename="lever_kcal-req.js"
      ></component>
      <p>Current (2013) average calories available in Europe stands at an average of 3316 kcal/cap/day, an increase from 3281 Kcal/cap/day in the year 1990. The distribution of calorie availability ranges between countries with typical calorie availability of 3200 Kcal (e.g., Sweden) to countries with 3600 Kcal/cap/day (e.g., Ireland).</p>
      <p>Should the efficiency of agricultural systems stagnate in the delivery of more food per tonne of CO2, a reduction (particularly in the rich world) of food demand is a viable option to reduce GHG emissions. For example, studies have shown that eating less food in general could lower GHG emissions by reducing food demand, which could be lowered by up to 20% in some countries (Vieux et al., 2012).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Level 1 of calorie requirements is determined by extending the country-specific linear trends of body mass extracted from NCD-RisC 2016.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The increase in energy requirements for the average European is kept in check by a more conscious approach to food intake so that the current (2015) body weight of the population is maintained and no further emissions duet to over consumption of food takes place.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Energy requirements are reduced reflecting lifestyle changes that favour eating just the necessary amount of calories to guarantee that the current obesity prevalence in Europe drops by 25%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Energy requirements are reduced reflecting lifestyle changes that favour eating just the necessary amount of calories to guarantee that the current obesity prevalence in Europe drops by 50%.</p></li></ul>
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
  name: 'lever_kcal-req',
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
      let fileName = 'lever_kcal-reqChart.vue';

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
