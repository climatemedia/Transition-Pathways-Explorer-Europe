<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Nuclear</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the phase-out and new capacities of nuclear power plants.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Nuclear" chartfilename="lever_capacity_nuclear.js"
      ></component>
      <p>Nuclear power plants using the process of nuclear fission, are a controversial source of electricity, as the large scale decarbonisation potential is coupled with concerns of operational safety and waste management. According to the World Nuclear Industry Status Report, in 2015 128 reactors were in operation in the EU, of which almost half (58) were in France. In total, these 128 reactors have a capacity of 119.7 GW generating roughly a quarter of the electricity production in the EU. Nuclear power generation can significantly contribute to decarbonisation, offering emission free baseload power. However, due to different concerns, some countries have decided not to use it or to phase-out existing capacities. Through the settings, the user can choose the future of the base year nuclear generation capacities depending on the policy of the country. The impact of timing on phase-out and expansion can be investigated on pathways. Regardless of the nuclear policies of countries, level 1 equals to the lowest capacity or the quickest phase-out/slowest expansion, while level 4 pushes for the highest amount of nuclear as soon as possible.</p>
      <p>Due to ageing and phase-out policies, nuclear power generation is foreseen to decrease further in the EU, however, policies and plans vary between Member States. The number of reactors in operation has been decreasing since 1989 in the EU, whereas the vast majority of the facilities, 109 units or 85%, are located in eight of the western countries, and only 19 are in the six newer member states using nuclear power.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Nuclear is either phased out in countries or not maintained, i.e. closed plants are not replaced by new ones.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Delayed nuclear phase-out and in those countries where new nuclear power plants are planned, destined to replace old capacities, these are delayed or even cancelled.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Delayed nuclear phase-out and in those countries where new nuclear power plants are planned to replace old capacities, these are delayed.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>10+ years delayed nuclear phase-out and, in those countries where new nuclear power plants are planned, these are started in time, which in case of some countries even allows expansion of nuclear capacities.</p></li></ul>
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
  name: 'lever_capacity_nuclear',
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
      let fileName = 'lever_capacity_nuclearChart.vue';

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
