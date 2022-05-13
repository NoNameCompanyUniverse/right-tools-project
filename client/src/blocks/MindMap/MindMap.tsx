import React, {useCallback, useEffect, useState} from 'react';
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


const initialNodes: Node[] = [
    {
        id: '1',
        type: 'nodeCard',
        data: {
            label: 'Hello World',
            description: 'Нужно просто взять и сделать этот ваш гребаный сайт и забыть про эту фигню как страшный сон.',
            type: 'source'
        },
        position: {x: 250, y: 550},
    },
    {
        id: '2',
        type: 'nodeCard',
        data: {
            label: 'Hello World 2',
            type: 'target'
        },
        position: {x: 450, y: 350},
    },
    {
        id: '3',
        type: 'nodeCard',
        data: {
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
];

const MindMap = () => {

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
                fitView>
                <MiniMap nodeColor={(n:Node<any>) => {
                    if (n.data.type === 'target') return '#868974FF';
                    if (n.data.type === 'source') return '#F0B878FF';
                    if (n.data.type === 'default') return '#dcdcdc';
                    return '#fff';

                }}/>
                <Controls/>
                <Background color={`#aaa`} gap={10}/>
            </ReactFlow>
        </>
    );
};

export default MindMap;