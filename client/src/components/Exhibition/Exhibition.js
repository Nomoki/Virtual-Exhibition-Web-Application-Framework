import React, { useState, useRef, Fragment } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import "./style.css"
import { OrbitControls, TransformControls, useCursor, useGLTF, useAnimations } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton } from '@material-ui/core';




const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

function Box(props) {
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh {...props} onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}
// function Model({ ...props }) {
//     const group = useRef()
//     const { nodes, materials } = useGLTF('/table.gltf');
//     const setTarget = useStore((state) => state.setTarget)
//     const [hovered, setHovered] = useState(false)
//     useCursor(hovered)
//     return (
//       <group ref={group} {...props} dispose={null} onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
//         <mesh
//           geometry={nodes.Provisione_table_058.geometry}
//           material={nodes.Provisione_table_058.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_059.geometry}
//           material={nodes.Provisione_table_059.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_060.geometry}
//           material={nodes.Provisione_table_060.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_061.geometry}
//           material={nodes.Provisione_table_061.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_062.geometry}
//           material={nodes.Provisione_table_062.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_063.geometry}
//           material={nodes.Provisione_table_063.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_064.geometry}
//           material={nodes.Provisione_table_064.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_065.geometry}
//           material={nodes.Provisione_table_065.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_066.geometry}
//           material={nodes.Provisione_table_066.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_067.geometry}
//           material={nodes.Provisione_table_067.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_068.geometry}
//           material={nodes.Provisione_table_068.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_069.geometry}
//           material={nodes.Provisione_table_069.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_070.geometry}
//           material={nodes.Provisione_table_070.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_071.geometry}
//           material={nodes.Provisione_table_071.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_072.geometry}
//           material={nodes.Provisione_table_072.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_073.geometry}
//           material={nodes.Provisione_table_073.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_074.geometry}
//           material={nodes.Provisione_table_074.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_075.geometry}
//           material={nodes.Provisione_table_075.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_076.geometry}
//           material={nodes.Provisione_table_076.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_077.geometry}
//           material={nodes.Provisione_table_077.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_078.geometry}
//           material={nodes.Provisione_table_078.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_079.geometry}
//           material={nodes.Provisione_table_079.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_080.geometry}
//           material={nodes.Provisione_table_080.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_081.geometry}
//           material={nodes.Provisione_table_081.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_082.geometry}
//           material={nodes.Provisione_table_082.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_083.geometry}
//           material={nodes.Provisione_table_083.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_084.geometry}
//           material={nodes.Provisione_table_084.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_085.geometry}
//           material={nodes.Provisione_table_085.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_086.geometry}
//           material={nodes.Provisione_table_086.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_087.geometry}
//           material={nodes.Provisione_table_087.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_088.geometry}
//           material={nodes.Provisione_table_088.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_089.geometry}
//           material={nodes.Provisione_table_089.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_090.geometry}
//           material={nodes.Provisione_table_090.material}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_001.geometry}
//           material={materials.wire_115115115}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//         <mesh
//           geometry={nodes.Provisione_table_002.geometry}
//           material={materials.wire_229166215}
//           rotation={[Math.PI / 2, 0, 0]}
//         />
//       </group>
//     )
//   }

// const Model = (props) => {
//   const gltf = useLoader(GLTFLoader, "./scene.gltf");
//   const setTarget = useStore((state) => state.setTarget)
//   const [hovered, setHovered] = useState(false)
//   useCursor(hovered)
//   return (
//     <Fragment>
//       <primitive object={gltf.scene} scale={0.6} {...props} onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />
//     </Fragment>
//   );
// };

function Model({ url }, props) {
  const { scene } = useLoader(GLTFLoader, url, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);
  });
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return <primitive object={scene} dispose={null}  scale={0.7} position={[-1.35, 0.1, 0]} {...props} onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}/>
}
function Tool() {
  
  return(
  <div className = 'space'>
      <Button color='secondary' variant='contained' onClick={Box()}>Model</Button>
      <Button color='secondary' variant='contained' onClick={Box()}>Save</Button>
      <Button color='secondary' variant='contained' onClick={Box()}>load</Button>
  </div>
  )
}

const Exhibition = () => {
  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  return (
    <Fragment>
    <Tool/>
    <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)} camera={{ position: [3, 8, 0] }} frameloop="demand">
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <Model url="/scene.gltf"/>
      <Box position={[1, 0.5, 0]} />
      <Box position={[3, 0.5, 1]} />
      {target && <TransformControls object={target} mode={mode} />}
      <OrbitControls makeDefault />
      <gridHelper args={[10, 10]} />
    </Canvas>
    {/* <tool/> */}
    </Fragment>
  )
}

export default Exhibition;