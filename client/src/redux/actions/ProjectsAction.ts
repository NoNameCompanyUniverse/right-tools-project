import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";


export const getProjects = createAsyncThunk(
    'projects/get',
    async ({token, limit = 5} : {token: string, limit: number}, {rejectWithValue}) => {
        try {
            return await API.getProjects({token, limit})
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
export const getProjectsAll = createAsyncThunk(
    'projects/getAll',
    async (token:string, {rejectWithValue}) => {
        try {
            return await API.getProjectsAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
