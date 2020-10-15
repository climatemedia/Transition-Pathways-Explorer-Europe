<template>
  <div id="levers" class="noselect">
    <div v-for="sector in sectors" class="levers-sector" :key="sector.headline">

      <div class="sector-title">
        <span>{{sector.headline}}</span>
      </div>

      <div v-if="sector.groups" class="levers-groups-cont">
        <div v-for="groupid in sector.groups" :key="groupid" class="levers-group">
          <div v-if="groups[groupid].title !== sector.headline"
            class="levers-group-title-cont"
            :class="{'group-open': !groups[groupid].hidden}"
          >
            <div class="levers-group-title levers-column1" v-on:click="toggleGroup(groupid)">
              <img src="/img/arrow-right.svg" class="levers-group-title-arrow" :class="{rotate90: !groups[groupid].hidden}">
              <span>{{groups[groupid].title}}</span>
            </div>

            <span v-if="groups[groupid].range" v-for="(country,counIndex) in selected" class="group-lever-cont" :key="country.id"
            :class="{'levers-column2': counIndex === 0, 'levers-column3': counIndex === 1}"
            >
              <GroupLever
                :groupid="groupid" :range="groups[groupid].range" :country="country"
                :app-state="appState"
                :deactivated="groups[groupid].deactivated"
              />
            </span>
          </div>

          <!--
            group control needs to update automatically when one of the inner lever changes, separate component

            needs to be wrapped in ConditionalAutoHeight with v-show on group-visib-status (default is visible) group.isHidden==true
            countries need to be in the same wrapper, because multiple wrappers could be slightly out of sync

            a group with no own title (groups[groupid].title === sector.headline) is always visible
          -->
          <ConditionalAnimateHeight :visible="!groups[groupid].hidden || groups[groupid].title === sector.headline || groupHasLeverWithWarning(groupid)">
            <div v-for="leverid in groups[groupid].levers" :key="leverid"
              class="levers-group-levers" v-on:mouseleave="deactivateTooltip()"
              :class="{'lever-highlighted': highlightedLevers[leverid]}"
            >
              <span class="levers-title levers-column1"
                v-on:mouseenter="activateTooltip(leverid)"
              >
                <span v-on:click="showLeverInfo(leverid)" class="levers-title-text">{{levers[leverid].title}}</span>
                <div v-if="tooltips[leverid] && tooltips[leverid].desc" class="lever-descr-tooltip" :class="{'visible': leverid===activeTooltip}">
                  <div>{{tooltips[leverid].desc}}</div>
                </div>
              </span>

              <!-- single controls (int/char) are separate components-->
              <span v-for="(country,countryIndex) in selected" class="single-lever-cont noselect" :key="country.id"
                :class="{'levers-column2': countryIndex === 0, 'levers-column3': countryIndex === 1,}"
              >
                <SingleLeverNum v-if="levers[leverid].type==='num'"
                  :leverid="leverid" :range="levers[leverid].range" :value="country.values[leverid]" :country="country"
                  :tooltip-visible="leverid===activeTooltip" :activate-tooltip="activateTooltip" :deactivate-tooltip="deactivateTooltip"
                  :app-state="appState"
                  :deactivated="groups[groupid].deactivated || (countryIndex > 0 && levers[leverid].isEUOnly)"
                />
                <SingleLeverChar v-if="levers[leverid].type==='char'"
                  :leverid="leverid" :range="levers[leverid].range" :value="country.values[leverid]" :country="country"
                  :tooltip-visible="leverid===activeTooltip" :activate-tooltip="activateTooltip" :deactivate-tooltip="deactivateTooltip"
                  :app-state="appState"
                  :deactivated="groups[groupid].deactivated || (countryIndex > 0 && levers[leverid].isEUOnly)"
                />
              </span>
            </div>
          </ConditionalAnimateHeight>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import * as inputsService from '../inputsService.js';
import ConditionalAnimateHeight from '../lib/ConditionalAnimateHeight.vue';
import GroupLever from './GroupLever.vue';
import SingleLeverNum from './SingleLeverNum.vue';
import SingleLeverChar from './SingleLeverChar.vue';

