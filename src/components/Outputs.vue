<template>
  <div id="charts-container" ref="container">
    <div id="charts-header" class="noselect">
      <TabNavigation
        :tabs="tabs" :tab-index="appState.activeTab" :callback="selectTab"
      />
    </div>
    <div v-if="tabWarnings.length" id="warnings-container">
      <img id="warning-icon" src="/img/warning-sharp.svg" tabindex="1"
        v-on:click="toggleWarning"
        v-on:keyup.enter="toggleWarning"
      >
      <PopUp id="warning-popup" :is-open="warningOpen" :closing-callback="closeWarning" ref="popup" exception-id="warning-icon">
        <div id="warning-content">
          <div v-for="warningId in tabWarnings" class="warning" :key="warningId">
            <div class="warning-description">{{warningsInfos[warningId][warnings[warningId]]}}</div>
            <div class="warning-levers-container"
              v-if="warningsInfos[warningId].levers && warningsInfos[warningId].levers.length"
            >
              <div>Levers that have the biggest influence on this issue are highlighted in the levers table, they are:</div>
              <ul class="warning-levers">
                <li v-for="leverid in warningsInfos[warningId].levers" v-if="getLeverName(leverid)" :key="leverid">
                  {{getLeverName(leverid)}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </PopUp>
    </div>

    <div id="charts-subheader">

      <!--
        The key is important, otherwise on a tab-change the dropdown doesn't fully update
        The key should be the appState.activeTab, not the appState.activeSubtab,
        because the subtab-selection-dropdown should remain the same element across all subtabs
     -->
      <DropDown class="dropdown-select" :items="selTab.subtabs" name-prop="title" :key="appState.activeTab"
        :callback="selectSubTab2" :selected="appState.activeSubtab"
      />

      <!--
          This dropdown depends on each subtab, so the key should be the appState.activeSubtab,
          Without the '+z', vue complains about duplicate keys,
          because the appState.activeTab (key for dropdown above) and the appState.activeSubtab
          can take on the same integer values
      -->
      <DropDown v-if="selected.length > 1" class="dropdown-select" :items="zoomableCountries" name-prop="name"
        :callback="setCountryZoom" :selected="countryIndex" :key="appState.activeSubtab+'z'"
        :disabled="subtab.countryZoomDisabled"
      />

    </div>
    <div id="charts-main" :class="{'first-tab-opened':appState.activeTab===0}">

     <APIStatusDialog v-if="!appState.isMobile" :app-state="appState"/>
     <APIStatusDialogMobile v-if="appState.isMobile" :app-state="appState"/>

      <div id="output">
        <div id="missing-data" v-if="missingOutputs.length && appState.showMissingOutputs">
          <h4>requested data not found:</h4>
          <div v-for="item in missingOutputs" :key="item">
            {{item}}
          </div>
        </div>
        <div class="subtab-container">
          <!--
            v-if="appState.userAction.indexOf('tabChange') < 0" necessary, so component immediately disappears on a tab-change

            :key="subtab.title" is very important, because:
            if two subtabs share the same component, and the user toggles between them,
            the component only remounts when they have different keys

            loading chart-component with :is, depending on tab/subtab
            makes them load asynchronuously (lazy) on demand
            Optional: show a loading-animation when tab data is being fetched
          -->
          <component v-bind:is="chartComponent" v-if="appState.userAction.indexOf('tabChange') < 0"
            :outputs="outputs" :subtab="subtab" :chart-definitions="chartDefinitions[appState.activeTab]"
            :app-state="appState"
            :countrycode="selected[countryIndex].id"
            :key="subtab.title"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dataService from '../dataService.js';
import * as outputsService from '../outputsService.js';
import * as inputsService from '../inputsService.js';

import APIStatusDialog from './APIStatusDialog.vue';
import TabNavigation from '../lib/TabNavigation.vue';
import DropDown from '../lib/DropDown.vue';
import PopUp from '../lib/PopUp.vue';

export default {
  name: 'Outputs',
  components: {
    //generic subtabs
    'OneChart': () => import('./tabs/OneChart.vue'),
    'TwoCharts': () => import('./tabs/TwoCharts.vue'),

    //specific subtabs
    'EmissionsByCountry': () => import('./tabs/emissions/EmissionsByCountry.vue'),
    'GHGSources': () => import('./tabs/emissions/GHGSources.vue'),
    'WaterStressMap': () => import('./tabs/water/WaterStressMap.vue'),
    'MineralAvailability': () => import('./tabs/materials/MineralAvailability.vue'),
    'ClimateImpactChart': () => import('./tabs/ClimateImpactChart.vue'),
    // 'EnergyFlows': () => import('./tabs/energyflows/EnergyFlows.vue'),
    'ChangePerSector': () => import('./tabs/employment/ChangePerSector.vue'),
    'EmploymentChange': () => import('./tabs/employment/EmploymentChange.vue'),
    'WagesPerSkill': () => import('./tabs/employment/WagesPerSkill.vue'),
    'SectoralTrade': () => import('./tabs/world/SectoralTrade.vue'),
    'EuRowTrade': () => import('./tabs/world/EuRowTrade.vue'),
    'TradeComposition': () => import('./tabs/world/TradeComposition.vue'),

    APIStatusDialog,
    'APIStatusDialogMobile': () => import('./APIStatusDialogMobile.vue'),
    TabNavigation,
    DropDown,
    PopUp
  },
  props: ['appState'],
  data() {
    return {
      numTabs: outputsService.tabs.length,
      missingOutputs: [],
      selected: inputsService.selected, // reactive, can be changed in Inputs.vue, changes need to be reactive here! There are other ways to achieve this, but this is cheap
      warningsInfos: outputsService.warningsInfos, // reactive because async import and Vue.set() for initialisation, doesn't work as computed property
      warnings: outputsService.warnings, // current warnings, reactive because easy
      tabWarnings: [], // holds warnings for the current tab
      warningOpen: false
    }
  },
  created() {
    this.outputs = outputsService.outputs;
    this.tabs = outputsService.tabs;
    this.chartDefinitions = outputsService.chartDefinitions;
  },
  computed: {
    selTab() {
      return outputsService.tabs[this.appState.activeTab];
    },
    chartComponent() {
      // returns the name of the component of the first chart of a subtab (usually there also is only one chart)
      return this.tabs[this.appState.activeTab].subtabs[this.appState.activeSubtab].component;
    },
    subtab() {
      return this.tabs[this.appState.activeTab].subtabs[this.appState.activeSubtab];
    },
    zoomableCountries() {
      let chartComp = this.chartComponent;
      if(outputsService.zoomableComponents.indexOf(chartComp) >= 0) {
        return inputsService.selected; //reference is fine
      } else {
        return [inputsService.selected[0]];
      }
    },
    countryIndex() {
      // only return the countryZoomIndex if it is supported, return 0 by default

      // important, this.appState.countryZoomIndex needs to be accessed the first time this computed property initialises,
      // because it is reactive and only on init the vue internal reactive mapping is set
      let countryIndex = this.appState.countryZoomIndex;

      if(this.zoomableCountries.length < 2 || this.subtab.countryZoomDisabled) {
        return 0;
      } else {
        return countryIndex;
      }
    }
  },
  methods: {
    getLeverName(leverId) {
      return inputsService.levers[leverId] ? inputsService.levers[leverId].title : '';
    },
    toggleWarning() {
      this.warningOpen = !this.warningOpen;
      if(this.warningOpen) {
        this.getLeversWithWarnings();
      } else {
        this.emptyLeversWithWarnings();
      }
    },
    closeWarning() {
      this.warningOpen = false;
      this.emptyLeversWithWarnings();
    },
    emptyLeversWithWarnings() {
      inputsService.resetHighlightedLevers();
    },
    getLeversWithWarnings() {
      if(!this.warningsInfos) {
        return;
      }
      Object.keys(outputsService.warnings).forEach((warningId)=> {
        if(this.warningsInfos[warningId] && this.warningsInfos[warningId].tabs.indexOf(this.selTab.route) >= 0) {
          if(this.warningsInfos[warningId].levers && this.warningsInfos[warningId].levers.length) {
            inputsService.addToHighlightedLevers(this.warningsInfos[warningId].levers);
          }
        }
      });
    },
    getTabWarnings() {
      this.tabWarnings = [];
      // assigning a new reference doesn't kill the reactivity, at least not inside a component, hm

      if(!this.warningsInfos) {
        return;
      }

      Object.keys(outputsService.warnings).forEach((warningId)=> {
        if(this.warningsInfos[warningId] && this.warningsInfos[warningId].tabs.indexOf(this.selTab.route) >= 0) {
          this.tabWarnings.push(warningId);
        }
      });
    },
    selectTab(ind) {
      if(ind === this.appState.activeTab) {
        return;
      }

      // make the warning div disappear as soon as user switches tab
      // it will be reevaluated as soon as the new APIResponse is there (see watches)
      this.tabWarnings = [];
      this.closeWarning();

      outputsService.selectTab(ind, 0, true);
      this.correctCountryZoomIndex();
      dataService.fetchData();
      this.missingOutputs = []; // necessary, otherwise old missing inputs are shown on tabChange before api-response is there
      // console.log('selectTab ', this.selected[this.appState.countryZoomIndex].id);
    },
    selectSubTab(ind) {
      outputsService.selectSubTab(ind, true);
      this.getMissingOutputs();
    },
    selectSubTab2(item,ind) {
      outputsService.selectSubTab(ind, true);
      this.correctCountryZoomIndex();
      this.getMissingOutputs();
    },
    setCountryZoom(item,ind) {
      outputsService.setCountryZoom(ind);
    },
    correctCountryZoomIndex() {
      // not ideal yet, not very generic
      if(this.zoomableCountries.length < 2 || this.subtab.countryZoomDisabled) {
        outputsService.setCountryZoom(0);
      }
    },
    getMissingOutputs() {
      this.missingOutputs = [];
      this.subtab.charts.forEach((chartId)=> {
        this.chartDefinitions[this.appState.activeTab][chartId].outputs.forEach((reqOutp) => {
          if(!this.outputs[reqOutp.id] || !this.outputs[reqOutp.id].data) {
            this.missingOutputs.push(reqOutp.id);
          }
        });
      });
    }
  },
  watch: {
    'appState.lastAPIResponse': function() {

      this.getMissingOutputs();
      this.getTabWarnings();

      // this.appState.lastAPIAction doesn't change on successive country changes,
      // so a watch on lastAPIAction won't trigger on every change, that's why it's included in this watch
      if(this.appState.lastAPIAction.indexOf('countryChange') >= 0) {
        if(this.zoomableCountries.length > 1) {
          outputsService.setCountryZoom(1);
        } else {
          outputsService.setCountryZoom(0);
        }
        // still need to correct if countryZoom is disabled or not supported by the current subtab
        this.correctCountryZoomIndex();

      }
      // console.log('lastAPIResponse changed ', this.appState.countryZoomIndex);
    }
  },
  mounted() {
    this.getTabWarnings();
    window.scroll(0, 0);
  }
}
</script>

<style>
#charts-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 0px 0px 0px 40px;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
}
#charts-header {
  flex: none;
  height: 31px;
  margin-top: 21px;
  display: flex;
  align-items: stretch;
  padding-right: 40px;
  position: relative;
}
.tab-nav-holder {
  border-bottom: 2px solid #e2e2e2;
  box-sizing: border-box;
}
.tab-item {
  margin: 0px 5px;
  height: 100%;
  box-sizing: border-box;
  color: #8c8a8c;
  cursor: pointer;
  font-size: 18px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  position: relative;
}
.tab-item:first-child {
  margin-left: 0px;
}
.tab-item:last-child {
  margin-right: 0px;
}
.tab-item-title {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0px 3px;   /*use padding if underline needs to be broader than text */
  padding-bottom: 8px;
  box-sizing: border-box;
}
.tab-item-title:first-child {
  margin-left: 0px;
}
.tab-item-title:last-child {
  margin-right: 0px;
}
.tab-item-warning {
  position: absolute;
  height: 100%;
  top: 0px;
  right: -6px;
  color: #ff0000;
}
.tab-item.selected {
  color: black;
}
.tab-item-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 2px;
  background-color: black;
  transform: scaleX(0);
}
.tab-item.tn-left .tab-item-title::after {
  transform-origin: left;
}
.tab-item.tn-right .tab-item-title::after {
  transform-origin: left;
}
.tab-item.selected .tab-item-title::after {
  transform: scaleX(1);
  transition: transform 0.3s ease;
}

