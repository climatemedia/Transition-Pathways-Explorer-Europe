<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Fuel mix </h3>
    </div>
    <div id="lever-info-content">
      <p>The fuel mix lever sets the share of biofuels and efuels in each fuel type (e.g. gasoline, diesel, kerosene, gas, etc.). </p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Fuel mix " chartfilename="lever_fuel-mix.js"
      ></component>
      <p>Every conventional fuel (diesel, gas, gasoline, kerosene, marine fuel oil, …) used for internal combustion engines (ICE) and hybrid vehicles (PHEV) can be replaced by its equivalent biofuel (produced from biomass) or e-fuel (synthetic fuels, produced from hydrogen and carbon monoxide).
This lever sets the proportion of conventional fuel, biofuel and e-fuel for each fuel (e.g. 70% conventional diesel, 20% biodiesel and 10% e-diesel).
</p>
      <p>Biofuels can help decrease the carbon footprint of transport. However, depending on the way they are produced, they can compete with other uses. For example, first generation biofuels based on crops directly compete with food production as the land used to produce crops intended for biofuels cannot be used for growing crops for food production. Hence, the use of biofuel might not always be sustainable.
 E-fuels are an interesting alternative to both conventional fuels and biofuels. Synthetic fuels are generated exclusively with renewable energy and are not technically different from their conventional counterparts (they can even be used in classic cars). However, producing synthetic fuels is currently a costly and non-efficient process, as production requires a lot of energy.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Biofuels represent 7% of total road fuels in 2050, no biofuels for marine and aviation. No e-fuels.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Biofuels represent 38% of total road fuels in 2050, 33% of marine and aviation fuels. E-fuels represent 33% of the remaining fuel demand.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Biofuels represent 69% of total road fuels in 2050, 66% of marine and aviation fuels. E-fuels represent 66% of the remaining fuel demand.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Biofuels represent 100% of total road, marine and aviation fuels in 2050, 66% of marine and aviation fuels. No e-fuels.</p></li></ul>
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
  name: 'lever_fuel-mix',
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
      let fileName = 'lever_fuel-mixChart.vue';

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
