import * as THREE from  'three'

const scene = new THREE.Scene();
const renderer = new THREE.Render();
const MAX_POINTS = 500;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(MAX_POINTS * 3);
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

const drawCount = 2;
geometry.setDrawRange(0, drawCount);

const material = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 2});
const line = new THREE.Line( geometry, material );
scene.add( line );

document.body.appendChild();