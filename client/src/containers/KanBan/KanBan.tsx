import React, {useEffect, useState} from 'react';
// @ts-ignore
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd-next";

import styleColumn from '../../components/KanBan/DragColumn/index.module.scss';


import BoardData from '../../../data-board.json';
import DragItem from "../../components/KanBan/DragItem";
import CreateDrag from "../../blocks/KanBan/CreateDrag";
import {IDrag, INewDrag} from "../../types/IKanBan";
import ControlDrag from "../../blocks/KanBan/ControlDrag";
import {ReplyIcon} from "@heroicons/react/outline";
import Link from "next/link";
import {useRouter} from "next/router";
import {IKanBan} from "../../types/IKanBan";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useSession} from "next-auth/react";
import {
    deleteKanBanCard,
    getKanBan,
    patchKanBanCard,
    postKanBanCard,
    putKanBanCard
} from "../../redux/actions/KanBanActions";



const KanBan: React.FC = () => {
    const router = useRouter();
    const {kanban, isLoading} = useAppSelector(state => state.kanbanSlice);
    const dispatch = useAppDispatch();
    const {data: session} = useSession()

    const [boardData, setBoardData] = useState<Array<{ id: number, name: string, items: Array<IDrag> }>>(BoardData);
    const [boardItem, setBoardItem] = useState<IDrag | null>(null);

    const [kanbanData, setKanBanData] = useState<IKanBan[]>([])

    const onDragEnd = (re: any) => {
        //@ts-ignore
        const token: string = session?.accessToken;
        if (!re.destination) return;
        console.log(re)
        let newBoardData = Array.from(kanbanData);
        let dragItem = newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
        dragItem.board = parseInt(re.destination.droppableId);
        dragItem.kanban_column = parseInt(re.destination.droppableId) + 1;
        newBoardData[parseInt(re.source.droppableId)].items.splice(re.source.index, 1);
        newBoardData[parseInt(re.destination.droppableId)].items.splice(re.destination.index, 0, dragItem);
        dispatch(patchKanBanCard({
            token,
            id: dragItem.id,
            data: {kanban_column: dragItem.kanban_column},
            kanban: newBoardData}))
    };
    const handleOnDrag = (action: { type: "LOOK" | "EDIT" | "DELETE" | "DEFAULT" | "CREATE", payload: INewDrag | IDrag}) => {
        const {type, payload} = action;
        //@ts-ignore
        const token: string = session?.accessToken;
        //@ts-ignore
        const idKB: number = router.query.kanban;
        switch (type) {
            case "CREATE": {
                dispatch(postKanBanCard({token, id: idKB, data: payload}))
                break;
            }
            case "EDIT": {
                if ("id" in payload) {
                    dispatch(putKanBanCard({token, id: payload.id, data: payload}))
                }
                break;
            }
            case "DELETE": {
                if ("id" in payload) {
                    dispatch(deleteKanBanCard({token, id: payload.id}))
                }
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


    useEffect(() => {
        //@ts-ignore
        const token: string = session?.accessToken;
        if (!router.isReady) return;

        // @ts-ignore
        dispatch(getKanBan({token, id: router.query.kanban}))

    }, [dispatch]);


    useEffect(() => {
        isLoading === 'FULFILLED' ? setKanBanData(JSON.parse(JSON.stringify(kanban))) : ''
    }, [isLoading]);


    useEffect(() => {
        setKanBanData(JSON.parse(JSON.stringify(kanban)))
    }, [kanban]);

    return (
        <>
            <div className={'d-flex justify-content-between align-items-center mb-3'}>
                <Link href={`/project/${router.query.id}`}>
                    <a
                        className={['btn d-flex align-items-center ps-0'].join(" ")}>
                        <i className="icon me-2">
                            <ReplyIcon/>
                        </i>
                        <span>Вернуться назад</span>
                    </a>
                </Link>
                <CreateDrag onDrag={handleOnDrag}/>
            </div>
            <ControlDrag data={boardItem} onDrag={handleOnDrag}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={`row flex-grow-1 gx-3`} >
                    {
                        kanbanData.map((data: any, bIndex: number) => (
                            <div key={data.name} className="col">
                                <Droppable id={data.id} droppableId={bIndex.toString()}>
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