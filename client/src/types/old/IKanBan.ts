import {IDrag} from "./IDrag";

export interface IBoard {
    board: Array<{id: number, name: string, items: IDrag[]}>
}

export interface IKanBan extends IBoard{
    id: number,
    name: string
}


