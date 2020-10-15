import page from 'page';

import * as dataService from './dataService.js';
import * as outputsService from './outputsService.js';
import * as inputsService from './inputsService.js';

import {appState} from './dataService.js';

var shouldFetch = true; //default

function compareQueryParameters(qs1,qs2) {
  // compares the parameters of two query strings, doesn't directly compare the strings with each other,
  // because the order of parameters might be different, which is irrellevant when one wants to know
  // if the parameters match.

  let params1 = new URLSearchParams(qs1);
  let params2 = new URLSearchParams(qs2);

  let matching = true;

  // params.keys() returns an iterator
  for(let p of params1.keys()) {
    if(!params2.has(p) || params2.get(p) !== params1.get(p)) {
      matching = false;
      break;
    }
  }

  //need to be done for second paramset, because the params1 might be shorter than param2
  for(let p of params2.keys()) {
    // console.log('params2 p ', p);
    if(!params1.has(p) || params1.get(p) !== params2.get(p)) {
      matching = false;
      break;
    }
  }

  // console.log('matching ', matching);
  return matching;
}


export function getURLParams(queryString, paramsToLookFor) {
  //console.log(leverData.levers);
  var results = {};

  const urlParams = new URLSearchParams(queryString);
  paramsToLookFor.forEach((name)=> {
    let param = urlParams.get(name);
    if(param) {
      results[name] = param;
    }
  });

  return results;
}

export function initRoutes() {
  /*set up routes*/
  page('/', routeHome);
  // page('/welcome', routeWelcome);
  page('/intro', routeIntro);
  // page('/intro/:screen', routeIntroScreen);
  page('/budget', routeBudget);
  page('/legal', routeLegal);
  page('/app', routeCalculator);
  page('/app/:tab', routeTab);
  page('/app/:tab/:subtab', routeSubtab);
  page('*', routeNotFound);

  //activating
  page();
}

// export function toggleFetching(_shouldFetch) {
//   shouldFetch = _shouldFetch;
// }


var routeHome = function() {
  page.redirect('/intro');
};

var routeCalculator = function() {
  // redirect to first subtab
  let tabIndex = 0;
  let routeOfFirstTab = outputsService.tabRoutes[tabIndex].route;

  let routeOfFirstSubtab = outputsService.tabRoutes[tabIndex][0].route

  if(routeOfFirstSubtab) {
    page.redirect('/app/'+routeOfFirstTab+'/'+routeOfFirstSubtab);
  }
};

var routeIntro = function() {
  appState.mode = 'intro';
};

var routeBudget = function() {
  appState.mode = 'target';
  appState.menuOpen = false;
};

var routeLegal = function() {
  //console.log('routeLegal');
  appState.mode = 'legal';
  appState.menuOpen = false;
};

var routeTab = function(context) {

  //redirects to the first subtab, defaults to the first tab if given tab from the URL doesn't exist
  //find the name of the first subtab and redirect to that route
  let tabname = context.params.tab;

  //load first tab by default, if tabname is not found (bad url)
  let tabIndex = outputsService.routes[tabname] ? outputsService.routes[tabname].index : 0;
  let routeOfTab = outputsService.tabRoutes[tabIndex].route;


  let routeOfFirstSubtab = outputsService.tabRoutes[tabIndex][0].route

  if(routeOfFirstSubtab) {
    page.redirect('/app/'+routeOfTab+'/'+routeOfFirstSubtab);
  }

};

