import * as THREE from '/three.js-master/build/three.module.js';
import { OrbitControls } from '/three.js-master/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from '/three.js-master/examples/jsm/controls/TransformControls.js';
import { FBXLoader } from '/three.js-master/examples/jsm/loaders/FBXLoader.js';
import { GLTFExporter } from '/three.js-master/examples/jsm/exporters/GLTFExporter.js';



let scene, renderer, controls, grid,camera,light,geo,mat;
let mouse = new THREE.Vector2();


scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 0xcccccc );

//grid
grid = new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 );
grid.name = "GridHelper";
grid.userData.name = 'grid'
scene.add( grid);


//camera
camera.position.set(0,400,800 )


//light
light = new THREE.PointLight(0xffffff,1,3000);
light.position.set(0,300,0);
scene.add(light);

// const geofloor = new THREE.PlaneGeometry(1000,1000,50,50)
// const matfloor = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const floor = new THREE.Mesh(geofloor,matfloor)
// floor.rotation.x = Math.PI/2
// floor.position.set(0,-1,0,0)
// scene.add(floor);

//Orbit control
controls = new OrbitControls(camera,renderer.domElement);
controls.rotateSpeed = 0.20;
controls.panSpeed = 0.20;

geo = new THREE.BoxGeometry(100,100,100);
mat = new THREE.MeshPhongMaterial({
    color:0xFF0000
})
const matgreen = new THREE.MeshPhongMaterial({
    color:0x00FF00
})
const matyellow = new THREE.MeshPhongMaterial({
    color:0xFFFF00
})
var boxs1 = new THREE.Mesh(geo,mat);
boxs1.userData.name = 'boxs1'
var boxs2 = new THREE.Mesh(geo,matgreen);
boxs2.userData.name = 'boxs2'
var boxs3 = new THREE.Mesh(geo,matyellow);
boxs3.userData.name = 'boxs3'
boxs1.position.set(100,50,100)
boxs2.position.set(200,50,300)
boxs3.position.set(-300,50,300)
scene.add(boxs1)
scene.add(boxs2)
scene.add(boxs3)

var raycaster = new THREE.Raycaster();
document.addEventListener('mousemove',onMouseMove);
document.addEventListener('mousedown',onMouseDown);
document.addEventListener('mouseup',onMouseUp);

function onMouseMove(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown(event){
    event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
        var SELECTED = intersects[ 0 ].object;
        console.log("CLICK DONE",intersects[0].object)
		ctrl1.attach(SELECTED);
	}else{
        // ctrl1.detach(SELECTED);
    }

}
function onMouseUp(event){
    
}
///Tranform controls
const ctrl1 = new TransformControls(camera, renderer.domElement)
ctrl1.attach(boxs2)
ctrl1.addEventListener('mouseDown', function () {
    controls.enabled = false;
});
ctrl1.addEventListener('mouseUp', function () {
    controls.enabled = true;
});
window.addEventListener( 'keydown', function ( event ) {

    switch ( event.keyCode ) {

        case 81: // Q
            ctrl1.setSpace( ctrl1.space === 'local' ? 'world' : 'local' );
            break;

        case 16: // Shift
            ctrl1.setTranslationSnap(50);
            ctrl1.setRotationSnap( THREE.MathUtils.degToRad( 15 ) );
            ctrl1.setScaleSnap( 0.25 );
            break;

        case 87: // W
            ctrl1.setMode( 'translate' );
            break;

        case 69: // e
            ctrl1.setMode( 'rotate' );
            break;

        case 82: // r
            ctrl1.setMode( 'scale' );
            break;

        case 107: // +, =, num+
            ctrl1.setSize( ctrl1.size + 0.1 );
            break;

        case 109: // -, _, num-
            ctrl1.setSize( Math.max( ctrl1.size - 0.1, 0.1 ) );
            break;

    }

} );

window.addEventListener( 'keyup', function ( event ) {

    switch ( event.keyCode ) {

        case 16: // Shift
            ctrl1.setTranslationSnap( null );
            ctrl1.setRotationSnap( null );
            ctrl1.setScaleSnap( null );
            break;

    }

} )

scene.add(ctrl1)
function box(){
    const loader = new GLTFLoader();

    loader.load( 'Table And Chairs2.gltf', function (gltf) {
        gltf.scene.scale.set(2, 2, 2);
        scene.add(gltf.scene);
        
    });
    
    console.log("box1 Added")
}

function sc(){
    const loader = new GLTFLoader();

    loader.load( 'scene.gltf', function (gltf) {
        const table = new THREE.Mesh()
        scene.add(table);
    });
    console.log("sc1 Added")
}

function exportGLTF( input ) {

    const gltfExporter = new GLTFExporter();

    const options = {
        trs: document.getElementById( 'option_trs' ).checked,
        onlyVisible: document.getElementById( 'option_visible' ).checked,
        truncateDrawRange: document.getElementById( 'option_drawrange' ).checked,
        binary: document.getElementById( 'option_binary' ).checked,
        maxTextureSize: Number( document.getElementById( 'option_maxsize' ).value ) || Infinity // To prevent NaN value
    };
    gltfExporter.parse( input, function ( result ) {

        if ( result instanceof ArrayBuffer ) {

            saveArrayBuffer( result, 'scene.glb' );

        } else {

            const output = JSON.stringify( result, null, 2 );
            console.log( output );
            saveString( output, 'scene.gltf' );

        }

    }, options );

}
///BTN function
document.getElementById("btn1").addEventListener("click", box);
document.getElementById("btn2").addEventListener("click", () => {
    scene.remove(grid);
    exportGLTF(scene);
});
document.getElementById("btn3").addEventListener("click", sc);

const link = document.createElement( 'a' );
link.style.display = 'none';
document.body.appendChild( link ); // Firefox workaround, see #6594

function save( blob, filename ) {

	link.href = URL.createObjectURL( blob );
	link.download = filename;
	link.click();

	// URL.revokeObjectURL( url ); breaks Firefox...

}

function saveString( text, filename ) {

	save( new Blob( [ text ], { type: 'text/plain' } ), filename );

}

function saveArrayBuffer( buffer, filename ) {

	save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

}
window.addEventListener( 'resize', onWindowResize, false );

///Auto resize window
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

const animate = function () {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    controls.update();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length > 0){
        console.log("Intersects")
        console.log(intersects[0].object.userData.name)
	}else{
        console.log("not")
    };
}
animate();