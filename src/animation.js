const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(100, 100, 100);

for (let i = 0, len = geometry.faces.length; i < len; i += 2) {
    const hex = Math.random() * 0xffffff;
    geometry.faces[i].color.setHex(hex);
    geometry.faces[i + 1].color.setHex(hex);
}

const material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
const mesh = new THREE.Mesh(geometry, material);
mesh.position = new THREE.Vector3(0, 0, 0);
scene.add(mesh);
camera.position.z = 400;
camera.position.y = 70;
camera.position.x = 20;

const helper = new THREE.GridHelper(window.innerWidth, 50);
helper.setColors(0x0000ff, 0x808080);
scene.add(helper);

function render () {
    //mesh.rotation.y += 0.01;
    //mesh.rotation.x += 0.05;
    //mesh.rotation.z += 0.05;
    //camera.rotation.z += 0.05;
    mesh.rotateY(0.01);
    renderer.render(scene, camera);    
    requestAnimationFrame(render);
}
render();

