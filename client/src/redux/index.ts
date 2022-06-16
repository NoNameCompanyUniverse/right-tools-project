import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import usersSlice from './reducers/UsersSlice';
const rootReducer = combineReducers({
    usersSlice,
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: false
        })
    })
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
