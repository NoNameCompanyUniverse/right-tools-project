import React, {useCallback, useEffect, useState, MouseEvent as ReactMouseEvent} from 'react';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    Edge,
    Node,
    MiniMap, NodeChange, EdgeChange, updateEdge, Connection
} from "react-flow-renderer";
import NodeCard from '../../components/MindMap/Node'
import CreateNode from "../../blocks/MindMap/CreateNode";
import ControlNode from "../../blocks/MindMap/ControlNode";
import {useRouter} from "next/router";



const initialNodes: Node[] = [
    {
        id: '1',
        type: 'nodeCard',
        data: {
            id: '1',
            label: 'Hello World',
            description: 'Нужно просто взять и сделать этот ваш гребаный сайт и забыть про эту фигню как страшный сон.',
            type: 'source',
        },
        position: {x: 250, y: 550},
    },
    {
        id: '2',
        type: 'nodeCard',
        data: {
            id: '2',
            label: 'Hello World 2',
            description: '',
            type: 'target',

        },
        position: {x: 450, y: 350},
    },
    {
        id: '3',
        type: 'nodeCard',
        data: {
            id: '3',
            label: 'Hello World 3',
            description: 'Нужно просто взять и сделать этот ваш гребаный сайт и забыть про эту фигню как страшный сон.',
            type: 'default'
        },
        position: {x: 450, y: 150},
    },
];

const nodeCard = {nodeCard: NodeCard};

const initialEdges: Edge[] = [
    {id: 'e1-2', source: '1', target: '3', animated: true},
    {id: 'e1-3', source: '3', target: '2', animated: true},
];


const MindMap = () => {

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const [node, setNode] = useState<Node | null>(null)

    const handleAddNode = (data: Node) => {
        setNodes((nds) => nds.concat(data))
    }

    const handleOnNodeChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds: any) =>
            applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const handleOnEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) =>
            applyEdgeChanges(changes, eds)),
        [setEdges]
    )

    const handleOnEdgeUpdate = (oldEdge: Edge<any>, newConnection: Connection) =>
        setEdges((els) => updateEdge(oldEdge, newConnection, els))

    const handleOnConnect = useCallback(
        (connection) => setEdges((eds) =>
            addEdge({...connection, animated: true}, eds)),
        [setEdges]
    )


    const handleOnLookData = (_: ReactMouseEvent, data: Node) => {
        setNode(data)
    }

    const handleOnNode = (action: { type: "LOOK" | "EDIT" | "DELETE" | "DEFAULT" | "CREATE", payload: Node }) => {
        const {type, payload} = action;

        const deleteEdges = () => {
            let newEdges: Edge[] = JSON.parse(JSON.stringify(edges));
            newEdges = newEdges.filter((edge: Edge) => edge.target !== payload.id && edge.source !== payload.id) ;
            setEdges(newEdges);
        }

        switch (type) {
            case "CREATE": {
                setNodes((nds) => nds.concat(payload))
                break;
            }
            case "EDIT": {
                let newNodes: Node[] = JSON.parse(JSON.stringify(nodes));
                newNodes = newNodes.map((node:Node) => {
                    if(node.id === payload.id) {
                        node.data.type !== payload.data.type ? deleteEdges() : '';
                        return payload;
                    } else  {
                        return node;
                    }
                })
                //newNodes = newNodes.map((node:Node) => node.id === payload.id ? node = payload : node);
                setNodes(newNodes);
                break;
            }
            case "DELETE": {
                let newNodes: Node[] = JSON.parse(JSON.stringify(nodes));
                newNodes = newNodes.filter((node:Node) => node.id !== payload.id);
                setNodes(newNodes);
                deleteEdges()
                break;
            }
            default : {
                break;
            }
        }
    }




    return (
        <>
            <ReactFlow
                className={`flex-grow-1`}
                nodes={nodes}
                edges={edges}
                onNodesChange={handleOnNodeChange}
                onEdgesChange={handleOnEdgesChange}
                onConnect={handleOnConnect}
                onEdgeUpdate={handleOnEdgeUpdate}
                nodeTypes={nodeCard}
                onNodeClick={handleOnLookData}
                fitView>
                <div style={{
                    'position': 'absolute',
                    'top': '10px',
                    'zIndex': '5',
                    'right': '10px'
                }}>
                    <CreateNode onNode={handleOnNode}/>
                </div>
                <MiniMap nodeColor={(n: Node<any>) => {
                    if (n.data.type === 'target') return '#868974FF';
                    if (n.data.type === 'source') return '#F0B878FF';
                    if (n.data.type === 'default') return '#dcdcdc';
                    return '#fff';

                }}/>
                <Controls/>
                <Background color={`#aaa`} gap={10}/>
            </ReactFlow>
            <ControlNode data={node} onNode={handleOnNode}/>
        </>
    );
};

export default MindMap;