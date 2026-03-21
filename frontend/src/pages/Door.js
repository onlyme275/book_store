import { useState } from "react";

export default function Door({ onEnter }) {
  return (
    <mesh
      position={[0, 0, 0]}
      onClick={onEnter}
    >
      <boxGeometry args={[2, 4, 0.5]} />
      <meshStandardMaterial color="brown" />
    </mesh>
  );
}
    