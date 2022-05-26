import React, {useEffect, useState} from 'react';
// @ts-ignore
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd-next";

import styleColumn from '../../components/KanBan/DragColumn/index.module.scss';


import BoardData from '../../../data-board.json';
import DragItem from "../../components/KanBan/DragItem";
import CreateDrag from "../../blocks/KanBan/CreateDrag";
import {INewDrag} from "../../types/IDrag";



const KanBan:React.FC = () => {


    const [boardData, setBoardData] = useState<Array<{name: string, items: Array<INewDrag>}>>(BoardData);

    const onDragEnd = (re: any) => {
        if (!re.destination) return;
        let newBoardData = Array.from(boardData);
        let dragItem = newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
        newBoardData[parseInt(re.source.droppableId)].items.splice(re.source.index, 1);
        newBoardData[parseInt(re.destination.droppableId)].items.splice(re.destination.index, 0, dragItem);
        setBoardData(newBoardData);
    };


    const handleAddDrag = (data: INewDrag) => {
        let newBoardData = Array.from(boardData);
        newBoardData[0].items.push(data);
        setBoardData(newBoardData);
    }


    return (
        <>
            <CreateDrag addDrag={handleAddDrag}/>
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
                                                        data.items.map((item: { id: number, priority: number, title: string }, index: number) => (
                                                            <DragItem key={item.id} data={item} index={index}/>
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