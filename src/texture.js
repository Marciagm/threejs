/* var camera, scene, renderer;
var mesh;

init();
animate();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    //
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    // A begin
    var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
    geometry.vertices[0].uv = new THREE.Vector2(0,0);
    geometry.vertices[1].uv = new THREE.Vector2(1,0);
    geometry.vertices[2].uv = new THREE.Vector2(1,1);
    geometry.vertices[3].uv = new THREE.Vector2(0,1);
    // A end
    // B begin
    // 纹理坐标怎么弄
    /*var texture = THREE.ImageUtils.loadTexture("images/1.jpg",null,function(t)
    {
    });

    var loader = new THREE.TextureLoader();

    loader.load('images/1.jpg', function (texture) {
        var material = new THREE.MeshBasicMaterial({map:texture, color: 0xFF00FF, side: THREE.DoubleSide});
        var mesh = new THREE.Mesh( geometry,material );
        scene.add( mesh ); 
    }) 
    // B end

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

*/
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = 500;
canvas.height = 500;
canvas.style.background = '#FF9900';
canvas.style.display = 'black';
//canvas.style.border = '1px solid black';
document.body.appendChild(canvas);

function run () {
    const ctx = canvas.getContext('2d');
    ctx.save();
    
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = '#FF9900';
    ctx.fillRect(0, 0, 500, 500);
    ctx.translate(250, 250);
    //ctx.scale(0.4, 0.4);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.save();
    // outline
    ctx.arc(0, 0, 200, 0, Math.PI * 2);
    ctx.fill();
    //ctx.stroke();
    //ctx.restore();
    ctx.strokeStyle = '#FF9000';
    ctx.lineWidth = 8;
    ctx.save();

    ctx.restore();
    // hour
    // 这个rotate是绕顶点坐标
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(0, 150);
        ctx.lineTo(0, 170);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.lineWidth = 4;
    ctx.save();
    ctx.restore();
    // minute 
    for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 30);
        ctx.moveTo(0, 150);
        ctx.lineTo(0, 155);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 12;
    ctx.save();

    ctx.restore();
    // indicators
    ctx.arc(0, 0, 120, 0, Math.PI * 2);
    // hour
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    // hour indicator
    ctx.beginPath();
    ctx.rotate((hour - 6 + minute / 60 + second / 3600) * Math.PI / 6);
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 110);
    ctx.stroke();
    ctx.closePath()
    ctx.save();
    ctx.restore();

    ctx.lineWidth = 10;
    ctx.save();
    ctx.restore();

    // minute indicator
    ctx.beginPath();
    ctx.rotate((minute - 30 + (second / 60)) * Math.PI / 30);
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 120);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
    ctx.lineWidth = 6;
    ctx.save();
    ctx.restore();
    ctx.beginPath();
    ctx.rotate((second - 30) * Math.PI / 180);
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 130);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
    //ctx = canvas.getContext('2d');
    requestAnimationFrame(run);
}
run();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 400;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
renderer.setClearColor(0xFFFFFF, 1.0);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.CubeGeometry(280, 280, 280);
const texture = new THREE.CanvasTexture(canvas);
const material = new THREE.MeshBasicMaterial({map: texture});
//const material = new THREE.MeshBasicMaterial({color: 0xFF0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
    texture.needsUpdate = true;
    mesh.rotation.y -= 0.01;
    mesh.rotation.x -= 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(animate);    
}
animate();