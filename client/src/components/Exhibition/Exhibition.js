import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import "./style.css"
import { OrbitControls, TransformControls, useCursor, useGLTF, useAnimations, Stats } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton } from '@material-ui/core'
import { useSelector } from 'react-redux'




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

function Model({ url, scale }, props) {
  const { scene } = useLoader(GLTFLoader, url, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
    loader.setDRACOLoader(dracoLoader);
  });
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return <primitive object={scene} dispose={null} scale={scale} position={[0, 0, 0]} {...props} onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}/>
}
function Tool() {
  
  return(
  <div className = 'space'>
      <Button color='secondary' variant='contained' onClick={Model}>Model</Button>
      <Button color='secondary' variant='contained' onClick={Model}>Save</Button>
      <Button color='secondary' variant='contained' onClick={Model}>load</Button>
  </div>
  )
}

const Exhibition = ({ setCurrentId }) => {
  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  const transforms = useSelector((state) => state.transforms);
  const [ trans, setTrans ] = useState([]);
  const [ hasError, setError ] = useState(false);

  

  useEffect(() => {

    const getdataFromApi = async () => {
      const res = await fetch('http://localhost:5000/pos');
      res.json()
        .then((res) => {
          setTrans(res)
          console.log(res)
        })
        .catch((err) => setError(err))
  }

  getdataFromApi();  

  }, []);

  return (
    <Fragment>
    <Tool/>
    <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)} camera={{ position: [3, 8, 0] }}>
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <Model url="/kajardsarn.glb" scale={0.5} />
      <Model url="/chair.glb" scale={0.01} />
      {/* {transforms.map((trans) => (
        <Box position={[trans.transX, trans.transY, trans.transZ]} setCurrentId={setCurrentId} />
      ))} */}

      {/* {trans.map((transi, index) => (
          <Box position={[transi.TransX, transi.TransY, transi.TransZ]} key={index} />
      ))}

      <Box position={[0, 1, 0]} /> */}
    
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