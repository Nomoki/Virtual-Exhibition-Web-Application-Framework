import * as THREE from '/three.js-master/build/three.module.js';
import { OrbitControls } from '/three.js-master/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from '/three.js-master/examples/jsm/controls/TransformControls.js';
import { FBXLoader } from '/three.js-master/examples/jsm/loaders/FBXLoader.js';



let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, control, orbit;

init();
render()



function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcccccc );

    //grid
    scene.add( new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //camera
    const aspect = window.innerWidth / window.innerHeight;

    cameraPersp = new THREE.PerspectiveCamera( 50, aspect, 0.01, 30000 );
    cameraOrtho = new THREE.OrthographicCamera( - 600 * aspect, 600 * aspect, 600, - 600, 0.01, 30000 );
    currentCamera = cameraPersp;

    currentCamera.position.set( 1000, 500, 1000 );
    currentCamera.lookAt( 0, 200, 0 );

    //light
    const dirLight1 = new THREE.DirectionalLight( 0xffffff );
    dirLight1.position.set( 1, 1, 1 );
    scene.add( dirLight1 );

    const dirLight2 = new THREE.DirectionalLight( 0x002288 );
    dirLight2.position.set( - 1, - 1, - 1 );
    scene.add( dirLight2 );

    const ambientLight = new THREE.AmbientLight( 0x222222 );
    scene.add( ambientLight ); 

    //box
    const geometry = new THREE.BoxGeometry( 200, 200, 200 );
    const material = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        specular:0xff0000,
        shininess:0.1
    });

    //cameracontrol
    orbit = new OrbitControls( currentCamera, renderer.domElement );
    orbit.update();
    orbit.addEventListener( 'change', render );

    control = new TransformControls( currentCamera, renderer.domElement );
    control.addEventListener( 'change', render );

    control.addEventListener( 'dragging-changed', function ( event ) {

        orbit.enabled = ! event.value;

    } );

    const mesh = new THREE.Mesh( geometry,material);
    scene.add( mesh );

    control.attach( mesh );
    scene.add( control );

    window.addEventListener( 'resize', onWindowResize );

    //keypress control obj
    window.addEventListener( 'keydown', function ( event ) {

        switch ( event.keyCode ) {

            case 81: // Q
                control.setSpace( control.space === 'local' ? 'world' : 'local' );
                break;

            case 16: // Shift
                control.setTranslationSnap( 100 );
                control.setRotationSnap( THREE.MathUtils.degToRad( 15 ) );
                control.setScaleSnap( 0.25 );
                break;

            case 87: // W
                control.setMode( 'translate' );
                break;

            case 69: // e
                control.setMode( 'rotate' );
                break;

            case 82: // r
                control.setMode( 'scale' );
                break;

            case 187:
            case 107: // +, =, num+
                control.setSize( control.size + 0.1 );
                break;

            case 189:
            case 109: // -, _, num-
                control.setSize( Math.max( control.size - 0.1, 0.1 ) );
                break;

        }

    } );

    window.addEventListener( 'keyup', function ( event ) {

        switch ( event.keyCode ) {

            case 16: // Shift
                control.setTranslationSnap( null );
                control.setRotationSnap( null );
                control.setScaleSnap( null );
                break;

        }

    } )

    //add cube



    // model
    const loader = new FBXLoader();
    loader.load( 'character.fbx', function ( object ) {
        object.position.set( 300, 10, 1 );
        scene.add( object );
    
    } );

    // auto resize update
    window.addEventListener( 'resize', onWindowResize );

}

//click and add fox to the scene
function box(){
    const loader = new GLTFLoader();

    loader.load( 'fox.gltf', function (gltf) {
        gltf.scene.scale.set(2, 2, 2);
        scene.add( gltf.scene );
        
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );
    console.log("box1 Added")
}
function save(){

}

document.getElementById("btn1").addEventListener("click", box);
document.getElementById("btn2").addEventListener("click", save);

function onWindowResize() {

    const aspect = window.innerWidth / window.innerHeight;

    cameraPersp.aspect = aspect;
    cameraPersp.updateProjectionMatrix();

    cameraOrtho.left = cameraOrtho.bottom * aspect;
    cameraOrtho.right = cameraOrtho.top * aspect;
    cameraOrtho.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function render() {

    renderer.render( scene, currentCamera );

}