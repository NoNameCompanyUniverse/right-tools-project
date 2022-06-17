export interface INewDrag  {
    title: string,
    priority: string | number,
    description: string,
    board: number,
}

export interface IDrag extends INewDrag  {
    id: number
}