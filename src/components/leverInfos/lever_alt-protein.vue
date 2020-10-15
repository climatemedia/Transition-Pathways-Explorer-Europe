<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Alternative protein source</h3>
    </div>
    <div id="lever-info-content">
      <p>The lever sets the share of insect and microalgae-based meals for each livestock type, and disable/enable byproduct feedstock for other markets.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Alternative protein source" chartfilename="lever_alt-protein.js"
      ></component>
      <p>Livestock is consuming more than 60% of the crop production in Europe, which affects land demand, both inside and outside the EU. Indeed, the cake (livestock feed) demand is to a large extent supplied through import, possibly leading to deforestation, biodiversity erosion and CO2 emissions. Insect farming and algae-based meals are promising options to produce a large amount of feedstuff and byproducts while using limited amount of lands.</p>
      <p>The ‘alternative protein source’ lever sets the use of alternative feedstuff for livestock including insect and algae-based meals. The lever considers the animal health and food output quality to set the maximum alternative feed intake for each livestock. The lever also unlocks the potential for bioenergy (e.g. microalgae oil) and organic-based fertilizer (i.e. insect manure).</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The deployment of insect and microalgae-based meals does not occur, animal feed compounds remain the same as in 2015.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The deployment of insect and microalgae meals occur in a modest extent. Microalgae meals reach up to 1, 3, 5 and 10% for poultry, ruminants, pigs and in aquaculture respectively. The deployment of insect and microalgae meals occur in a modest extent. Insect meals reach up 10% for poultry, pigs and in aquaculture.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The deployment of insect and microalgae meals occur in a large extent. Microalgae meals reach up to 3, 5, 15 and 20% for poultry, ruminants, pigs and in aquaculture respectively. Insect meals reach up to 20% of the typical ration for poultry, pigs and in aquaculture. Consequently, spare lands are significant, and through land management, new prairies, reforestation and afforestation can occur. Microalgae and insect biomass byproducts enable large production of bioenergy, organic manure and waste valorisation (through insect farming).</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The deployment of insect and microalgae meals occur in a large extent. Microalgae meals reach up to 5, 10, 25 and 30% for poultry, ruminants, pigs and in aquaculture respectively. Insect meals reach up to 30%, 33% and 40% of the typical ration of poultry, pigs and in aquaculture respectively. Consequently, spare lands are significant, and through land management, new prairies, reforestation and afforestation can occur. Microalgae and insect biomass byproducts enable large production of bioenergy, organic manure and waste valorisation (through insect farming).</p></li></ul>
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
  name: 'lever_alt-protein',
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
      let fileName = 'lever_alt-proteinChart.vue';

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
