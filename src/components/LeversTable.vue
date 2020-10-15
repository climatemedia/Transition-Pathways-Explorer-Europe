<template>
  <div id="levers-table">
    <div id="levers-header" >
      <span class="country-name-field levers-column2">
        <span class="country-name">{{selected[0].name}}</span>

        <span class="country-toggle-button" v-if="selected.length<2"
          :class="{deactivated: appState.countryZoomDisabled}"
          v-on:click="openCountrySelect"
          v-on:keydown.enter="openCountrySelect"
          tabindex="0"
        >
          <img src="/img/add.svg">
        </span>
        <PopUpSelect ref="countrySelect"
          :toggle-elem="$refs.countryToggle" :items="selectableCountries"
          title="Zoom into a country within Europe:"
          name-prop="name" :callback="selectCountry"
        />

      </span>
      <span v-if="selected.length===2" class="country-name-field levers-column3">
        <span class="country-name">{{selected[1].name}}</span>
        <span class="country-toggle-button"
          :class="{deactivated: appState.countryZoomDisabled}"
          v-on:click="selectCountry(false)"
          v-on:keydown.enter="selectCountry(false)"
          tabindex="0"
        >
          <img src="/img/remove.svg">
        </span>
      </span>
    </div>

    <div id="levers-main">
      <Levers :selected="selected" :app-state="appState"/>
    </div>

  </div>
</template>

<script>
import * as dataService from '../dataService.js';
import * as inputsService from '../inputsService.js';
import * as helpers from '../helpers.js';

import Levers from './Levers.vue';
import DropDown from '../lib/DropDown.vue';
import PopUpSelect from '../lib/PopUpSelect.vue';


export default {
  name: 'LeversTable',
  components: {
    Levers, DropDown, PopUpSelect
  },
  props: ['appState'],
  data() {
    return {
      selected: inputsService.selected //reactive because dynamic names are needed above navigation levers
    }
  },
  created() {
    this.selectableCountries = inputsService.selectableCountries;
  },
  methods: {
    openCountrySelect() {
      // don't allow any change when countryZoom is disabled (during a long fetch)
      if(this.appState.countryZoomDisabled) {
        return;
      }
      this.$refs.countrySelect.toggleOpen(true);
    },
    selectCountry(countr) {

      // don't allow any change when countryZoom is disabled (during a long fetch)
      if(this.appState.countryZoomDisabled) {
        return;
      }

      // Mobile and Desktop
      if(countr && countr.id && countr.id !== 'EU' && inputsService.countries[countr.id]) {
        inputsService.setSelectedCountry(countr.id);
      } else {
        inputsService.unselectCountry();
        inputsService.checkIfLeversMatchExamplePathway();
      }

      // Desktop only
      if(!this.appState.isMobile) {
        dataService.rewriteURL(dataService.updateURLParams());
        dataService.debouncedFetch();

        //this triggers the HighCharts built-in redraw event. Not a very elegant solution, but very short
        helpers.triggerWindowResize();
      }

      // Mobile only
      if(this.appState.isMobile) {
        // send availability request
        dataService.availabilityRequest();
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
