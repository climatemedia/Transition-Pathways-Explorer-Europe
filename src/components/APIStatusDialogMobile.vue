<template>
  <div id="api-status-mobile" v-if="visible">
    <div id="no-data" v-if="appState.responseStatus === 'nodata' && !appState.waitingForAPI">
      <h3>Special Request</h3>
      <p>Data for this pathway needs to be calculated first, which can take up to two minutes.</p>
      <ul>
        <li>Hit "<b>Calculate</b>" to start</li>
        <li>Or choose a different lever setting (if you start from an example pathway, any change to any single lever gives quick results)</li>
      </ul>
    </div>
    <div v-if="appState.waitingForAPI">
      <p>Calculating this special request can take up to two minutes.</p>
      <div id="api-status-mobile-loading-cont">
        <Loading />
      </div>
    </div>
    <div id="api-busy" v-if="appState.responseStatus === 'busy' && !appState.waitingForAPI">
      <h3>API busy</h3>
      <p>Sorry, it seems as if all API slots are busy at the moment. Please try again later.</p>
      <p>Alternatively, if you start from an example pathway, any change to any single lever gives quick results.</p>
    </div>
    <div id="api-status-footer" v-if="!appState.waitingForAPI">
      <button class="pill-button" v-if="appState.responseStatus === 'nodata'" v-on:click="calculate">Calculate</button>
      <button class="pill-button" v-if="appState.responseStatus === 'busy'" v-on:click="calculate">Try again</button>
    </div>
  </div>

</template>

<script>
import * as dataService from '../dataService.js';

import Loading from './Loading.vue';

export default {
  name: 'APIStatusDialogMobile',
  components: {
    Loading
  },
  props: ['appState'],
  computed: {
    visible() {
      if(this.appState.userAction.indexOf('tabChange') >= 0) {
        return false;
      }
      return this.appState.responseStatus !== '' || this.appState.waitingForAPI;
    }
  },
  methods: {
    calculate() {
      dataService.fetchFromModelAPI();
    }
  }
}
</script>

<style>
#api-status-mobile {
  position: fixed;
  z-index: 200;
  width: 90vw;
  min-height: 100px;
  padding: 10px;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: grey;
  font-size: 16px;
  color: white;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
}
#api-status-mobile-loading-cont {
  position: relative;
  height: 70px;
}
</style>
