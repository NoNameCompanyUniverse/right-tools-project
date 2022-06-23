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
    postProject, postProjectDocument, postProjectParticipant, putKanBan, putMindMap, putProject
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
    reducers: {
        removeMindMap(state, action: PayloadAction<number>){
            state.project.mindmaps = state.project.mindmaps.filter((i) => i.id !== action.payload);
        },
        removeKanBan(state, action: PayloadAction<number>){
            state.project.kanban = state.project.kanban.filter((i) => i.id !== action.payload);
        },
        removeDocument(state, action:PayloadAction<number>) {
            state.project.files = state.project.files.filter(i => i.id !== action.payload);
        },
        removeParticipant(state, action: PayloadAction<number>) {
            state.project.participants = state.project.participants.filter(i => i.id !== action.payload);
        }
    },
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
        [deleteProjectParticipant.fulfilled.type]: (state) => {
            //state.loading = 'FULFILLED';
            toast.error("Сотрудник удален")
        },
        [deleteProjectParticipant.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
        },


        [putProject.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [putProject.fulfilled.type]: (state, action: PayloadAction<IProjectFull>) => {
            state.project.info = action.payload;
            //state.loading = 'FULFILLED';
            toast.success("Проект обновлен")
        },
        [putProject.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },

        [postProjectDocument.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [postProjectDocument.fulfilled.type]: (state, action: PayloadAction<IFile>) => {
            state.project.files.push(action.payload);
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
        [deleteProjectDocument.fulfilled.type]: (state) => {
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
        [postMindMap.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.project.mindmaps.push(action.payload);
            //state.loading = 'FULFILLED';
            toast.success("Успешно создан")
        },
        [postMindMap.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },
        [deleteMindMap.fulfilled.type]: (state) => {
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
        [postKanBan.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.project.kanban.push(action.payload);
            //state.loading = 'FULFILLED';
            toast.success("Успешно создан")
        },
        [postKanBan.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },
        [deleteKanBan.fulfilled.type]: (state) => {
            //state.loading = 'FULFILLED';
            toast.success("KanBan удален")
        },
        [deleteKanBan.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },
        [postProjectParticipant.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [postProjectParticipant.fulfilled.type]: (state, action: PayloadAction<IUserMin[]>) => {
            state.project.participants = state.project.participants.concat(action.payload)
            //state.loading = 'FULFILLED';
            toast.success("Пользователи добавлены")
        },
        [postProjectParticipant.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },

        [putMindMap.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [putMindMap.fulfilled.type]: (state, action: PayloadAction<{id: number, name:string, description: string}>) => {
            state.project.mindmaps = state.project.mindmaps.map(i => {
                if (i.id === action.payload.id) {
                    i = action.payload;
                    return i;
                } else {
                    return i;
                }
            })
            //state.loading = 'FULFILLED';
            toast.success("Изменен")
        },
        [putMindMap.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },
        [putKanBan.pending.type]: (state) => {
            //state.loading = 'PENDING';
        },
        [putKanBan.fulfilled.type]: (state, action: PayloadAction<
            {id: number, name:string, description: string}>) => {
            state.project.kanban = state.project.kanban.map(i => {
                if (i.id === action.payload.id) {
                    i = action.payload;
                    return i;
                } else {
                    return i;
                }
            })
            //state.loading = 'FULFILLED';
            toast.success("Изменен")
        },
        [putKanBan.rejected.type]: (state) => {
            //state.loading = 'REJECTED';
            toast.error("Ошибка")
        },
    }
})

export const {
    removeMindMap,
    removeKanBan,
    removeDocument,
    removeParticipant
} = projectsSlice.actions;
export default projectsSlice.reducer;