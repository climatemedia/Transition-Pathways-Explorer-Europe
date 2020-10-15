<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Material efficiency</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets material efficiency. It controls decrease in material demand due to activities such as smart design, use of more efficient materials and smart manufacturing.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Material efficiency" chartfilename="lever_material-efficiency.js"
      ></component>
      <p>Material efficiency could reduce industrial emissions by 56 Mt in steel, plastics, aluminium and cement production. This can be achieved by a number of strategies such as reducing the waste of materials in the manufacturing and construction processes (currently about 15% of buildings materials are wasted in construction according to Material Economics (2018)), reducing over-specification (for example, an estimate of 50% of the steel used in buildings is in excess to what is strictly necessary to meet structural needs), or by using more advanced materials. For example, the use of high-strength steel could enable carmakers to reduce vehicle weight by 25-39% compared to conventional steel (World Steel Association, 2016).</p>
      <p>The lower consumption of fuel of lighter vehicles (due for example to the substitution of steel with high strength steel) was considered in the model. The lower fuel consumption of lighter vehicles can be modelled with a scenario, in which both the material switch lever of the Manufacturing module and the vehicle consumption lever of the Transport module are set to their maximum ambition level.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The improvement rate of material efficiency ranges between 2 and 8%. This can be achieved through high-strength steel, the re-use of steel components, modular design of buildings, 3D printing and digitalisation in construction, smart design to achieve lightweight materials (plastics, aluminium), use of less dense paper, or an increase in recycled material. Note that Material efficiency can be increased by approximately 3.8%, according to business as usual.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The improvement rate of the different industry sectors ranges between 4% (ammonia) and 16% (steel), leading to a 22% reduction in CO2 emissions.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The improvement rate of the different industry sectors ranges between 7% (ammonia) and 25% (steel), leading to a 27% reduction in CO2 emissions.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The improvement rate in the most ambitious setting ranges between 10 and 33% due to smart product and material design, re-use of materials and circularity concepts of additive manufacturing, leading to a 31% reduction in CO2 emissions.</p></li></ul>
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
  name: 'lever_material-efficiency',
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
      let fileName = 'lever_material-efficiencyChart.vue';

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