#charts-main {
  display: flex;
  flex-direction: column;
  background-color: white;
  flex-grow: 1;
  position: relative;

  /*
    necessary, otherwise the outputs even though having overflow:auto will
    be taller than the available space, resulting in a scrollbar on body
    https://medium.com/@stephenbunch/how-to-make-a-scrollable-container-with-dynamic-height-using-flexbox-5914a26ae336
  */
  min-height: 0px;
}
#charts-main.first-tab-opened {
  border-top-left-radius: 0px;
}

#subtab-cont {
  margin: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: grey;
  border-top: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
}
#subtab-cont:before {
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 1px;
  background-color: lightgrey;
}
#subtab-cont:after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 1px;
  background-color: lightgrey;
}
.subtab-item {
  margin: 0px;
  padding: 4px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  flex-grow: 1;
  text-align: center;
  border-right: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;

}
.subtab-item.selected {
  background-color: #35a0cd;
  background-color: lightgrey;
}

/*subtabs-----------------------------------*/
.dropdown-select {
  position: relative;
  /*DropDown is inline-block by default and can have overflow:hidden, that's why vertical align-bottom might be necessary*/
  vertical-align: bottom;
  z-index: 100;
  margin-top: 10px;
  cursor: pointer;
  margin-left: 20px;
}
.dropdown-select.drop-down.dd-open {
  /* box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5); */
}
.dropdown-select:focus {
  outline: none;
}
.dropdown-select:focus .drop-down-icon-path:not(.dd-disabled) {
  stroke: #27aae1 !important;
  fill: #27aae1 !important;
}
.dropdown-select .drop-down-head {
  padding: 4px 20px 4px 4px;
  border-radius: 1px;
}
.dropdown-select .drop-down-head span {
  font-size: 16px;
  color: black;
}
.dropdown-select .drop-down-items-container {
  border-top: 1px solid #aeadae;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.5);
  background-color: #e4e4e4;
  max-height: 350px;
}
.dropdown-select .drop-down-item {
  padding: 5px 20px 5px 5px;
}

