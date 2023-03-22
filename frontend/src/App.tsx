import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Sphere, Cylinder, Cube } from './components';
import socketInit from './socket'
import type { Socket } from 'socket.io-client';

type SocketRandomType = {
  randomValue: (value: number) => void;
};


const App: React.FC = () => {
    const [width, setWidth] = useState<number>(1);
    const [height, setHeight] = useState<number>(1);
    const [radius, setRadius] = useState<number>(1);
    const socket = useRef<Socket<SocketRandomType> | null>(null);

    useEffect(() => {
        const initRandomValue = () => {
            socket.current = socketInit();
            socket.current?.on('randomValue', (randomValue: number) => {
                setWidth(randomValue);
                setHeight(randomValue);
                setRadius(randomValue);
            });
    
        }
        initRandomValue();
        return () => {
            socket.current?.off('randomValue');
        };
    }, []);

    return (
        <>
            {/* Cube */}
            <Cube width={width} />
            {/* Cylinder */}
            <Cylinder height={height} radius={radius} />
            {/* Sphere */}
            <Sphere radius={radius} />
        </>
    );
};

export default App;
