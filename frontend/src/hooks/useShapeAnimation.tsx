import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import type { Socket } from 'socket.io-client';
import socketInit from '../socket';

interface ShapeProps {
    height?: number;
    radius?: number;
    width?: number;
    rotation?: { x: number, y: number }
}

interface UseShapeAnimationResult {
    shapeRef: React.RefObject<HTMLDivElement>;
}

// create shape function
const createShape = (type: string, shapeProps: ShapeProps) => {
    let geometry: THREE.BufferGeometry;

    // shape type
    switch (type) {
        case 'cube':
            geometry = new THREE.BoxGeometry(
                shapeProps.width,
                shapeProps.height,
                shapeProps.width
            );
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(shapeProps.radius, 32, 32);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(
                shapeProps.radius,
                shapeProps.radius,
                shapeProps.height,
                32
            );
            break;
        default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
            break;
    }

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);

    return { mesh, geometry };
};

interface fetchType {
    x: number;
    y: number;
}

export const useShapeAnimation = (
    type: string,
    shapeProps: ShapeProps = {},
): UseShapeAnimationResult => {

    const shapeRef = useRef<HTMLDivElement>(null);
    const socket = useRef<Socket | null>(null);
    const fetchRef = useRef<fetchType>({ x: 0, y: 0 });
    const FETCH_RANDOM_VALUE: string = 'FETCH_RANDOM_VALUE';

    useEffect(() => {
        const initRandomValue = () => {
            // inialize socket connection
            socket.current = socketInit();
            //listening to random values
            socket.current?.on(FETCH_RANDOM_VALUE, ({ x, y }: fetchType) => {
                fetchRef.current = { x, y };
            });
        }
        initRandomValue();
        // cleanup
        return () => {
            socket.current?.disconnect();
            socket.current?.off(FETCH_RANDOM_VALUE);
        };
    }, []);


    useEffect(() => {
        const width = shapeRef.current?.clientWidth || 0;
        const height = shapeRef.current?.clientHeight || 0;

        if (!width || !height) return;

        // scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        //setting height width and rendering element
        renderer.setSize(width, height);
        shapeRef.current?.appendChild(renderer.domElement);

        const { mesh, geometry } = createShape(type, shapeProps);

        scene.add(mesh);

        camera.position.z = 3;

        // animation
        const animate = () => {
            requestAnimationFrame(animate);

            if (fetchRef.current) {
                mesh.rotation.x += fetchRef.current.x;
                mesh.rotation.y += fetchRef.current.y
            }

            renderer.render(scene, camera);
        };

        animate();

        // cleanup
        return () => {
            if (shapeRef.current && renderer.domElement) {
                shapeRef.current.removeChild(renderer.domElement);
            }

            geometry.dispose();
            mesh.geometry.dispose();
            mesh.material.dispose();
        };
    }, [shapeProps, type]);

    return { shapeRef };
};
