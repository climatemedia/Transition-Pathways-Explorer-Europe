<template>
  <a id="bar-chart" :href="linkaddress" class="wrapper-link"
    :class="{'gauge-open': appState.mode==='target'}"
  >
    <div id="gauge">
      <div id="gauge-budget" class="gauge-fill" :style="{width: euBudget*100/limitGHG+'%'}">
        <div id="gauge-flag" class="nowrap tooltip-holder">
          <span>{{euBudget}} Gt</span>
          <div class="tooltip tooltip-right">
            <span v-if="appState.mode==='target'">
              Start calculating
            </span>
            <span v-if="appState.mode==='main'">
              Try to meet your European GHG budget (click to change)
            </span>
          </div>
        </div>
      </div>

      <!-- emissions bar is as long as budget-bar as long as emissions2050 are still undefined -->
      <div id="gauge-current" class="gauge-fill tooltip-holder" :style="{width: emissions2050 ? emissions2050*100/limitGHG+'%' : euBudget*100/limitGHG+'%'}">
        <div id="gauge-value" class="nowrap" :class="{'gauge-visib': emissions2050}">
          <span v-if="emissions2050">{{Math.round(emissions2050)}} Gt</span>
          <span v-if="netZeroYear.value" id="net-zero-in">(Net zero by year {{netZeroYear.value}})</span>
        </div>
        <div class="tooltip tooltip-bottom">
          GHG emissions of your pathway until 2050 (Gt cumulative CO<sub>2,eq</sub>, EU27+2)
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import * as outputsService from '../outputsService.js';
import {BudgetShares, LimitGHG, Produced2018} from '../config/targetData.js';

export default {
  name: 'EmissionsBar',
  props: ['appState'],
  components: {
  },
  data() {
    return {
      emissions2050: undefined,
      netZeroYear: outputsService.netZeroYear
    }
  },
  created() {
    this.limitGHG = LimitGHG;
    this.produced2018 = Produced2018;
    this.getEmissions2050();
  },
  methods: {
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
      //default, just to be safe
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

<style>
#bar-chart {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

#gauge {
  position: relative;
  width: 100%;
  height: 18px;
  display: flex;
  align-items: center;
}

#gauge-field {
  position: relative;
  background-color: #dcdcdc;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.gauge-fill {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  border-top-left-radius: 10px;
}

#gauge-budget {
  background-color: rgba(91,190,249, 0.45);
  transition: width 0.2s ease;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1px;
  position: absolute !important;
  top: 0px;
  left: 0px;
  z-index: 1;
}
#gauge-budget > span {
  color: #77c046;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}
.gauge-open #gauge-budget {
  background-color: #5bbef9;
}
.gauge-open #gauge-budget > span {
  opacity: 1;
}

#gauge-flag {
  position: absolute;
  top: -29px;
  width: 60px; /*needed when flag showing to the left*/
  left: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #80cc2b;
  height: 19px;
  border-top-left-radius: 4px;
}
#gauge-flag::before {
  content: '';
  position: absolute;
  top: 4px;
  right: 0px;
  width: 1px;
  height: 43px;
  background-color: #80cc2b;
}
#gauge-flag span {
  font-size: 15px;
  font-weight: bold;
  color: white;
}

#gauge-current {
  position: relative;
  background-color: #5bbef9;
  transition: width 0.8s ease;
  transition-delay: 0.3s;
  opacity: 1;
  width: 100%;
  z-index: 1;
}

.gauge-open #gauge-current {
  opacity: 0;
  transition-delay: 0s;
}

#gauge-value {
  position: absolute;
  top: 0px;
  left: calc(100% + 5px);
  display: flex;
  align-items: center;
  font-weight: bold;
  color: white;
  font-size: 15px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
  transition-delay: 0.5s;
}
#gauge-value.gauge-visib {
  opacity: 1;
}

#gauge-flag .tooltip {
  white-space: nowrap;
  background-color: #80cc2b;
  color: white;
}
#gauge-flag .tooltip::after {
  border-color: transparent #80cc2b transparent transparent;
}

#gauge-current .tooltip {
  white-space: nowrap;
  background-color: #5bbef9;
  color: white;
}
#gauge-current .tooltip::after {
  border-color: transparent transparent  #5bbef9 transparent;
}

#net-zero-in {
  margin-left: 10px;
}

</style>
