import { Action, ActionCreator } from 'redux';
export const SELECT = 'SELECT';
export const DRAWER_OPENED = 'DRAWER_OPENED';

export interface NavActionSelect extends Action<'SELECT'> {
  component: any;
}

export interface NavActionDrawerOpened extends Action<'DRAWER_OPENED'> {}
export type TopBarAction = NavActionSelect | NavActionDrawerOpened;

export const select: ActionCreator<NavActionSelect> = (component: any) => {
  return {
    type: SELECT,
    component
  };
};

export const drawerOpened: ActionCreator<NavActionDrawerOpened> = () => {
  return {
    type: DRAWER_OPENED
  };
};
