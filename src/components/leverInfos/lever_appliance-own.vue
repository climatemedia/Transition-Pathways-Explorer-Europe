<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Appliances owned</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the amount of white and black goods found in each household and comes expressed as appliance/cap.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Appliances owned" chartfilename="lever_appliance-own.js"
      ></component>
      <p>Appliances use more than a third of the global energy consumed in buildings. Globally, the growing share of appliances in electricity demand has been driven by the growth in large appliances (increasing 50% since 1990); lighting (growing on average 2% annually since 2005); and networked devices and consumer electronics (increasing 3.5% annually since 2010) (IEA 2017).</p>
      <p>Intlekofer et al., (2010) showed that, on average, up to 30% of energy could effectively be saved by leasing dishwashers, washing machines and refrigerators; while the potential for energy savings for renting out computers was between 20-30%.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>For level 1, countries converge to levels of appliance ownership typically found in European countries with high income levels (typically beyond €40000/cap in 2014). In the case of fridges this would imply a convergence towards 1.1 fridges per household (similar to the values found in Germany in 2015). For computers, this would equate to 2.2 computers per household, a typical value found in affluent countries such as Switzerland.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Level 2 is set as a 15% reduction of appliance ownership compared to level 1.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Level 3 is set as a 30% reduction of appliance ownership compared to level 1.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>For level 4, countries converge to appliance ownership closer to that of countries with middle income (typically between €20000 and €30000/cap in 2014). This is a level of income that would eliminate the monetary barrier of buying an appliance while containing the prospect of households buying more appliances than necessary. At this level, dishwasher ownership would converge towards 0.5 per household (the same as Italy in 2014); computer ownership would be at 1 per household (the same as Spain in 2014); TV’s would be at 1 per household (similar to the level of Slovenia in 2014). In the case of washing machines, ownership would converge towards 0.8 per household in 2014, reflecting the levels found in Switzerland.</p></li></ul>
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
  name: 'lever_appliance-own',
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
      let fileName = 'lever_appliance-ownChart.vue';

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
