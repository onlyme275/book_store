import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import useControls from "./Controls";

export default function Player() {
  const ref = useRef();
  const { forward, backward, left, right } = useControls();

  useFrame(() => {
    if (!ref.current) return;

    const speed = 0.1;

    if (forward) ref.current.position.z -= speed;
    if (backward) ref.current.position.z += speed;
    if (left) ref.current.position.x -= speed;
    if (right) ref.current.position.x += speed;
  });

  return (
    <mesh ref={ref} position={[0, 0, 5]}>
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

