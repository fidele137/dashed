import { Reducer } from 'redux';
import { SELECT, DRAWER_OPENED } from '../actions/nav.js';
import { RootAction } from '../store.js';

export interface NavState {
  component: any;
  drawerOpened: boolean;
}

const INITIAL_STATE: NavState = {
  component: null!,
  drawerOpened: false
};

const nav: Reducer<NavState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT:
      const component = action.component;
      return {
        ...state,
        component
      };
    case DRAWER_OPENED:
      return {
        ...state,
        drawerOpened: true
      };
    default:
      return state;
  }
};

export default nav;
