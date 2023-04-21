import { combineReducers, configureStore as configure } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { AppReducer, IAppReducer } from './app'

export interface IStore {
  app: IAppReducer
}

const persistConfig = {
  key: 'root',
  storage,
  devTools: process.env.NODE_ENV !== 'production',
}

const configureStore = () => {
  const reducer = persistReducer(
    persistConfig,
    combineReducers({
      app: AppReducer,
    }),
  )

  const store = configure({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  })

  const persister = persistStore(store)

  return { persister, store }
}

export const { store, persister } = configureStore()
