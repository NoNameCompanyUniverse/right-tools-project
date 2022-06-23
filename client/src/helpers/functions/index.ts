import {IKanBan} from "../../types/old/IKanBan";
import {IDrag} from "../../types/old/IDrag";
import {INewNode, INode} from "../../types/INode";
import ReactFlow, {Node} from 'react-flow-renderer'
export const genId = () => {
    return Math.ceil(new Date().getTime() / Math.random() / 10000);
}


export const convertKanBan = (columns: Array<{id: number, name: string, items: Array<IDrag> }>, items: IDrag[]) => {
    return columns.map((data) => ({
        id: data.id,
        name: data.name,
        items: items.filter((i: IDrag) => i.board === data.id)
    }));
}

export const deConvertMindCard = (data: INewNode) => {
    return {
        id: data.id.toString(),
        type: 'nodeCard',
        data: {
            id: data.id.toString(),
            name: data.name,
            description: data.description,
            type: data.type_card === 'D' ? 'default' : data.type_card === 'S' ? 'source' : 'target'
        },
        position: {
            x: data.x_coord,
            y: data.y_coord
        }
    }
}

export const convertMindCard = (data: INode | Node) => {
    return {
        name: data.data.name,
        description: data.data.description,
        type_card: data.data.type.slice(0, 1).toUpperCase(),
        x_coord: Math.ceil(data.position.x),
        y_coord: Math.ceil(data.position.y)
    }
}