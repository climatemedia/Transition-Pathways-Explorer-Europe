<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Carbon Capture in manufacturing</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the percentage of CO2 equivalent carbon emissions captured within the manufacturing industry.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Carbon Capture in manufacturing" chartfilename="lever_cc.js"
      ></component>
      <p>Carbon capture is a process whereby the CO2 stream is captured from the off-gases. The carbon emissions can be either stored in a geological site (CCS - carbon capture and storage) or used (CCU - carbon capture and use). In the case of CCU the emissions can be used either directly (e.g. in the food industry), as feedstock for the chemical industry, or to produce synthetic fuels.
In 2015 no commercially viable carbon capture technology options are in place. While more than 20 small-scale demonstration CCS projects are operating globally, none of these are in the EU. Major research and development efforts are still required, as well as high investments.</p>
      <p>Both CCS and CCU present issues, that could limit their possible future deployment. CCS can only be implemented in regions with adequate carbon-storage locations (e.g. isolated deep saline aquifers, oil or gas fields already depleted). The process of capturing and transporting CO2 is highly energy-intensive. This results in high operating costs, on top of huge initial investment costs. Both CCS and CCU require a regulatory framework and supportive public opinion before they can be developed. Should these issues be resolved, carbon capture could play an important role in delivering the deep emissions reductions needed across key industrial processes such as steel, cement and chemicals manufacturing.
Over the last two decades, a range of policy and regulatory measures have been adopted by governments in an attempt to facilitate and incentivise CC deployment - in some jurisdictions, on the other hand existing laws prohibit the use of CC.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>No commercially viable carbon capture technology option in place by 2050. Major research and development efforts are still required, as well as high investments.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>In energy-intensive sectors (such as cement) up to 20% of carbon can be captured, to some extent also in the iron and steel sector (5% for BF-BOF; 15% HIsarna ironmaking process), chemicals as well as lime sector (10% each).</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>In energy-intensive sectors up to 40% (cement) of carbon can be captured, to some significant extent in the iron and steel sector (20% for blast furnace - basic oxygen furnace (BF-BOF); 30% HIsarna ironmaking process), chemicals (20%) as well as lime sector (30%).</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>In the lime sector up to 70% of carbon can be captured, eliminating all process emissions. In other energy-intensive sectors significant reductions such as in the iron and steel sector (40% for blast furnace - basic oxygen furnace (BF-BOF); 20% in scrap EAF (electric arc furnace); 50% HIsarna ironmaking process), chemicals (45%) as well as in the cement sector (65%) are expected to be commercially available and implemented.</p></li></ul>
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
  name: 'lever_cc',
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
      let fileName = 'lever_ccChart.vue';

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
