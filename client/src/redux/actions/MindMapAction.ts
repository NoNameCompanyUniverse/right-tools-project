import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";
import {toast} from "react-toastify";
import {pushEdges, removeNode} from "../reducers/MindMapSlice";

export const getMindMap = createAsyncThunk(
    'get/mindmap',
    async ({token, id}: {token:string, id: number}, {rejectWithValue}) => {
        try {
            return await API.getMindMap(token, id);
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postMindCard = createAsyncThunk(
    'post/mindcard',
    async ({token, id, data} : {token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            return await API.postMindMapCard(token, data, id)
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const putMindCard = createAsyncThunk(
    'put/mindcard',
    async ({token, id, data} : {token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            return await API.putMindMapCard(token, data, id)
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const deleteMindCard = createAsyncThunk(
    'delete/mindcard',
    async ({token, id}: {token:string, id: number}, {rejectWithValue, dispatch}) => {
        try {
            await API.deleteMindMapCard(token, id);
            dispatch(removeNode(id.toString()))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const patchMindCardCoord = createAsyncThunk(
    'putch/coord',
    async ({token, id, data} : {token: string, id: number, data:any}, {rejectWithValue}) => {
        try {
            await API.patchMindCardCoord(token, id, data)
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const postMindEdges = createAsyncThunk(
    'post/edges',
    async ({token, id, data} : {token: string, id: number, data:any}, {rejectWithValue, dispatch}) => {
        try {
            await API.postMindEdges(token, id, data);
            //dispatch(pushEdges(data))
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)