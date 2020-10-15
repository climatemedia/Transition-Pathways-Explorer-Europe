<template>
  <div class="single-lever" :class="{'deactivated': deactivated}">

    <div v-for="(step, index) in range" class="single-lever-step" :key="step" v-on:mouseenter="setTooltip(index)">

      <div class="single-lever-step-button"
        :class="{
          empty: Math.ceil(value) <= step,
          filled: Math.ceil(value) > step,
          notrans: buttonFromEmptyToFilled,
        }"
        v-on:click="stepClickFunc(step)"
      >
        <span v-if="(Math.ceil(value) === step)"
          class="single-lever-step-partial" :style="{width: partialWidth + '%'}"
        >
        </span>
      </div>
    </div>

    <div v-if="!appState.isMobile" class="single-lever-value"><span>{{displayedValue}}</span></div>

    <div class="single-lever-tooltip" :class="{'visible': tooltipVisible && tooltipText}">
      <div>Ambition Level {{displayedAmbition}}:</div>
      <div>{{tooltipText}}</div>
    </div>
    <div class="single-lever-step-connector" :class="{'visible': tooltipVisible && tooltipText}"

      :style="{left: (23*(tooltipIndex+1))-13-10+'px'}"
    >
      <!--
        left: 23*(tooltipIndex+1)-13-10
          23: width of single-lever-step including margin
          13: more or less the half of that width (the x-center)
          10: half the width of the single-lever-step-connector

        can't be inside .single-lever-step, otherwise not over single-lever-tooltip and box-shadow not covered,
        even if single-lever-tooltip is put above single-lever-step
    -->
    </div>

  </div>
</template>

<script>
import * as dataService from '../dataService.js';
import * as inputsService from '../inputsService.js';

export default {
  name: 'SingleLeverNum',
  props: ['leverid', 'range', 'value', 'country', 'tooltipVisible', 'activateTooltip', 'deactivateTooltip', 'appState', 'deactivated'],
  data() {
    return {
      tooltipText: '',
      tooltipIndex: undefined,
      buttonFromEmptyToFilled: false
    }
  },
  created() {
    this.timerId = undefined;
  },
  computed: {
    partialWidth: function() {
      let val = (this.value % 1).toFixed(1)*100;
      return val === 0 ? 100 : val;
    },
    displayedValue: function() {
      let flooredValue = Math.floor(this.value);
      let decimalPart = (this.value % 1).toFixed(1)*10;
      decimalPart = decimalPart > 0 ? '.' + decimalPart : '';
      return ['A','B','C','D'][flooredValue-1] + decimalPart;
    },
    displayedAmbition: function() {
      return ['A','B','C','D'][this.tooltipIndex];
    }
  },
  methods: {
    setIntValues(step) {
      if(this.country.values[this.leverid] === step) {
        return;
      } else {
        inputsService.setValue(this.country, this.leverid, step);
        //Desktop only
        if(!this.appState.isMobile) {
          dataService.rewriteURL(dataService.updateURLParams());
          dataService.debouncedFetch();
        }
        // Mobile only
        if(this.appState.isMobile) {
          // send availability request
          dataService.availabilityRequest();
        }
      }
    },
    stepClickFunc(step) {
      if(this.deactivated) {
        return;
      }
      if(this.appState.noDecimalLevers) {
        this.setIntValues(step);
        return;
      }

      if(Math.ceil(this.value) !== step) {
        if(this.country.values[this.leverid] !== step) {
          inputsService.setValue(this.country, this.leverid, step);
          //Desktop only
          if(!this.appState.isMobile) {
            dataService.rewriteURL(dataService.updateURLParams());
            dataService.debouncedFetch();
          }

          // Mobile only
          if(this.appState.isMobile) {
            // send availability request
            dataService.availabilityRequest();
          }
        }
      } else {
        let val = Math.round( (this.value-0.1) * 10) / 10;
        val = val <= 1 ? 1 : val;
        if(this.country.values[this.leverid] !== val) {
          inputsService.setValue(this.country, this.leverid, val);
          //Desktop only
          if(!this.appState.isMobile) {
            dataService.rewriteURL(dataService.updateURLParams());
            dataService.debouncedFetch();
          }

          // Mobile only
          if(this.appState.isMobile) {
            // send availability request
            dataService.availabilityRequest();
          }
        }
      }
    },
    setTooltip(ind) {

      var setTooltipInfo = () => {
        let tooltipData;
        if(inputsService.tooltips[this.leverid] && inputsService.tooltips[this.leverid][this.country.id]) {
          tooltipData = inputsService.tooltips[this.leverid][this.country.id];
        } else {
          tooltipData = [];
        }
        if(tooltipData[ind]) {
          this.tooltipText = tooltipData[ind].trim();
          this.tooltipIndex = ind;
        }
      };

      if(this.tooltipVisible) {
        setTooltipInfo();
      } else {
        this.activateTooltip(this.leverid, setTooltipInfo);
      }
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      if(Math.floor(newVal) > Math.floor(oldVal)) {
        // triggers for oldVal = 1.5, newVal = 2.1
        // doesn't trigger for oldVal = 1.5, newVal = 1.9

        this.buttonFromEmptyToFilled = true;

        //nextTick() is not enough. To make sure the change is visible, use window.requestAnimationFrame()
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.buttonFromEmptyToFilled = false;
          });
        });

      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
