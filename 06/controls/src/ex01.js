import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

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

	// Controls
	const controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true; // 부드러운 카메라 동작
	// controls.enableZoom = false; // 줌 잠그기
	controls.maxDistance = 10; // 멀리가는 범위 한정
	controls.minDistance = 2; // 가까이 가는 범위 한정
	controls.maxPolarAngle = THREE.MathUtils.degToRad(135) // = Math.PI / 4 최대 회전 각도 한정
	controls.minPolarAngle = THREE.MathUtils.degToRad(20) // = 최소 회전 각도 한정
	// controls.target.set(2, 2, 2); // 회전의 중심점의 타켓을 지정
	controls.autoRotate = true; // 자동 회전
	controls.autoRotateSpeed = 2; // 자동 회전 속도

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	let meterial;
	let mesh;
	for (let i = 0; i < 20; i++) {
		meterial = new THREE.MeshStandardMaterial({
			color: `rgb(
				${50 + Math.floor(Math.random() * 205)}, 
				${50 + Math.floor(Math.random() * 205)}, 
				${50 + Math.floor(Math.random() * 205)}
			)`,// 앞에 50을 써줌으로 최소값 설정 한 것
		})
		mesh = new THREE.Mesh(geometry, meterial);
		mesh.position.x = (Math.random() - 0.5) * 5;
		mesh.position.y = (Math.random() - 0.5) * 5;
		mesh.position.z = (Math.random() - 0.5) * 5;
		scene.add(mesh);
	}

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

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
