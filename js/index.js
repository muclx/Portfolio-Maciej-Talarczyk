import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

const section = document.querySelector('.bg-contact-3d ')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, section.clientWidth / section.clientHeight, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, precision: "highp" });
renderer.setSize(section.clientWidth, section.clientHeight);
section.appendChild(renderer.domElement);

function adjustWindowSize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
}
const colorLight = new THREE.Color('hsl(261, 100%, 90%)');
const colorPurple = new THREE.Color('hsl(261, 899%, 44%)');

//torus
const torusgeo = new THREE.TorusKnotGeometry(2, .5, 300, 20, 1, 2);
const torusMat = new THREE.MeshPhongMaterial({
    wireframe: true,
    emissive: colorPurple,
});
const torusKnot = new THREE.Mesh(torusgeo, torusMat);
torusKnot.position.x = 5;
scene.add(torusKnot);

//swiatlo 
const light = new THREE.PointLight(colorLight, .3);
light.position.set(10, 10, 1);
scene.add(light);

///stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starsVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Ustawienie kamery
camera.position.z = 13;


// Tworzenie zmiennych do obsługi obracania
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Funkcja do obsługi zdarzenia przesunięcia myszy
function onDocumentMouseMove(e) {
    let deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
    };

    if (isDragging) {
        let deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(toRadians(deltaMove.y * 0.5), toRadians(deltaMove.x * 0.5), 0, "XYZ"));

        torusKnot.quaternion.multiplyQuaternions(deltaRotationQuaternion, torusKnot.quaternion);
    }

    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
}

// Funkcja do obsługi zdarzenia rozpoczęcia przesuwania myszy
function onDocumentMouseDown(e) {
    isDragging = true;
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
}

// Funkcja do obsługi zdarzenia zakończenia przesuwania myszy
function onDocumentMouseUp(e) {
    isDragging = false;
}

// Dodanie nasłuchiwania zdarzeń myszy
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

// Funkcja pomocnicza do zamiany stopni na radiany
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Animacja
const animate = () => {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += .002;
    torusKnot.rotation.z -= .005;
    torusKnot.rotation.y -= .01;
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;

    renderer.render(scene, camera)
}

animate();
window.addEventListener('resize', adjustWindowSize);
