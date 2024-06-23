import { configureStore } from '@reduxjs/toolkit'
import fileSlice from './features/fileSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const makeStore = () => {
   const store = configureStore({
    reducer: {
      [fileSlice.reducerPath]: fileSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(fileSlice.middleware)
  })
  setupListeners(store.dispatch)
  return store
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']