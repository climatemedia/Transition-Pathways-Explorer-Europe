<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Passenger technology</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets how passenger technology in the transport sector will move from fossil fuels to lower emission vehicles. These include hybrid, electric or hydrogen vehicles and their use for passenger, freight and international transport.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Passenger technology" chartfilename="lever_passenger_technology-share_new.js"
      ></component>
      <p>Transport is one of the major contributors to global emissions, and is still heavily reliant on fossil fuels. For example, in 2011, 99% of passenger cars were powered by fossil fuel based on internal combustion engines. A switch to low emission transportation would cut emissions dramatically. As the lifetime of an average passenger vehicle is around a decade, low carbon vehicles could be introduced over relatively short periods. Electric vehicles and also some types of hydrogen vehicles have existed for many years, but so far their uptake has been small. Recently some countries (for example, Norway) have introduced significant incentive systems to support the uptake of low emission vehicles. In Norway, these allowed to reach a 15% share for zero- and low-emission vehicles in the car fleet in 2019. Car manufacturers are investing in low emission vehicles with a focus on electric and hydrogen. After the big success of hybrid engines (combining a combustion engine and an electric motor for energy recovery), Toyota moved on to hydrogen engines and launched its first purely hydrogen-powered car in 2015. On the forefront of electric vehicles are companies such as Tesla and BMW. The take up of electric and hydrogen vehicles will ultimately depend on technological developments and whether they are seen as affordable and desirable by consumers, public transport providers and freight companies.</p>
      <p>The impact of the “technology” lever will depend on how the electricity or hydrogen used to power these vehicles is generated (this is taken into account in the Calculator). The impact of the lever will also be affected by the level of transport demand in the user’s pathway.
Many supporters of low emission vehicles mention positive side-effects such as less pollution in cities as well as quieter streets. However the uptake of low emission vehicles has so far been hampered by high prices, range anxiety, slow charging, as well as limited infrastructure available to charge vehicles. Recently, manufacturers and energy suppliers have focused on expanding charging infrastructure for low emission vehicles. To enhance take up, a group of leading car manufacturers have recently agreed on a fast charging standard allowing battery charging to 80% within half an hour – this might help to implement a working charging network.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>By 2050, Low Emission Vehicles (Gas, Plug-in Hybrid) represent 6% of new sales and Zero Emission Vehicles (Battery Electric Vehicles and Fuel Cell Electric Vehicles) represent 2% of new sales. </p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>By 2050, Low Emission Vehicles (Gas, Plug-in Hybrid) represent 50% of new sales and Zero Emission Vehicles (Battery Electric Vehicles and Fuel Cell Electric Vehicles) represent 20% of new sales. </p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>By 2050, Low Emission Vehicles (Gas, Plug-in Hybrid) represent 27% of new sales and Zero Emission Vehicles (Battery Electric Vehicles and Fuel Cell Electric Vehicles) represent 73% of new sales. </p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>By 2050, Zero Emission Vehicles (Battery Electric Vehicles and Fuel Cell Electric Vehicles) represent 100% of new sales.</p></li></ul>
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
  name: 'lever_passenger_technology-share_new',
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
      let fileName = 'lever_passenger_technology-share_newChart.vue';

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
