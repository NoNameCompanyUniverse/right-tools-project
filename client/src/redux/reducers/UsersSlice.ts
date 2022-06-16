import {IUser, IUserMin} from "../../types/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMe, getUser, getUsers, getUsersAll} from "../actions/UsersAction";
import {toast} from "react-toastify";

interface IUsersState {
    users: IUserMin[],
    user: IUser | null,
    count: number,
    auth: IUser | false
}

const initialState: IUsersState = {
    users: [],
    user: null,
    count: 0,
    auth: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending.type]: () => {

        },
        [getUsers.fulfilled.type]: (state, action: PayloadAction<{count: number, results: IUserMin[]}>) => {
            state.users = action.payload.results;
            state.count = action.payload.count;
        },
        [getUsers.rejected.type]: () => {
            toast.error('Ошибка загрузки пользователей', {position: "bottom-right"})
        },

        [getUsersAll.pending.type]: () => {

        },
        [getUsersAll.fulfilled.type]: (state, action: PayloadAction<IUserMin[]>) => {
            state.users = action.payload;
        },
        [getUsersAll.rejected.type]: () => {
            toast.error('Ошибка загрузки пользователей', {position: "bottom-right"})
        },

        [getUser.pending.type]: () => {

        },
        [getUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        [getUser.rejected.type]: () => {
            toast.error('Ошибка пользователя', {position: "bottom-right"})
        },

        [getMe.pending.type]: () => {

        },
        [getMe.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.auth = action.payload;
        },
        [getMe.rejected.type]: () => {
            toast.error('Ошибка пользователя', {position: "bottom-right"})
        },
    }
})

export default usersSlice.reducer;