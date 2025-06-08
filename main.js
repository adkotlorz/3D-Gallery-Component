import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/Addons';
import { Tween, Easing, update as updateTween } from 'tween';
import { artists, images, titles } from "./constants";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const textureLoader = new THREE.TextureLoader();

const leftArrowTexture = textureLoader.load(
	"left.png",
	() => console.log("Loaded left arrow"),
	undefined,
	(err) => console.error("Error while loading left arrow", err));
const rightArrowTexture = textureLoader.load(
	"right.png",
	() => console.log("Loaded right arrow"),
	undefined,
	(err) => console.error("Error while loading right arrow", err));

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

	const leftArrow = new THREE.Mesh(
		new THREE.BoxGeometry( 0.3, 0.3, 0.01 ),
		new THREE.MeshStandardMaterial({ map: leftArrowTexture, transparent: true }),
	);
	leftArrow.position.set(-1.8, 0, -4);
	leftArrow.name = `LeftArrow`;
	leftArrow.userData = (i === count -1) ? 0 : i + 1

	baseNode.add(leftArrow);

	const rightArrow = new THREE.Mesh(
		new THREE.BoxGeometry( 0.3, 0.3, 0.01 ),
		new THREE.MeshStandardMaterial({ map: rightArrowTexture, transparent: true }),
	);
	rightArrow.position.set(1.8, 0, -4);
	rightArrow.name = `RightArrow`;
	rightArrow.userData = (i === 0) ? count - 1 : i - 1

	baseNode.add(rightArrow);
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
		color: 0X303030,
		textureWidth: window.innerWidth,
		textureHeight: window.innerHeight,
	}
);
mirror.position.y = -1.1;
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

function rotateGallery(direction, newIndex) {
	const deltaY = (direction * (2 * Math.PI / count));

	new Tween(rootNode.rotation)
		.to({ y: rootNode.rotation.y + deltaY })
		.easing(Easing.Quadratic.InOut)
		.start()
		.onStart(() => {
			document.querySelector("#title").style.opacity = 0;
			document.querySelector("#artist").style.opacity = 0;
	})
		.onComplete(() => {
			document.querySelector("#title").innerText = titles[newIndex];
			document.querySelector("#artist").innerText = artists[newIndex];

			document.querySelector("#title").style.opacity = 1;
			document.querySelector("#artist").style.opacity = 1;
		});
}

function animate() {
	updateTween()
	renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	mirror.getRenderTarget().setSize( window.innerWidth, window.innerHeight );
});

window.addEventListener('click', (e) => {
	const raycaster = new THREE.Raycaster();
	const mouseNDC = new THREE.Vector2(
		(e.clientX / window.innerWidth) * 2 - 1,
		-(e.clientY / window.innerHeight) * 2 + 1
	);

	raycaster.setFromCamera(mouseNDC, camera);

	const intersections = raycaster.intersectObject(rootNode, true);
	if (intersections.length > 0) {
		const obj = intersections[0].object
		const newIndex = obj.userData;

		if (intersections[0].object.name === "LeftArrow") {
			rotateGallery(-1, newIndex);
		}
		if (intersections[0].object.name === "RightArrow") {
			rotateGallery(1, newIndex);
		}
	}
});

document.querySelector("#title").innerText = titles[0];
document.querySelector("#artist").innerText = artists[0];