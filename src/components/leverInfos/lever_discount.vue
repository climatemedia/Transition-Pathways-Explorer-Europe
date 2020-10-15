<template>
  <!--created by leverInfoParser.js script (tools folder)-->
  <div id="lever-info">
    <div id="lever-info-header">
      <h3 id="lever-info-title">Discount factor</h3>
    </div>
    <div id="lever-info-content">
      <p>This lever determines cost actualisation (how we represent, in todays’ terms, the future flows of money: investments, operational expenditures and cost savings).</p>
      <component class="lever-info-chart" v-if="componentInstance" :is="componentInstance"
        chart-title="Discount factor" chartfilename="lever_discount.js"
      ></component>
      <p>The cost of capital refers to the actual cost of financing business activity through either debt or equity capital. The discount rate is the interest rate used to determine the present value of future cash flows in standard discounted cash flow analysis.
Another terminology, not used here is the WACC. Used by many companies, the WACC is the Weighted Average Cost of Capital, and it is used as their discount rate when budgeting for a new project. This figure is crucial in generating a fair value for the company's equity.
</p>
      <p>When the discount is high, the future returns on investments are low, which means investments yielding long term benefits are less profitable.</p>
      <div>
        <ul><li class="lever-info-amibitions"><div> Ambition Level 1</div><p>Discount factor of 10% per year.</p></li><li class="lever-info-amibitions"><div> Ambition Level 2</div><p>Discount factor of 7% per year.</p></li><li class="lever-info-amibitions"><div> Ambition Level 3</div><p>Discount factor of 4% per year.</p></li><li class="lever-info-amibitions"><div> Ambition Level 4</div><p>Discount factor of 2% per year.</p></li></ul>
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
  name: 'lever_discount',
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
      let fileName = 'lever_discountChart.vue';

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
