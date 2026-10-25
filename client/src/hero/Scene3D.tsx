import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'

/**
 * Procedural R3F scene: a monochrome stream of "raw data" particles travels
 * into a glass prism and is refracted into a spectral fan of "intelligence".
 * The camera drifts on its own and responds gently to the pointer, which also
 * widens/tilts the spectrum — the "data → intelligence" interaction.
 *
 * This file is code-split (imported via React.lazy) so three.js never blocks
 * the initial paint of the rest of the page.
 */

const SPECTRUM = ['#7fd6f2', '#9fb0ff', '#b79bf0', '#d9a8e8', '#f0c48f', '#f2a0a0']

const IN_N = 90
const IN_FROM = -7
const IN_TO = -1.1
const IN_Y = 0.4

const RAYS = SPECTRUM.length
const OUT_PER = 34
const OUT_N = RAYS * OUT_PER
const OUT_OX = 1.1
const OUT_OY = 0.4
const OUT_LEN = 5.6
const FAN_HALF = 0.42 // half-spread of the spectrum in radians at pointer.y = 0

/* ------------------------------------------------------------------ */
/* Data flow: incoming particles (converging) + outgoing spectrum fan  */
/* ------------------------------------------------------------------ */
function DataFlow() {
  const total = IN_N + OUT_N
  const positions = useMemo(() => new Float32Array(total * 3), [total])

  const phases = useMemo(() => {
    const a = new Float32Array(total)
    for (let i = 0; i < total; i++) a[i] = Math.random()
    return a
  }, [total])

  const jitterY = useMemo(() => {
    const a = new Float32Array(IN_N)
    for (let i = 0; i < IN_N; i++) a[i] = (Math.random() - 0.5) * 1.6
    return a
  }, [])
  const jitterZ = useMemo(() => {
    const a = new Float32Array(IN_N)
    for (let i = 0; i < IN_N; i++) a[i] = (Math.random() - 0.5) * 1.6
    return a
  }, [])

  const colors = useMemo(() => {
    const a = new Float32Array(total * 3)
    const inCol = new THREE.Color('#a9ecff')
    for (let i = 0; i < IN_N; i++) {
      a[i * 3] = inCol.r; a[i * 3 + 1] = inCol.g; a[i * 3 + 2] = inCol.b
    }
    const c = new THREE.Color()
    for (let k = 0; k < RAYS; k++) {
      c.set(SPECTRUM[k])
      for (let m = 0; m < OUT_PER; m++) {
        const i = IN_N + k * OUT_PER + m
        a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b
      }
    }
    return a
  }, [total])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const spread = 1 + state.pointer.y * 0.6 // pointer up → spectrum widens
    const tilt = state.pointer.x * 0.28 // pointer left/right → spectrum tilts
    let i = 0
    for (let n = 0; n < IN_N; n++) {
      const p = (t * 0.2 + phases[i]) % 1
      const converge = 1 - p
      positions[i * 3] = IN_FROM + (IN_TO - IN_FROM) * p
      positions[i * 3 + 1] = IN_Y + jitterY[i] * converge
      positions[i * 3 + 2] = jitterZ[i] * converge
      i++
    }
    for (let k = 0; k < RAYS; k++) {
      const frac = k / (RAYS - 1) - 0.5 // -0.5 .. 0.5
      const ang = frac * 2 * FAN_HALF * spread + tilt
      const dirx = Math.cos(ang)
      const diry = Math.sin(ang)
      for (let m = 0; m < OUT_PER; m++) {
        const p = (t * 0.15 + phases[i]) % 1
        const d = OUT_LEN * p
        positions[i * 3] = OUT_OX + dirx * d
        positions[i * 3 + 1] = OUT_OY + diry * d
        positions[i * 3 + 2] = (m % 2 === 0 ? 0.5 : -0.5) * 0.05
        i++
      }
    }
    ;(geo.attributes.position as THREE.BufferAttribute).needsUpdate = true
  })

  return (
    <points geometry={geo} frustumCulled={false}>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* The prism                                                           */
/* ------------------------------------------------------------------ */
function Prism() {
  const spin = useRef<THREE.Group>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (spin.current) {
      spin.current.rotation.z = t * 0.12 + state.pointer.y * 0.25
      const s = 1 + Math.sin(t * 1.1) * 0.012
      spin.current.scale.setScalar(s)
    }
  })
  return (
    <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={spin} position={[0, 0.4, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.25, 1.25, 2.7, 3, 1]} />
          <meshPhysicalMaterial
            color="#cfe8ff"
            metalness={0.1}
            roughness={0.12}
            transparent
            opacity={0.3}
            emissive="#2a6c8a"
            emissiveIntensity={0.45}
            side={THREE.DoubleSide}
            flatShading
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.28, 1.28, 2.72, 3, 1]} />
          <meshBasicMaterial color="#8fd8f2" wireframe transparent opacity={0.55} />
        </mesh>
        <pointLight color="#8fd8f2" intensity={14} distance={9} />
      </group>
    </Float>
  )
}

/* ------------------------------------------------------------------ */
/* The monochrome source beam + faint spectral ray guides              */
/* ------------------------------------------------------------------ */
function Beams() {
  const rayLines = useMemo(
    () =>
      SPECTRUM.map((color, k) => {
        const frac = k / (RAYS - 1) - 0.5
        const ang = frac * 2 * FAN_HALF
        const end: [number, number, number] = [
          OUT_OX + Math.cos(ang) * OUT_LEN,
          OUT_OY + Math.sin(ang) * OUT_LEN,
          0,
        ]
        return { color, pts: [[OUT_OX, OUT_OY, 0], end] as [number, number, number][] }
      }),
    [],
  )
  return (
    <group>
      {/* incoming white beam */}
      <mesh position={[(IN_FROM + IN_TO) / 2, IN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, IN_FROM - IN_TO, 8]} />
        <meshBasicMaterial color="#d8f4ff" transparent opacity={0.5} />
      </mesh>
      {rayLines.map((r, idx) => (
        <Line key={idx} points={r.pts} color={r.color} lineWidth={1} transparent opacity={0.22} />
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Ambient dust for depth                                              */
/* ------------------------------------------------------------------ */
function Dust() {
  const N = 160
  const pos = useMemo(() => {
    const a = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * 24
      a[i * 3 + 1] = (Math.random() - 0.5) * 11 + 0.6
      a[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3
    }
    return a
  }, [])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#5a6ea0" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* Camera: slow autonomous drift + gentle pointer parallax             */
/* ------------------------------------------------------------------ */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const cam = state.camera
    const tx = state.pointer.x * 1.3
    const ty = 0.4 + state.pointer.y * 0.8 + Math.sin(t * 0.28) * 0.18
    const tz = 8.6 + Math.cos(t * 0.2) * 0.5
    cam.position.x += (tx - cam.position.x) * 0.04
    cam.position.y += (ty - cam.position.y) * 0.04
    cam.position.z += (tz - cam.position.z) * 0.04
    cam.lookAt(0, 0.3, 0)
  })
  return null
}

/* ------------------------------------------------------------------ */
export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 8.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#05070f', 6, 18]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={0.9} color="#bcd8ff" />
      <pointLight position={[-6, -1, 3]} intensity={6} color="#b49bea" distance={22} />
      <pointLight position={[6, 2, -2]} intensity={6} color="#7fd6f2" distance={22} />
      <Prism />
      <DataFlow />
      <Beams />
      <Dust />
      <gridHelper args={[46, 46, '#1b2450', '#0e1430']} position={[0, -1.9, 0]} />
      <CameraRig />
    </Canvas>
  )
}
