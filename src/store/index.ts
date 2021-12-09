import {configureStore} from '@reduxjs/toolkit'

import filterSlice from './filter'
import api from './api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        filter: filterSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export default store