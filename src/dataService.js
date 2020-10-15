import * as helpers from './helpers.js';
import axios from 'axios';

import * as inputsService from './inputsService.js';
import * as outputsService from './outputsService.js';

// appState is made reactive in App.vue component
// many of the properties are actually settings (they don't change)
// but for simplicity reasons (only one object), state and settings both live in the appState object
export var appState = {
  budgetTemperature: 2,
  budgetFairness: 'capability',
  userAction: [], //on mobile there can be multiple actions before a fetch is started
  waitingForAPI: false,
  menuOpen: false,
  countryZoomIndex: 0,  //no route parameter for actually preselecting a country, always EU by default,
                        //regardless of a country being selected
  countryZoomDisabled: false,
  // examplePathwaysOnly: true, // user cannot change lever-settings freely, can only choose from examplePathways
  modalFor: undefined, //either undefined or holds a leverId
  pathwayIndex: -1,  // -1: no pathway selected, 0+: index of the examplePathway Array
  mode: undefined, // better name would be "view". Possible values: 'legal', 'target', 'intro'
  lastAPIResponse: undefined, //timestamp
  lastAPIAction: undefined, // last appState.userAction
  responseStatus: "",
  activeTab: null,  //only gets set inside outputsService.selectTab which also gets called over routing
                    //needs to be null on page-load (see App.vue and routeService)
  activeSubtab: null, //only gets set inside outputsService.selectTab which also gets called over routing
  mainScreenRouteString: '/app/', //home link by default
  isMobile: undefined,
  inputLatency: 0, // latency for lever change, 500 normally
  onlyExamplePathwayRoutes: false, // restricts routes to examplePathways
  showMissingOutputs: true,
  noDecimalLevers: false,
  quickDataAvailable: true //[true, false] consider using 'undefined' as a third possible state
};

export function updateURLParams() {
  // updates the URL Params (after lever change etc.)
  // is not responsible for the routes (requestURI), that is handled by rewriteURL

  //EU - default parameters
  let leverStringEU = inputsService.pathwayObjectToParamString(inputsService.selected[0].values)

  var urlParams = new URLSearchParams(window.location.search);


  if(leverStringEU) {
    urlParams.set('levers', leverStringEU);
  }

  if(inputsService.selected[1]) {
    let leverStringSingleCountry = inputsService.pathwayObjectToParamString(inputsService.selected[1].values)
    let countryCode = inputsService.selected[1].id.toUpperCase();

    if(leverStringSingleCountry && countryCode) {
      urlParams.set('other', leverStringSingleCountry);
      urlParams.set('country', countryCode);
    } else {
      urlParams.delete('other');
      urlParams.delete('country');
    }
  } else {
    urlParams.delete('other');
    urlParams.delete('country');
  }

  return urlParams;
}

export function rewriteURL(params = new URLSearchParams(window.location.search)) {
  // params has a default value, which is evaluated each time rewriteURL() is called without parameters

  let routeString = '/app/'+outputsService.tabRoutes[appState.activeTab].route + "/";
  routeString += outputsService.tabRoutes[appState.activeTab][appState.activeSubtab].route+"/";
  routeString += '?'+params.toString();

  // console.log('rewriteURL ', routeString);

  history.pushState({path: routeString}, null, routeString);

  appState.mainScreenRouteString = routeString;
}

export function createRouteString() {
  //creates routeString from app data

  var urlParams = new URLSearchParams(window.location.search);

  let leverStringEU = inputsService.pathwayObjectToParamString(inputsService.selected[0].values);

  if(leverStringEU) {
    urlParams.set('levers', leverStringEU);
  }

  //if a country was selected
  if(inputsService.selected[1]) {
    let leverStringSingleCountry = inputsService.pathwayObjectToParamString(inputsService.selected[1].values);
    let countryCode = inputsService.selected[1].id.toUpperCase();

    if(leverStringSingleCountry && countryCode) {
      urlParams.set('other', leverStringSingleCountry);
      urlParams.set('country', countryCode);
    } else {
      urlParams.delete('other');
      urlParams.delete('country');
    }
  } else {
    urlParams.delete('other');
    urlParams.delete('country');
  }

  let routeString = '/app/'+outputsService.tabRoutes[appState.activeTab].route + "/";
  routeString += outputsService.tabRoutes[appState.activeTab][appState.activeSubtab].route+"/";
  routeString += '?'+urlParams.toString();

  return routeString;
}

