import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PreventDragClick } from './PreventDragClick';


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
  const mouse = new THREE.Vector2(); // Vector2 = 2차원. x, y 만 가지고 있음


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

		// boxMesh.material.color.set("plum");
		// torousMesh.material.color.set("lime");

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

  function checkIntersects() {
		if (preventDragClick.mouseMoved) return;

    raycaster.setFromCamera(mouse, camera); // setFromCamera() : origin 은 카메에 있다고 생각 카메라에서 바라보는 방향이니까

    const intersects = raycaster.intersectObjects(meshes);

    for (const item of intersects){ // intersects 안의 원소들 돌면서, item으로 세팅하고, 원소마다 반복해주는 것
      console.log(item.object.name);
			item.object.material.color.set('red');
      break; // 겹쳐있을때 클릭하면 두개가 클릭되는걸 막고 앞에 있는거만 출력
			
    }
    // == 
    // if( intersects[0] ){
    //   console.log(intersects[0].object.name);
    // } 
  }

	// 이벤트
	window.addEventListener('resize', setSize);
  canvas.addEventListener('click', e => {
    mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
    mouse.y = -(e.clientY / canvas.clientHeight * 2 - 1);
    // -> raycast 에서 쓰기위해 0 ~ 1 사이의 값으로 변환
    checkIntersects();
  });

	const preventDragClick = new PreventDragClick(canvas);

	draw();
}