.dropdown-select .drop-down-item:hover {
  background-color: #eeeeee;
}
.dropdown-select .drop-down-item.dd-selected {
  background-color: #cccccc;
}


#output {
  flex-grow: 1;
  flex-shrink: 1000;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

#missing-data {
  width: 95%;
  margin: 10px auto;
  font-size: 16px;
}
#missing-data h4 {
  margin: 0px;
  margin-bottom: 5px;
}
.subtab-container {
  flex-grow: 1;
  overflow: hidden;
}

/*inside output-component*/
.subtab-content {
  width: 100%;
  margin: 0px auto;
  padding-top: 30px;

  box-sizing: border-box;
  height: 100%;
  overflow: auto;
}

.subtab-content h2 {
  text-align: center;
}

/*Charts*/
.chart-container {
  height: 96%;
  width: 96%;
  position: relative;
}
.chart {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
#warnings-container {
  height: 0px;
  width: 96%; /*same as charts*/
  position: relative;
}
#warning-icon {
  position: absolute;
  right: 0px;
  top: 5px;
  display: block;
  height: 20px;
  cursor: pointer;
  z-index: 10;
}
#warning-popup {
  position: absolute;
  top: 30px;
  right: 0px;
  width: 100%;
  max-width: 500px;
  max-height: 300px;
  z-index: 101;
  box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.5);
}
#warning-content {
  padding: 10px;
  max-height: 260px;
  overflow-y: auto;
  background-color: #ffd8d8;
  border: 2px solid #ff0000;
}
.warning-description {
  font-weight: bold;
}
.warning-levers-container {
  margin-top: 10px;
  padding-left: 20px;
}
.warning-levers {
  margin: 15px 10px 5px 10px;
}
</style>