function buildRequestBody() {

  let leversByRegion = inputsService.getLeversByRegion();
  let outpts = outputsService.outputsByTabs[appState.activeTab];

  outputsService.outputsThatAreAlwaysRequested.forEach((id) => {
    // only create entry if output is not already present, we don't want to overwrite any existing allCountries flags
    if(!outpts[id]) {
      outpts[id] = {};
    }
  });

  // console.log('leversByRegion ', leversByRegion);
  let levers = {};
  // some destructuring magic: who needs loops anymore, unless you want to keep it readable :S
  // nested destructuring assignment
  // the key 'EU' of the RIGHT side get's written into levers['default']
  // the rest (Object) get's written into the levers['exceptions'] object
  ({ ['EU']: levers['default'], ...levers['exceptions']} = leversByRegion);

  var requestBody = {
    levers: levers,
    outputs: []
  };

  Object.keys(outpts).forEach((outp) => {
    let _outp = {id: outp};
    if(outpts[outp].allCountries) {
      _outp.allCountries = true;
    }
    requestBody.outputs.push(_outp);
  });

  return requestBody;
}

export function availabilityRequest() {
  // checks if data would be available quickly, but doesn't set anything
  // good would be a separate endpoint in the API

  // response sets appState.quickDataAvailable = [true, false] consider using 'undefined' as a third possible state
  // any succesful response of a real request changes the status of appState.quickDataAvailable to true
  var requestBody = buildRequestBody();

  if(!requestBody.outputs.length) {
    // don't send request if outputs is empty, the API would return an error in that case
    // important: also reset appState.userAction on this exit point! (some subtabs might not depend on API data)
    appState.userAction = [];
    return;
  }

  fetch(requestBody).then(function (response) {
    // console.log('availabilityRequest ', response);
    if(response.data.status === "nodata") {
      appState.quickDataAvailable = false;
    } else {
      appState.quickDataAvailable = true;
    }
  }).catch(function (error) {
    if (axios.isCancel(error)) {
      appState.quickDataAvailable = true;
      //console.log('Request canceled');
    } else {
      appState.quickDataAvailable = true;
    }
  });

}

export function fetchFromModelAPI() {
  var requestBody = buildRequestBody();
  requestBody.getFromModel = true;

  if(!requestBody.outputs.length) {
    //don't send request if outputs is empty, the API would return an error in that case
    //important: also reset appState.userAction on this exit point! (some subtabs might not depend on API data)
    appState.userAction = [];
    return;
  }

  inputsService.deactivateGroups(Object.keys(inputsService.leverGroups));
  appState.countryZoomDisabled = true;

  appState.waitingForAPI = true;

  fetch(requestBody).then(function (response) {
    parseData(response);
    inputsService.activateAllGroups();
    appState.countryZoomDisabled = false;
  }).catch(function (error) {
    if (axios.isCancel(error)) {
      //console.log('Request canceled');
    } else {
      // console.log('fetch error ', error);
      onFetchError();
    }
    inputsService.activateAllGroups();
    appState.countryZoomDisabled = false;
  });
}

export var debouncedFetch = helpers.debounce(fetchData, appState.inputLatency);

export function fetchData() {
  var requestBody = buildRequestBody();
  // console.log('requestBody ', requestBody);

  if(!requestBody.outputs.length) {
    //don't send request if outputs is empty, the API would return an error in that case
    //important: also reset appState.userAction on this exit point! (some subtabs might not depend on API data)
    appState.userAction = [];
    return;
  }

  appState.waitingForAPI = true;

  fetch(requestBody).then(function (response) {
    parseData(response);
  }).catch(function (error) {
    if (axios.isCancel(error)) {
      //console.log('Request canceled');
    } else {
      //console.log('fetch error ', error);
      onFetchError();
    }
  });
}


// for cancelling old requests (only the last request should get processed, previous ones should get cancelled)
// especially since previous requests could take longer to be answered than the last one!!
// --> in that case the processed answer wouldn't match the request anymore
var apiCall;
function fetch(requestBody) {
  var baseUrl = '/results';
  var target = '';

  //cancelling pending axios request, if any
  if(apiCall) {
    apiCall.cancel(); //axios functionality
  }
  apiCall = axios.CancelToken.source(); //source() is a factory function

  //returning a promise
  return axios.post(baseUrl+target, requestBody, { cancelToken: apiCall.token });
}

function parseData(response) {
  //response has been partially parsed already by axios
  // console.log('response there', response.data);

  appState.responseStatus = response.data.status;

  if(appState.responseStatus !== "nodata" && appState.responseStatus !== "busy") {
    outputsService.parseOutputs(response.data.outputs);
    outputsService.calculateNetZero();
    outputsService.parseWarnings(response.data.warnings);
  }

  if(appState.userAction.indexOf('countryChange') >= 0) {
    outputsService.setCountryZoom(1);
  }

  if(appState.isMobile) {
    // resetting to default state
    appState.quickDataAvailable = true;
  }

  appState.waitingForAPI = false;
  appState.lastAPIAction = appState.userAction;
  appState.userAction = [];
  appState.lastAPIResponse = Date.now();
}

function onFetchError() {
  if(appState.isMobile) {
    // resetting to default state
    appState.quickDataAvailable = true;
  }

  appState.waitingForAPI = false;
  appState.lastAPIAction = appState.userAction;
  appState.userAction = []; //reset appState, optional here
  appState.lastAPIResponse = Date.now();
}
