import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";
import {IProjectFull} from "../../types/IProject";
import {IUserMin} from "../../types/IUser";
import {IFile} from "../../types/IFile";
import {toast} from "react-toastify";
import {removeDocument, removeKanBan, removeMindMap, removeParticipant} from "../reducers/ProjectsSlice";


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
            const info: IProjectFull = await API.getProject(token, id);
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

export const putProject = createAsyncThunk(
    'put/project',
    async ({token, id, data, picture}: { token: string, id: number, data: any, picture:any }, {rejectWithValue}) => {
        try {
            const info = {
                name: data.name,
                description: data.description
            }
            if (picture) {
                await API.patchProjectPicture(token, id, picture);
                return await API.putProject(token, id, info)
            } else {
                return await API.putProject(token, id, info)
            }
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postProjectParticipant = createAsyncThunk(
    'post/participants',
    async ({token, id, data}: { token: string, id: number, data: Array<number> }, {rejectWithValue, dispatch}) => {
        try {
            const participants = {
                participants: data
            }
            return await API.postParticipants(token, participants, id)
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
    async ({token, id, data}: { token: string, id: number, data: any }, {rejectWithValue, dispatch}) => {
        try {

            const res = await API.deleteParticipants(token, id, data);
            dispatch(removeParticipant(data.participants[0]))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postProjectDocument = createAsyncThunk(
    'post/document',
    async ({token, id, data}: { token: string, id: number, data: any }, {rejectWithValue}) => {
        try {
            return await API.postDocument(token, id, data);
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteProjectDocument = createAsyncThunk(
    'delete/document',
    async ({token, id}: { token: string, id: number }, {rejectWithValue, dispatch}) => {
        try {
            const res = await API.deleteDocument(token, id);
            dispatch(removeDocument(id))

        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)


export const deleteMindMap = createAsyncThunk(
    'delete/mindmap',
    async ({token, id}: { token: string, id: number }, {rejectWithValue, dispatch}) => {
        try {
            const res = await API.deleteMindMap(token, id);
            dispatch(removeMindMap(id))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postMindMap = createAsyncThunk(
    'post/mindmap',
    async ({token, id, data}: { token: string, id: number, data: any }, {rejectWithValue}) => {
        try {
            return await API.postMindMap(token, id, data);
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const putMindMap = createAsyncThunk(
    'put/mindmap',
    async ({token, id, data}:{token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            return await API.putMindMap(token, id, {name: data.name, description: data.description})
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
export const putKanBan = createAsyncThunk(
    'put/kanban',
    async ({token, id, data}:{token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            return await API.putKanBan(token, id, {name: data.name, description: data.description})
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)


export const deleteKanBan = createAsyncThunk(
    'delete/kanban',
    async ({token, id}: { token: string, id: number }, {rejectWithValue, dispatch}) => {
        try {
            const res = await API.deleteKanBan(token, id);
            dispatch(removeKanBan(id))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postKanBan = createAsyncThunk(
    'post/kanban',
    async ({token, id, data}: { token: string, id: number, data: any }, {rejectWithValue}) => {
        try {
            return await API.postKanBan(token, id, data);

        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)