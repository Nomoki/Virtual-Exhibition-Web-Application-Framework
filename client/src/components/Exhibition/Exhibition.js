import React, { useState, useRef, Fragment } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import "./style.css"
import { OrbitControls, TransformControls, useCursor, useGLTF, useAnimations, Stats } from '@react-three/drei'
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
      <Stats />
    </Canvas>
    {/* <tool/> */}
    </Fragment>
  )
}

export default Exhibition;