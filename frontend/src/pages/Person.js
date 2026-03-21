import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Person({ onReachHouse }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current.position.distanceTo({ x: 5, y: 0, z: 0 }) < 2) {
      onReachHouse();
    }
  });

  return (
    <mesh ref={ref} position={[4, 0, 0]}>
      <sphereGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}