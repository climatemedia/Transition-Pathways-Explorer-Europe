<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Balancing strategies</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever describes a portfolio of balancing and storage technologies. The user can select the composition of the technology portfolio defined as ambition levels. The lever includes different amount of available balancing power shared amongst pumped hydroelectric storage, battery, flywheel, compressed air storage and power-to-X technology.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Balancing strategies" chartfilename="lever_bal-strat.js"
      ></component>
      <p>The topic of balancing strategies is closely linked to the decarbonization objectives and its main tool, the large share of intermittent renewables. By 2050, the European Union aims to reduce greenhouse gases by more than 80%. A decarbonised power system will depend on a large share of non-dispatchable, weather dependent sources, primarily solar and wind power. The key to addressing the variability and uncertainty of variable renewable electricity integration is the increase of the overall flexibility in the power system. Flexibility solutions, including energy storage can provide a variety of flexibility services, including provision of operating reserves and shifting energy over time to better match generation and load. The lever allows the user to choose a composition of balancing strategies made up of different technologies.</p>
      <p>The ambition level expresses the maximal balancing power for flexibility purposes shared amongst a technology portfolio. If the total power provided by those technologies cannot meet the flexibility needs of the system, then natural gas based capacities are automatically added. 
</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>This scenario considers that the storage electricity volumes will grow according to the least ambitious trajectories found in literature across each technology, reaching a balancing power potential of 1200 TWh by 2050 on EU level.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>This scenario considers that there is a rapid breakthrough in battery technologies, therefore this technology is growing according to the most ambitious trajectory. As a result, all other technologies are only growing at the least ambitious levels. Thanks to this balancing power potential will exceed 1500 TWh by 2050 on EU level.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>This scenario considers that the currently less attractive technologies of compressed-air energy storage (CAES) and flywheels will gain widespread acceptance and hence will grow at their most ambitious trajectories. In this case, however, the growth trajectories of PHS and batteries will be an intermediate growth trajectory between their least and most ambitious trajectories. As a result, balancing power potential will be close to 4000 TWh by 2050 on EU level.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>This scenario considers that all storage technologies grow according to their most ambitious trajectories. This level is considered as transformational and requires some additional breakthrough or efforts such as important costs reduction for some technologies, very fast and extended deployment of infrastructures, major technological advances, strong societal changes. Thanks to this balancing power potential will exceed 5000 TWh by 2050 on EU level.</p></li></ul>
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
  name: 'lever_bal-strat',
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
      let fileName = 'lever_bal-stratChart.vue';

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
