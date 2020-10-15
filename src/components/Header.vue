<template>
  <div id="header">
    <div id="header-main">
      <div id="page-logo"
        :class="{'one-selected': !appState.isMobile && selected.length === 1, 'two-selected': !appState.isMobile && selected.length === 2 }"
      >
        <img class="cursor-pointer" src="/img/eucalc_logo-alt5.svg" v-on:click="reloadPage">
        <div id="page-title" class="cursor-pointer" v-on:click="reloadPage">
          EU<span>CALC </span><br>
        </div>
      </div>

      <transition name="wait-fade">
        <div v-if="!appState.isMobile && (appState.mode==='target' || appState.mode==='main')" id="bar-chart-cont" class="noselect">
          <EmissionsBar :app-state="appState"/>
        </div>
      </transition>

      <div id="page-menu-toggle">
        <BurgerMenuIcon :callback="toggleMenu" :open="appState.menuOpen"/>
      </div>

    </div>

  </div>
</template>

<script>
import * as inputsService from '../inputsService.js';

import BurgerMenuIcon from '../lib/BurgerMenuIcon.vue';


export default {
  name: 'Header',
  props: ['appState', 'toggleMenu'],
  components: {
    BurgerMenuIcon,
    'EmissionsBar': () => import('./EmissionsBar.vue')
  },
  data() {
    return {
      menuOpen: false,
      selected: inputsService.selected // also put on data() in Inputs.vue
    }
  },
  methods: {
    reloadPage() {
      window.location.href = window.location.origin;
    }
  }
}
</script>

<style>
#bar-chart-cont {
  flex-grow: 1;
  align-self: flex-end;
  margin-right: 100px;
}

#page-menu-toggle {
  align-self: center;
  margin-right: 15px;
  margin-left: auto;
}
</style>
