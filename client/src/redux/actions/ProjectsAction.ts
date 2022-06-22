import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";
import {IProjectFull} from "../../types/IProject";
import {IUserMin} from "../../types/IUser";
import {IFile} from "../../types/IFile";
import {toast} from "react-toastify";


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
    async ({token, limit = 3}: { token: string, limit?: number }, {rejectWithValue}) => {
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
    async (token: string, {rejectWithValue}) => {
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
    async ({token, picture, data}: { token: string, picture: any, data: any }, {rejectWithValue}) => {
        try {
            const res = await API.postProject(token, {name: data.name, description: data.description});
            if (picture) {
                await API.patchProjectPicture(token, res.id, picture)
            }
            const participants = {
                participants: data.participant
            }
            await API.postParticipants(token, participants, res.id)
            return API.getProfileProjectAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'project/delete',
    async ({token, id}: { token: string, id: number }, {rejectWithValue}) => {
        try {
            const res = await API.deleteProject(token, id);
            return await API.getProfileProjectAll(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const getProject = createAsyncThunk(
    'project/get',
    async ({token, id}: { token: string, id: number }, {rejectWithValue}) => {
        try {
            const info:IProjectFull = await API.getProject(token, id);
            const participants: IUserMin[] = await API.getProjectParticipants(token, id);
            const files: IFile[] = await API.getDocuments(token, id);
            const mindmaps: Array<any> = await API.getMindMaps(token, id);
            const kanban: Array<any> = await API.getKanbans(token, id)
            return {
                info,
                participants,
                files,
                mindmaps,
                kanban
            };

        } catch (e) {

            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteProjectParticipant = createAsyncThunk(
    'delete/participant',
    async ({token, id, data}: {token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            await API.deleteParticipants(token, id, data);
            return API.getProjectParticipants(token, id)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postProjectDocument = createAsyncThunk(
    'post/document',
    async ({token, id, data}: {token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            const res = await API.postDocument(token, id, data);
            return await API.getDocuments(token, id)

        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteProjectDocument = createAsyncThunk(
    'delete/document',
    async ({token, id, idP}: {token: string, id: number, idP: number}, {rejectWithValue}) => {
        try {
            const res = await API.deleteDocument(token, id);
            return await API.getDocuments(token, idP)

        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)


export const deleteMindMap = createAsyncThunk(
    'delete/mindmap',
    async ({token, id, idP} : {token: string, id: number, idP: number}, {rejectWithValue}) => {
        try {
            const res = API.deleteMindMap(token, id);
            return await API.getMindMaps(token, idP);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postMindMap = createAsyncThunk(
    'post/mindmap',
    async ({token, id, data}: {token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            const res = await API.postMindMap(token, id, data);
            return await API.getMindMaps(token, id)

        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteKanBan = createAsyncThunk(
    'delete/kanban',
    async ({token, id, idP} : {token: string, id: number, idP: number}, {rejectWithValue}) => {
        try {
            const res = API.deleteKanBan(token, id);
            return await API.getKanbans(token, idP);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postKanBan = createAsyncThunk(
    'post/kanban',
    async ({token, id, data}: {token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            const res = await API.postKanBan(token, id, data);
            return await API.getKanbans(token, id)

        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)