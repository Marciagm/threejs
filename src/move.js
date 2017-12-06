import * as THREE from 'three' 
import Stats from 'stats.js'
import TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
//const camera = new THREE.OrthographicCamera(-2000, 2000, 2000, -2000, 1, 10000);
camera.position.z = 600;
const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setClearColor(0xFFFFFF, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.CylinderGeometry(100, 150, 400);
const material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

//const material = new THREE.MeshBasicMaterial({color: 0xFF0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//scene.add(mesh2);


const light = new THREE.AmbientLight(0x00FF00, 1);
light.position.set(0, 0, 100);
//scene.add(light);

const pointLight = new THREE.PointLight(0xFF0000, 1);
pointLight.position.set(0, 100, 300);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0x00FF00, 1);
directionalLight.position.set(0, 0, 100);
scene.add(directionalLight);



const stats = new Stats();
// 0: FPS  1: MS
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '10px';
stats.domElement.style.top = '10px';
document.body.appendChild(stats.domElement);
/*setInterval(function () {
    stats.begin();
    stats.end();
}, 1000 / 60)*/
//new TWEEN.Tween(mesh.position).to({x: -500, y: 300}, 8000).repeat(Infinity).start();
//new TWEEN.Tween(mesh.rotation).to({x: -50, y: 10}, 8000).repeat(Infinity).start();

function render () {
    // 物体不动，相机移动
    //camera.position.x += 1;
    // 
    //mesh.position.x -= 1;
    renderer.render(scene, camera);
    //requestAnimationFrame(render);
    stats.update();
    //TWEEN.update();
}
render();