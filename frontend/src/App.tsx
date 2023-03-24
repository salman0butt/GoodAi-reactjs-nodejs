import React from 'react'
import './App.css'
import { Sphere, Cylinder, Cube } from './components';

const App: React.FC = () => {
    // static dimentions
    const width = 1;
    const height = 2;
    const radius = 1;

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