export default {
  name: 'Levers',
  components: {
    ConditionalAnimateHeight,
    SingleLeverNum,
    SingleLeverChar,
    GroupLever
  },
  props: ['selected', 'appState'],
  data() {
    return {
      groups: inputsService.leverGroups, //reactive because of .hidden property
      tooltips: inputsService.tooltips, //reactive because async import with Vue.set() for initialisation
      activeTooltip: undefined,
      highlightedLevers: inputsService.highlightedLevers //reactive because changes depending on which warning is opened
    }
  },
  created() {
    this.levers = inputsService.levers;
    this.sectors = inputsService.leverSectors;
    this.timerId = undefined;
  },
  methods: {
    groupHasLeverWithWarning(groupId) {
      return this.groups[groupId].levers.some((leverId) => {
        return this.highlightedLevers[leverId];
      });
    },
    toggleGroup(gId) {
      if(this.groups[gId].hidden) {
        this.$delete(this.groups[gId], 'hidden');
      } else {
        this.$set(this.groups[gId], 'hidden', true);
      }
    },
    showLeverInfo(leverId) {
      inputsService.showInputInfo(leverId);
    },
    activateTooltip(leverid, callback) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout( () => {
        if(callback) {
          callback()
        }
        this.activeTooltip = leverid;
      }, 500);
    },
    deactivateTooltip() {
      this.activeTooltip = undefined;
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#levers {
  flex-grow: 1;
  overflow-y: scroll; /*always visible better than toggle, because when toggle the container width changes too*/
  padding-top: 30px;
  border-top: 2px solid #d4d4d4;
  border-bottom: 2px solid #d4d4d4;
}
.sector-title {
  padding-left: 5px;
  font-size: 17px;
  color: #2d2d2d;
  margin-top: 10px;
}
.levers-group-title-cont {
  display: flex;
  align-items: center;
  padding: 2px 0px;
  border-top: 1px solid transparent;
}
.levers-group-title {
  padding-left: 10px;
  height: 24px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.levers-group-title span {
  margin-left: 10px;
}
.levers-group-title-arrow {
  height: 10px;
  transform: rotate(0deg);
  transform-origin: center center;
  transition: transform 0.2s ease;
}
.levers-group-title-arrow.rotate90 {
  transform: rotate(90deg);
}
.levers-title {
  position: relative;
  padding-left: 30px;
  font-size: 16px;
  box-sizing: border-box;
  color: #5e5e5e;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}
.levers-title-text {
  cursor: pointer;
}
.lever-descr-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 10px;
  background-color: #595959;
  color: white;
  padding: 5px;
  opacity: 0;
  min-height: 30px;
  line-height: 20px;
  font-size: 16px;
  width: 300px;
  border-radius: 4px;
  transition: opacity 0.0s ease;
  transition-delay: 0s;
  box-shadow: 1px 1px 3px 0px rgba(163,163,163,1);
  z-index: 1000;
  pointer-events: none;
}
.lever-descr-tooltip::after{
  content: '';
  position: absolute;
  bottom: -10px;
  left: 20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 16px 10px 0 10px;
  border-color: #595959 transparent transparent transparent;
  z-index: 2000;
}
.levers-title:hover .lever-descr-tooltip.visible {
  opacity: 1;
}

.levers-group-levers {
  display: flex;
  align-items: center;
  padding: 4px 0px; /*needs to be padding, because ConditionalAnimateHeight ignores margin for now*/
}
.levers-group-levers:last-child {
  padding-bottom: 20px;
}
.levers-group-levers.lever-highlighted .levers-title {
  color: tomato !important;
}

.levers-group-title-cont:hover .levers-group-title, .levers-group-levers:hover .levers-title {
  color: #27aae1;
  transition-duration: 0s;
}

.single-lever-cont, .group-lever-cont {
  display: flex;
}

.single-lever-step-connector {
  position: absolute;
  top: -12px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 16px 10px 0 10px;
  border-color: #595959 transparent transparent transparent;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
}

.single-lever-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  right: 0px;
  background-color: #595959;
  color: white;
  padding: 5px;
  opacity: 0;
  min-height: 30px;
  line-height: 20px;
  font-size: 16px;
  width: 200px;
  border-radius: 4px;
  transition: opacity 0.0s ease;
  transition-delay: 0s;
  box-shadow: 1px 1px 3px 0px rgba(163,163,163,1);
  z-index: 1000;
  pointer-events: none;
}
.single-lever:hover .single-lever-tooltip.visible, .single-lever:hover .single-lever-step-connector.visible {
  opacity: 1;
}

</style>
