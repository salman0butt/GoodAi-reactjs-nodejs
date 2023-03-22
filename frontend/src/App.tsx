import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Sphere, Cylinder, Cube } from './components';
import socketInit from './socket'
import type { Socket } from 'socket.io-client';

const FETCH_RANDOM_VALUE: string = 'FETCH_RANDOM_VALUE';

const App: React.FC = () => {
    const [width, setWidth] = useState<number>(1);
    const [height, setHeight] = useState<number>(1);
    const [radius, setRadius] = useState<number>(1);
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        const initRandomValue = () => {
            socket.current = socketInit();
            socket.current?.on(FETCH_RANDOM_VALUE, (randomValue: number) => {
                setWidth(randomValue);
                setHeight(randomValue);
                setRadius(randomValue);
            });
    
        }
        initRandomValue();
        return () => {
            socket.current?.off(FETCH_RANDOM_VALUE);
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
