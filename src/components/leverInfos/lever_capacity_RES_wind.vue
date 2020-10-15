<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Wind</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the new on- and off-shore wind power capacities.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Wind" chartfilename="lever_capacity_RES_wind.js"
      ></component>
      <p>In the past years the EU has seen a significant increase in renewable based power generation; this is due to policy incentives such as the European Commission Directive 2009/28/EC or the policy framework for climate and energy in the period from 2020 to 2030 (COM/2014/015 final), as well as the ever decreasing costs and economic maturity of the technologies. This growth is especially significant in the case of wind power generation that has gone from 2.4 GW in 1995 to 154.3 GW in 2016. These trends are expected to continue in the future with renewables becoming more and more competitive.
Wind power already accounts for one third of all new power installations in the EU since 2000. Due to the continuous increase of wind power capacities, with a total net installed of 169 GW in 2017, wind energy was the second largest form of power generation capacity in Europe, fast approaching natural gas installations. Most of the installations were onshore but offshore wind power capacities are growing. This lever addresses on- and off-shore generation together.</p>
      <p>A growing share of weather dependent renewable based power generation, such as wind (and solar) will significantly influence the electricity grid and its operation. This growth will lead to growing intermittency, more flexibility will therefore be needed in the system, changing drastically the grid operation from centralized, as it is now, to a decentralized form. Also greater and more efficient storage capabilities will be required. The storage module calculates the flexibility needs based on the wind and solar based electricity production, as well as electricity consumption patterns. Based on the choices made for other solutions (such as pumped hydro storage and batteries) and electric vehicle charging patterns, the flexibility of the capacity needed will be calculated and added to the electricity system.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Total on- and off-shore wind power capacities follow the current trends thus exceeding 300 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Total on- and off-shore wind power capacities exceed 600 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Total on- and off-shore wind power capacities exceed 1000 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Total on- and off-shore wind power capacities exceed 1400 GW by 2050.</p></li></ul>
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
  name: 'lever_capacity_RES_wind',
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
      let fileName = 'lever_capacity_RES_windChart.vue';

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
