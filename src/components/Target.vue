<template>
  <div id="target">
    <div id="target-content">
      <h2>Determine the European GHG budget</h2>

      <div id="target-page">
        <div class="target-row" id="target-intro">
          The amount of greenhouse gases the world can still emit to have a two out of three chance of staying below 1.5° or 2° warming until the end of the century is called the global greenhouse gas budget.
        </div>

        <div id="target-temp" class="target-row target-option">

          <div class="target-dialog-heading">
            <span>1.</span>
            <div>Warming limit:</div>
          </div>

          <div class="target-option-content">

            <div class="target-part">
              <div class="option-description">
                <div class="target-description">
                  Please first choose the warming limit you would like to comply with.
                </div>
                <div class="target-description">
                  The graph shows the dependence of risks and/or impacts associated with
                  the Reasons for Concern (RFCs) on your chosen level of ‘tolerable’ global warming.
                </div>
              </div>
              <div class="target-dialog">
                <div class="target-dialog-select">
                  <div class="target-dialog-select-option"
                    :class="{active: appState.budgetTemperature === 2}"
                    v-on:click="setTemperature(2)"
                  >
                    <img src="/img/checked.svg">
                    <span class="ml-auto mr-auto nowrap target-option-value">2,0 °C</span>
                  </div>
                  <div class="target-dialog-select-option"
                    :class="{active: appState.budgetTemperature === 1.5}"
                    v-on:click="setTemperature(1.5)"
                  >
                    <img src="/img/checked.svg">
                    <span class="option-value ml-auto mr-auto nowrap target-option-value">1,5 °C</span>
                  </div>
                </div>
                <img class="target-info" src="/img/info.svg" v-on:click="openBudgetInfo('limit')">
              </div>
            </div>

            <div class="target-part">
              <div id="temperature-chart">
                <img id="temperature-image" src="/img/impact-risks.jpg">
                <div id="temperature-line"
                  :class="{
                    'two-deg': appState.budgetTemperature === 2,
                    'onefive-deg': appState.budgetTemperature === 1.5
                  }"
                ></div>
              </div>
            </div>

          </div>
        </div>

          <div id="target-fairness" class="target-option">
            <div class="target-dialog-heading">
              <span>2.</span>
              <div>European share:</div>
            </div>

            <div class="target-option-content">
              <div class="target-part">

                <div class="option-description">
                  <div class="target-description">
                    In order to come up with the European share of the resulting global budget, you have to decide what you consider a fair share.
                  </div>
                  <div class="target-description">
                    Either you choose that every person should be allowed to emit the same amount of greenhouse gases (“Per capita”),
                    or you decide that Europeans should be allowed to emit less due to their above-average GDP (“Capability”).
                  </div>
                </div>

                <div class="target-dialog">

                  <div class="target-dialog-select">
                    <div class="target-dialog-select-option"
                      v-for="(obj,fairnessOption) in shares"
                      :class="{active: appState.budgetFairness===fairnessOption}"
                      v-on:click="setFairness(fairnessOption)"
                      :key="fairnessOption"
                    >
                      <img src="/img/checked.svg">
                      <span class="nowrap target-option-title">{{shares[fairnessOption].title}}</span>
                      <span class="ml-auto target-option-value">
                        {{shares[fairnessOption].shares['EU28+1'][appState.budgetTemperature.toFixed(1)]}}
                      </span>
                    </div>
                  </div>
                  <div class="target-dialog-unit">GT CO2 equiv.</div>
                  <img class="target-info" src="/img/info.svg" v-on:click="openBudgetInfo('share')">
                </div>

              </div>
              <div class="target-option-chart">
                <PieChart :chart-data="budgetChartdata"/>
                <div class="global-budget-label">
                  <div>Global budget (as of 2020): <b>{{budgets[appState.budgetTemperature.toFixed(1)]}} </b><span>GT CO2 equiv.</span></div>
                </div>
              </div>

            </div>
          </div>


        <div id="intro-navigation">
          <span class="pill-button">
            <a href="/intro">read intro</a>
          </span>
          <span class="pill-button" style="margin-left: 15px;">
            <a :href="appState.mainScreenRouteString">start calculating</a>
          </span>
        </div>
      </div>
    </div>

    <Modal :is-open="modalFor==='share'" :has-close-button="true" :closing-callback="hideBudgetInfo">
      <div class="budget-details">
        <p>
          The global GHG budget is calculated using a transient climate response to cumulative CO2 emissions (TCRE) of 1.65C/TtC. These are roughly consistent with a 50% chance of reaming below budget if we assume a normal distribution of TCRE from 0.8-2.4C/TtC (5th-95th percentiles). They hold from 2020-2100 inclusive.
        </p>
        <p>
        In order to split the GHG budget estimate into a EU27+2 and a Rest of the World (RoW) share we proceed as follows.
        </p>
        <p>
        <b>1)</b> Choose a shape for the CO<sub>2</sub> emissions time series between now and end of 21st century. This is chosen to be the shape which CO<sub>2</sub> emissions follow in the representative concentration pathway 4.5 (RCP4.5). Note we are required to choose a shape because fairness weightings require time series of annual global CO<sub>2</sub> emissions.
        </p>
        <p>
        <b>2)</b> Rescale the RCP4.5 emissions time series so that it holds peak global warming over the 21st century below the level chosen by the user (i.e. either 1.5°C or 2.0°C). For this we use best estimates of the TCRE parameter to convert the cumulative CO<sub>2</sub> emissions into a globally averaged warming response.
        </p>
        <p>
        <b>3)</b> Apply the fairness approaches to the global emissions time series to find the EU share. We have 2 fairness approaches:<br>
        <b>a)</b> Per capita: Use the SSP2 population time series over the 21st century for EU27+2 and RoW to weight fair emissions by EU’s share of global population.<br>
        <b>b)</b> By capacity: Use the SSP2 population and GDP time series over the 21st century for EU27+2 and RoW to weight fair emissions for EU’s share of global wealth and population.
        </p>
        <p>
        For a more complete description of methodology behind fairness calculation see Deliverable 1.2, Section 6.
        </p>
      </div>
    </Modal>

    <Modal :is-open="modalFor==='limit'" :has-close-button="true" :closing-callback="hideBudgetInfo">
      <div class="budget-details">
        <p>In case you choose the 2° threshold, please be aware that it may be impossible to “park” the climate at 2° global warming.</p>
        <p>
        <i>Trajectories of the Earth System in the Anthropocene, Will Steffen et al. PNAS August 14, 2018 115 (33) 8252-8259; <a href="https://doi.org/10.1073/pnas.1810141115" target="_blank" rel="noopener">https://doi.org/10.1073/pnas.1810141115</a></i>
        </p>
      </div>
    </Modal>

  </div>
