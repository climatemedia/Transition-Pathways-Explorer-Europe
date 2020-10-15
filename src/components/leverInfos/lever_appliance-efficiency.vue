<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Appliances efficiency</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the average rate of energy use for appliances, cooking and lighting. The appliances modelled are fridges, freezers, washing machines, laundry dryers, dishwashers, computers, TV’s and phones.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Appliances efficiency" chartfilename="lever_appliance-efficiency.js"
      ></component>
      <p>A variety of different technologies are used in buildings for cooking, lighting and appliances. This lever allows to use more electricity for cooking (rather than gas, oil or traditional biomass), and to introduce more efficient lighting options like LED bulbs.</p>
      <p>European eco-label policy has an impact on the development of appliance efficiency on the market. On average, home appliances – including washing machines, dryers, dishwashers, refrigerators, freezers – will account for 20 percent of your home’s total electric bill. This lever would assess and change the efficiency of the appliances taking into account the average amount of energy used for generating the typical output of the appliance. Since appliances rely solely on electricity, the effect on reduced GHG emissions can be significant, especially in those cases where GHG emission factors for electricity are high.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The appliance efficiency is set to 38%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The appliance efficiency is set to 53%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The appliance efficiency is set to 78%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The appliance efficiency is set to 89%.</p></li></ul>
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
  name: 'lever_appliance-efficiency',
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
      let fileName = 'lever_appliance-efficiencyChart.vue';

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
