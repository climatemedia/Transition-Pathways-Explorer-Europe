<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Building envelope</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the average heat loss reduced with insulation and affects the energy need per floor area.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Building envelope" chartfilename="lever_building-renovation-rate.js"
      ></component>
      <p>Heating and cooling accounts for around 30% of all buildings’ energy demand. The amount of energy needed to heat or cool buildings can be reduced significantly by improving the insulation of external walls, floors, roofs, ceilings, windows and doors. This means that less heat energy can escape from the inside of the building in cold weather, and less heat energy from outside can get in when cooling is on. </p>
      <p>The annual energy need of a building is affected by internal and external conditions and the nature of the building’s response to these changes, as well as by heat transmission, controlled or uncontrolled ventilation, internal and solar heat gains. All these parameters set out the energy performance of the building envelope and are reflected through the lever, which includes not only changes in wall/roof insulation but also alterations in the quality of windows and doors as well as glass type. A change in the energy performance of the building envelope can be achieved through a renovation improving building components. The average renovation rate in Europe is currently about 1%, which would leave large parts of the buildings stock unchanged until 2050. The most ambitious choice for the Level 4 renovation rate is 3% which would allow some buildings to be improved twice by then. How energy efficient are the renovated buildings considered in three renovation categories: shallow, medium and deep? They reduce the energy need (useful energy demand) of the building by 30%, 40% and 60% respectively. This lever also determines the mix of renovations with respect to this ambition. 
Similarly, new buildings are represented by a spread between new constructed buildings of low, medium and high efficiency. These buildings have an energy need (useful energy) of 70%, 60% and 40% of the average building stock. Please note that the energy need is different from the final energy demand /delivered energy. The latter is determined by the combination of the building envelope and the choice of technology and energy carrier. 
Buildings that have an energy need above zero can still have a final energy demand of zero when combined with suitable technologies, which is possible with the technology and fuels lever. 
The graph exemplifies the energy performance improvement of the building envelopes of the whole building stock, resulting from a combination of renovation rate and a mix of renovation ambitions.
</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>The annual renovation rate is 1%. 80% of the renovations are shallow (-30% energy demand), 15% are medium (-40%) and 5% are deep (-60%). 80% of new constructions have the lowest level of efficiency, 15% are medium efficient and 5%  highly efficient. The demolition rate is 0.1%/annum. </p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>The annual renovation rate is 1.5%. 20% of the renovations are shallow (-30% energy demand), 60% are medium (-40%) and 20% are deep (-60%). 20% of new constructions have the lowest level of efficiency, 60% are medium efficient and 20%  highly efficient. The demolition rate is 0.4%/annum.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>The annual renovation rate is 2.0%. 10% of the renovations are shallow (-30% energy demand), 70% are medium (-40%) and 20% are deep (-60%). 10% of new constructions have the lowest level of efficiency, 70% are medium efficient and 20%  highly efficient. The demolition rate is 0.7%/annum.   
</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>The annual renovation rate is 3.0%. 0% of the renovations are shallow (-30% energy demand), 30% are medium (-40%) and 70% are deep (-60%). 0% of new constructions have the lowest level of efficiency, 30% are medium efficient and 70%  highly efficient. The demolition rate is 1.0%/annum. </p></li></ul>
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
  name: 'lever_building-renovation-rate',
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
      let fileName = 'lever_building-renovation-rateChart.vue';

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
