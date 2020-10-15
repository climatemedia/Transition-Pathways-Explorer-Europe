<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Freight mode</h3>
    </div>
    <div id="lever-info-content">
      <p>The transport mode lever sets the proportion of freight transport made by road, rail, sea and air.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Freight mode" chartfilename="lever_freight_modal-share.js"
      ></component>
      <p>The mode by which freight travels has a big impact on energy use and emissions. The proportion of trucks in the mix is particularly important, as trucks have high emissions per tonne-km compared to rail or sea. For freight, rail has a lower emissions factor per tonne-km, but will require a large infrastructure investment globally if it is to maintain its current share.</p>
      <p>When choosing the lever setting for “mode”, users should also consider their choices for “freight distance”. For example, if d freight distance is set at level 1 (very high growth), then setting the “mode” lever at level 4, with larger shares for rail and internal waterways, may be unrealistic in terms of the absolute demand (in tonne-km) for these softer transportation modes (e.g. limited capacity of European internal waterways). 
The user’s choice in the transport mode lever also affects the impact of the “electric and hydrogen” and “transport efficiency” levers – lowering the average emission factor of a truck will make more of a difference if there is a large truck fleet.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The modal shares in 2050 will be: 49% for trucks, 13% for rail, 4% for inland shipping, 34% for maritime shipping and 0.1% for aviation. </p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The modal shares in 2050 will be: 45% for trucks, 17% for rail, 4% for inland shipping, 34% for maritime shipping.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The modal shares in 2050 will be: 41% for trucks, 21% for rail, 4% for inland shipping, 34% for maritime shipping and 0.1% for aviation.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The modal shares in 2050 will be: 35% for trucks, 24% for rail, 7% for inland shipping, 34% for maritime shipping and 0.1% for aviation. </p></li></ul>
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
  name: 'lever_freight_modal-share',
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
      let fileName = 'lever_freight_modal-shareChart.vue';

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
