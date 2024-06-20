import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Fog
const Fog = new THREE.Fog("#262837", 1, 15);
scene.fog = Fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Door Textures

const doorcolorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
    "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
    "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
    "./textures/door/roughness.jpg"
);

// Wall Textures

const brickColorTexture = textureLoader.load("./textures/bricks/color.jpg");
const brickAmbientOcclusionTexture = textureLoader.load(
    "./textures/bricks/ambientOcclusion.jpg"
);
const brickNormalTexture = textureLoader.load("./textures/bricks/normal.jpg");
const brickRoughnessTexture = textureLoader.load(
    "./textures/bricks/roughness.jpg"
);

// Grass Texture

const grassColorTexture = textureLoader.load("./textures/grass/color.jpg");
const grassNormalTexture = textureLoader.load("./textures/grass/Normal.jpg");
const grassRoughnessTexture = textureLoader.load(
    "./textures/grass/roughness.jpg"
);
const grassAmbientOcclusionTexture = textureLoader.load(
    "./textures/grass/ambientOcclusion.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);

// Repeat on X
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;

// Repeat on Y
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */

const House = new THREE.Group();
scene.add(House);

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: brickColorTexture,
        aoMap: brickAmbientOcclusionTexture,
        normalMap: brickNormalTexture,
        roughnessMap: brickRoughnessTexture,
    })
);

walls.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.25;
House.add(walls);

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 3;
roof.rotation.y = Math.PI * 0.25;
House.add(roof);

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorcolorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    })
);

door.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 + 0.01;
House.add(door);

const bushGeometery = new THREE.SphereGeometry(1);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometery, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
House.add(bush1);

const bush2 = new THREE.Mesh(bushGeometery, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
House.add(bush2);

const bush3 = new THREE.Mesh(bushGeometery, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
House.add(bush3);

const bush4 = new THREE.Mesh(bushGeometery, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
House.add(bush4);

// Gost

const gost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(gost1);

const gost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(gost2);

const gost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(gost3);

// Graves
const graveGroup = new THREE.Group();
scene.add(graveGroup);

const graveGeometery = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const gravesMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
    const Gost1angle = Math.PI * 2 * Math.random(); // Corrected to cover full circle
    const grave = new THREE.Mesh(graveGeometery, gravesMaterial);
    const radius = 3 + Math.random() * 6;
    grave.position.x = Math.sin(Gost1angle) * radius;
    grave.position.z = Math.cos(Gost1angle) * radius;
    grave.position.y = 0.3 + Math.random() * 0.01;
    // Adding Shadow
    grave.castShadow = true
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;

    scene.add(grave);
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    })
);

floor.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.12);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.12);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

const DoorPointLight = new THREE.PointLight("#ff7d46", 1, 7);
DoorPointLight.position.set(0, 2.2, 2.7);
scene.add(DoorPointLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor("#262837");

// Adding Shadows (Lights)

moonLight.castShadow = true;
DoorPointLight.castShadow = true;
gost1.castShadow = true;
gost2.castShadow = true;
gost3.castShadow = true;



// Adding Shadows of Objects

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true


// Adding Recive Shadow to Floor

floor.receiveShadow = true

// Optimize the ShadowMaps 

DoorPointLight.shadow.mapSize.width = 256
DoorPointLight.shadow.mapSize.height= 256
DoorPointLight.shadow.camera.far= 7

gost1.shadow.mapSize.width = 256
gost1.shadow.mapSize.height = 256
gost1.shadow.camera.far = 7

gost2.shadow.mapSize.width = 256
gost2.shadow.mapSize.height = 256
gost2.shadow.camera.far = 7

gost3.shadow.mapSize.width = 256
gost3.shadow.mapSize.height = 256
gost3.shadow.camera.far = 7







/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Gost Moments

    const Gost1angle = elapsedTime * 0.5;
    gost1.position.x = Math.cos(Gost1angle) * 4;
    gost1.position.z = Math.sin(Gost1angle) * 4;
    gost1.position.y = Math.sin(Gost1angle * 3);

    const Gost2angle = elapsedTime * 0.32;
    gost2.position.x = Math.cos(Gost2angle) * 5;
    gost2.position.z = Math.sin(Gost2angle) * 5;
    gost2.position.y = Math.sin(Gost2angle * 4) + Math.sin(elapsedTime * 2.5);

    const Gost3angle = elapsedTime * 0.32;
    gost3.position.x = Math.cos(Gost3angle) * (7 + Math.sin(elapsedTime * 0.32));
    gost3.position.z = Math.sin(Gost3angle) * (7 + Math.sin(elapsedTime * 0.32));
    gost3.position.y = Math.sin(Gost3angle * 4) + Math.sin(elapsedTime * 2);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
