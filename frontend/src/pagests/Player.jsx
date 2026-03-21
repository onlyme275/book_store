import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import Person from "./Person";
import { useKeyboard, isNear } from "./Controls";
import * as THREE from "three";

const SPEED = 4;
const HOUSE_POS = [8, 0, -8];

export default function Player({ onEnterHouse }) {
    const posRef = useRef([0, 0, 5]);
    const movingRef = useRef(false);
    const rotRef = useRef(0);
    const meshRef = useRef();
    const keys = useKeyboard();
    const { camera } = useThree();

    useFrame((_, delta) => {
        const pos = posRef.current;
        let dx = 0, dz = 0;

        if (keys.current["w"] || keys.current["ArrowUp"]) dz -= 1;
        if (keys.current["s"] || keys.current["ArrowDown"]) dz += 1;
        if (keys.current["a"] || keys.current["ArrowLeft"]) dx -= 1;
        if (keys.current["d"] || keys.current["ArrowRight"]) dx += 1;

        const isMoving = dx !== 0 || dz !== 0;
        movingRef.current = isMoving;

        if (isMoving) {
            // Normalize diagonal
            const len = Math.sqrt(dx * dx + dz * dz);
            dx /= len; dz /= len;

            pos[0] += dx * SPEED * delta;
            pos[2] += dz * SPEED * delta;

            // Clamp to world bounds
            pos[0] = Math.max(-20, Math.min(20, pos[0]));
            pos[2] = Math.max(-20, Math.min(20, pos[2]));

            // Face direction of movement
            rotRef.current = Math.atan2(dx, dz);
        }

        if (meshRef.current) {
            meshRef.current.position.set(pos[0], 0, pos[2]);
            meshRef.current.rotation.y = rotRef.current;
        }

        // Camera follows player (3rd person)
        camera.position.lerp(
            new THREE.Vector3(pos[0], 8, pos[2] + 12),
            delta * 4
        );
        camera.lookAt(pos[0], 1, pos[2]);

        // Collision with house
        if (isNear(pos, HOUSE_POS, 3)) {
            onEnterHouse && onEnterHouse();
        }
    });

    return (
        <group ref={meshRef}>
            <Person position={[0, 0, 0]} moving={movingRef.current} />
        </group>
    );
}
