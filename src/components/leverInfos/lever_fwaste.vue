<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Food waste</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the amount of calories wasted at the consumer level and comes expressed in kcal/cap/day.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Food waste" chartfilename="lever_fwaste.js"
      ></component>
      <p>For 2012, food waste for the whole EU-28 was estimated at 88 million tonnes (Stenmarck et al., 2017). This equates to 173 kilograms of food waste per person. The total amount of food produced in the EU for 2011 was estimated at 865 kg/person, this would mean a 20% waste of the total food produced.</p>
      <p>An overall reduction in daily calories of food wasted, with all other variables kept constant, would lead to a reduction in carbon emissions from the agricultural sector.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>For level 1 food waste at the consumer level follows historical patterns of increased demand and therefore more food waste.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Level 2 is set as the arithmetic average between level 1 and 3.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>For level 3 it is assumed that by 2050 countries will achieve a 50% food waste reduction at the consumer level, thus complying with Sustainable Development Goal (SDG) target 12.3 (set for 2030).</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>For level 4 countries achieve a 75% food waste reduction at the consumer level by 2050.</p></li></ul>
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
  name: 'lever_fwaste',
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
      let fileName = 'lever_fwasteChart.vue';

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
