import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProject, IProjectFull} from "../../types/IProject";
import {
    deleteKanBan,
    deleteMindMap,
    deleteProject, deleteProjectDocument,
    deleteProjectParticipant,
    getProject,
    getProjectsProfile,
    getProjectsProfileAll, postKanBan, postMindMap,
    postProject, postProjectDocument
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



        [postProjectDocument.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [postProjectDocument.fulfilled.type]: (state, action: PayloadAction<IFile[]>) => {
            state.project.files = action.payload;
            //state.loading = 'FULFILLED';
            toast.success("Файл загружен")
        },
        [postProjectDocument.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка файла")
        },

        [deleteProjectDocument.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [deleteProjectDocument.fulfilled.type]: (state, action: PayloadAction<IFile[]>) => {
            state.project.files = action.payload;
            //state.loading = 'FULFILLED';
            toast.success("Файл удален")
        },
        [deleteProjectDocument.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка файла")
        },

        [postMindMap.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [postMindMap.fulfilled.type]: (state, action: PayloadAction<Array<any>>) => {
            state.project.mindmaps = action.payload;
            //state.loading = 'FULFILLED';
            toast.success("Успешно создан")
        },
        [postMindMap.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },

        [deleteMindMap.fulfilled.type]: (state, action: PayloadAction<Array<any>>) => {
            state.project.mindmaps = action.payload;
            //state.loading = 'FULFILLED';
            toast.success("Mind Map удален")
        },
        [deleteMindMap.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },

        [postKanBan.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [postKanBan.fulfilled.type]: (state, action: PayloadAction<Array<any>>) => {
            state.project.kanban = action.payload;
            //state.loading = 'FULFILLED';
            toast.success("Успешно создан")
        },
        [postKanBan.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },

        [deleteKanBan.fulfilled.type]: (state, action: PayloadAction<Array<any>>) => {
            state.project.kanban = action.payload;
            //state.loading = 'FULFILLED';
            toast.success("KanBan удален")
        },
        [deleteKanBan.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },


    }
})

export default projectsSlice.reducer;