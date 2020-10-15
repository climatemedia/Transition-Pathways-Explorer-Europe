<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Solar</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets Photovoltaic (PV) and Concentrated Solar Power (CSP) capacities.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Solar" chartfilename="lever_capacity_RES_solar.js"
      ></component>
      <p>In the past years the EU has seen a significant increase in renewable based power generation;  this is due to policy incentives as well as the ever decreasing costs and economic maturity of the technologies. This growth is especially significant in the case of solar power (photovoltaics, PV) which has gone from 0.05 GW in 1995 to 103.1 GW in 2016. These trends are expected to continue in the future with renewables such as PV becoming more and more competitive due to constant development and volumes of production.
Solar power generation can be a cornerstone of a decarbonized electricity system in many EU countries. Through the lever setting the user can choose the amount of solar power generation in the electricity production mix influencing the production and emissions of the sector. PV has seen an incremental growth exceeding in 2014, the 2020 National Renewable Energy Action Plan target of 83.7 GW. The distribution of installed capacities is however very uneven between the Member States. Only two countries, Germany and Italy installed more than half of the total European PV power plant stock, followed by the UK and France.
CSP technology is present with low capacities in Europe, in 2015 installed CSP capacity was of 2.3 GW with the bulk of these coming from Spain, a few pilots in Italy (7.5 MW), France (0.75 MW) and Germany (1.5 MW).</p>
      <p>A growing share of weather dependent renewable based power generation, such as wind (and solar) will significantly influence the electricity grid and its operation. With the growing intermittency, more flexibility will be needed in the system, changing drastically the grid operation from centralized, as it is now, to a decentralized form. Also greater and more efficient storage capabilities will be required. The storage module calculates the flexibility needs based on the wind and solar based electricity production, as well as electricity consumption patterns. Based on the choices made for other solutions (such as pumped hydro storage and batteries) and electric vehicle charging patterns, the flexibility of the capacity needed will be calculated and added to the electricity system.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Total PV and CSP capacities follow current trends thus exceeding 200 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Total PV and CSP capacities are getting close to 400 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Total PV and CSP capacities exceed 500 GW by 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Total PV and CSP capacities are getting close to 700 GW by 2050.</p></li></ul>
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
  name: 'lever_capacity_RES_solar',
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
      let fileName = 'lever_capacity_RES_solarChart.vue';

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
