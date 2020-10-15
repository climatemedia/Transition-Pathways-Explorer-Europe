<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Coal phase out</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the phase-out and installation of new coal power plants.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Coal phase out" chartfilename="lever_decom_fossil.js"
      ></component>
      <p>Coal based power generation is responsible for the main part of emissions from the electricity generation sector, thus intention and timing of phase-out is considered decisive for all decarbonisation pathways. 
In 2015 there were 280 coal power stations in the EU with a total of 162.7 GW installed capacity. The coal power stations in 2015 were situated in 22 Member States; the only countries without a coal power station in 2015 were: Cyprus, Estonia, Latvia, Lithuania, Luxembourg and Malta. Since then, also Belgium closed its only coal power plant going coal free. On the other hand, Germany and Poland alone account for nearly half of the EU’s installed capacity (51%) and more than half of yearly emissions (54%) of all coal-fired power plants. Nevertheless, due to ageing and decarbonisation actions, conventional power sources such as fuel oil and coal continued to decommission more capacity than they install. However, the rate of decommissioning is slower than the urgency of climate actions would require, thus phase-out plans are an essential part of decarbonisation. National coal phase-out plans are decisive in the future scenarios of coal based power generation on country level. With setting the levels, the user can choose the future of the base year coal power generation capacities. The impact of the timing of phase-out can be investigated on decarbonisation pathways.
Natural gas and oil based capacities are not affected by the lever, those existing capacities are decommissioned by a fixed trajectory, while natural gas based capacities are added automatically in view of flexibility and balancing needs. No new oil based power generation capacities are planned.</p>
      <p>Two-thirds of the coal power fleet was 30 years old or older in 2015. Comparatively little new capacity was installed during the 1990s and early 2000s but in the last decade, a considerable amount of new capacity has been built in Poland, the Netherlands, Italy and especially Germany. Unless these plants are retired before the end of their lifetime, emissions will be locked in the system longer, than what would be consistent with the EU’s GHG emissions reduction targets. This process can be sped up by implementing the coal phase-out policies which are already present in multiple countries of Europe. The picture varies between Western and Eastern Europe. Western Europe is accelerating its coal exit – climate change and air pollution combined action to specifically phase out coal-fired power generation is impacting coal demand. Along with the expansion of renewables, these policy efforts will eventually push coal out of the Western European power mix. By contrast, most countries in Eastern Europe have not announced phase-out policies and a handful of new coal power plants are under construction in Poland, Greece and in the Balkans. Some countries in Eastern Europe are among the few places in the world where lignite remains the cornerstone of the electricity system.If ambitious and quick coal phase-out trajectories are not combined with fast installation of renewable based electricity generation, then natural gas based capacities will be added automatically in order to meet electricity demand.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Coal power plants are closed only as they reach end of life, and planned new coal power plants in countries enabling coal in the mix are coming online.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Coal power plants are closed, but closure is delayed compared to phase-out policies (or forecasted closures) thus in some countries there are expanded operations up to 2040.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Coal power plants are closed according to phase-out policies (or according to forecasted closures due to market developments) thus in most countries coal phase-out happens by 2030.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Coal power plants are closed prior to phase-out policies (or before the forecasted closures due to market developments) thus in most countries coal phase-out happens by 2025.</p></li></ul>
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
  name: 'lever_decom_fossil',
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
      let fileName = 'lever_decom_fossilChart.vue';

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
