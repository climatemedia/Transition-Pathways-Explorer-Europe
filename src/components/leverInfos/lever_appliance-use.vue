<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Appliance use</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets the amount of hours an appliance (washing machines, dishwashers, dryers, fridges, freezers, computers, TV’s and phones) is used in households.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Appliance use" chartfilename="lever_appliance-use.js"
      ></component>
      <p>Between 2002 and 2010, TV viewing decreased slightly in most of European countries (exceptions are Greece and The Netherlands). The decrease was more than offset by a sharp increase in computer use which was consistent across all countries (Bucksch et al., 2016).</p>
      <p>In combination with the lever setting the number of appliances owned, this lever will allow the user to evaluate the energy implications of the use of appliances.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>In line with current trends, level 1 assumes a drop of 30% in viewing time for TVs by 2050 and a rise in the time spent in front of a computer by 50% to 2 hours per day, also reflecting the empirical trend in Bucksch et al., 2016. For dishwashers, dryers and washing machines, countries increase in 10% their appliance use from the levels observed in 2015. Fridges and freezers maintain a 24h operation.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Level 2 assumes a drop by 44% of TV viewing time and a 20% rise in computer use by 2050. The use of dishwashers, dryers and washing machines is decreased by 10% compared to 2015, namely 0.9, 0.4, 0.4. Fridges and freezers maintain a 24h operation.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Level 3 assumes a drop by 50% of TV viewing time and a 10% rise in computer use by 2050. For the use of dishwashers, dryers and washing machines, this level assumes the operation time found in Scandinavian countries and taken from the Pan-European Consumer Survey PECS (2014), namely 0.7, 0.3 and 0.3 hour per day. Fridges and freezers maintain a 24h operation.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Level 4, in line with the WHO health recommendations (World Health Organization, 2019), sets computer and TV use in households at 1h of use per day for each. For the use of dishwashers, dryers and washing machines, the values in level 3 are further reduced by 20%. Fridges and freezers maintain a 24h operation.</p></li></ul>
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
  name: 'lever_appliance-use',
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
      let fileName = 'lever_appliance-useChart.vue';

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
