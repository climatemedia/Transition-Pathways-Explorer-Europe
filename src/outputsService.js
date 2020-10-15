import Vue from "vue";
import * as helpers from './helpers.js';
import {findNullstellen} from './chartSeriesBuilders.js';

import * as dataService from './dataService.js';
import {appState} from './dataService.js';

export var tabs; // necessary for tab-menu and holding subtab information

// the chart identifiers only need to be unique inside their tab
export var chartDefinitions = [];

export var outputsByTabs = []; // necessary for fetching
export var outputs = {};  // holding the API response data

export var netZeroYear = {
  value: 0
}; // made reactive in EmissionsBar.vue

export var routes = {};    // tab-indices of routes
export var tabRoutes = {}; // routes of tab-indices

export var warningsInfos = {};
export var warnings = {
  // // structure example:
  // "warningId": "orange", //or 1/2
  // development data:
  // "Water scarcity": "orange",
  // "Drought risk": "red"
}; //reactive data!!

//don't write warnings into tabs Object, keep it separate
export var tabsWithWarnings = []; //reactive

export var outputsThatAreAlwaysRequested = [
  "clt_cum-emissions-CO2e[Mt]",
  "emissions-CO2e[Mt]"
];

var outputModifiers = {
  round: (value) => Math.round(value)
};

// countryzoom can also be disabled for an individual subtab with the countryZoomDisabled flag inside
// the subtab definitions
export var zoomableComponents = [
  'OneChart',
  'TwoCharts',
  'GHGEmissions',
  'ChangePerSector',
  'WagesPerSkill'
  // 'SingleStackedArea',
  // 'SingleLineChart',
  // 'SingleStackedAreaWithNegative',
  // 'SingleStackedAreaPercent',
  // 'TwoStackedArea',
  // 'TwoStackedArea100Percent',
  // 'TwoStackedAreaSideBySide'
];

export var chartTypeToComponentMap = {
  "Line": "LineChart",
  "StackedArea": "StackedAreaChart",
  "StackedAreaNegative": "StackedAreaChart",
  "StackedAreaPercent": "StackedAreaChart100Percent"
}

export function getOutputList() {
  var outputPoolObject = {};

  chartDefinitions.forEach((tab) => {
    Object.keys(tab).forEach((chartId) => {
      let chart = tab[chartId];
      // console.log('chart ', tab, chart);
      chart.outputs.forEach((output) => {
        outputPoolObject[output.id] = true;
      });
    });
  });

  outputsThatAreAlwaysRequested.forEach((outp) => {
    outputPoolObject[outp] = true;
  })

  console.log("getOutputList ", JSON.stringify(Object.keys(outputPoolObject),null,2));
}

function initChartsForTab(tabIndex, chartDefs) {
  chartDefinitions[tabIndex] = {};

  // outputsByTab need to hold at least en empty object for each tab
  createRowInOutputsByTab(tabIndex);

  Object.keys(chartDefs).forEach((chartId)=> {
    let chart = chartDefs[chartId];

    // convert output-string-array elements to objects
    let outputs = [];
    chart.outputs.forEach((outp) => {
      let output;

      if(helpers.isObject(outp)) {
        output = outp;
      } else if (typeof outp === 'string') {
        output = {id:outp};
      }

      if(!output) {
        return;
      }

      sortOutputIntoOutputsByTabs(tabIndex, output);

      outputs.push(output);
    });
    chart.outputs = outputs;

    // replace modifier string (if present) with modifier-function
    if(chart.modifier) {
      if(outputModifiers[chart.modifier]) {
        chart.modifier = outputModifiers[chart.modifier];
      } else {
        delete chart.modifier;
      }
    }

    // add chart to chartDefinitions
    chartDefinitions[tabIndex][chartId] = chart;
  });
}

function createRowInOutputsByTab(tabIndex) {
  outputsByTabs[tabIndex] = {};
}

function sortOutputIntoOutputsByTabs(tabIndex, outp) {
  // don't overwrite existing entries (we don't want to lose any allCountries flags)
  if(!outputsByTabs[tabIndex][outp.id]) {
    outputsByTabs[tabIndex][outp.id] = {};
  }
  if(outp.allCountries === true) {
    //won't be unset once it is set
    outputsByTabs[tabIndex][outp.id].allCountries = true;
  }
  // if(outp.color) {
  //   outputsByTabs[tabIndex][outp.id].color = outp.color;
  // }
}

function initSubtabsOfTab(subtabs) {
  return subtabs.map((subtab) => {
    // don't overwrite existing component properties (these are for custom components)
    if(!subtab.component) {
      if(subtab.charts.length === 1) {
        subtab.component = 'OneChart'
      }
      else if(subtab.charts.length === 2) {
        subtab.component = 'TwoCharts'
      }
    }
    return subtab;
  });
}

export function initTabs(tabData, allTabDetails) {
  tabs = [];

  tabData.forEach((tab, tabIndex) => {
    let tabObj = {
      title: tab.title,
      route: tab.route,
      subtabs: []
    };
    tabs.push(tabObj);

    let detailsKey = tab.detailsKey;
    if(!detailsKey) {
      return;
    }

    // get subtab-information
    let tabDetails = allTabDetails[detailsKey];
    if(!tabDetails) {
      return;
    }

    // init all charts for that tab (not subtab)
    initChartsForTab(tabIndex, tabDetails.charts);

    // determine component for subtab
    tabObj.subtabs = initSubtabsOfTab(tabDetails.subtabs);
  });
  console.log("initTabs", tabs, outputsByTabs);
}

