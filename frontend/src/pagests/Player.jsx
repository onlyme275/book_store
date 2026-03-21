import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import Person from "./Person";
import { useKeyboard, isNear } from "./Controls";
import * as THREE from "three";

const SPEED = 4.8;
const HOUSE_POS = [12, 0, -10];

export default function Player({ onEnterHouse }) {
    const posRef = useRef([0, 0, 10]); // Start a bit further back
    const movingRef = useRef(false);
    const rotRef = useRef(0);
    const meshRef = useRef();
    const keys = useKeyboard();
    const { camera } = useThree();

    // Perspective states: 0 = 3rd Person, 1 = 1st Person, 2 = Drone/Overview
    const [viewMode, setViewMode] = useState(0);
    const [zoom, setZoom] = useState(14);

    // Mouse wheel zoom (only for 3rd person)
    useEffect(() => {
        const onWheel = (e) => {
            if (viewMode === 0) {
                setZoom((prev) => Math.max(6, Math.min(30, prev + e.deltaY * 0.015)));
            }
        };
        window.addEventListener("wheel", onWheel);
        return () => window.removeEventListener("wheel", onWheel);
    }, [viewMode]);

    // Keys to toggle perspectives
    useEffect(() => {
        const onKey = (e) => {
            const k = e.key.toLowerCase();
            if (k === "v") setViewMode((prev) => (prev === 1 ? 0 : 1)); // Toggle 1st/3rd
            if (k === "c") setViewMode((prev) => (prev === 2 ? 0 : 2)); // Toggle Drone/3rd
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useFrame((state, delta) => {
        const pos = posRef.current;
        let dx = 0, dz = 0;

        if (keys.current["w"] || keys.current["ArrowUp"]) dz -= 1;
        if (keys.current["s"] || keys.current["ArrowDown"]) dz += 1;
        if (keys.current["a"] || keys.current["ArrowLeft"]) dx -= 1;
        if (keys.current["d"] || keys.current["ArrowRight"]) dx += 1;

        const isMoving = dx !== 0 || dz !== 0;
        movingRef.current = isMoving;

        if (isMoving) {
            const len = Math.sqrt(dx * dx + dz * dz);
            dx /= len; dz /= len;

            pos[0] += dx * SPEED * delta;
            pos[2] += dz * SPEED * delta;

            // Wrap-around or large bounds
            pos[0] = Math.max(-48, Math.min(48, pos[0]));
            pos[2] = Math.max(-48, Math.min(48, pos[2]));

            rotRef.current = Math.atan2(dx, dz);
        }

        if (meshRef.current) {
            meshRef.current.position.set(pos[0], 0, pos[2]);
            meshRef.current.rotation.y = rotRef.current;
            meshRef.current.visible = (viewMode !== 1); // Hide in 1st person
        }

        // Advanced Camera Logic
        if (viewMode === 1) {
            // 1st Person
            camera.position.set(pos[0], 1.7, pos[2]);
            const lookAtX = pos[0] + Math.sin(rotRef.current) * 10;
            const lookAtZ = pos[2] + Math.cos(rotRef.current) * 10;
            camera.lookAt(lookAtX, 1.7, lookAtZ);
        } else if (viewMode === 2) {
            // Drone/Top-down overview
            const targetPos = new THREE.Vector3(pos[0], 25, pos[2] + 5);
            camera.position.lerp(targetPos, delta * 3);
            camera.lookAt(pos[0], 0, pos[2]);
        } else {
            // Standard 3rd Person
            const targetPos = new THREE.Vector3(pos[0], 8, pos[2] + zoom);
            camera.position.lerp(targetPos, delta * 5);
            camera.lookAt(pos[0], 1.5, pos[2]);
        }

        // Increased collision radius (5 units) for easier redirect
        if (isNear(pos, HOUSE_POS, 5)) {
            onEnterHouse && onEnterHouse();
        }
    });

    return (
        <group ref={meshRef}>
            <Person position={[0, 0, 0]} moving={movingRef.current} />
        </group>
    );
}
