import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProject, IProjectFull} from "../../types/IProject";
import {
    deleteProject,
    deleteProjectParticipant,
    getProject,
    getProjectsProfile,
    getProjectsProfileAll,
    postProject
} from "../actions/ProjectsAction";
import {IUserMin} from "../../types/IUser";
import {IFile} from "../../types/IFile";
import {toast} from "react-toastify";

interface IProjectsState {
    projects: IProject[],
    loading: 'PENDING' | 'FULFILLED' | 'REJECTED' | '',
    project: {
        info: IProjectFull | null,
        files: Array<IFile>,
        mindmaps: Array<any>,
        kanban: Array<any>,
        participants: IUserMin[],
    }
}

const initialState: IProjectsState = {
    projects: [],
    loading: '',
    project: {
        info: null,
        files: [],
        mindmaps: [],
        kanban: [],
        participants: []
    }
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: {
        [getProjectsProfile.pending.type]: (state) => {
            state.loading = 'PENDING'
        },
        [getProjectsProfile.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
            state.loading = 'FULFILLED';
        },
        [getProjectsProfile.rejected.type]: (state) => {
            state.loading = 'REJECTED';
        },

        [getProjectsProfileAll.pending.type]: (state) => {
            state.loading = 'PENDING';
        },
        [getProjectsProfileAll.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
            state.loading = 'FULFILLED';
        },
        [getProjectsProfileAll.rejected.type]: (state) => {
            state.loading = 'REJECTED';
        },

        [postProject.pending.type]: (state) => {
            state.loading = 'PENDING';
        },
        [postProject.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
            state.loading = 'FULFILLED';
        },
        [postProject.rejected.type]: (state) => {
            state.loading = 'REJECTED';
        },

        [deleteProject.pending.type]: (state) => {
            state.loading = 'PENDING';
        },
        [deleteProject.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
            state.loading = 'FULFILLED';
        },
        [deleteProject.rejected.type]: (state) => {
            state.loading = 'REJECTED';
        },


        [getProject.pending.type]: (state) => {
            state.loading = 'PENDING';
        },
        [getProject.fulfilled.type]: (state, action: PayloadAction<{
            info: IProjectFull,
            participants: IUserMin[],
            files: Array<IFile>,
            mindmaps: Array<any>,
            kanban: Array<any>
        }>) => {
            state.project = action.payload;
            state.loading = 'FULFILLED';
        },
        [getProject.rejected.type]: (state) => {
            state.loading = 'REJECTED';
        },

        [deleteProjectParticipant.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [deleteProjectParticipant.fulfilled.type]: (state, action: PayloadAction<IUserMin[]>) => {
            state.project.participants = action.payload;
            //state.loading = 'FULFILLED';
            toast.error("Сотрудник удален")
        },
        [deleteProjectParticipant.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
        },

    }
})

export default projectsSlice.reducer;