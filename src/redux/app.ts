import { Action, Reducer } from '@reduxjs/toolkit'

export enum EAppActions {
  UPDATE_SIDEBAR = 'update_sidebar',
}

export interface IAppReducer {
  sidebarShow?: boolean
  sidebarUnfoldable?: boolean
}

const INITIAL_STATE = {
  sidebarShow: true,
}

export const AppReducer: Reducer<IAppReducer> = (state = INITIAL_STATE, action: Action | any) => {
  switch (action.type) {
    case EAppActions.UPDATE_SIDEBAR:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
