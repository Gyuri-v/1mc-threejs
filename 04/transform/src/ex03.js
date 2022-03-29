import * as THREE from 'three';
import dat from 'dat.gui';
import { degToRad } from 'three/src/math/MathUtils';

// ----- 주제: 

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);

	// Dat GUI
	const gui = new dat.GUI();
	gui.add(camera.position, 'x', -5, 5, 0.1).name('카메라 X');
	gui.add(camera.position, 'y', -5, 5, 0.1).name('카메라 Y');
	gui.add(camera.position, 'z', 2, 10, 0.1).name('카메라 Z');

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

    // 축을 독립적으로 돌리기 위해서
    mesh.rotation.reorder('YXZ');
    mesh.rotation.x = THREE.MathUtils.degToRad(33);
    mesh.rotation.y = Math.PI / 4; // 45도
    mesh.rotation.z = THREE.MathUtils.degToRad(20);
    // mesh.rotation.set(1, 1, 1)\


		// mesh.scale.x = 2;
		// mesh.scale.set(1, 2, 1);

		// position의 set 메서드를 활용해서 이동 가능
		// mesh.position.set(1, 2, 0); // x, y, z

		// position 이란 무엇인가? -> 
		// Vector3 : 3차원 공간에서 어떤 점을 나타내는 객체(x, y, z)
		// console.log(mesh.position.length()) // 원점부터 Vector3(mesh) 의 길이
		// console.log(mesh.position.distanceTo(new THREE.Vector3(1, 1, 2))) // Vector3(mesh)부터 어떤 다른 벡터3d 까지의 거리

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
