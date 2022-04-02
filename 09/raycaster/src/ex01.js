import { _ } from 'core-js';
import * as THREE from 'three';
import { Raycaster } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
	camera.position.x = 5;
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
	const controls = new OrbitControls(camera, renderer.domElement);

	// Mesh
	const lineMaterial = new THREE.LineBasicMaterial({ color: "yellow" }); // LineBasicMaterial 선을 만들때 사용
	// 버퍼지오메트리 : 임의로 포인트를 설정해서 포인트를 이어주면서 지오메트리를 만들 수 있음
	const points = [];
	points.push(new THREE.Vector3(0, 0, 100));
	points.push(new THREE.Vector3(0, 0, -100));
	const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
	const guide = new THREE.Line(lineGeometry, lineMaterial);
	scene.add(guide);

	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const boxMaterial = new THREE.MeshStandardMaterial({ color: "plum" });
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.name = "box";

	const torousGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
	const torousMaterial = new THREE.MeshStandardMaterial({ color: "lime" });
	const torousMesh = new THREE.Mesh(torousGeometry, torousMaterial);
	torousMesh.name = "torous";

	scene.add(boxMesh, torousMesh);

	const meshes = [boxMesh, torousMesh];

	const raycaster = new THREE.Raycaster();


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

		boxMesh.position.y = Math.sin(time) * 2;
		torousMesh.position.y = Math.cos(time) * 2;
		boxMesh.material.color.set("plum");
		torousMesh.material.color.set("lime");

		const origin = new THREE.Vector3(0, 0, 100); // 광선쏘는 춟발선 위치 vector
		const direction = new THREE.Vector3(0, 0, -1); // 방향 / 정교화된 방향 - 1단위로 만들어야함 / 어차피 방향이니까 값이 100 이렇게 올라갈 필요가 없음 
		// 100 으로 하고 싶으면 direction.normalize(); 를 사용해서 정교화를 해야함 -> 100을 1로 바꾸는 것 
		raycaster.set(origin, direction);

		const intersects = raycaster.intersectObjects(meshes);
		intersects.forEach(item => {
			// console.log(item.object.name);
			item.object.material.color.set("red");
		});

		// console.log(raycaster.intersectObjects(meshes)); // 광선 맞은 면을 호출 /  ()안의 배열(meshes)에 있는 아이템을 가지고 체크함 / 박스 앞면, 뒷면이 맞아서 2개가 호춝됨

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
