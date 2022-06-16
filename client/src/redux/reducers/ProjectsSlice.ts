import {createSlice} from "@reduxjs/toolkit";

interface IProjectsState {

}

const initialState: IProjectsState = {

}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default projectsSlice.reducer;