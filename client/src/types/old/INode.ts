export interface INode  {
    id: string,
    label: string,
    description: string,
    type: 'source' | 'target' | 'default'
}