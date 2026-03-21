export default function Stupa() {
  return (
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[1, 1, 2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}