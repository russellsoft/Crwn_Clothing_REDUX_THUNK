import { compose, createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage/session'
import thunk from 'redux-thunk'

import { rootReducer } from './root-reducer'

const middleWares = [process.env.NODE_ENV === 'production' && logger, thunk].filter(Boolean)

const persistConfig = {
	key: root,
	storage,
	whiteList: 'cart'
}

const composedEnchancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
	|| compose

const composedEnchancers = composedEnchancer(applyMiddleware(...middleWares))

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnchancers)

export const persistor = persistStore(store)
