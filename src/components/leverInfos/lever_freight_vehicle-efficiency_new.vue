<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Freight efficiency</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the efficiency of freight vehicles and controls efficiency improvements for all vehicle types (both fossil fuel-powered and low-carbon). </p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Freight efficiency" chartfilename="lever_freight_vehicle-efficiency_new.js"
      ></component>
      <p>This lever applies to all vehicles, and links with other choices made, especially in terms of technology, occupancy and load. There are several ways to enhance vehicle efficiency, such as improving the engine or aerodynamic performance of vehicles, using lighter materials to reduce the ratio weight per person, using less carbon intensive fuel or changes in driving behaviour (for example, braking less or travelling at lower speeds).</p>
      <p>For freight transport, in 2011 light-duty vehicles had an efficiency of 10 litres gasoline equivalent (lge) per 100 km and heavy-duty vehicle efficiency was 32 lge per 100 km. The average global rate of improvement is 1-2% per year. International shipping is more efficient in fossil fuel use and is also compatible with biofuels. Recently, in 2018, the EC drafted the first ever truck CO2 emission standards that plans to reduce truck-related emissions by improving efficiency and increase the share of zero-emission vehicles in the truck fleet.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>By 2050, trucks energy consumption (MJ/tkm) decreases by 10%, rail energy consumption by 10%, aviation and shipping energy consumption by 5%. </p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>By 2050, trucks energy consumption (MJ/tkm) decreases by 17%, rail energy consumption by 13%, aviation energy consumption by 7% and shipping energy consumption by 13%. </p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>By 2050, trucks energy consumption (MJ/tkm) decreases by 33%, rail energy consumption by 27%, aviation energy consumption by 15% and shipping energy consumption by 30%. </p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>By 2050, trucks energy consumption (MJ/tkm) decreases by 50%, rail energy consumption by 40%, aviation energy consumption by 22% and shipping energy consumption by 40%. </p></li></ul>
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
  name: 'lever_freight_vehicle-efficiency_new',
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
      let fileName = 'lever_freight_vehicle-efficiency_newChart.vue';

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
