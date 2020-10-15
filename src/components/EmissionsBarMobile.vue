<template>
  <div id="bar-chart-mobile"
  >
    <div id="gauge-mobile">

      <div id="gauge-fill-mobile"
        :style="{
          transform: 'scaleX('+(appState.mode==='target' ? euBudget/limitGHG : emissions2050/limitGHG)+')'
        }"
      ></div>

      <div id="gauge-label">
        <span v-if="appState.mode!=='target'">EU 2050 Emissions</span>
        <span v-if="appState.mode==='target'">EU 2050 Budget in Gt CO<span class="sub">2eq</span></span>
      </div>

      <div id="gauge-tick-mobile-container"
        :style="{
          transform: 'translateX(calc('+euBudget*100/limitGHG +'% - 100%))',
        }"
      >
        <a id="gauge-tick-mobile" :href="linkaddress" class="wrapper-link" ref="budgetToggle"
          v-on:touchmove="toggleBudgetView"
        >
        </a>
      </div>

      <div id="gauge-value-mobile" class="nowrap">
        <span v-if="appState.mode!=='target' && emissions2050">{{Math.round(emissions2050)}} Gt</span>
        <span v-if="appState.mode==='target'">{{Math.round(euBudget)}} Gt</span>
      </div>

    </div>
  </div>
</template>

<script>
import * as outputsService from '../outputsService.js';
import {BudgetShares, LimitGHG, Produced2018} from '../config/targetData.js';

export default {
  name: 'EmissionsBarMobile',
  props: ['appState'],
  components: {
  },
  data() {
    return {
      emissions2050: undefined
    }
  },
  created() {
    this.limitGHG = LimitGHG;
    this.produced2018 = Produced2018;
    this.getEmissions2050();
  },
  methods: {
    toggleBudgetView() {
      this.$refs.budgetToggle.click();
    },
    getEmissions2050() {
      // component is mounted before API response gets in

      let cumEmissions = outputsService.outputs["clt_cum-emissions-CO2e[Mt]"];

      if(cumEmissions && cumEmissions.data && cumEmissions.data['EU']) {
        let len = cumEmissions.data['EU'].length;
        this.emissions2050 = cumEmissions.data['EU'][len-1]/1000;
      }
    }
  },
  computed: {
    euBudget() {
      return BudgetShares[this.appState.budgetFairness].shares['EU28+1'][this.appState.budgetTemperature.toFixed(1)];
    },
    linkaddress() {
      if(this.appState.mode === 'target') {
        return this.appState.mainScreenRouteString
      }
      if(this.appState.mode === 'main') {
        return '/budget';
      }
      // default, just to be safe
      return '/';
    }
  },
  watch: {
    'appState.lastAPIResponse': function() {
       this.getEmissions2050();
     }
  }
}
</script>

<style scoped>
#bar-chart-mobile {
  height: 20px;
}

#gauge-mobile {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
}
#gauge-tick-mobile-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%; /*necessary in order to be moved in 'parent'-percent*/
  transition: transform 0.3s ease;
}

#gauge-tick-mobile {
  position: absolute;
  top: -3px;
  right: 0px;
  height: calc(100% + 3px);
  width: 1px;
  background-color: #80cc2b;
}
#gauge-tick-mobile::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 100%;
  left: -6px;
  width: 13px;
  height: 13px;
  border-radius: 100%;
  background-color: #80cc2b;
}

#gauge-label {
  font-size: 14px;
  font-weight: bold;
}
#gauge-label .sub {
  font-size: 12px;
  position: relative;
  top: 1px;
}

#gauge-fill-mobile {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  background-color: #666666;
  background-color: rgba(0,0,0,0.4);
  opacity: 1;
  width: 100%;
  transform-origin: left center;
  transition: transform 0.3s ease;
}

#gauge-value-mobile {
  font-weight: bold;
  font-size: 14px;
  opacity: 1;
  transition: opacity 0.3s ease;
  transition-delay: 0.5s;
}

</style>
