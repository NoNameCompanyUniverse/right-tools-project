// @ts-ignore
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISubdivision} from "../../types/ISubdivision";
import {getSubdivision} from "../actions/SubdivisionAction";

interface ISubdivisionState {
    subdivision: ISubdivision[] | null
}

const initialState: ISubdivisionState = {
    subdivision: null
}

export const subdivisionSlice = createSlice({
    name: 'subdivision',
    initialState,
    reducers: {},
    extraReducers: {
        [getSubdivision.pending.type]: () => {

        },
        [getSubdivision.fulfilled.type]: (state, action: PayloadAction<ISubdivision[]>) => {
            state.subdivision = action.payload;
        },
        [getSubdivision.rejected.type]: () => {

        },


    }
})

export default subdivisionSlice.reducer;