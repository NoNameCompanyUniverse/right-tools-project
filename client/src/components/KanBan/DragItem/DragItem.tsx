import React from 'react';
import style from './index.module.scss';
import {IDrag} from "../../../types/IKanBan";
import {PencilAltIcon} from "@heroicons/react/outline";

// @ts-ignore
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd-next";

interface IDragItem {
    data: IDrag,
    onData: (data: IDrag) => void,
    index: number
}

const DragItem: React.FC<IDragItem> = ({data, index, onData}) => {

    const {id, name, priority, description} = data;

    const handleOnClick = () => {
        onData(data)
    }

    return (
        <Draggable index={index} draggableId={id.toString()}>
            {
                (provided: any) => (
                    <div ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         onClick={() => handleOnClick()}
                         className={style.container}>
                        <div
                            className={`${style.tag} ${priority === 'L' 
                                ? style.low 
                                : priority === "A" 
                                    ? style.medium 
                                    : style.high}`}>
                            {priority === "L"
                                ? "Низкий приоритет"
                                : priority === 'A'
                                    ? "Средний приоритет"
                                    : "Высокий приоритет"}
                        </div>
                        <div className={style.title}>{name}</div>
                        <div className={style.description}>{description}</div>
                    </div>
                )
            }
        </Draggable>
    );
};

export default DragItem;