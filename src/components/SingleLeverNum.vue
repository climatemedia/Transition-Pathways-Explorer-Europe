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

    <div v-if="!appState.isMobile" class="single-lever-value"><span>{{value}}</span></div>

    <div class="single-lever-tooltip" :class="{'visible': tooltipVisible && tooltipText}">
      <div>Ambition Level {{range[tooltipIndex]}}:</div>
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
      //console.log('value watch ', oldVal, newVal, Math.floor(oldVal), Math.floor(newVal));
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
.single-lever {
  position: relative;
  display: flex;
  height: 22px;
}
.single-lever-step {
  position: relative;
  flex: none;
  width: 22px;
  height: 100%;
  z-index: 2;
}
.single-lever-step-button {
  height: 100%;
  width: 100%;
  cursor: pointer;
  border: 1px solid #6d6e71;
  background-color: #adaeb0;
  box-sizing: border-box;
  border-radius: 100%;
}
.deactivated .single-lever-step-button {
  background-color: #dadada;
  border-color: #b3b3b3;
  cursor: default;
}
.single-lever-step-button.filled {
  transition: all 0.2s ease;
}
.single-lever-step-button.filled.notrans {
  transition: all 0s ease;
}
.single-lever:hover .single-lever-step-button.filled {
  /*
    deactivate hover transition when already hovering inside the lever field
    only transition when leaving that field
  */
  transition-duration: 0s;
}

.single-lever-step-button.empty {
  background-color: transparent !important;
  border-color: #b0b0b0;
}

.single-lever-step-partial {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}
.single-lever-step-partial::after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background-color: #adaeb0;
  border: 1px solid #6d6e71;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
}
.deactivated .single-lever-step-partial::after {
  border-color: #b3b3b3 !important;
  background-color: #dadada;
}
.single-lever-value {
  width: 24px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #27aae1;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.single-lever:hover .single-lever-value {
  /*leave transition for the .single-lever-value on hover,
  unlike .single-lever-step-partial::after or .single-lever-step-button.filled*/
  opacity: 1;
}

.single-lever:hover .single-lever-step-button.filled {
  background-color: #27aae1;
}

.single-lever:hover .single-lever-step-partial::after {
  background-color: #27aae1;
  /*
    deactivate hover transition when already hovering inside the lever field
    only transition when leaving that field
  */
  transition-duration: 0s;
}


</style>
