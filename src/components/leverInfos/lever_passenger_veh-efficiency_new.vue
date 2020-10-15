<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Passenger efficiency</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the efficiency of passenger vehicles. It controls efficiency improvements for all vehicle types (both fossil fuel-powered and low-carbon).</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Passenger efficiency" chartfilename="lever_passenger_veh-efficiency_new.js"
      ></component>
      <p>Recently there has been a strong focus on improving the fuel efficiency of cars - for example, the fleet consumption of Daimler fell by about 50% between 1990 and 2012 to around 6.5 litres per 100 km. This was achieved by technology improvements (cylinder capacity and turbo charging) and regulatory efforts such as lower-limits for fleet efficiencies.
Given the big progress achieved in the past few years it is hard to envisage big improvements in the near future for fossil-fuel-powered car engines. However, car efficiency could be improved by decreasing the average car weight so that less fuel is needed. Policy approaches might be able to increase average transport efficiency by setting more severe speed limits for cars which would run more efficiently at lower speeds.
The efficiency of planes has also improved over the last decades. The jumbo jet A380 is 12% more efficient than a Boeing 747, but it is hard to predict if significant improvements can be expected in the near future. Replacing fossil fuel with alternative fuel sources such as hydrogen might not help to reduce the climate impact of flying as water vapour acts as a strong greenhouse gas. When directly emitted in the stratosphere, water vapour can persist for months and years and might also degrade the ozone layer.
Significant research efforts are going into low-emission vehicles, meaning that efficiency improvements are also likely for hydrogen-powered and electric vehicles.
</p>
      <p>This lever applies to all vehicles, and links with other choices made, especially “electric and hydrogen” and “occupancy and load”. There are several ways to enhance vehicle efficiency, such as improving the engine or aerodynamic performance of vehicles, using lighter materials to reduce the ratio weight per person, or changes in driving behaviour (for example, braking less or travelling at lower speeds).
For passenger transport, public transport ( electric trains, trams and buses) is about 5 to 10 times more energy-efficient than other forms of transport (e.g. cars and planes).
For freight transport, in 2011 light-duty vehicles had an efficiency of 10 litres gasoline equivalent (lge) per 100 km and heavy-duty vehicle efficiency was 32 lge per 100 km. The average global rate of improvement is of 1-2% per year. International shipping is more efficient in fossil fuel use and is also compatible with biofuels, whereas nuclear reactor driven ships have cargo transport cost as low as 0.14 kWh per tonne and km and can travel 500,000 km without refueling.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>By 2050, cars energy consumption (MJ/tkm) decreases by 20%, bus energy consumption by 15%, rail energy consumption by 10%, aviation energy consumption by 5%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>By 2050, cars energy consumption (MJ/tkm) decreases by 27%, bus energy consumption by 20%, rail energy consumption by 25%, aviation energy consumption by 11%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>By 2050, cars energy consumption (MJ/tkm) decreases by 35%, bus energy consumption by 25%, rail energy consumption by 40%, aviation energy consumption by 22%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>By 2050, cars energy consumption (MJ/tkm) decreases by 50%, bus energy consumption by 30%, rail energy consumption by 45%, aviation energy consumption by 30%.</p></li></ul>
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
  name: 'lever_passenger_veh-efficiency_new',
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
      let fileName = 'lever_passenger_veh-efficiency_newChart.vue';

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
