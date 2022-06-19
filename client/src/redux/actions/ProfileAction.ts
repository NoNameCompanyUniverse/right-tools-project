import {createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../helpers/api";

export const getMe = createAsyncThunk(
    'me/get',
    async (token: string, {rejectWithValue}) => {
        try {
            return await API.getMe(token);
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)
export const putMe = createAsyncThunk(
    'me/put',
    async ({
               token,
               data,
               id,
               photo,
               banner
           }: { token: string, data: any, id: number, photo: any, banner: any }, {rejectWithValue}) => {
        try {
            if (photo) {
                await API.patchUserPhoto(token, id, photo)
            }
            if (banner) {
                await API.patchUserBanner(token, id, banner)
            }
            await API.putUser(token, id, data);
            return await API.getMe(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)

export const getProfileInfo = createAsyncThunk(
    'profileInfo/get',
    async (token: string, {rejectWithValue}) => {
        try {
            return await API.getProfileInfo(token)
        } catch (e) {
            // @ts-ignore
            return rejectWithValue(e.message)
        }
    }
)