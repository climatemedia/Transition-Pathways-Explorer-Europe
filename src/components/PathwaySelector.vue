<template>
  <div id="levers-pathways">
    <div id="levers-pathway-title">Choose example pathway for Europe: </div>
    <div id="levers-pathways-select">
      <select v-on:change="selectPathway">
        <option disabled value="" :selected="appState.pathwayIndex < 0"></option>
        <option v-for="(pathway, index) in examplePathways"
          :key="pathway.title"
          :value="index"
          :selected="appState.pathwayIndex == index"
        >{{pathway.title}}</option>
      </select>

      <img class="info-button" src="/img/info.svg" v-on:click="openDescription">
    </div>

    <Modal ref="pathwaymodal" :always-rendered="true" has-close-button="true">
      <div id="pathway-info">
        <h2 id="pathway-headline">Pathways descriptions</h2>
        <div id="pathway-descriptions">
          <div class="pathway-details" v-for="pathway in examplePathways" :key="pathway.title">
            <div class="pathway-info-title">{{pathway.title}}:</div>
            <div class="pathway-info-description">{{pathway.description}}</div>
          </div>
        </div>
      </div>
    </Modal>

  </div>
</template>

<script>
import * as dataService from '../dataService.js';
import * as inputsService from '../inputsService.js';
import Modal from '../lib/Modal.vue';

export default {
  name: 'Inputs',
  components: {
    Modal
  },
  props: ['appState'],
  data() {
    return {
    }
  },
  created() {
    this.examplePathways = inputsService.examplePathways;
  },
  methods: {
    openDescription() {
      this.$refs.pathwaymodal.openModal();
    },
    selectPathway(evt) {
      // the value-attribute can be tampered with by the user, parseInt kind of filters the user-input
      // state radix for parseInt, because the value can be '0' and JS could choose octal OR decimal in that case
      var index = parseInt(evt.target.value, 10);
      if(!Number.isNaN(index) && this.examplePathways[index]) {

        inputsService.setExamplePathway(index);

        // Desktop only
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
}
</script>

<style>
#levers-pathways {
  background-color: #d4d4d4;
}
#levers-pathway-title {
  padding: 6px 5px 0px 5px;
  font-weight: bold;
  color: #808080;
}

#levers-pathways-select {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 14px 0px;
}
#levers-pathways-select select {
  height: 28px;
  font-size: 16px;
  padding: 0px 4px;
}

.info-button {
  margin-left: 20px;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: serif;
  border: 1px solid grey;
  cursor: pointer;
  background-color: grey;
  color: white;
  font-weight: bold;
}
#pathway-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#pathway-headline {
  margin: 20px 0px;
  padding-left: 20px;
}
#pathway-descriptions {
  flex-grow: 1;
  overflow: auto;
  padding: 0px 20px;
}
.pathway-details {
  margin: 20px 0px;
}
.pathway-info-title {
  font-weight: bold;
  margin-bottom: 3px;
}
.pathway-info-description {
  white-space: pre-wrap;
}
</style>
