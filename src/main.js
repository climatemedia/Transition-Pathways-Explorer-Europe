import './assets/css/style.css';

import Vue from 'vue';
import App from './App.vue';

import BrowserNotSupported from './BrowserNotSupported.vue';

import {appState} from './dataService.js';

import * as routeService from './routeService.js';
import * as inputsService from './inputsService.js';
import * as outputsService from './outputsService.js';
import * as leverData from './config/leverData.js';
import * as countryData from './config/countryData';
import {warnings} from './config/warningsInfos.js';

import {Tabs} from './config/tabItems.js';
import * as allTabDetails from './config/subtabs/subtabs.js';


Vue.config.productionTip = true;


function initRender() {
  new Vue({
    render: h => h(App)
  }).$mount('#app');
}

function renderBrowserNotSupported() {
  new Vue({
    render: h => h(BrowserNotSupported)
  }).$mount('#app');
}

(function init() {
  console.log('init');
  inputsService.parseLeverData(leverData.levers);
  inputsService.initCountries(countryData.Countries);

  outputsService.initTabs(Tabs, allTabDetails);
  outputsService.initTabRoutes();

  // uncomment in development
  // outputsService.getOutputList();

  outputsService.initWarningsInfos(warnings);

  // components need to be present before routeService initiates a fetch, because some components depend on API response
  // and it needs to be made sure, that the components are ready before the API repsonse is there
  // call initRender() before initialising the routes
  let browserSupported = checkBrowserSupport();
  if(browserSupported) {
    initRender();
  } else {
    renderBrowserNotSupported();
  }

  routeService.initRoutes();

  //check media query for mobile state
  checkIfMobile();
  //register media query listener on resize-window for mobile view:
  window.addEventListener('resize', checkIfMobile);

  // console.log('allTabDetails ', allTabDetails);

  // start async imports, maybe move that to dataService
  import('./config/leverHoverInfo.js').then(module => {
    //console.log('leverHoverInfo ', module.leverHoverInfo);
    //parseLeverHoverInfo in LeverService
    inputsService.parseTooltips(module.leverHoverInfo);
  });

})();

function checkIfMobile() {
  var mq = window.matchMedia("screen and (max-width: 1023px)");
  console.log('checkIfMobile ', mq.matches);
  appState.isMobile = mq.matches;
}

function checkBrowserSupport() {
  var ua = window.navigator.userAgent;
  // console.log('ua ', ua);
  let notSupported;

  let isIE = /MSIE|Trident/.test(ua);
  let isSafariOnMacintosh = (ua.indexOf('Macintosh') > -1 && ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') < 0);

  notSupported = (isIE || isSafariOnMacintosh);

  if ( notSupported ) {
    return false;
  }

  return true;
}
