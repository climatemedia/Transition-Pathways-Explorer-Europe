import Vue from "vue"; //vue.set() used with selected, maybe not necessary
import * as helpers from './helpers.js';

import {appState} from './dataService.js';

import {paramToValueMap, valueToParamMap} from './config/pathwayValueMap.js';
import {ExamplePathways} from './config/examplePathways.js';

// lever data
export var leverSectors;
export var leverGroups;   //reactive, used inside data() in Levers.vue
export var levers = {};
export var leverOrder=[];
export var highlightedLevers = {};
export var euOnlyLevers = ["lever_bal-strat", "lever_str_charging"]; // ["lever_passenger_modal-share"];

// example-Pathways
export var examplePathways = ExamplePathways;

// countries
export var countries; //does not contain "EU" entry
export var selected = []; // reactive
export var selectableCountries = [];

var defaultValues = {};

// tooltips
export var tooltips = {};

// onepagers
export var onepagers = {}; // content loaded asynchronously

function initSingleLever(rawLever) {

  let levObj = {
    title: rawLever.title,
    range: [],
    type: rawLever.type ? rawLever.type : 'num' //'num' is the default type
  }
  if(rawLever.range) {
    rawLever.range.forEach((step, index) => {
      levObj.range.push(index+1);
    });
  } else {
    levObj.range = [1,2,3,4] //default range
  }

  // set the isEUOnly flag if lever is eu-only-lever
  if(euOnlyLevers.includes(rawLever.code)) {
    levObj.isEUOnly = true;
  }

  levers[rawLever.code] = levObj;
  leverOrder.push(rawLever.code);
}

export function parseLeverData(data) {
  // translates API lever response to the structure the front-end understands
  let topGroups = [];
  let groups = {};

  data.forEach((lever)=> {
    //sort in lever info
    initSingleLever(lever);

    //sort in group info
    if(!groups[lever.group]) {
      groups[lever.group] = {
        title: lever.group,
        levers: [lever.code],
        deactivated: false
      };
    } else {
      groups[lever.group].levers.push(lever.code);
    }

    //sort in topGroup info (leverSectors)
    let topGroup;

    //Array.find() not supported in IE
    topGroups.some((tg, index) => {
      if(tg.headline === lever.headline) {
        topGroup = topGroups[index];
        return true;
      } else {
        return false;
      }
    });

    if(!topGroup) {
      topGroups.push({
        headline: lever.headline,
        groups:[lever.group]
      });
    } else {
      //only add group once, skip if group is already present!
      if(topGroup.groups.indexOf(lever.group) < 0) {
        topGroup.groups.push(lever.group);
      }
    }

  });

  // console.log('parseLeverData ', levers);
  initleverSectors(topGroups);
  initleverGroups(groups);
}

function initleverSectors(sectors) {
  leverSectors = sectors;
}

function initleverGroups(groups) {
  leverGroups = groups;

  Object.keys(leverGroups).forEach(function(groupId) {

    // test if all ranges within that group are equal.
    // If yes, the group get's its own range property which allows for a group-lever

    let group = leverGroups[groupId];

    //abort if the group doesn't have a title, then it's maximized and non-interactive by default
    //basically it's not really visible then, but its content is
    if(!group.title) {
      return;
    }

    let range = levers[group.levers[0]].range.slice();

    let equal = group.levers.every(function(levId) {
      return (helpers.arraysEqual(range,levers[levId].range.slice()));
    });

    if(equal) {
      group.range = range;
      group.type = levers[group.levers[0]].type;
    }
    //minimize group by default
    group.hidden = true;
  });
  console.log('initleverGroups ', leverGroups);
}

export function initCountries(countrs) {

  countries = countrs;

  selectableCountries = [];

  Object.keys(countrs).forEach(function(id) {
    selectableCountries.push({id: id, name: countrs[id].name});
  });
  //sort them alphabetically
  selectableCountries.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  })

  selected.push( {
    id: "EU",
    name: "Europe",
    values: {...defaultValues}
  });

}