var routeSubtab = function(context) {
  // during routing:
  // 1. appState is set according to url-parameters
  //    during that step the app-state is adapted if the parameters are invalid
  //    or if levers are eu-only-values
  // 2. at the end of the route process the querystring gets updated to the actual app-state

  // window.location.search is empty in some cases, use context.querystring instead

  // setTimeout(()=> {
    console.log('routeSubtab ', appState);

    //check context, correct to default values for routeOfTab and routeOfSubtab if necessary
    let tabname = context.params.tab;
    //load first tab by default, if tabname is not found (bad url)
    let tabIndex = outputsService.routes[tabname] ? outputsService.routes[tabname].index : 0;
    let routeOfTab = outputsService.tabRoutes[tabIndex].route;

    let subtabname = context.params.subtab;
    //load first subtab by default, if subtabname is not found (bad url)
    let subtabIndex = outputsService.routes[routeOfTab][subtabname] ? outputsService.routes[routeOfTab][subtabname].index : 0;
    // let routeOfSubtab = outputsService.tabRoutes[tabIndex][subtabIndex].route;

    appState.mode = 'main';
    appState.menuOpen = false;

    // compare current route params with params of old state:
    // this is only necessary in routeSubtab
    let routeQuerystring = context.querystring; //works
    let appStateQuerystring = appState.mainScreenRouteString.indexOf('?') > -1 ? appState.mainScreenRouteString.substring(appState.mainScreenRouteString.indexOf('?')) : "";

    // paramsMatch is also true if both queryStrings are empty
    let paramsMatch = compareQueryParameters(routeQuerystring, appStateQuerystring);

    //check tab and subtab from URL against those in appState
    let tabMatches; //subtab doesn't matter, a change in a subtab doesn't trigger a fetch
    if(appState.activeTab !== null && appState.activeTab === tabIndex) {
      tabMatches = true;
    }

    // If the old and new querystrings didn't match, set all parameters again, even if only one might be different
    // resetting the whole state instead of changing it is a bit less efficient, but safer and less prone to bugs
    //--> disadvantage: prefetching a subtab is impossible, because it would start a new fetch here, because the URLs didn't match

    //urlParameters are needed regardless of paramsMatch
    let urlParameters = getURLParams(routeQuerystring, ['levers', 'other', 'country']);

    // when navigating from main-screen to budget and back to mainscreen,
    // urlParameters exists but the params already match (Object.keys(urlParameters).length > 0, paramsMatch == true)
    // --> in that case nothing happens
    // if there are params and they don't match with the appState
    if(Object.keys(urlParameters).length && !paramsMatch) {

      // setInputsFromURLParameters() checks if parameters are valid and applies fallback settings if not
      inputsService.setInputsFromURLParameters(urlParameters.levers, urlParameters.other, urlParameters.country);

    } else if(!Object.keys(urlParameters).length) {
      // load the first example pathway if there are no parameters set
      inputsService.setExamplePathway(0);
    }

    outputsService.selectTab(tabIndex,subtabIndex,false);

    // Automatic zoom into a country is deactivated for now,
    // because even when just clicking away from the MainScreen and back to it, it would zoom into a country
    // if a country is zoomed into would need to be a URL parameter to avoid that case
    // if(urlParameters.other && urlParameters.country) {
    //   outputsService.setCountryZoom(1); //zoom into that country, if subtab-component supports it
    // }

    // checkIfLeversMatchExamplePathway also sets appState.pathwayIndex if any was found and that sets the pathway select-input
    let matchesWithExamplePathway;
    matchesWithExamplePathway = inputsService.checkIfLeversMatchExamplePathway();

    if(appState.onlyExamplePathwayRoutes && !matchesWithExamplePathway) {
      // if in examplePathwaysOnly-mode and the user changed the url to a
      // non-valid pathway (non-examplePathway), then redirect to home-route
      // resetting to the first examplePathway is difficult, because also
      // any single-country-levers-settings would need to get corrected
      // resetting all state is tedious for this edge case, so just trigger a hard reload:
      document.location.replace(document.location.origin);
      // page.redirect('/app'); /doesn't work because old appState will still be present
      return; //not necessary actually
    }

    // important: update the appState.mainScreenRouteString (after setting all state inside the app)
    // create the routeString from app data, not from window.location.pathname,
    // because the URL might be bad and the tabs might have been corrected to valid ones
    let routeString = dataService.createRouteString();

    appState.mainScreenRouteString = routeString;
    // console.log('routeString ', routeString)

    // DONT call history.pushState, use history.replaceState to correct or complete the URL (matching it against the appState)
    // Always work with full a URL that reflects the appState's get parameters, this is important when working with the
    // browser-history, so that when a user clicks back or forward, the URL always contains all necessary information to
    // rebuild the appState. Additional info that is not stored in the URL can optionally be stored in the history's stateObj
    // (like appState.countryZoom for instance (this is not implemented))
    history.replaceState({path: appState.mainScreenRouteString}, null, appState.mainScreenRouteString);
    // history.pushState({path: appState.mainScreenRouteString}, null, appState.mainScreenRouteString);

    // console.log('routeSubtab ', paramsMatch, tabMatches);
    if((!paramsMatch || !tabMatches) && shouldFetch) {
      console.log('routeSubtab fetching');

      // reset user actions before fetch (otherwise it would zoom into a selected country by default)
      appState.userAction = [];
      dataService.fetchData();
    }
  // },0);
};

var routeNotFound = function() {
  console.log('routeNotFound');
  page.redirect('/');
}
