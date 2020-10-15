<template>
  <div id="api-status" v-if="appState.responseStatus !== ''">
    <div id="api-status-content">
      <div id="no-data" v-if="appState.responseStatus === 'nodata' && !appState.waitingForAPI">
        <h3>Special Request</h3>
        <p>Data for this pathway needs to be calculated first, which can take up to two minutes.</p>
        <ul>
          <li>Hit "<b>Calculate</b>" to start</li>
          <li>Or choose a different lever setting (if you start from an example pathway, any change to any single lever gives quick results)</li>
        </ul>
      </div>
      <Loading v-if="appState.waitingForAPI"/>
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
  </div>

</template>

<script>
import * as dataService from '../dataService.js';

import Loading from './Loading.vue';

export default {
  name: 'APIStatusDialog',
  components: {
    Loading
  },
  props: ['appState'],
  methods: {
    calculate() {
      dataService.fetchFromModelAPI();
    }
  }
}
</script>

<style>
#api-status {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
#api-status-content {
  flex: none;
  width: 400px;
  min-height: 250px;
  padding: 10px;
  background-color: grey;
  font-size: 18px;
  color: white;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
  position: relative;
  display: flex;
  flex-direction: column;
}
#api-status-content h3 {
  margin: 10px 0px 15px 0px;
}
#api-status-content p {
  margin: 10px 0px;
}
#api-status-content li {
  margin: 5px;
}
#api-status-footer {
  flex: none;
  height: 30px;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
