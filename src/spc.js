import * as THREE from 'three'

var scene = new THREE.Scene();
// the first parameter represents the distance between spector and object???
// the third represents near clipping plane
// the fourth represents far clipping plane
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
// z means distance?
camera.position.z = 5;
//renderer.render(scene, camera);
var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    //cube.material.color = {r: Math.random(), g: Math.random(), b: Math.random()};
    //console.log('晃瞎你的狗眼！！！哈哈哈哈！')
    renderer.render(scene, camera);
};
console.log(cube.material.color);
animate();
