import {Node, Edge} from "react-flow-renderer";

export interface IMindMap {
    id: number,
    name: string,
    nodes: Node [],
    edges: Edge []
}