export interface INode {
    id: string,
    type: string,
    data: INodeData,
    position: {x: number, y: number}
}

export interface INodeData {
    id: string,
    name: string,
    description: string | null,
    type: string
}

export interface INewNode {
    id: number,
    name: string,
    description: string,
    type_card: string,
    x_coord: number,
    y_coord: number
}