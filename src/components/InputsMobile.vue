<template>
  <div id="inputs-mobile">
    <div id="open-levers" class="pill-button" v-on:click="openLevers">
      <span>Levers</span>
    </div>

    <Modal ref="levermodal" :always-rendered="true">
      <div id="levers-modal">
        <PathwaySelector :app-state="appState"/>
        <LeversTable :app-state="appState"></LeversTable>
        <div id="levers-modal-footer">
          <button id="levers-cancel" class="pill-button" v-on:click="cancel">
            <span>Cancel</span>
          </button>
          <button id="levers-calculate" class="pill-button" v-on:click="calculate">
            <span>Calculate</span>
          </button>
          <div id="time-warning">
            <img v-if="appState.quickDataAvailable === false" src="/img/time-warning.svg">
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as inputsService from '../inputsService.js';
import * as dataService from '../dataService.js';
import * as routeService from '../routeService.js';

import LeversTable from './LeversTable.vue';
import PathwaySelector from './PathwaySelector.vue';
import Modal from '../lib/Modal.vue';

export default {
  name: 'InputsMobile',
  components: {
    LeversTable,
    PathwaySelector,
    Modal
  },
  props: ['appState'],
  data() {
    return {
    }
  },
  methods: {
    openLevers() {
      this.$refs.levermodal.openModal();
    },
    cancel() {
      // console.log('cancel ', this.appState.mainScreenRouteString);
      let appStateQuerystring = this.appState.mainScreenRouteString.substring(this.appState.mainScreenRouteString.indexOf('?'));
      let urlParameters = routeService.getURLParams(appStateQuerystring, ['levers', 'other', 'country']);
      inputsService.setInputsFromURLParameters(urlParameters.levers, urlParameters.other, urlParameters.country);
      this.$refs.levermodal.closeModal();
    },
    calculate() {
      // just start a fetch
      // how is it visible here, that a fetch needs to be started?
      // --> lastAction is set!
      if(this.appState.userAction.length) {
        dataService.rewriteURL(dataService.updateURLParams());
        dataService.fetchFromModelAPI();
      }
      this.$refs.levermodal.closeModal();
    },
  }
}
</script>

<style>
#inputs-mobile {
  position: relative;
}
#open-levers {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 110;
}
#levers-modal {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
#levers-modal-footer {
  flex: none;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
#levers-calculate {
  margin-left: 20px;
  width: 90px;
  position: relative;
}

#time-warning {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 26px;
  width: 26px;
}
#time-warning img {
  display: block;
  height: 100%;
  width: 100%;
}

#inputs-mobile #levers-header {
  padding-right: 0px;
  max-width: 600px;
}
#inputs-mobile .levers-sector {
  max-width: 600px;
}

#inputs-mobile .levers-title {
  padding-left: 5px;
}

#inputs-mobile .levers-column2 {
  flex: none;
  width: 90px;
  margin-left: auto;
}
#inputs-mobile .levers-column3 {
  flex: none;
  width: 90px;
  margin-left: 10px;
}

</style>
