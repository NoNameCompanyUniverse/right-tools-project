import React, {useEffect, useState} from 'react';
// @ts-ignore
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd-next";

import styleColumn from '../../components/KanBan/DragColumn/index.module.scss';


import BoardData from '../../../data-board.json';
import DragItem from "../../components/KanBan/DragItem";
import CreateDrag from "../../blocks/KanBan/CreateDrag";
import {IDrag} from "../../types/IDrag";
import Modal from "../../components/Modal";
import ControlDrag from "../../blocks/KanBan/ControlDrag";


const KanBan: React.FC = () => {
    const [boardData, setBoardData] = useState<Array<
        { name: string, items: Array<IDrag> }>>(BoardData);
    const [boardItem, setBoardItem] = useState<IDrag | null>(null);
    const onDragEnd = (re: any) => {
        if (!re.destination) return;
        let newBoardData = Array.from(boardData);
        let dragItem = newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
        newBoardData[parseInt(re.source.droppableId)].items.splice(re.source.index, 1);
        newBoardData[parseInt(re.destination.droppableId)].items.splice(re.destination.index, 0, dragItem);
        setBoardData(newBoardData);
    };
    const handleOnDrag = (action: { type: "LOOK" | "EDIT" | "DELETE" | "DEFAULT" | "CREATE", payload: IDrag }) => {
        const {type, payload} = action
        switch (type) {
            case "CREATE": {
                let newBoardData = Array.from(boardData);
                newBoardData[0].items.push(payload);
                setBoardData(newBoardData);
                break;
            }
            case "EDIT": {
                let newBoardData = Array.from(boardData);
                newBoardData = newBoardData.map(board => ({
                    name: board.name,
                    items: board.items.map(item => item.id === payload.id ? item = payload : item)
                }))
                setBoardData(newBoardData);
                break;
            }
            case "DELETE": {
                let newBoardData = Array.from(boardData);
                newBoardData = newBoardData.map(board => ({
                    name: board.name,
                    items: board.items.filter(item => item.id !== payload.id)
                }))
                setBoardData(newBoardData);
                break;
            }
            default: {
                break;
            }
        }
    }
    const handleOnLookDrag = (data: IDrag) => {
        setBoardItem(JSON.parse(JSON.stringify(data)));
    }
    return (
        <>
            <CreateDrag onDrag={handleOnDrag}/>
            <ControlDrag data={boardItem} onDrag={handleOnDrag}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={`row flex-grow-1 gx-3`}>
                    {
                        boardData.map((data: any, bIndex: number) => (
                            <div key={data.name} className="col">
                                <Droppable droppableId={bIndex.toString()}>
                                    {
                                        (provided: any, snapshot: any) => (

                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={styleColumn.container}
                                            >
                                                <div className={styleColumn.title}>
                                                    {data.name}
                                                    {/*{provided.placeholder}*/}
                                                </div>
                                                <div className={styleColumn.content}>
                                                    {
                                                        data.items.map((item: IDrag, index: number) => (
                                                            <DragItem onData={handleOnLookDrag} key={item.id}
                                                                      data={item} index={index}/>
                                                        ))
                                                    }
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )
                                    }

                                </Droppable>
                            </div>
                        ))
                    }
                </div>
            </DragDropContext>
        </>
    );
};

export default KanBan;