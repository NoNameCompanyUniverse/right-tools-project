export interface ISubdivision {
    id: number,
    name: string,
    level: number,
    children: ISubdivision[]
}