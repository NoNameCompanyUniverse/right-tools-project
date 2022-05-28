export interface INewDrag  {
    title: string,
    priority: string | number,
    description: string
}

export interface IDrag extends INewDrag  {
    id: number
}