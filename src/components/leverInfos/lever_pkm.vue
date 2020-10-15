<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Passenger distance</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the total average distance people will travel in one year. It includes travel distance by land, water and air.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Passenger distance" chartfilename="lever_pkm.js"
      ></component>
      <p>The transport sector represented circa 33% of primary energy needs in Europe in 2015 and contributed 25.8% of total EU-28 greenhouse gas emissions. Without the implementation of extensive and sustained mitigation, transport emissions could increase at a faster rate than emissions from the other energy end-use sectors. The transport sector is recognized as particularly difficult to decarbonize given the investment costs needed to build low-emissions transport systems or the slow turnover of stock and infrastructure. Accordingly, a shift towards demand-side solutions for mitigating climate change is now gaining traction.</p>
      <p>The demand for passenger travel is controlled by the amount of time a person spends traveling and the average speed of transportation systems. There are three major activities that compose most of the time spent travelling; to go to work/study (depending on the age class), for recreation and social activities, and to access services like shopping or medical care. Growth in wealth is usually related to more time spent on travelling for leisure and social activities. The best opportunities to reduce travel demand therefore emerge by lowering the need to travel for work/study purposes (e.g. via teleworking or home-based work) and to access services (e.g. via automation or tele-medicine).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Growth in travel distance per person continues to follow current trend mostly due to longer travel time dedicated to leisure activities, with time spent to go to work/study and access services also remaining unchanged.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The growth in travel distance is conditioned by a 10% reduction in travel spent for traveling to work/study and to access services. Travel time spent for leisure activities continues to grow.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The growth in travel distance is conditioned by a 25% reduction in travel spent for traveling to work/study and a drop in 20% in time needed for accessing services. Travel time spent for leisure activities continues to grow.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Passenger distance travelled is conditioned by a 50% reduction of the time spent for travelling to work/study through the full exploitation of tele-work/study. Travel time for access to services is cut by 40% exploiting the full potential of digitalization and automation. The rise in travel time spent for leisure activities is curtailed the 20%.</p></li></ul>
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
  name: 'lever_pkm',
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
      let fileName = 'lever_pkmChart.vue';

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
