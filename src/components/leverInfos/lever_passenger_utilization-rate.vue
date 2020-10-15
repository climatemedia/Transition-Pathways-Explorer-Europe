<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Car own or hire</h3>
    </div>
    <div id="lever-info-content">
      <p>The passenger car utilization rate lever sets the average number of kilometers travelled by a vehicle every year.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Car own or hire" chartfilename="lever_passenger_utilization-rate.js"
      ></component>
      <p>There are a number of ways to increase car utilization rate such as the transition from individual car ownership to car sharing models. Various factors influence the adoption of car sharing in the population, such as: localization/proximity of shared vehicles; vehicle availability; reservation system; costs of the services; and savings compared to owned vehicle.


















There are a number of ways to increase  car utilization rate such
as  the transition from individual car
ownership to car sharing models. Various factors influence the adoption of car
sharing in the population, such as:

localization/proximity of shared
     vehicles; vehicle
     availability; reservation
     system; costs of the services; and savings compared
     to owned vehicle.

The amount of residential floor space is a very common reference value to
determine the energy use intensity of buildings and the amount of raw materials
needed for its construction. Average per-capita residential floor area across
the EU28 Member states increased from 36 to 45.5 m2 between the years 2000 and
2014. A decrease in the intensity (that is, less floor space per person) would
therefore yield reductions on the total amount of energy requirements for the
heating of buildings. 

Source: https://ec.europa.eu/energy/sites/ener/files/DG_Energy_Infographic_heatingandcolling2016.jpg



</p>
      <p>For this lever, the model is able to translate vehicle-kilometers into number of vehicles. For the same vehicle distance, expressed in vehicle-kilometers, and the same lifetime, expressed in kilometers, a higher utilization rate will therefore be translated into a lower number of vehicles on the road. The vehicle utilization rate is an input of the model, and the interactions with influencing factors are not modelled. It is however useful to keep those factors in mind as they can be the object of specific policies to reach a given utilization rate.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>There is no behavioral change by 2050 in terms of cars ownership, which leads to a status-quo with 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>A moderate increase in car pooling and car sharing by 2050 leads to a 100% increase in car travel, per vehicle, compared to 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Significant changes in terms of car pooling and car sharing, accompanied by an increase in the use of automated vehicles leads to 400% increase in car travel, per vehicle, compared to 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Radical behavioral changes in terms of car ownership and the intensification of car sharing, car pooling and automation leads to a 900% increase by 2050 compared to 2015.</p></li></ul>
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
  name: 'lever_passenger_utilization-rate',
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
      let fileName = 'lever_passenger_utilization-rateChart.vue';

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
