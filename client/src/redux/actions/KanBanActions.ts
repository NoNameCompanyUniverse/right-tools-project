import {createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import API from "../../helpers/api";
import {IKanBan} from "../../types/IKanBan";
import {removeKanBanCard, setKanBan, setKanBanCard} from "../reducers/KanBanSlice";

export const getKanBan = createAsyncThunk(
    'get/kanban',
    async ({token, id}:{token:string, id:number}, {rejectWithValue}) => {
        try {
            return API.getKanBan(token, id)
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postKanBanCard = createAsyncThunk(
    'post/kanbanCard',
    async ({token, id, data}:{token:string, id:number, data:any}, {rejectWithValue}) => {
        try {
            return await API.postKanBanCard(token, id, data)
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const patchKanBanCard = createAsyncThunk(
    'patch/kanbanCard',
    async ({token, id, data, kanban}:{token:string, id:number, data:any, kanban:IKanBan[]}, {rejectWithValue, dispatch}) => {
        try {
            await API.patchKanBanCard(token, id, data);
            dispatch(setKanBan(kanban))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
export const deleteKanBanCard = createAsyncThunk(
    'delete/kanbanCard',
    async ({token, id}:{token:string, id:number}, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteKanBanCard(token, id);
            dispatch(removeKanBanCard(id))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const putKanBanCard = createAsyncThunk(
    'put/kanbanCard',
    async ({token, id, data}: {token:string, id: number, data:any}, {rejectWithValue, dispatch}) => {
        try {
            await API.putKanBanCard(token, id, data);
            dispatch(setKanBanCard(data))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
