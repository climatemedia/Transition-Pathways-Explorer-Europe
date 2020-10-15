<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Freight distance</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the total demand for freight transport (in tonne-km).</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Freight distance" chartfilename="lever_freight_tkm.js"
      ></component>
      <p>Historically, the demand for freight transport is strongly related to the economy (GDP). A higher GDP implies a higher level of production and consumption, which in turn translates into a higher demand for transporting the produced goods. Low-carbon scenarios that lean towards a local circular economy, based on sharing and where mobility is seen as service, could however decouple freight activity from GDP. In 2015, the energy demand for freight only represents a third of the energy consumption related to passenger transport in Europe. The proportion is similar for GHG emissions as well. However, as freight transportation modes are harder to decarbonize than passenger transportation modes (e.g. trucks vs. cars), the share of freight related GHG emissions in total transport GHG emissions is likely to increase.</p>
      <p>This lever is completely independent from other factors in the model: there is no link with GDP and circular economy is not modelled. Hence, the user is free to reflect these factors in the lever settings chosen, e.g. by considering that a strong development of circular economy will lead to a lower freight demand. </p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>By 2050, there is a 49% increase in freight demand.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>By 2050, there is a 22% increase in freight demand. </p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The freight demand does not vary between 2015 and 2050.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>By 2050, there is a 22% decrease in freight demand.</p></li></ul>
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
  name: 'lever_freight_tkm',
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
      let fileName = 'lever_freight_tkmChart.vue';

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
