import React, { useState, useRef, Fragment, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import "./style.css"
import { OrbitControls, TransformControls, useCursor, useGLTF, useAnimations, Stats } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Avatar, Button, Paper, Grid, Typography, Container,ListItemButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getTransforms } from '../../actions/transforms'




const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

function Box(props) {
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh {...props} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

function Model({ url, sx, sy, sz, px, py, pz, rx, ry, rz }, props) {
  const { scene } = useLoader(GLTFLoader, url)
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return <primitive object={scene} dispose={null} scale={[sx, sy, sz]} position={[px, py, pz]} rotation={[rx, ry, rz]} {...props} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}/>
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

const Exhibition = () => {
  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  const transforms = useSelector((state) => state.transforms);
  const dispatch = useDispatch();
  const [ trans, setTrans ] = useState([]);
  const [ hasError, setError ] = useState(false);

  console.log(transforms);

  // useEffect(() => {

  //   const getdataFromApi = async () => {
  //     const res = await fetch('http://localhost:5000/pos');
  //     res.json()
  //       .then((res) => {
  //         setTrans(res)
  //         console.log(res)
  //       })
  //       .catch((err) => setError(err))
  // }

  // getdataFromApi();  

  // }, []);

  useEffect(() => {
    dispatch(getTransforms());
  }, [dispatch])

  return (
    <Fragment>
    <Tool/>
    <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)} camera={{ position: [3, 8, 0] }}>
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      {/* <Model url="/kajardsarn.glb" scale={0.5} /> */}
      {transforms.map((trans) => (
        <Model url="/kajardsarn.glb" sx={trans.ScaleX} sy={trans.ScaleY} sz={trans.ScaleZ}  px={trans.TransX} py={trans.TransY} pz={trans.TransZ} rx={trans.RotateX} ry={trans.RotateY} rz={trans.RotateZ} key={trans._id} />
      ))}

      {/* {trans.map((transi, index) => (
          <Model url="/chair.glb" sx={transi.ScaleX} sy={transi.ScaleY} sz={transi.ScaleZ}  px={transi.TransX} py={transi.TransY} pz={transi.TransZ} rx={transi.RotateX} ry={transi.RotateY} rz={transi.RotateZ} key={index}/>
      ))} */}

      {/* <Model url="/morn.glb" sx={1} sy={1} sz={1}  px={0} py={0} pz={0} rx={0} ry={0} rz={0} /> */}
      

      {/* <Box position={[0, 1, 0]} /> */}
    
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