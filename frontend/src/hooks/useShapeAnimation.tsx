import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// shape props
interface ShapeProps {
    height?: number;
    radius?: number;
    width?: number;
}

// return type props
interface UseShapeAnimationResult {
    shapeRef: React.RefObject<HTMLDivElement>;
}

export const useShapeAnimation = (type: string, shapeProps: ShapeProps): UseShapeAnimationResult => {
    const shapeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!shapeRef.current?.clientWidth || !shapeRef.current?.clientHeight) return;

        // three.js code
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            shapeRef.current?.clientWidth / shapeRef.current?.clientHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(shapeRef.current?.clientWidth ?? 0, shapeRef.current?.clientHeight ?? 0);
        shapeRef.current?.appendChild(renderer.domElement);

        let shape;

        // shape type
        switch (type) {
            case 'cube':
                shape = new THREE.BoxGeometry(
                    shapeProps?.width ?? 1,
                    shapeProps?.height ?? 1,
                    shapeProps?.width ?? 1
                );
                break;
            case 'sphere':
                shape = new THREE.SphereGeometry(shapeProps?.radius ?? 1, 32, 32);
                break;
            case 'cylinder':
                shape = new THREE.CylinderGeometry(
                    shapeProps?.radius ?? 1,
                    shapeProps?.radius ?? 1,
                    shapeProps?.height ?? 2,
                    32
                );
                break;
            default:
                break;
        }

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(shape, material);
        scene.add(mesh);

        camera.position.z = 5;

        // animation
        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // clear element
            if (shapeRef.current && renderer.domElement) {
                shapeRef.current.removeChild(renderer.domElement);
            }
        };
    }, [shapeProps, type]);

    return { shapeRef };
};