export function deactivateGroups(arrayOfGroupIds) {
  arrayOfGroupIds.forEach((id)=> {
    let group = leverGroups[id];
    if(group) {
      // "deactivated" is a reactive property
      group.deactivated = true;
    }
  });
}

export function activateAllGroups() {
  Object.keys(leverGroups).forEach((id)=> {
    // "deactivated" is a reactive property
    leverGroups[id].deactivated = false;
  });
}

export function deactivateCountryZoom() {
  appState.countryZoomDisabled = true;
}

export function activateCountryZoom() {
  appState.countryZoomDisabled = false;
}

export function paramStringToPathway(paramString) {
  // paramString needs to be a string
  // returns an array of lever-settings [1,1.2,4,2,...]
  // returns false if conversion fails (paramString invalid)

  // console.log('paramStringToPathway ', paramString);
  let pathwayString = paramString.split('');
  let pathway = [];

  pathwayString.forEach((character) => {
    //console.log('character ', character);
    let value = paramToValueMap[character];
    if(value) {
      pathway.push(value);
    }
  });

  if(pathway.length !== leverOrder.length) {
    //console.log('paramStringToPathway ', pathway);
    return false;
  } else {
    return pathway;
  }

}

export function pathwayObjectToParamString(pathwayObj) {

  let paramString = '';
  leverOrder.forEach((id) => {
    let val = pathwayObj[id];
    let character = valueToParamMap[val];
    if(character) {
      paramString += character;
    }
  });

  if(paramString.length !== leverOrder.length) {
    console.log('length doesnt match ', paramString)
    return ''; //returning empty string (falsy)
  } else {
    return paramString;
  }
}

export function setInputsFromURLParameters(euLeversString, otherLeversString, country_Code) {
  // sets the inputs state according to the given parameters, falls back to the first example pathway if
  // any of the parameters is not valid

  console.log('setInputsFromURLParameters ', euLeversString, otherLeversString, countryCode);
  let europePathway;
  let countryPathway;
  let countryCode;

  // validating paramters
  if(euLeversString) {
    europePathway = paramStringToPathway(euLeversString);
  }
  if(otherLeversString && country_Code) {
    countryCode = country_Code.trim().substring(0,2).toUpperCase();
    countryPathway = paramStringToPathway(otherLeversString);
  }

  // setting inputs state
  if(europePathway) {
    setPathway(europePathway, 'EU');
  } else {
    setExamplePathway(0);
  }
  if(isCountryCodeValid(countryCode) && countryPathway) {
    setSelectedCountry(countryCode);
    setPathway(countryPathway, countryCode);
  } else {
    unselectCountry();
  }
}

export function resetHighlightedLevers() {
  Object.keys(highlightedLevers).forEach((key) => {
    Vue.delete(highlightedLevers, key);
  });
}

export function addToHighlightedLevers(levIds) {
  levIds.forEach((id)=> {
    Vue.set(highlightedLevers, id, true);
  });
}

export function isCountryCodeValid(code) {
  return countries[code] && code !== "EU";
}

export function unselectCountry() {
  Vue.delete(selected, '1');
  appState.countryZoomIndex = 0; // for outputs

  if(appState.userAction.indexOf('countryChange') < 0) {
    appState.userAction.push('countryChange');
  }
}

export function setSelectedCountry(id) {
  //for now it only sets the second country with the EU values as initial values

  //check if id exists!! Because this function is also called from route
  if(!countries[id]) {
    return;
  }

  Vue.set(selected, 1, {
    id: id,
    name: countries[id].name,
    values: {...selected[0].values} //JS spread syntax
  });

  // Some levers don't allow any changes on a single country-level, but just EU-values.
  // Define a getter for each "eu-values-only-lever" that points to the EU-value of that lever
  // this also triggers on routing and url-parameter values get corrected
  // because during routing:
  // 1. appState is set according to url-parameters
  //    during that step the app-state is adapted if the parameters are invalid
  //    or if levers are eu-only-values
  // 2. at the end of the route process the querystring gets updated to the actual app-state
  euOnlyLevers.forEach((leverId)=> {
    Object.defineProperty(selected[1].values, leverId, {
      get: function() {
        return selected[0].values[leverId];
      }
    });
  });

  if(appState.userAction.indexOf('countryChange') < 0) {
    appState.userAction.push('countryChange');
  }

}

