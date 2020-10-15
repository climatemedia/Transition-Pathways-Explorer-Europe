<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Mode of transport</h3>
    </div>
    <div id="lever-info-content">
      <p>The transport mode lever sets the mode by which passenger transport is undertaken (walking, cycling, motorbike, car, bus, train, aeroplane and boat).</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Mode of transport" chartfilename="lever_passenger_modal-share.js"
      ></component>
      <p>The mode by which people travel has a big impact on energy use and emissions. For passenger travel, the proportion of car use in the mix is particularly important, as fossil-fuel powered cars have high emissions per person compared to public transport. Historically, car use increases as countries develop and cars become more affordable.</p>
      <p>Although growth in car ownership has long been associated with increasing prosperity, a shift to public transport, walking or cycling does not necessarily mean less convenience for passengers and a lower quality of life. If cities are carefully planned with integrated transport systems, journeys may be quicker by public transport. Quality of life can be improved by spending less time stuck on congested roads.
However, the development of public transport infrastructure and urban planning usually requires significant public investment, whereas the growth of car use involves the spending of mostly private money. This means that considerable political and civic effort must be made to produce the shift in transport mode seen in levels 3 and 4.
When choosing the lever setting for “mode”, users should also consider their choices for “passenger distance”. For example, if passenger and freight distance are set at level 1 (very high growth), then setting mode at level 4 may be unrealistic because it tends to be more difficult to travel long distances by walking, cycling or public transport.
The user’s choice in the transport mode lever also affects the impact of the “electric and hydrogen” and “transport efficiency” levers – lowering the average emission factor of a car will make more of a difference if there are many cars.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Car use continues to grow. No effort to reduce urban sprawl, or to invest in rail and public transport infrastructure. This leads to a quasi statu-quo in 2050 compared to 2015 levels.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Some effort in improving logistics and rail infrastructure with cities making an effort to enable the shift from cars to walking, cycling and public transport.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Cities make a substantial effort to stem the shift from cars and create incentives for walking, cycling and public transport.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Cities make extreme efforts to shift people away from the use of private fossil fuelled cars as well as reduce travel demand. This level represents major efforts in the development of rail infrastructure and logistics.</p></li></ul>
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
  name: 'lever_passenger_modal-share',
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
      let fileName = 'lever_passenger_modal-shareChart.vue';

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
