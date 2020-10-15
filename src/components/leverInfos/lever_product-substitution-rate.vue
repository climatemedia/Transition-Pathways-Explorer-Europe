<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Appliance retirement timing</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever sets product substitution rate, the amount of time a consumer wishes to shorten/extend the use of appliances owned beyond their expected lifetime. The appliances considered in households are dryers, washing machines, dishwashers, televisions and computers. Mobile phones are considered on an per/capita level.</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Appliance retirement timing" chartfilename="lever_product-substitution-rate.js"
      ></component>
      <p>In the Netherlands, a study of flows in electrical and electronic equipment (Huisman et al., 2012), concluded that basically all appliances investigated showed decreasing residence times for equipment put in the marked in 2000 versus that introduced in 2010. The residence time of IT equipment reduced by 10% while washing machines and dishwashers 7%.
</p>
      <p>Traditionally, much more attention has been placed on the amount of energy used by a product rather than the amount of energy it took to produce it. But not all appliances are created equal. White appliances, including refrigerators, washing machines and dishwashers, require a significant amount of energy to produce but their overall (full life cycle) energy expenditure takes place during operation. Manufacturing of white appliances accounts for only up to 12% of the total lifetime energy use (Gonzalez et al., 2012). On the other hand, products with shorter useful lives as well as those with semiconductor manufacturing (e.g., electronics) tend to have much higher relative embedded energy and GHG emissions contribution compared to products with motors, pumps, or compressors (Weber 2011). Products such as computers have a higher proportion of their overall energy use tied to their production in the range of 40 to 80% of their total life cycle energy use. The more we use an appliance above and beyond its expected lifetime, the greater the potential savings. 
</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>In level 1 the replacement of appliances follows the trends suggested in Prakash et al., (2016) and Huisman et al., (2012) as indicative of current trends. Washing machines, fridges and freezers are replaced at 96% of their lifetime, dishwashers and dryers at 93%. For phones and computers the replacement of the product takes place at 90% of its lifetime, for TV’s at 83%.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Level 2 is assumed to be the minimum level of ambition, with households replacing their appliances once these reach their lifetime.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Level 3 is an intermediate level between 2 and 4. In this level, Tv’s computers and phones are replaced at 115% of their lifetime.The replacement of washing machines, dishwashers, dryers, fridges and freezers in households takes place at 105% of the product lifetime.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>In level 4, TV’s, computers and phones are replaced at 130% of their lifetime, reflecting the feasibility in Moran et al., (2018). For washing machines, dishwashers, dryers, fridges and freezers, the replacement takes place at 110% of the product lifetime in order to avoid the rebound effects of potentially old appliances with low energy standards.</p></li></ul>
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
  name: 'lever_product-substitution-rate',
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
      let fileName = 'lever_product-substitution-rateChart.vue';

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
