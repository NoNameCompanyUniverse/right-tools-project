import {IUser} from "../../types/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUser, getUserInfo, getUserProjects} from "../actions/UserAction";
import {IProject} from "../../types/IProject";

interface IUserState {
    profile: IUser | null,
    info: {
        users: number,
        projects_admin: number,
        projects_with_me: number
    },
    projects: IProject[],
    loading: 'PENDING' | 'FULFILLED' | 'REJECTED' | '',
}

const initialState: IUserState = {
    profile: null,
    info: {
        users: 0,
        projects_admin: 0,
        projects_with_me: 0
    },
    projects: [],
    loading: '',
}

export const userSlice = createSlice({
    name: 'userprofile',
    initialState,
    reducers: {},
    extraReducers: {
        [getUser.pending.type]: () => {},
        [getUser.fulfilled.type]: (state, action:PayloadAction<IUser>) => {
            state.profile = action.payload;
        },
        [getUser.rejected.type]: () => {},

        [getUserInfo.pending.type]: () => {},
        [getUserInfo.fulfilled.type]: (state, action:PayloadAction<{ users: number, projects_with_me: number, projects_admin: number }>) => {
            state.info = action.payload;
        },
        [getUserInfo.rejected.type]: () => {},

        [getUserProjects.pending.type]: (state) => {
            state.loading = 'PENDING'
        },
        [getUserProjects.fulfilled.type]: (state, action:PayloadAction<IProject[]>) => {
            state.projects = action.payload;
            state.loading = 'FULFILLED'
        },
        [getUserProjects.rejected.type]: (state) => {
            state.loading = 'REJECTED'
        },

    }
})

export default userSlice.reducer;