<template>
  <div id="levers-container"
    :class="{'one-selected': selected.length === 1, 'two-selected': selected.length === 2 }"
  >
    <div id="inputs-header">
      <span>Pathway</span>
    </div>

    <div id="inputs-pathways">
      <!-- <h3>Choose example pathway for Europe:</h3> -->
      <PathwaySelector :app-state="appState"/>
    </div>

    <!-- <h3>Create custom pathway:</h3> -->
    <LeversTable :app-state="appState"></LeversTable>

    <div id="inputs-footer">
    </div>

  </div>
</template>

<script>
import * as inputsService from '../inputsService.js';

import LeversTable from './LeversTable.vue';
import PathwaySelector from './PathwaySelector.vue';

export default {
  name: 'Inputs',
  components: {
    LeversTable, PathwaySelector
  },
  props: ['appState'],
  data() {
    return {
      selected: inputsService.selected //reactive because length needs to be reactive, not optimal though
    }
  }
}
</script>

<style>
#levers-container {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: #eeeeee;
}
#inputs-header {
  flex: none;
  height: 50px;
  color: #545254;
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-left: 5px;
  box-sizing: border-box;
  font-weight: bold;
}
#levers-container h3 {
  margin: 10px auto 4px auto;
  font-size: 15px;
  padding-left: 5px;
  color: #545254;
  text-align: left;
  width: 100%;
}
#inputs-footer {
  flex: none;
  height: 10px;
}
#levers-header {
  flex: none;
  height: 30px;
  margin-top: 20px;
  display: flex;
  font-size: 16px;
  padding-right: 15px; /*compensates for scrollbar in #levers-main*/
}
.country-name-field {
  font-weight: bold;
  color: #6d6e71;
  position: relative;
  display: flex;
  align-items: center;
}
.country-toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  flex: none;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.country-toggle-button img {
  display: block;
  width: 100%;
  height: 100%;
}
.country-toggle-button.deactivated {
  opacity: 0.5;
}
#levers-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /*firefox flexbox overflow bug, https://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox*/
}

/*levers grid*/
#levers-table {
  max-width: 600px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /*otherwise, another container is necessary*/
}
.levers-column1 {
  flex-grow: 1;
  margin-right: 5px;
}
.levers-column2 {
  flex: none;
  width: 125px;
  margin-left: auto;
}
.levers-column3 {
  flex: none;
  width: 125px;
  margin-left: 10px;
}
</style>
