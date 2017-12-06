import * as THREE from  'three'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));
//geometry.vertices.push(new THREE.Vector3(10, 10, 0));
//geometry.vertices.push(new THREE.Vector3(-10, 0, 40));


const line = new THREE.Line(geometry, material);
//line.rotation.x += 3;
scene.add(line);
renderer.render(scene, camera);