</template>

<script>
import {GlobalBudgets, BudgetShares, RegionColors} from '../config/targetData.js';
import PieChart from '../charts/PieChart.vue';
import Modal from '../lib/Modal.vue';

export default {
  name: 'Target',
  props: ['appState'],
  components: {
    PieChart,
    Modal
  },
  data() {
    return {
      modalFor: undefined
    }
  },
  created() {
    this.budgets = GlobalBudgets;
    this.shares = BudgetShares;

    this.buildBudgetSeries();
  },
  methods: {
    openBudgetInfo(modalName) {
      this.modalFor = modalName;
    },
    hideBudgetInfo() {
      this.modalFor = undefined;
    },
    setTemperature(val) {
      this.appState.budgetTemperature = val;
      this.buildBudgetSeries();
    },
    setFairness(option) {
      this.appState.budgetFairness = option;
      this.buildBudgetSeries();
    },
    buildBudgetSeries() {
      this.budgetChartdata = {
        title: '',
        size: this.appState.budgetTemperature === 2 ? 230 : 190,
        width: 270,
        height: 270,
        series: [
          {
            name: 'Share',
            data: []
          }
        ]
      };
      Object.keys(BudgetShares[this.appState.budgetFairness].shares).forEach((regionKey) => {
        let regionValue = BudgetShares[this.appState.budgetFairness].shares[regionKey][this.appState.budgetTemperature.toFixed(1)];

        this.budgetChartdata.series[0].data.push({
          name: regionKey,
          y: regionValue,
          color: RegionColors[regionKey] ? RegionColors[regionKey] : 'grey'
        });

      });
    }
  },
  mounted() {
    window.scroll(0, 0);
  }
}
</script>

