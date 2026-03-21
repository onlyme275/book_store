import { useEffect, useRef } from "react";

export const KEYS = {
    w: "w", a: "a", s: "s", d: "d",
    ArrowUp: "ArrowUp", ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft", ArrowRight: "ArrowRight",
};

/**
 * Returns a ref whose .current is a object of { key: boolean }
 * indicating which movement keys are currently pressed.
 */
export function useKeyboard() {
    const keys = useRef({});

    useEffect(() => {
        const onDown = (e) => {
            if (Object.values(KEYS).includes(e.key)) {
                keys.current[e.key] = true;
                e.preventDefault();
            }
        };
        const onUp = (e) => {
            if (Object.values(KEYS).includes(e.key)) {
                keys.current[e.key] = false;
            }
        };
        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
        };
    }, []);

    return keys;
}

/** Returns true if two [x,z] positions are within `threshold` distance */
export function isNear(posA, posB, threshold = 2.5) {
    const dx = posA[0] - posB[0];
    const dz = posA[2] - posB[2];
    return Math.sqrt(dx * dx + dz * dz) < threshold;
}
