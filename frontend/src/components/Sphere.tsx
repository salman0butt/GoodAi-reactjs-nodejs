import React from 'react'
import { useShapeAnimation } from '../hooks/useShapeAnimation';

interface SphereProps {
    radius: number;
}

const Sphere: React.FC<SphereProps> = ({ radius = 1 }) => {
    const { shapeRef } = useShapeAnimation('sphere', { radius });

    return (
        <div>
            <h2>Sphere</h2>
            <div ref={shapeRef} style={{ width: "300px", height: "300px" }} />
        </div>
    );
};

export default Sphere;