import {createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import API from "../../helpers/api";

export const getSubdivision = createAsyncThunk(
    'get/subdivision',
    async ({token}: {token: string}, {rejectWithValue}) => {
        try {
            return API.getSubdivisions(token)
        } catch (e) {
            // @ts-ignore
            toast.error(e.message, {autoClose: false})
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)