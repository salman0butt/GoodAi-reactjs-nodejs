import { memo, useEffect, useRef, useState } from 'react'
import './App.css'
import { Sphere, Cylinder, Cube } from './components';
import socketInit from './socket'
import type { Socket } from 'socket.io-client';

const FETCH_RANDOM_VALUE: string = 'FETCH_RANDOM_VALUE';

interface ShapeProps {
    height?: number;
    radius?: number;
    width?: number;
}


const areEqual = (prevProps: ShapeProps, nextProps: ShapeProps) => {
    return (
        prevProps.width === nextProps.width &&
        prevProps.height === nextProps.height &&
        prevProps.radius === nextProps.radius
    );
};

const MemoCube = memo(Cube, areEqual);
const MemoCylinder = memo(Cylinder, areEqual);
const MemoSphere = memo(Sphere, areEqual);


const App: React.FC = () => {
    const [width, setWidth] = useState<number>(1);
    const [height, setHeight] = useState<number>(2);
    const [radius, setRadius] = useState<number>(1);
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        const initRandomValue = () => {
            socket.current = socketInit();
            socket.current?.on(FETCH_RANDOM_VALUE, (randomValue: number) => {
                if (randomValue !== width && randomValue !== height && randomValue !== radius) {
                    requestAnimationFrame(() => {
                        setWidth(randomValue);
                        setHeight(randomValue);
                        setRadius(randomValue);
                    });
                }
            });

        }
        initRandomValue();
        return () => {
            socket.current?.disconnect();
            socket.current?.off(FETCH_RANDOM_VALUE);
        };
    }, []);

    return (
        <>
            {/* Cube */}
            <MemoCube width={width} />
            {/* Cylinder */}
            <MemoCylinder height={height} radius={radius} />
            {/* Sphere */}
            <MemoSphere radius={radius} />
        </>
    );
};

export default App;
