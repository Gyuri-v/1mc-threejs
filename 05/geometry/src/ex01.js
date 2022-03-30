import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: Geometry 기본

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
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);


	// controls
	const controls = new OrbitControls(camera, renderer.domElement);


	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3); // 4, 5, 6번째 인자는 면을 나눔(widthSegments, heightSegments, depthSegments) -> 와이어프레임으로 확인 가능
	// 기본적으로 면은 삼각형으로 구성이 됨 / 사각형은 삼각형 두개 합친 것
	const material = new THREE.MeshStandardMaterial({
		color: 'hotpink',
		wireframe: true,
		side: THREE.DoubleSide,
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

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
