interface BufDrag {
    name: string,
    priority: 'L' | 'A' | 'H',
    description: string | null,
}

export interface INewDrag extends BufDrag{}


export interface IDrag extends BufDrag{
    id: number,
    board: number,
    kanban_column: number
}
export interface IKanBan {
    id: number,
    name: string,
    items: IDrag[]
}