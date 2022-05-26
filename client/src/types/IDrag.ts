export interface IDrag  {
    title: string,
    priority: string | number,
    description: string
}

export interface INewDrag extends IDrag  {
    id: number
}