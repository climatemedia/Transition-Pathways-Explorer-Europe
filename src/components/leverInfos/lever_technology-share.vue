<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Technology efficiency</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the percentage of manufacturing materials produced with low-carbon technologies. It also accounts for the amount of recycled material used in the production process.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Technology efficiency" chartfilename="lever_technology-share.js"
      ></component>
      <p>The manufacturing of materials can be done by different technologies. This lever describes the share of each technology used to produce the materials needed and the amount of recycled material used in the production process.
As an example, steel in Europe is currently produced either by the primary route "BF-BOF" (blast furnace - basic oxygen furnace) or by the recycling route "scrap-EAF" (electric arc furnaces), which has a much lower energy consumption (80% less). The share of scrap-EAF has increased from 20% in the 1970s to around 40% recently and is expected to continue to increase in the future due to a larger availability of scrap. Further innovative technologies for steel making are the hydrogen-DRI (direct reduction) and the HIsarna process, which would allow at least a 20% decrease in energy use and emissions.</p>
      <p>In general terms the prospective shift in the use of recycled material is conditioned by scrap availability and quality. A quite conservative scenario estimates that the recycling route for steel will reach a share of up to 44% in Europe by 2050.
The share of secondary aluminium produced in Europe has increased since 1995 and currently accounts for more than half of aluminium production. An increase in growth is unlikely to be achieved due to the already high recycling rates and the reliance on a scrap stream from end-of-life products. The share of aluminium recycling route is estimated to reach 55% in Europe in 2050.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Business as usual, no major changes in technology share.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>In energy-intensive industries, like the iron and steel as well as the chemical industry, a slight shift from energy-intensive production technologies to emerging, low-carbon technologies can be observed. For example in the steel sector, the secondary route (scrap EAF) gains more share, geopolymer cement production enters the market.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>In energy-intensive industries a more rapid shift from energy-intensive production technologies to emerging, low-carbon technologies is observed. For example in the steel sector, the secondary route (scrap EAF), HIsarna and Hydrogen DRI gain shares (65% in total), geopolymer cement production becomes significantly more important (10%).</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>In energy-intensive industries, an ambitious shift towards emerging, low-carbon technologies is observed. In the steel sector, the secondary route (scrap EAF), HIsarna and Hydrogen DRI are responsible for 90% of total production, low carbon cement makes up almost 20% of total production, and the share of recycled paper reaches 90%.</p></li></ul>
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
  name: 'lever_technology-share',
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
      let fileName = 'lever_technology-shareChart.vue';

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
