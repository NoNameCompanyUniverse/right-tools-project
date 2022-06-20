import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";


export const getProjects = createAsyncThunk(
    'projects/get',
    async ({token, limit = 5}: { token: string, limit: number }, {rejectWithValue}) => {
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
    async (token: string, {rejectWithValue}) => {
        try {
            return await API.getProjectsAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const getProjectsProfile = createAsyncThunk(
    'projectsProfile/get',
    async ({token, limit = 3} : {token:string, limit?: number}, {rejectWithValue}) => {
        try {
            return API.getProfileProject(token, limit)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const getProjectsProfileAll = createAsyncThunk(
    'projectsProfileAll/get',
    async (token:string, {rejectWithValue}) => {
        try {
            return API.getProfileProjectAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postProject = createAsyncThunk(
    'project/post',
    async ({token, picture, data}: {token:string, picture:any, data:any}, {rejectWithValue}) => {
        try {
            const res = await API.postProject(token, {name: data.name, description: data.description});
            if (picture) {
                await API.patchProjectPicture(token, res.id, picture)
            }
            const participants = {
                participants: data.participant
            }
            await API.postParticipants(token,  participants, res.id)
            return API.getProfileProjectAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'project/delete',
    async ({token, id}:{token:string, id: number}, {rejectWithValue}) => {
        try {
            const res = await API.deleteProject(token, id);
            return await API.getProfileProjectAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
