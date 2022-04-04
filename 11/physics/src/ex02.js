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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
  directionalLight.castShadow = true;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Cannon(물리 엔진)
	const cannonWorld = new CANNON.World();
	cannonWorld.gravity.set(0, -10, 0); // 중력 설정 - -로 해야지 위에서 떨어짐

  // ContactMaterial
  const defaultMaterial = new CANNON.Material('default'); // (이름)
  const rubberMaterial = new CANNON.Material('rubber');
  const ironMaterial = new CANNON.Material('iron');
  const defaultContactMaterial = new CANNON.ContactMaterial(
    // 인자는 부딪힐 material 을 넣으면 됨
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.5, // 마찰
      restitution: 0.3, // 반발력
    }
  );
  cannonWorld.defaultContactMaterial = defaultContactMaterial; // defaultContactMaterial을 defaultContactMaterial로 설정

  const rubberDefaultContactMaterial = new CANNON.ContactMaterial(
    rubberMaterial,
    defaultMaterial,
    {
      friction: 0.5, 
      restitution: 0.7, 
    }
  );
  cannonWorld.addContactMaterial(rubberDefaultContactMaterial);

  const ironDefaultContactMaterial = new CANNON.ContactMaterial(
    ironMaterial,
    defaultMaterial,
    {
      friction: 0.5, 
      restitution: 0, 
    }
  );
  cannonWorld.addContactMaterial(ironDefaultContactMaterial);
	
	const floorShape = new CANNON.Plane();// geometry 와 같이 모양에 해당하는 것 shape
	const floorBody = new CANNON.Body({ 	// 물리현상이 적용돼서 움직이는 실체
		mass: 0, 														// 무게 - 중력에 영향을 안받으려면 0 
		position: new CANNON.Vec3(0, 0, 0), // 위치 - cannon 도 vector3
		shape: floorShape, 									// 바디에서 어떤 형태를 쓸건지
    material: defaultMaterial,          // material 설정
	});
	floorBody.quaternion.setFromAxisAngle(// rotation (어떤축을 기준으로 할건지, 각도)
		new CANNON.Vec3(-1, 0, 0),
		Math.PI / 2
	) 
	cannonWorld.addBody(floorBody);

	const sphereShape = new CANNON.Sphere(0.5); // 반지름
	const spehereBody = new CANNON.Body({
		mass: 1,
		position: new CANNON.Vec3(0, 10, 0),
		shape: sphereShape,
    material: ironMaterial
	});
	cannonWorld.addBody(spehereBody);
	

	// Mesh
	const floorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.MeshStandardMaterial({
			color: 'slategray',
		})
	);
	floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;
	scene.add(floorMesh);


	const sphereGeometry = new THREE.SphereGeometry(0.5);
	const sphereMaterial = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphereMesh.position.y = 0.5;
  sphereMesh.castShadow = true;
	scene.add(sphereMesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		
		let cannonStepTime = 1/60;
		if( delta < 0.01 ) cannonStepTime = 1/120

		cannonWorld.step(cannonStepTime, delta, 3);
		sphereMesh.position.copy(spehereBody.position);
		sphereMesh.quaternion.copy(spehereBody.quaternion);

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
