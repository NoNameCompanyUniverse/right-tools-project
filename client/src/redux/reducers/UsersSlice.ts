import {IUser, IUserMin} from "../../types/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMe, getUser, getUsers, getUsersAll, postUser, putUser} from "../actions/UsersAction";
import {toast} from "react-toastify";

interface IUsersState {
    users: IUserMin[],
    user: IUser | null,
    count: number,
    auth: IUser | false,
    isFetching: 'PENDING' | 'FULFILLED' | 'REJECTED',
}

const initialState: IUsersState = {
    users: [],
    user: null,
    count: 0,
    auth: false,
    isFetching: 'REJECTED'
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending.type]: () => {

        },
        [getUsers.fulfilled.type]: (state, action: PayloadAction<{ count: number, results: IUserMin[] }>) => {
            state.users = action.payload.results;
            state.count = action.payload.count;
        },
        [getUsers.rejected.type]: (state) => {
            toast.error('Ошибка загрузки пользователей');
            state.users = []
        },

        [getUsersAll.pending.type]: (state) => {
            //state.isFetching = 'PENDING'
        },
        [getUsersAll.fulfilled.type]: (state, action: PayloadAction<IUserMin[]>) => {
            //state.isFetching = 'FULFILLED'
            state.users = action.payload;
        },
        [getUsersAll.rejected.type]: (state) => {
            //state.isFetching = 'REJECTED'
            toast.error('Ошибка загрузки пользователей');
            state.users = []
        },

        [getUser.pending.type]: () => {

        },
        [getUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        [getUser.rejected.type]: () => {
            toast.error('Ошибка пользователя')
        },

        [getMe.pending.type]: () => {

        },
        [getMe.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.auth = action.payload;
        },
        [getMe.rejected.type]: (state) => {
            toast.error('Ошибка пользователя');
            state.user = null;
        },

        [putUser.pending.type]: (state) => {
            state.isFetching = 'PENDING'
        },
        [putUser.fulfilled.type]: (state) => {
            state.isFetching = 'FULFILLED'
            toast.success('Профиль обновлен')
        },
        [putUser.rejected.type]: (state) => {
            state.isFetching = 'REJECTED'
            toast.error('Ошибка обновления')
        },
        [postUser.pending.type]: (state) => {
            state.isFetching = 'PENDING'
        },
        [postUser.fulfilled.type]: (state) => {
            state.isFetching = 'FULFILLED'
            toast.success('Создан пользователь')
        },
        [postUser.rejected.type]: (state) => {
            state.isFetching = 'REJECTED'
            toast.error('Ошибка')
        },

    }
})

export default usersSlice.reducer;