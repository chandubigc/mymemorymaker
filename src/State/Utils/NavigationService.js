// For Navigating without the navigation prop

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getCurrentRoute() {
  if (_navigator) {
    let route = _navigator.state.nav;
    while (route.routes) {
      route = route.routes[route.index];
    }
    return route;
  }
  return { routeName: '' };
}

function navigate(routeName, params) {
  if (_navigator) {
    _navigator.dispatch(NavigationActions.navigate({
        routeName,
        params,
      }));
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  getCurrentRoute,
};
