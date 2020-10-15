<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Living space per person</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the amount of residential floor space per person.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Living space per person" chartfilename="lever_floor-intensity.js"
      ></component>
      <p>The amount of residential floor space is a very common reference value to determine the energy use intensity of buildings and the amount of raw materials needed for its construction. Average per-capita residential floor area across the EU28 Member states increased from 36 to 45.5 m2 between the years 2000 and 2014. A decrease in the intensity (that is, less floor space per person) would therefore yield reductions on the total amount of energy requirements for the heating of buildings. Source: https://ec.europa.eu/energy/sites/ener/files/DG_Energy_Infographic_heatingandcolling2016.jpg</p>
      <p>Given that 50% of annual energy consumption in buildings is associated with space heating and cooling, residential floor space per person becomes an important determinant of emissions.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>In level 1 the average residential floor area per- capita increases according to past trend of about 1% a year between 2000 and 2014.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>In level 2 the average residential floor area per capita increases slightly between 2020 and 2050, from 48 m2 to 49.5 m2.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Level 3 is constructed as an intermediate level between level 2 and 4. In this level the residential floor area per capita decreases between 2020 and 2050 from 48 m2 to 43.4 m2.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Level 4 is a transformational level targeting sustainability. Rao and Min (2018) suggest the value of 37 m2/cap (that of China’s average home size in urban areas and similar to that in the EU28 in the year 2000) as the benchmark for decent living in affluent countries. In Korea, an affluent country with living standards on par with rich European countries, the minimum standard for living space is 12 m2 for one person (Rao and Min 2018). Showing that in some geographic contexts a very low floor-space per person is possible, even when the country is affluent.
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
  name: 'lever_floor-intensity',
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
      let fileName = 'lever_floor-intensityChart.vue';

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
