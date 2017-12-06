/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ (function(module, exports) {

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const flipAngle = Math.PI, rightAngle = flipAngle / 2, tileWidth = 512;

const sides = [
    {
        url: 'images/5.jpg',
        position: [-tileWidth, 0, 0],
        rotation: [0, rightAngle, 0]
    },// right
    {
        url: 'images/2.jpg',
        position: [tileWidth, 0, 0],
        rotation: [0, -rightAngle, 0]
    },// left
    {
        url: 'images/3.jpg',
        position: [0, tileWidth, 0, 0],
        rotation: [rightAngle, 0, Math.PI]
    },// top
    {
        url: 'images/4.jpg',
        position: [0, -tileWidth, 0],
        rotation: [-rightAngle, 0, Math.PI]
    },
    {
        url: 'images/1.jpg',
        position: [0, 0, tileWidth],
        rotation: [0, Math.PI, 0]
    },
    {
        url: 'images/6.jpg',
        position: [0, 0, -tileWidth],
        rotation: [0, 0, 0]
    }
];

for (let i = 0, len = sides.length; i < len; i++) {
    const side = sides[i];
    const element = document.getElementById("bg_section_" + i);
    element.width = 1026;
    element.height = 1026;
    const object = new THREE.CSS3DObject(element);
    object.position.fromArray(side.position);
    object.rotation.fromArray(side.rotation);
    scene.add(object);
}

var lat, phi, theta, target, isDeviceing, touchX, touchY;

var target = new THREE.Vector3();

var lon = 90, lat = 0;
var phi = 0, theta = 0;

var touchX, touchY;

function animate () {
    requestAnimationFrame(animate);
    lat = Math.max(-85, Math.min(85, lat)); // 纬度
    phi = THREE.Math.degToRad(85 - lat); // 度数转化为弧度的方法

    theta = THREE.Math.degToRad(lon + 180); 
    
    target.x = Math.sin(phi) * Math.cos(theta);
    target.y = Math.cos(phi);
    target.z = Math.sin(phi) * Math.sin(theta);
    camera.lookAt(target);

    camera.updateProjectionMatrix();
    
    isDeviceing == false ? initMouseControl() : deviceControl.update();
    renderer.render(scene, camera);
}
// 初始化控制器
function initMouseControl() {
    // mouseControl = new THREE.OrbitControls(camera);
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'wheel', onDocumentMouseWheel, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
}

function onDocumentMouseMove(event) {
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || event.wekitMovementY || 0;
    lon -= movementX * 0.1;
    lat += movementY * 0.1;
}

function onDocumentMouseUp(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
}

function onDocumentMouseWheel(event) {
    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();
}

function onDocumentTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    touchX = touch.screenX;
    touchY = touch.screenY;
}

function onDocumentTouchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    lon -= (touch.screenX - touchX) * 0.1;
    lat += (touch.screenY - touchY) * 0.1;
    touchX = touch.screenX;
    touchY = touch.screenY;
}

const controlsBtn = document.getElementById('controlBtn');
var isDeviceing = false;
controlsBtn.addEventListener('touchend', controlDevice, true);
isDeviceing == true ? controlsBtn.setAttribute('class', 'controlIconae') : controlsBtn.setAttribute('class', 'controlIcon');

function initDevices() {
    deviceControl = new THREE.DeviceOrientationControls(camera);
}

function controlDevice (event) {
    if (isDeviceing) {
        isDeviceing = false;
        controlsBtn.setAttribute('class', 'controlIconae');
    }
    else {
        isDeviceing = true;
        controlsBtn.setAttribute('class', 'controlIcon');
    }
}

document.getElementById('btn1').addEventListener('click', function () {
    alert('Who clicks me?');
})

document.getElementById('btn2').addEventListener('click', function () {
    alert('Who clicks me too?');
})
animate();

/***/ })

/******/ });