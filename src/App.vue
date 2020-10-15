<template>
  <div id="app" :class="{'mobile': appState.isMobile}">
    <div v-if="appState.isMobile" id="header-mask"></div>
    <Header :app-state="appState" :toggle-menu="toggleMenu"/>

    <div id="page-menu" ref="pagemenu" class="noselect" :class="{'page-menu-open': appState.menuOpen}">
      <div id="page-links">
        <span class="page-link-item" v-on:click="openHowToModal" :tabindex="appState.menuOpen ? 0 : -1">
          <span>HOW-TO</span>
        </span>
        <a class="page-link-item" href="http://www.european-calculator.eu/videos/" target="_blank" rel="noopener" :tabindex="appState.menuOpen ? 0 : -1">
          <span>VIDEOS</span>
          <img src="/img/open_in_new-black-18dp.svg">
        </a>
        <a class="page-link-item" href="http://european-calculator.eu" target="_blank" rel="noopener" :tabindex="appState.menuOpen ? 0 : -1">
          <span>PROJECT</span>
          <img src="/img/open_in_new-black-18dp.svg">
        </a>
        <!-- <a id="feedback" href="mailto:tpe-feedback@european-calculator.eu" :tabindex="appState.menuOpen ? 0 : -1">FEEDBACK</a> -->
        <a class="page-link-item" href="http://www.european-calculator.eu/documentation/" target="_blank" rel="noopener" :tabindex="appState.menuOpen ? 0 : -1">
          <span>SCIENCE</span>
          <img src="/img/open_in_new-black-18dp.svg">
        </a>
        <a class="page-link-item" href="mailto:tpe-feedback@european-calculator.eu" :tabindex="appState.menuOpen ? 0 : -1">
          <span>FEEDBACK</span>
          <img src="/img/mail_outline-black-18dp.svg">
        </a>
        <a class="page-link-item" href="/legal" :tabindex="appState.menuOpen ? 0 : -1">
          <span>LEGAL</span>
        </a>
      </div>
    </div>

    <transition name="modal-fade" mode="out-in">
      <!--key is necessary for transition, because both parts are the same type of html element (div)-->
      <div v-if="appState.mode==='main'" id="main" key="main">
        <InputsMobile v-if="appState.isMobile" :app-state="appState"/>
        <Inputs v-if="!appState.isMobile" :app-state="appState"/>

        <Outputs
          v-if="appState.activeTab!==null && appState.activeSubtab!==null"
          :app-state="appState"
        />
      </div>
      <div v-if="appState.mode==='target'" id="main" key="target">
        <Target :app-state="appState"/>
      </div>

      <div v-if="appState.mode==='legal'" id="main" key="legal">
        <LegalInfo :app-state="appState"/>
      </div>

      <div v-if="appState.mode==='intro'" id="main" key="intro">
        <Intro
          :app-state="appState"
          :open-how-to-modal="openHowToModal"
        />
      </div>

    </transition>

    <transition name="wait-fade">
      <div v-if="appState.isMobile && (appState.mode==='target' || appState.mode==='main')" id="bar-chart-cont-mob" class="noselect">
        <EmissionsBarMobile :app-state="appState"/>
      </div>
    </transition>

    <Modal :is-open="appState.modalFor" :has-close-button="true" :closing-callback="hideInputInfo">
      <LeverInfoWrapper :lever-id="appState.modalFor"/>
    </Modal>

    <div id="how-to-video">
      <Modal :is-open="howToOpen" :has-close-button="true" :closing-callback="closeHowToModal">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/oGQMc2-ruFg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Modal>
    </div>

  </div>
</template>

<script>
import * as dataService from './dataService.js';
import * as inputsService from './inputsService.js';
import Header from './components/Header.vue';
import Inputs from './components/Inputs.vue';
import Outputs from './components/Outputs.vue';
import Target from './components/Target.vue';
import Intro from './components/Intro.vue';
import LeverInfoWrapper from './components/LeverInfoWrapper.vue';
import Modal from './lib/Modal.vue';

export default {
  name: 'App',
  components: {
    Header, Target,
    Intro, Inputs, Outputs, Modal, LeverInfoWrapper,
    'LegalInfo': () => import('./components/LegalInfo.vue'),
    'InputsMobile': () => import('./components/InputsMobile.vue'),
    'EmissionsBarMobile': () => import('./components/EmissionsBarMobile.vue')
  },
  data() {
    return {
      // every existing object put inside here will be transformed into a reactive getter-setter construct
      appState: dataService.appState,
      howToOpen: false
    }
  },
  methods: {
    closeHowToModal() {
      this.howToOpen = false;
    },
    openHowToModal() {
      this.howToOpen = true;
    },
    autoCloseMenu(event) {
      if(!this.$refs.pagemenu.contains(event.target)) {
        this.appState.menuOpen = false;
        window.removeEventListener('click', this.autoCloseMenu);
      }
    },
    toggleMenu(event) {
      this.appState.menuOpen = !this.appState.menuOpen;
      if(this.appState.menuOpen) {
        if(event) {
          //this function can also be called directly (not as an event handler)
          event.stopPropagation();
        }
        window.addEventListener('click', this.autoCloseMenu);
      } else {
        window.removeEventListener('click', this.autoCloseMenu);
      }
    },
    hideInputInfo() {
      inputsService.hideInputInfo();
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  /*firefox flexbox overflow bug, https://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox*/
  min-height: 0;

  padding: 0px;
  position: relative;
  overflow-x: hidden; /*necessary for the page-menu*/
  background-color: #eee;
}
#header-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 56px;
  backdrop-filter: blur(2px);
  z-index: 109;
}
#main {
  flex-grow: 1;
  display: flex;
  max-width: 100%;

  /*firefox flexbox overflow bug, https://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox*/
  min-height: 0;
}

#page-menu {
  position: fixed;
  top: 0px;
  right: -3px;
  padding: 0px 10px 0px 20px;
  background-color: white;
  z-index: 110;
  height: 150%; /*150 instead of 100 for urlbar toggle on mobile*/
  transform: translateX(100%);
  transition: transform 0.2s cubic-bezier(0.77,0.2,0.05,1.0);
  border-left: 1px solid #6d6e71;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
}
#page-menu.page-menu-open {
  transform: translateX(calc(0% - 3px));
}
#page-links {
  margin-top: 80px;
}
.page-link-item {
  margin: 0px 0px 8px 0px;
  display: flex;
  align-items: center;
  color: black !important;
  transition: color 0.2s ease;
  font-size: 16px;
  cursor: pointer;
}
.page-link-item img {
  margin-left: 8px;
  opacity: 0.5;
}
#page-links a:focus {
  text-decoration: underline;
}

#bar-chart-cont-mob {
  position: fixed;
  width: 100%;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.3);
  background-color: rgba(255,255,255,0.7);
  backdrop-filter: blur(2px);
}


/* #feedback {
  color: tomato !important;
  animation: feedbackbling 3s infinite;
}

@keyframes feedbackbling {
  0%  { color: black; }
  50% { color: tomato; }
  100% {color: black;}
} */
#how-to-video {
  position: absolute;
  height: 0px;
}
#how-to-video .modal-content {
  padding-top: 35px;
}
#how-to-video iframe {
  height: 100%;
  width: 100%;
}

</style>
