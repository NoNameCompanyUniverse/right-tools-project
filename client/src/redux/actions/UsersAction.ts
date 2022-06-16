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
            const res:IAuth = await API.getMe(token);
            return await API.getUser(token, res.id)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
