import React, {useCallback, useState} from 'react';
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap} from "react-flow-renderer";


const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: {label: 'Input Node'},
        position: {x: 250, y: 25},
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: {label: <div>Default Node</div>},
        position: {x: 100, y: 125},
    },
    {
        id: '3',
        type: 'output',
        data: {label: 'Output Node'},
        position: {x: 250, y: 250},
    },
    {
        id: '4',
        type: 'input',
        data: {label: 'Input Node'},
        position: {x: 350, y: 350},
    },
    {
        id: '5',
        type: 'output',
        data: {label: 'Output Node'},
        position: {x: 450, y: 450},
    },
];

const initialEdges = [
    {id: 'e1-2', source: '1', target: '2'},
    {id: 'e2-3', source: '2', target: '3', animated: true},
];

const MindMap = () => {

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const handleOnNodeChange = useCallback(
        // @ts-ignore
        (changes) => setNodes((nds: any) =>
            applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const handleOnEdgesChange = useCallback(
        (changes) => setEdges((eds) =>
            applyEdgeChanges(changes, eds)),
        [setEdges]
    )

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
                fitView>
                <MiniMap/>
                <Controls/>
                <Background/>
            </ReactFlow>
        </>
    );
};

export default MindMap;