export function setExamplePathway(index) {
  //sets the pathway for EU and for the selected country (if any)
  let examplePathway = examplePathways[index];
  if(!examplePathway) {
    return;
  }
  console.log('setExamplePathway ', examplePathway.values);
  selected.forEach((region) => {
    setPathway(examplePathway.values, region.id);
  });

  appState.pathwayIndex = index;
}

export function setPathway(pathway, regionCode) {
  // pathway: an array of numerical lever-settings in the order of the url-param, like: [1,1.1,2,1,...]
  // TODO: return false if no region found or pathway has wrong format
  let leversSettings = pathway;

  //1. find region entry in selected
  let regionIndex;
  for(let i=0, len=selected.length; i<len; i++) {
    if(selected[i].id === regionCode) {
      regionIndex = i;
      break;
    }
  }

  if(typeof regionIndex !== 'undefined') { //regionIndex can be zero

    let val;
    let rangeMax;
    leverOrder.forEach((id, ind) => {
      val = leversSettings[ind];

      rangeMax = levers[id].range[levers[id].range.length-1]; //the actual last entry
      val = val > rangeMax ? rangeMax : val;

      Vue.set(selected[regionIndex].values, id, val);
    });

    if(appState.userAction.indexOf('leverChange') < 0) {
      appState.userAction.push('leverChange');
    }
  }
}

export function checkIfLeversMatchExamplePathway() {
  //checks for EU values AND selected country values (if any) matching any example pathway

  let currEUValues = paramStringToPathway(pathwayObjectToParamString(selected[0].values));

  let currSingleCountryValues;
  if(selected[1]) {
    currSingleCountryValues = paramStringToPathway(pathwayObjectToParamString(selected[1].values));
  }

  for(let i=0, len=examplePathways.length; i<len; i++) {
    if(helpers.arraysEqual(currEUValues, examplePathways[i].values)) {
      if(currSingleCountryValues) {
        if(helpers.arraysEqual(currSingleCountryValues, examplePathways[i].values)) {
          appState.pathwayIndex = i;
          return true;
        }
      } else {
        appState.pathwayIndex = i;
        return true;
      }
    }
  }
  // important, if pathway doesn't match an example pathway reset the pathwayIndex
  appState.pathwayIndex = -1;
  return false;
}

export function setGroupValue(country, groupid, value) {
  let group = leverGroups[groupid];
  group.levers.forEach(function(levId) {

    // make sure to ignore getter-functions (which can only be defined on non-EU values)
    if(levers[levId].isEUOnly && country.id !== 'EU') {
      return;
    }
    country.values[levId+''] = value;
  });

  checkIfLeversMatchExamplePathway();

  if(appState.userAction.indexOf('leverChange') < 0) {
    appState.userAction.push('leverChange');
  }
}

export function setValue(country, leverid, value) {
  // country is reactive, because it is part of selected!!
  country.values[leverid+''] = value;

  checkIfLeversMatchExamplePathway();

  if(appState.userAction.indexOf('leverChange') < 0) {
    appState.userAction.push('leverChange');
  }
}


export function getLeversByRegion() {
  let countryCodes = selected.map((region) => region.id);

  let levsByRegion = {};
  countryCodes.forEach((code) => {
    levsByRegion[code] = [];
  });

  leverOrder.forEach((leverId) => {
    countryCodes.forEach((code, countryIndex) => {
      let value = selected[countryIndex].values[leverId];
      levsByRegion[code].push(value);
    });
  });

  console.log('getLeversByRegion ', levsByRegion);
  return levsByRegion;
}

export function showInputInfo(leverId) {
  appState.modalFor = leverId;
}

export function hideInputInfo() {
  appState.modalFor = undefined;
}

export function parseTooltips(toolTipData) {
  //adding
  Object.keys(toolTipData).forEach((levrId) => {
    Vue.set(tooltips, levrId, toolTipData[levrId]);
  });
}
