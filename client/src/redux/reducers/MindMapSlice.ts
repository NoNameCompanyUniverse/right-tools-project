import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMindMap} from "../../types/IMindMap";
import {getMindMap, postMindCard, putMindCard} from "../actions/MindMapAction";
import {toast} from "react-toastify";
import {INewNode} from "../../types/INode";
import {deConvertMindCard} from "../../helpers/functions";

interface IMindMapState {
    mindmap: IMindMap | null
}

const initialState: IMindMapState = {
    mindmap: null
}

export const mindMapSlice = createSlice({
    name: 'mindmap',
    initialState,
    reducers: {
        removeNode(state, action: PayloadAction<string>) {
            if (state.mindmap) {
                state.mindmap.nodes = state.mindmap.nodes.filter(i => i.id !== action.payload);
            }
        }
    },
    extraReducers: {
        [getMindMap.pending.type] : () => {},
        [getMindMap.fulfilled.type] : (state, action: PayloadAction<IMindMap>) => {
            state.mindmap = action.payload;
        },
        [getMindMap.rejected.type] : () => {
            toast.error('Не удалось загрузить Mind Map')
        },

        [postMindCard.pending.type] : () => {},
        [postMindCard.fulfilled.type] : (state, action: PayloadAction<INewNode>) => {

            state.mindmap?.nodes.push(deConvertMindCard(action.payload));
        },
        [postMindCard.rejected.type] : () => {
            toast.error('Не создать карточку')
        },

        [putMindCard.pending.type] : () => {},
        [putMindCard.fulfilled.type] : (state, action: PayloadAction<INewNode>) => {

            if (state.mindmap) {
                state.mindmap.nodes = state.mindmap?.nodes.map(n => {
                    if (n.id === action.payload.id.toString()) {
                        n = deConvertMindCard(action.payload);
                        return n;
                    } else {
                        return n
                    }
                })
            }
        },
        [putMindCard.rejected.type] : () => {
            toast.error('Не изменить карточку')
        },
    }
})

export const {removeNode} = mindMapSlice.actions;
export default mindMapSlice.reducer;