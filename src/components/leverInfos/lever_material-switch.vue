<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Material switch</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the percentage of materials substituted by other, more sustainable materials in products.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Material switch" chartfilename="lever_material-switch.js"
      ></component>
      <p>The material switches analysed focus on the building and transport sectors. In the building sector the main substitutions are the replacement of concrete and steel with timber in buildings and the replacement of chemicals with cellulose and natural fibres in thermal insulation materials of renovated buildings. In the transport sector, the main foreseen switch is the replacement of steel with lighter materials such as aluminium or carbon-fibre reinforced plastics in vehicles.
When cooling and heating requirements are comparable, wood-based constructions contain lower embodied CO2 emissions than steel-, concrete-, and brick-based constructions according to a study by Sathre and O’Conner (2010).
In vehicles, aluminium provides weight reduction compared with steel and at the same time, it does not have the high costs of the more advanced materials (e.g. carbon-fibre reinforced plastics) according to Modaresi et al. (2014). Potentially, most car hoods, half of all door materials, part of trunks, roofs and fenders could be made of aluminium.</p>
      <p>A common concern for timber substitution is the shorter life span of timber compared with the longer-lasting concrete. Treatments such as coating, impregnation, and chemical/mechanical modification could extend wooden building lifetime. Several studies (e.g. Sathre and O’Connor, 2010; Werner et al., 2005; Upton et al., 2008; Gustavsson and Sathre, 2011; John et al., 2009) point out the importance of the switch to timber by comparing the embodied emissions of wood with other construction materials.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Business as usual, no material switches or substitution of materials occur.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Material switches range from 3% (substitution of conventional wall insulation with cellulose) up to 20% (substitution of concrete with timber in buildings).</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Material switches range from 7% (substitution of conventional wall insulation with cellulose) up to 40% (substitution of concrete with timber in buildings). In transport lightweight aluminium replaces steel and other components, in buildings natural fibres replace fossil-based chemicals, timber substitutes cement.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Material switches range from 10% (substitution of conventional wall insulation with cellulose) up to 60% (substitution of concrete with timber in buildings). In transport lightweight aluminium replaces steels and other components, in buildings natural fibres replace fossil-based chemicals, timber substitutes cement.</p></li></ul>
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
  name: 'lever_material-switch',
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
      let fileName = 'lever_material-switchChart.vue';

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
