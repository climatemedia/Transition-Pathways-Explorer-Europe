<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Occupancy</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the occupancy of passenger vehicles, i.e., the number of people in the average car and bus.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Occupancy" chartfilename="lever_passenger_occupancy.js"
      ></component>
      <p>While most cars have more than two seats, their occupancy tends to be less than 2 people. Similarly, many freight transport vehicles are not loaded to their full capacity.
Historically, freight transport load factors have increased due to improved logistics and distribution systems. In contrast, car occupancy has decreased. An explanation might be the increasing global wealth allowing for more car ownership as well as the greater diversity of activities and destinations available to people. People who may have originally travelled as a group or used public transport, now go with their own cars.
However, as awareness grows and congestion and parking costs increase in some urban areas, the use of car-pooling and car sharing may become a more appealing prospect in the future.</p>
      <p>Increasing efforts on “occupancy” “occupancy and load” while at the same time addressing “passenger distance”, “freight distance” and “mode”, can considerably reduce transport energy demand and the number of vehicles required.
Car sharing could be boosted in a number of different ways. Technological developments (such as smart phone apps) make it easier for people to coordinate ride-shares. Other initiatives can also be effective. Los Angeles, for instance, has lanes exclusively for high occupancy vehicles. In Italy, municipalities, in the presence of high levels of pollution have resorted to restrict access to the city center on certain days, based on car registration, forcing people to carpool more or switch to public transport.
Technological developments could also help increase freight load. For example, applications are available that ensure that a freight vehicle is as heavily loaded as possible during its journey.
</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Under this scenario, people continue to prefer single-occupancy driving, public transport occupancy levels are relatively low. There is a status-quo with today’s observed occupancy (1.6 passenger/car in Europe in 2015).</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Car-pooling becomes more common than today and the car occupancy increases by 25% in 2050 in comparison with 2015 level.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Vehicle occupancy increases, also driven by technology which makes car-pooling easier and which enables a more efficient planning process for public transport logistics. Car occupancy increases by 44%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Regulatory constraints, costs, and smarter digital applications to coordinate our car demand and use makes car-pooling more attractive. In 2050 car occupancy is 62% higher than today and the average occupancy for other transport is also higher. 
</p></li></ul>
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
  name: 'lever_passenger_occupancy',
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
      let fileName = 'lever_passenger_occupancyChart.vue';

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
