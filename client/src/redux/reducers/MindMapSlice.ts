import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMindMap} from "../../types/IMindMap";
import {getMindMap, postMindCard, putMindCard} from "../actions/MindMapAction";
import {toast} from "react-toastify";
import {INewNode} from "../../types/INode";
import {deConvertMindCard} from "../../helpers/functions";
import {IEdge} from "../../types/IEdge";

interface IMindMapState {
    mindmap: IMindMap | null,
    isLoading: 'PENDING' | 'FULFILLED' | 'REJECTED' | ''
}

const initialState: IMindMapState = {
    mindmap: null,
    isLoading: ''
}

export const mindMapSlice = createSlice({
    name: 'mindmap',
    initialState,
    reducers: {
        removeNode(state, action: PayloadAction<string>) {
            if (state.mindmap) {
                state.mindmap.nodes = state.mindmap.nodes.filter(i => i.id !== action.payload);
            }
        },
        pushEdges(state, action:PayloadAction<IEdge[]>) {
            if (state.mindmap) {
                state.mindmap.edges = action.payload;
            }
        },
        reset(state) {
            state.isLoading = '';
        },
        setPositionNode(state, action: PayloadAction<{card: number, x: number, y:number}>) {
            if(state.mindmap) {
                state.mindmap.nodes = state.mindmap?.nodes.map(n => {
                    if(n.id === action.payload.card.toString()){
                        n.position.x = action.payload.x;
                        n.position.y = action.payload.y;
                        return n;
                    } else {
                        return n;
                    }
                })
            }
        }
    },
    extraReducers: {
        [getMindMap.pending.type] : (state) => {
            state.isLoading = 'PENDING'
        },
        [getMindMap.fulfilled.type] : (state, action: PayloadAction<IMindMap>) => {
            state.mindmap = action.payload;
            state.isLoading = 'FULFILLED';
        },
        [getMindMap.rejected.type] : (state) => {
            state.isLoading = 'REJECTED';
            toast.error('Не удалось загрузить Mind Map')
        },

        [postMindCard.pending.type] : (state) => {

        },
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

export const {removeNode, pushEdges, reset, setPositionNode} = mindMapSlice.actions;
export default mindMapSlice.reducer;