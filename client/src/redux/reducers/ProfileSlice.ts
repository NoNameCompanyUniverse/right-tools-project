import {IUser} from "../../types/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMe, getProfileInfo, putMe} from "../actions/ProfileAction";
import {toast} from "react-toastify";

interface IProfileState {
    auth: IUser | null,
    info: {
        users: number,
        projects_with_me: number,
        projects_admin: number
    }
}

const initialState: IProfileState = {
    auth: null,
    info: {
        users: 0,
        projects_admin: 0,
        projects_with_me: 0
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        [getMe.pending.type]: () => {},
        [getMe.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.auth = action.payload;
        },
        [getMe.rejected.type]: (state) => {
            toast.error('Ошибка пользователя');
            state.auth = null;
        },


        [putMe.pending.type]: () => {},
        [putMe.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.auth = action.payload;
            toast.success('Профиль обновлен')
        },
        [putMe.rejected.type]: (state) => {
            toast.error('Ошибка обновления')
        },


        [getProfileInfo.pending.type]: () => {},
        [getProfileInfo.fulfilled.type]: (state, action: PayloadAction<
            { users: number, projects_with_me: number, projects_admin: number }>) => {
            state.info = action.payload;
        },
        [getProfileInfo.rejected.type]: (state) => {},
    }
})

export default profileSlice.reducer;