<style>
#target {
  flex-grow: 1;
  align-self: flex-start;
  line-height: 22px;
  overflow-y: auto;
  max-height: 100%;
}
#target-content {
  margin: 30px auto;
  max-width: 1200px;
}
#target-page {

}
.target-row {
  margin-bottom: 20px;
  background-color: white;
  padding: 20px 10px;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.06);
}
#target h2 {
  text-align: center;
  margin-bottom: 30px;
  padding: 0px 5px;
}
#target-intro {
  margin: 20px 0px;
  padding: 10px 20px;
}
.target-option {
  background-color: white;
  padding: 5px 5px 10px 5px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.06);
}
.target-dialog-heading {
  display: flex;
  justify-content: center;
  margin: 15px 0px 20px 0px;
  font-weight: bold;
  font-size: 18px;
  align-items: baseline;
}
.target-dialog-heading span {
  margin-right: 10px;
}
.target-description {
  padding: 5px 10px;
}
.target-option-content {
  display: flex;
  align-items: flex-start;
  min-height: 280px;
}
.target-part {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.option-description {
  margin-bottom: 30px;
}
#temperature-chart {
  position: relative;
  border: 1px solid lightgrey;
  margin: 5px;
  box-sizing: border-box;
}
#temperature-image {
  display: block;
  width: 100%;
}
#temperature-line {
  position: absolute;
  height: 4px;
  width: 55%;
  left: 11%;
  background-color: #80cc2b;
}
/*transition with transform not easily achieveable because necessay to work in parent-percent (image scales, px don't help)*/
#temperature-line.two-deg {
  top: 18.5%;
}
#temperature-line.onefive-deg {
  top: 30.5%;
}
.target-dialog {
  position: relative;
}
.target-part a {
  color: black;
  font-weight: bold;
}
.target-info {
  position: absolute;
  top: 10px;
  left: calc(100% + 20px);
  height: 26px;
  cursor: pointer;
}

.target-dialog-select {
  border: 1px solid #6d6e71;
  border-radius: 4px;
  overflow: hidden;
}
.target-dialog-select-option {
  display: flex;
  align-items: center;
  background-color: #eeeeee;
  color: #2d2d2d;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 18px;
}
.target-dialog-select-option img {
  opacity: 0;
  margin: 0px 4px;
}
.target-dialog-select-option.active  {
  background-color: #6d6e71;
  color: white;
}
.target-dialog-select-option.active img{
  opacity: 1;
}
.target-option-value {
  padding: 0px 5px;
  min-width: 45px;
  text-align: right;
}
.target-option-title {
  padding: 0px 10px;
}
.target-dialog-select-option.active .target-option-value {
  color: #77c046;
  font-weight: bold;
}

.target-dialog-unit {
  text-align: right;
  font-size: 12px;
  color: #8c8a8c;
  font-style: italic;
  margin-bottom: 2px;
}
.target-option-chart {
  position: relative;
  margin: 0px auto;
}
.global-budget-label {
  font-size: 14px;
  position: absolute;
  white-space: nowrap;
  bottom: -0px;
  left: 50%;
  transform: translateX(-50%);
}
.global-budget-label span {
  color: #8c8a8c;
  font-style: italic;
}
.budget-details {
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
}
.budget-details a {
  color: black;
  font-weight: bold;
}
#target .modal-content {
  height: auto;
}

</style>
