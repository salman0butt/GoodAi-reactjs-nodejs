import React from 'react'
import { useShapeAnimation } from '../hooks/useShapeAnimation';

interface CylinderProps {
    height?: number;
    radius?: number;
}

const Cylinder: React.FC<CylinderProps> = ({ height = 2, radius = 1 }) => {
    const { shapeRef } = useShapeAnimation('cube', { height, radius });

    return (
        <div>
            <h2>Cylinder</h2>
            <div ref={shapeRef} style={{ width: "300px", height: "300px" }} />
        </div>
    );
};


export default Cylinder;