export function initTabRoutes() {

  tabs.forEach((tab, tabIndex) => {
    routes[tab.route] = {index: tabIndex};
    tabRoutes[tabIndex] = {"route": tab.route};
    tab.subtabs.forEach(function(subtab, subTabIndex) {
      routes[tab.route][subtab.route]={index: subTabIndex};
      tabRoutes[tabIndex][subTabIndex] = {"route": subtab.route};
    });
  });

}

export function initWarningsInfos(warningInfoData) {
  console.log('initWarningsInfos ', warningInfoData)
  // warningsInfos = wrngs;
  Object.keys(warningInfoData).forEach((warnId) => {
    warningsInfos[warnId] = warningInfoData[warnId];
    // not async anymore, no Vue.set() necessay
    // Vue.set(warningsInfos, warnId, warningInfoData[warnId]);
  });
}

export function selectSubTab(ind, shouldSetURL) {
  //shouldSetURL should only be undefined when selectSubTab() is called from a route callback
  //because then the route/URL is apparently already correct
  appState.activeSubtab = ind; //import as appState, not as dataService.appState
  console.log('selectSubTab ', ind)
  if(shouldSetURL) {
    dataService.rewriteURL();
  }
}

export function selectTab(ind, subtabInd, shouldSetURL) {

  console.log('selectTab ', ind, appState.activeTab);

  if(appState.activeTab === ind) {
    //no need to start a fetch, if necessary just set the subtab (with updating the url) and exit
    if(appState.activeSubtab !== subtabInd) {
      selectSubTab(subtabInd, shouldSetURL);
    }
    // console.log('selectTab exit');
    return;
  }

  appState.activeTab = ind;
  appState.activeSubtab = subtabInd;

  if(appState.userAction.indexOf('tabChange') < 0) {
    appState.userAction.push('tabChange');
  }

  //shouldSetURL should only be false when selectTab() is called from certain route callbacks
  //this function can be called from a user-action or from a route-callback, if called from a route-callback, a url-rewrite is unwanted
  if(shouldSetURL) {
    dataService.rewriteURL();
  }

  //empty outputs object, but keep reference
  //changing outputs won't trigger any sub-tab watches since they are not mounted due to appState.userAction === 'tabChange'
  helpers.emptyObject(outputs);
}

export function setCountryZoom(index) {
  // console.log('setCountryZoom ', index);
  appState.countryZoomIndex = index;
  // if index is out of bounds or not supported by current subtab,
  // then it get's corrected in Outputs.vue on created() or on lastAPIResponse watch
}

export function calculateNetZero() {
  let nullStellenId = 'emissions-CO2e[Mt]';

  let nullstellenOutput = outputs[nullStellenId];

  let series = [{
    id: nullStellenId,
    data: nullstellenOutput.data['EU'].map((point) => {return {y:point};})
  }];

  let [nullstellen, nullStellenBySeriesId] = findNullstellen(nullstellenOutput.timeAxis, series);

  if(
    nullStellenBySeriesId &&
    Object.prototype.hasOwnProperty.call(nullStellenBySeriesId, nullStellenId) &&
    nullStellenBySeriesId[nullStellenId][0]
  ) {
    Vue.set(netZeroYear, 'value', Math.floor(nullStellenBySeriesId[nullStellenId][0]));
  } else {
    Vue.set(netZeroYear, 'value', 0);
  }
}

export function parseOutputs(raw) {
  raw.forEach(function(outpt) {
    //if output still undefined
    if(!outputs[outpt.id]) {
      Vue.set(outputs, outpt.id, {});
      let title = outpt.title;
      Vue.set(outputs[outpt.id], 'title', title ? title : outpt.id); //initialise title with id as fallback
    }
    //initially timeAxis is not present, so use Vue.set()
    Vue.set(outputs[outpt.id], 'timeAxis', outpt.timeAxis);

    Vue.set(outputs[outpt.id], 'data', outpt.data);
  });
  //console.log('parseOutputs ', outputs);
}

export function parseWarnings(warns) {

  let levelWords = ["orange", "red"];

  // clear warnings object
  // not actually necessary in the current code, but feels safer regarding future changes
  helpers.emptyReactiveObject(warnings);

  // clear the reactive tabsWithWarnings array first
  // don't assign a new array, because that would kill the reactivity
  helpers.emptyArray(tabsWithWarnings);

  warns.forEach((wrng) => {
    let id = wrng.id;
    if(!id) {
      return;
    }
    let level = parseInt(wrng.level);

    if([1,2].indexOf(level) < 0) {
      return;
    }

    level = levelWords[level-1];
    warnings[id] = level;
    // console.log('warningsInfos ', warningsInfos, id, warns);

    let warningInfo = warningsInfos[id];
    if(warningInfo && warningInfo.tabs) {
      warningInfo.tabs.forEach((tab)=> {
        if(tabsWithWarnings.indexOf(tab) < 0) {
          tabsWithWarnings.push(tab);
        }
      });
    }
  });
}
