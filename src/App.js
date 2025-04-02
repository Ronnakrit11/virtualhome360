import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import { Popconfirm } from 'antd'

const store = [
  { name: 'outside', color: 'lightpink', position: [10, 0, -15], url: '/2294472375_24a3b8ef46_o.jpg', link: 1 },
  { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: '/Photosphere1.jpg', link: 2 },

  { name: 'new view', color: 'lightyellow', position: [-15, 0, 0], url: '/new1.jpg', link: 4 },
  { name: 'panorama view', color: 'lightcoral', position: [-10, 0, -10], url: '/newnew.jpg', link: 5 },
  { name: 'additional view', color: 'lightseagreen', position: [0, 10, 0], url: '/new2.jpg', link: 0 }
]

function Dome({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
            <a href="#">{name}</a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  )
}

function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return (
    <>
      <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
      <Html position={[0, -1, 0]}>
        <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.5)', padding: '5px', borderRadius: '5px' }}>
          <button onClick={() => set(0)}>Outside</button>
          <button onClick={() => set(1)}>Inside</button>
     
         
          <button onClick={() => set(4)}>Panorama</button>
    
        </div>
      </Html>
    </>
  )
}

export default function App() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
      <Suspense fallback={null}>
        <Preload all />
        <Portals />
      </Suspense>
    </Canvas>
  )
}
