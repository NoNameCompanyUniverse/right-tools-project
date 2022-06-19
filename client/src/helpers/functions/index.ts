import {IKanBan} from "../../types/old/IKanBan";
import {IDrag} from "../../types/old/IDrag";

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