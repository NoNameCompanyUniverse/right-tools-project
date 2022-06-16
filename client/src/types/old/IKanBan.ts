import {IDrag} from "./IDrag";

export interface IKanBan {
    id: number,
    name: string,
    board: Array<{name: string, items: IDrag[]}>
}

