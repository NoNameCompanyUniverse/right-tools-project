import {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
import usersSlice from './reducers/UsersSlice';
import profileSlice from './reducers/ProfileSlice';
import projectSlice from './reducers/ProjectsSlice';
import mindmapSlice from './reducers/MindMapSlice';
import subdivisionSlice from './reducers/SubdivisionSlice';

const rootReducer = combineReducers({
    usersSlice,
    profileSlice,
    projectSlice,
    mindmapSlice,
    subdivisionSlice
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
