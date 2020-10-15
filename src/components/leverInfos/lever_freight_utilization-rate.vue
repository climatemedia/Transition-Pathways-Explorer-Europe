<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Freight utilization rate</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the load factor for trucks, which is the weight of goods carried by each type of truck and sets the average number of kilometers travelled by a truck every year. </p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Freight utilization rate" chartfilename="lever_freight_utilization-rate.js"
      ></component>
      <p>Historically, freight transport load factors have increased due to improved logistics and distribution systems. As for the passenger transport, automation is expected to have a strong impact on the utilization of trucks.</p>
      <p>Technological developments have also helped increase freight load, for example through applications and software, that ensure that a freight vehicle is as heavily loaded as possible during its journey.
For given settings of “freight distance” and “mode”, increasing the “load factor” will reduce transport energy demand and the number of vehicles required. Freight Load factor is expressed in tonne-km/vehicle-km. Then, through this lever, vehicle-kilometers are translated into number of vehicles. For the same vehicle distance, expressed in vehicle-kilometers, and the same lifetime, expressed in kilometers, a higher utilization rate will therefore be translated into a lower number of vehicles (that will however have to be replaced more often).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Status quo with 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Trucks have a 5% higher load in 2050 with respect to 2015 and trucks will run 3% more km per year than in 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Trucks have a 10% higher load in 2050 with respect to 2015 and trucks will run 7% more km per year than in 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Trucks have a 15% higher load in 2050 with respect to 2015 and trucks will run 10% more km per year than in 2015.</p></li></ul>
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
  name: 'lever_freight_utilization-rate',
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
      let fileName = 'lever_freight_utilization-rateChart.vue';

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
