<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Charging profiles</h3>
    </div>
    <div id="lever-info-content">
      <p>With this lever the user can influence the charging patterns of electric vehicles, thus influencing when charging happens and its ability to shift demand. Within the lever there are four potential patterns of charging defined: home charging when cars are charged in the after-work hours from home; delayed home charging when cars are charged during the night hours when demand for other forms of electricity consumption is low; home and work charging when cars are charged also during work hours; and finally intelligent charging when the charging time of cars adapts to the availability of extra power on the grid. With the ambition levels, the user can set the ratio of each pattern to share the total electricity need of electric cars.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Charging profiles" chartfilename="lever_str_charging.js"
      ></component>
      <p>The number of electric vehicles on the road is forecasted to grow significantly, and thus their impact on the grid and demand profiles is also increasing. Nevertheless, the charging of Electric Vehicles (EVs) can adopt to the daily routine of the users and can be adjusted based on the state of the electricity system, thus with proper incentives EVscan realize significant demand side management potential. This is needed as the widespread adoption of electric vehicles could increase the risk of overloading the power grid by inflating peak demand.</p>
      <p>The levels are different mixes of charging scenarios. The least ambitious level contains only uncontrolled charging while the ratio of intelligent (i.e. flexible) charging patterns grows with the ambition level.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level A</div><p>This scenario considers that most of the EVs will be charged in uncontrolled manner not using fully the storage potential of electric vehicles for flexibility purposes.</p></li><li class="lever-info-amibitions"><div> Ambition Level B</div><p>This scenario considers that uncontrolled charging patterns are still dominating the scene but intelligent charging solutions are gaining more opportunity, thus some of the storage potential can be used for flexibility purposes.</p></li><li class="lever-info-amibitions"><div> Ambition Level C</div><p>This scenario considers that intelligent charging options and patterns are penetrating more, thus the storage potential of electric vehicles is better exploited for flexibility purposes.</p></li><li class="lever-info-amibitions"><div> Ambition Level D</div><p>This scenario considers that most of the EVs will be charged in an intelligent manner and thus making the storage potential of EVs available for flexibility purposes. This requires some additional breakthrough or efforts such as important costs reduction for some technologies, very fast and extended deployment of infrastructures, major technological advances, strong societal changes.</p></li></ul>
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
  name: 'lever_str_charging',
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
      let fileName = 'lever_str_chargingChart.vue';

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
