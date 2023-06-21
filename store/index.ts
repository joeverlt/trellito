import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './reducers/boards.reducer'
import listsReducer from './reducers/lists.reducer'
import cardsReducer from './reducers/cards.reducer'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import storage from './storage'

const persistConfig = {
  key: 'root',
  timeout: 1000,
  storage,
  whitelist: ['boards', 'lists', 'cards']
}

const rootReducer = combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer
})

const reducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer,
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
