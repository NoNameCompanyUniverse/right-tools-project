import {IDrag, IKanBan, INewDrag} from "../../types/IKanBan";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getKanBan, postKanBanCard} from "../actions/KanBanActions";
import {toast} from "react-toastify";

interface IKanBanState {
    kanban: IKanBan[],
    isLoading: 'PENDING' | 'FULFILLED' | 'REJECTED' | ''
}

const initialState: IKanBanState = {
    kanban: [],
    isLoading: '',
}

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setKanBan(state, action: PayloadAction<IKanBan[]>) {
            state.kanban = action.payload;
        },
        removeKanBanCard(state, action: PayloadAction<number>) {
            let newBoardData = Array.from(state.kanban);
            newBoardData = newBoardData.map(board => ({
                id: board.id,
                name: board.name,
                items: board.items.filter(item => item.id !== action.payload)
            }))
            state.kanban = newBoardData;
        },
        setKanBanCard(state, action:PayloadAction<IDrag>) {
            let newBoardData = Array.from(state.kanban);
            newBoardData = newBoardData.map(board => ({
                id: board.id,
                name: board.name,
                items: board.items.map(item => item.id === action.payload.id ? item = action.payload : item)
            }))
            state.kanban = newBoardData;
        }
    },
    extraReducers: {
        [getKanBan.pending.type]: (state) => {
            state.isLoading = 'PENDING';
        },
        [getKanBan.fulfilled.type]: (state, action: PayloadAction<IKanBan[]>) => {
            state.kanban = action.payload;
            state.isLoading = 'FULFILLED';
        },
        [getKanBan.rejected.type]: (state) => {
            state.isLoading = 'REJECTED';
        },


        [postKanBanCard.pending.type]: () => {
        },
        [postKanBanCard.fulfilled.type]: (state, action: PayloadAction<IDrag>) => {
            let newBoardData = Array.from(state.kanban);
            newBoardData[0].items.push(action.payload);
            state.kanban = newBoardData;
        },
        [postKanBanCard.rejected.type]: (state) => {
            toast.success('Ошибка', {autoClose: false})
        },
    }
})
export const {setKanBan, removeKanBanCard, setKanBanCard} = kanbanSlice.actions;
export default kanbanSlice.reducer;