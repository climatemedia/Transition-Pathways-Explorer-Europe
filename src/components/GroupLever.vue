<template>
  <div class="single-lever group-lever" :class="{'deactivated': deactivated}">

    <div v-for="step in range" class="single-lever-step" :key="step">

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

  </div>
</template>

<script>
import * as dataService from '../dataService.js';
import * as inputsService from '../inputsService.js';
import * as helpers from '../helpers.js';


export default {
  name: 'GroupLever',
  props: ['groupid', 'range', 'country', 'appState', 'deactivated'],
  data() {
    return {
      buttonFromEmptyToFilled: false
    }
  },
  computed: {
    barWidth: function() {
      //depends on another computed property
      return this.value*100/this.range[this.range.length-1];
    },
    partialWidth: function() {
      let val = (this.value % 1).toFixed(1)*100;
      return val === 0 ? 100 : val;
    },
    value: function() {
      // triggers when this.country.values changes
      let collected = [];
      let group = inputsService.leverGroups[this.groupid];

      group.levers.forEach((levId) => {
        // this.country.values is reactive, because it is part of selected, which is on data of App
        // whenever this value changes, this computed property is marked for update
        collected.push(this.country.values[levId]);
      });
      if(collected.length) {
        return Math.round( helpers.arrayAverage(collected) * 10) / 10;
      }
    }
  },
  methods: {
    setIntValues(step) {
      if(this.value === step) {
        return;
      } else {
        inputsService.setGroupValue(this.country, this.groupid, step);
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
        if(this.value !== step) {
          inputsService.setGroupValue(this.country, this.groupid, step);
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
        if(this.value !== val) {
          inputsService.setGroupValue(this.country, this.groupid, val);
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
    }
  },
  watch: {
    //value is a computed property for GroupLevers
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

<style>
.group-lever .single-lever-step-partial::after {
  background-color: #6d6e71;
}
.group-lever .single-lever-step-button {
  border: 1px solid #6d6e71;
  background-color: #6d6e71;
}
</style>
