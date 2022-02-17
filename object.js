import {GLTFLoader} from "./modules/GLTFLoader.js";

//scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    .01,
    1000
);

var canvasRef = document.getElementById("object1");
//renderer
var renderer = new THREE.WebGL1Renderer({
    canvas: canvasRef,
    alpha: true
});

renderer.setClearColor( 0x000000, 0 ); // the default
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//controls
var controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.enableZoom = false;
controls.update();

var loader = new GLTFLoader();

//car
var object;
let mixer;
loader.load("3d-object/scene.gltf" , function(gltf){
    object = gltf.scene;
    scene.add(gltf.scene);
    mixer = new THREE.AnimationMixer(object);
    const clips = gltf.animations;
    clips.forEach(function(clip){
        const action = mixer.clipAction(clip);
        action.play();
    });
});


//light 
var light = new THREE.DirectionalLight(0xffffff, 3, 10);
scene.add(light);

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 5; // default
light.shadow.camera.far = 500; // default


camera.position.set(0,0,5);

const clock = new THREE.Clock();

function animate(){
    requestAnimationFrame(animate);
     if(mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

animate();