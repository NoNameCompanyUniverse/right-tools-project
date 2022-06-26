import {IUser, IUserMin} from "../../types/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteUser, getUsers, getUsersAll, postUser, putUser} from "../actions/UsersAction";
import {toast} from "react-toastify";

interface IUsersState {
    users: IUserMin[],
    user: IUser | null,
    auth: IUser | null,
    isFetching: 'PENDING' | 'FULFILLED' | 'REJECTED',
}

const initialState: IUsersState = {
    users: [],
    user: null,
    auth: null,
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

        [putUser.pending.type]: (state) => {
            //state.isFetching = 'PENDING'
        },
        [putUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            //state.isFetching = 'FULFILLED'
            state.auth = action.payload;
            toast.success('Профиль обновлен')
        },
        [putUser.rejected.type]: (state) => {
            //state.isFetching = 'REJECTED'
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


        [deleteUser.pending.type]: (state) => {
            //state.isFetching = 'PENDING'
        },
        [deleteUser.fulfilled.type]: (state, action: PayloadAction<IUserMin[]>) => {
            //state.isFetching = 'FULFILLED'
            toast.error('Пользователь удален')
            state.users = action.payload;
        },
        [deleteUser.rejected.type]: (state) => {
            //state.isFetching = 'REJECTED'
            toast.error('Ошибка');
            //state.users = []
        },

    }
})

export default usersSlice.reducer;