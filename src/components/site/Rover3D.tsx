import { useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  ContactShadows,
  RoundedBox,
} from "@react-three/drei";
import type { Group } from "three";

const C = { body: "#2a2f30", shell: "#e9efe9", accent: "#3ee08f", tire: "#141617", rim: "#5b6466" };

function Wheel({
  position,
  steer = 0,
  reduce = false,
}: {
  position: [number, number, number];
  steer?: number;
  reduce?: boolean;
}) {
  const ref = useRef<Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const centreAngle = reduce ? 0 : steer * Math.sin(s.clock.elapsedTime * 0.8) * 0.35;
    if (Math.abs(centreAngle) < 0.001) {
      ref.current.rotation.y = 0;
      return;
    }
    // Separate inner/outer angles share a turning centre (wheelbase 1.5, track 1.76).
    const radius = 1.5 / Math.tan(Math.abs(centreAngle));
    const inner = Math.sign(position[0]) === Math.sign(centreAngle);
    ref.current.rotation.y =
      Math.sign(centreAngle) * Math.atan(1.5 / (radius + (inner ? -0.88 : 0.88)));
  });
  return (
    <group position={position} ref={ref}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.32, 32]} />
        <meshStandardMaterial color={C.tire} roughness={0.95} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[position[0] > 0 ? 0.17 : -0.17, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.02, 24]} />
        <meshStandardMaterial color={C.rim} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[position[0] > 0 ? 0.172 : -0.172, 0, 0]}>
        <torusGeometry args={[0.3, 0.012, 8, 40]} />
        <meshStandardMaterial color={C.accent} emissive={C.accent} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Rover({ reduce }: { reduce: boolean }) {
  const ref = useRef<Group>(null);
  useFrame((s, d) => {
    if (ref.current && !reduce) ref.current.rotation.y += Math.min(d, 0.05) * 0.25;
    void s;
  });
  return (
    <group ref={ref} position={[0, 0.42, 0]}>
      {/* chassis */}
      <RoundedBox args={[1.5, 0.28, 2.3]} radius={0.06} position={[0, 0.25, 0]} castShadow>
        <meshStandardMaterial color={C.body} metalness={0.6} roughness={0.4} />
      </RoundedBox>
      {/* body shell */}
      <RoundedBox args={[1.25, 0.55, 1.7]} radius={0.14} position={[0, 0.66, -0.05]} castShadow>
        <meshStandardMaterial color={C.shell} metalness={0.2} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[1.27, 0.08, 1.4]} radius={0.03} position={[0, 0.72, -0.05]}>
        <meshStandardMaterial color={C.body} />
      </RoundedBox>
      {/* light bar */}
      <mesh position={[0, 0.62, 0.81]}>
        <boxGeometry args={[0.9, 0.04, 0.02]} />
        <meshStandardMaterial color={C.accent} emissive={C.accent} emissiveIntensity={3} />
      </mesh>
      {/* GNSS mast */}
      <mesh position={[0, 1.2, -0.4]}>
        <cylinderGeometry args={[0.03, 0.04, 0.6, 12]} />
        <meshStandardMaterial color={C.body} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.52, -0.4]}>
        <cylinderGeometry args={[0.2, 0.2, 0.07, 32]} />
        <meshStandardMaterial color={C.body} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.56, -0.4]}>
        <torusGeometry args={[0.18, 0.012, 8, 40]} />
        <meshStandardMaterial color={C.accent} emissive={C.accent} emissiveIntensity={2} />
      </mesh>
      {/* camera module */}
      <RoundedBox args={[0.32, 0.14, 0.12]} radius={0.03} position={[0, 0.98, 0.7]}>
        <meshStandardMaterial color={C.body} />
      </RoundedBox>
      <mesh position={[0, 0.98, 0.77]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 20]} />
        <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0} />
      </mesh>
      {/* attachment rail */}
      <mesh position={[0, 0.05, -1.25]}>
        <boxGeometry args={[1.3, 0.06, 0.1]} />
        <meshStandardMaterial color={C.rim} metalness={0.8} />
      </mesh>
      {/* wheels: front steer (Ackermann demo) */}
      <Wheel position={[-0.88, 0, 0.75]} steer={1} reduce={reduce} />
      <Wheel position={[0.88, 0, 0.75]} steer={1} reduce={reduce} />
      <Wheel position={[-0.88, 0, -0.75]} reduce={reduce} />
      <Wheel position={[0.88, 0, -0.75]} reduce={reduce} />
    </group>
  );
}

export default function Rover3D({
  reduce = false,
  active = true,
  fallback,
}: {
  reduce?: boolean;
  active?: boolean;
  fallback?: ReactNode;
}) {
  return (
    <Canvas
      fallback={fallback}
      frameloop={active && !reduce ? "always" : "demand"}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [3.4, 2.2, 3.6], fov: 35 }}
      onCreated={(s) =>
        s.gl.domElement.parentElement?.parentElement?.setAttribute("data-scene-ready", "")
      }
    >
      <color attach="background" args={["#121a17"]} />
      <fog attach="fog" args={["#121a17", 7, 14]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-4, 3, -3]} intensity={30} color="#3ee08f" angle={0.6} penumbra={1} />
      <Environment resolution={128}>
        <Lightformer
          intensity={2}
          position={[0, 5, 0]}
          scale={[10, 10, 1]}
          rotation-x={Math.PI / 2}
        />
        <Lightformer
          intensity={1.2}
          color="#9fe8c0"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 1, 1]}
        />
        <Lightformer
          intensity={0.8}
          position={[5, 1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[20, 2, 1]}
        />
      </Environment>
      <Rover reduce={reduce} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#1a2420" roughness={1} />
      </mesh>
      <gridHelper args={[16, 32, "#2f5b45", "#203a2e"]} position={[0, 0.001, 0]} />
      <ContactShadows
        frames={1}
        position={[0, 0.005, 0]}
        opacity={0.6}
        scale={6}
        blur={2.4}
        far={2}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.6}
        maxPolarAngle={1.45}
      />
    </Canvas>
  );
}
