import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";

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

export const getUserInfo = createAsyncThunk(
    'userInfo/get',
    async ({token, id} : {token:string, id: number}, {rejectWithValue}) => {
        try {
            return await API.getUserInfo(token, id)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const getUserProjects = createAsyncThunk(
    'userProject/get',
    async ({token, id} : {token:string, id: number}, {rejectWithValue}) => {
        try {
            return await API.getUserProjectAll(token, id)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)