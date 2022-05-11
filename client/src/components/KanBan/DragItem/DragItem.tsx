import React from 'react';
import style from './index.module.scss';

// @ts-ignore
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd-next";

type IDragItem = {
    id: number,
    priority: number,
    title: string
}

const DragItem: React.FC<{ data: IDragItem, index: number }> = ({data, index}) => {

    const {id, title, priority} = data;

    return (
        <Draggable index={index} draggableId={id.toString()}>
            {
                (provided:any) => (
                    <div ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         className={style.container}>
                        <div
                            className={`${style.tag} ${priority === 0 ? style.low : priority === 1 ? style.medium : style.high}`}>
                            {
                                priority === 0 ? "Низкий приоритет" : priority === 1 ? "Средний приоритет" : "Высокий приоритет"
                            }
                        </div>
                        <div className={style.title}>
                            {title}
                        </div>
                        <div className={style.description}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam debitis dolorem neque
                            numquam rem,
                            ullam ut. A dolor doloremque eaque ipsam laboriosam magnam minus numquam quo sint,
                            veritatis, voluptate
                            voluptatem.
                        </div>
                    </div>
                )
            }
        </Draggable>
    );
};

export default DragItem;