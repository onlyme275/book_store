export default function House() {
  return (
    <mesh position={[5, 0, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}