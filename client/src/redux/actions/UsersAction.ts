import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";
import {IAuth} from "../../types/IAuth";

export const getUsers = createAsyncThunk(
    'users/get',
    async ({token, limit = 5} : {token: string, limit?: number}, {rejectWithValue}) => {
        try {
            return await API.getUsers({token, limit});
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
export const getUsersAll = createAsyncThunk(
    'users/getAll',
    async (token:string, {rejectWithValue}) => {
        try {
            return await API.getUsersAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const getUser = createAsyncThunk(
    'user/get',
    async ({token, id} : {token:string, id: number}, {rejectWithValue}) => {
        try {
            return await API.getUser(token, id)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const getMe = createAsyncThunk(
    'me/get',
    async (token:string, {rejectWithValue}) => {
        try {
            return await API.getMe(token);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const putUser = createAsyncThunk(
    'user/put',
    async ({token, data, id, photo, banner} : {token:string, data:any, id: number, photo:any, banner: any}, {rejectWithValue}) => {
        try {
            if (photo) {
                await API.patchUserPhoto(token, id, photo)
            }
            if (banner) {
                await API.patchUserBanner(token, id, banner)
            }
            return  await API.putUser(token, id, data);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postUser = createAsyncThunk(
    'user/post',
    async ({token, data}: {token:string, data:any}, {rejectWithValue}) => {
        try {
            return await API.postUser(token, data);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)