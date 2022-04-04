import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';

// ----- 주제: cannon.js 기본 세팅

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http

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
	const controls = new OrbitControls(camera, renderer.domElement);

	// Cannon(물리 엔진)
	const cannonWorld = new CANNON.World();
	cannonWorld.gravity.set(0, -10, 0); // 중력 설정 - -로 해야지 위에서 떨어짐
	
	const floorShape = new CANNON.Plane();// geometry 와 같이 모양에 해당하는 것 shape
	const floorBody = new CANNON.Body({ 	// 물리현상이 적용돼서 움직이는 실체
		mass: 0, 														// 무게 - 중력에 영향을 안받으려면 0 
		position: new CANNON.Vec3(0, 0, 0), // 위치 - cannon 도 vector3
		shape: floorShape, 									// 바디에서 어떤 형태를 쓸건지
	});
	floorBody.quaternion.setFromAxisAngle(// rotation (어떤축을 기준으로 할건지, 각도)
		new CANNON.Vec3(-1, 0, 0),
		Math.PI / 2
	) 
	cannonWorld.addBody(floorBody);

	const boxShape = new CANNON.Box(new CANNON.Vec3(0.25, 2.5, 0.25)); // 중심을 기준으로 얼만큼씩 갈건지 설정해야함 1,1,1의 박스를 만들거니까 0.5, 0.5, 0.5
	const boxBody = new CANNON.Body({
		mass: 1,
		position: new CANNON.Vec3(0, 10, 0),
		shape: boxShape
	});
	cannonWorld.addBody(boxBody);
	

	// Mesh
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.MeshStandardMaterial({
			color: 'slategray',
		})
	);
	floorMesh.rotation.x = -Math.PI / 2;
	scene.add(floorMesh);


	const boxGeometry = new THREE.BoxGeometry(0.5, 5, 0.5);
	const boxMaterial = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.position.y = 0.5;
	scene.add(boxMesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		
		let cannonStepTime = 1/60;
		if( delta < 0.01 ) cannonStepTime = 1/120

		// cannon 과 mesh 들을 연결 시키기
		cannonWorld.step(cannonStepTime, delta, 3); // 시간 단계 설정( 1초에 60번이 목표-> 화면주사율에 따라 유동적으로 대응 , 성능보정을 위해 시간차, 지연되거나 차이날 경우 간격을 메우는 시도를 몇번 할건지 )
		// 캐논에서 만든 body의 위치, 회전을 메시가 따라가도록
		boxMesh.position.copy(boxBody.position); // 위치
		boxMesh.quaternion.copy(boxBody.quaternion); // 회전

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
