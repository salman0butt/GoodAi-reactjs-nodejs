import React from "react";
import { useShapeAnimation } from "../hooks/useShapeAnimation";

interface CubeProps {
    width?: number;
}

const Cube: React.FC<CubeProps> = ({ width = 1 }) => {
    const { shapeRef } = useShapeAnimation('cube', { width });

    return (
        <div>
            <h2>Cube</h2>
            <div ref={shapeRef} style={{ width: "300px", height: "300px" }} />
        </div>
    );
};

export default Cube;