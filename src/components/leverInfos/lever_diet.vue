<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Type of diet</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the composition of individual diets expressed as daily calorie demand for 26 food groups.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Type of diet" chartfilename="lever_diet.js"
      ></component>
      <p>The total share of animal based calories is estimated to rise globally with only a moderate increase for high-income countries. For some countries, reductions in meat consumption are possible even with increasing income. (Bodirsky et al., 2015).</p>
      <p>A shift in consumption towards more animal-based products are expected to lead to an increase in GHG emissions. Hence, dietary shifts have been proposed as an effective way of reducing associated greenhouse emissions (Springmann et al., 2018).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>In level 1 country-specific consumption of meat, sugars and sweeteners, fruits and vegetables continues in line with past linear trends (1990 to 2013) until 2050. This means that in some cases, due to the trends from the past, a country can reach calorie consumption levels for particular food groups assumed in level 2 or 3.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Level 2 is constructed as an intermediate level between level 1 and 3. Accordingly, the consumption of meat, sugars and sweeteners, fruits and vegetables does not fully reach the WHO standards but there is a significant departure from current diets. </p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>For level 3 it is assumed that countries aim to fulfil the healthy dietary requirements set by WHO 2003 and WCRF 2017. This means that countries converge to a diet where meat consumption does not exceed 90g/day (of which only up to 71g/day is red meat); where sugars and sweeteners are kept below 10% of calorie consumption and where fruits and vegetables consumption is of at least 400g/day.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Level 4 assumes the widespread adoption of a flexitarian diet as proposed in Sringmann et al, (2018). This means that meat consumption in kept at 38g per day with 13g per day of red meat. Sugars and sweeteners are kept at below 5% of calorie intake; and fruits and vegetables consumption to be over 600g/day.</p></li></ul>
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
  name: 'lever_diet',
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
      let fileName = 'lever_dietChart.vue';

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
