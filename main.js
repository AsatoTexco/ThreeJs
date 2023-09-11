import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';  
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

const clock = new THREE.Clock();
let light1,light2,light3,light4,renderer,camera,scene;
let mouse = {
	x: 0,
	y: 0
};

camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 100;

scene = new THREE.Scene();
// scene.background = new THREE.Color(0x0a0000)


// let ambientLight = new THREE.AmbientLight(0x333333, 2);
// scene.add(ambientLight);

const loader = new GLTFLoader();
var arthurAvatar

loader.load( 'avatar_gltf.gltf', function ( gltf ) {
  
  arthurAvatar = gltf.scene

  arthurAvatar.position.setZ(2.5)
  arthurAvatar.position.setX(0)
  arthurAvatar.position.setY(-115)
  arthurAvatar.rotation.y = 0
  arthurAvatar.scale.set(70,70,70)
  
  scene.add( arthurAvatar );

}, undefined, function ( error ) {

	console.error( error );

} );

var burguer
loader.load('burger_glb.glb', function ( gltf ) {
  
  burguer = gltf.scene
  burguer.scale.set(5,5,5)
  burguer.position.setX(-60)

  
  scene.add( burguer );

}, undefined, function ( error ) {

	console.error( error );

} );

var katana
loader.load('katana.glb', function ( gltf ) {
  
  katana = gltf.scene
  katana.scale.set(22,22,22)
  katana.position.setX(60)
  katana.position.setY(-2)
  katana.position.setZ(-1)


  katana.rotation.z = 4.85
  katana.rotation.y = -0.6

  
  scene.add( katana );

}, undefined, function ( error ) {

	console.error( error );

} );




const sphere = new THREE.SphereGeometry( 1, 16, 29 );

//lights
light1 = new THREE.PointLight( 0xfff, 500,150 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xfff } ) ) );
scene.add( light1 );

light2 = new THREE.PointLight( 0xff0000, 500,150 );
light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) );
scene.add( light2 );

light3 = new THREE.PointLight(0xfffff,500,350);
light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
scene.add( light3 );
 
light4 = new THREE.PointLight( 0x00ff00, 500,50 );
light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) ) );
scene.add( light4 );



// const geometry = new THREE.BoxGeometry(10,10,10 );
// const material = new THREE.MeshStandardMaterial({ color: 0xfffffff }); // Material reflexivo
// const cube = new THREE.Mesh(geometry, material);
// cube.position.setZ(-2)
// cube.rotation.y = 10

// cube.position.set(20,1,-1.5)
// scene.add(cube);
 

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// ORBIT CONTROLS 
const controls = new OrbitControls( camera, renderer.domElement );
controls.update()
 

 
document.addEventListener("mousemove",onMouseMove,false)
window.addEventListener( 'resize', onWindowResize );

function animate() {
	requestAnimationFrame( animate );
    render();
	renderer.render( scene, camera );
    controls.update()

    arthurAvatar.rotation.y += 0.006

    burguer.rotation.y += 0.006
    burguer.rotation.x -= 0.006
    burguer.rotation.z -= 0.006
 
 
}

animate();



function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 3

	let vector = new THREE.Vector3(mouse.x, mouse.y,2);
	vector.unproject(camera);
	let dir = vector.sub(camera.position).normalize();
	let distance = -camera.position.z / dir.z + 12;
	let pos = camera.position.clone().add(dir.multiplyScalar(distance));
	console.log(vector)
    setTimeout(function(){
        light3.position.copy(pos)

    },20)
}
function onWindowResize() {

    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}
 


function render() {

    const time = Date.now() * 0.0005;
    const delta = clock.getDelta();

    light1.position.x = Math.sin( time * 0.7 ) * 30;
    light1.position.y = Math.cos( time * 0.5 ) * 40;
    light1.position.z = Math.cos( time * 0.3 ) * 30;

    light2.position.x = Math.cos( time * 0.3 ) * 30;
    light2.position.y = Math.sin( time * 0.5 ) * 40;
    light2.position.z = Math.sin( time * 0.7 ) * 30;
 
    light4.position.x = Math.cos( time * 0.5 ) * 30;
    light4.position.y = Math.sin( time * 0.7 ) * 40;
    light4.position.z = Math.sin( time * 0.3 ) * 30;
     

    renderer.render( scene, camera );

}