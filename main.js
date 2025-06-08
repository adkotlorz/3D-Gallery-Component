import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/Addons';

import { images } from "./constants";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const rootNode = new THREE.Object3D();
scene.add( rootNode );

let count = 6;
for (let i = 0; i < count; i++) {
	const texture = textureLoader.load(
		images[i],
		() => console.log(`Loaded: ${images[i]}`),
		undefined,
		(err) => console.error(`Error while loading: ${images[i]}`, err)
	);
	texture.colorSpace = THREE.SRGBColorSpace;


	const baseNode = new THREE.Object3D();
	baseNode.rotation.y = i * (2 * Math.PI / count);
	rootNode.add(baseNode);

	const border = new THREE.Mesh(
		new THREE.BoxGeometry(3.2, 2.2, 0.09),
		new THREE.MeshStandardMaterial({color: 0X202020}),
	);
	border.position.z = -4
	baseNode.add(border);

	const artwork = new THREE.Mesh(
		new THREE.BoxGeometry( 3, 2, 0.1 ),
		new THREE.MeshStandardMaterial({ map: texture })
	);
	artwork.position.z = -4;
	baseNode.add(artwork);
}

const spotlight = new THREE.SpotLight(
	0XFFFFFF,
	100,
	10,
	0.65,
	1,
);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 0.5, -5);
scene.add(spotlight);
scene.add(spotlight.target);

const mirror = new Reflector(
	new THREE.CircleGeometry(10),
	{

	}
)

function animate() {
	rootNode.rotation.y += 0.002;
	renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
});