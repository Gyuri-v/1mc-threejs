import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

export default function example() {
  // 텍스쳐 이미지 로드
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log('로드 시작');
  }
  // 이미지 하나하나 로드될때마다
  loadingManager.onProgress = img => { 
    console.log(img + '로드');
  }
  // 모든 이미지 로드 완료
  loadingManager.onLoad = () => { 
    console.log('로드 완료');
  }
  // 로드 에러
  loadingManager.onError = () => { 
    console.log('로드 에러');
  }


  const textureLoader = new THREE.TextureLoader(loadingManager);
  const texture = textureLoader.load('/textures/skull/Ground Skull_basecolor.jpg',);

	// 텍스쳐 변환
	// 이미지가 한쪽으로 이동하면서 이미지 깨져서 적용
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;

	texture.offset.x = 0.3;
	texture.offset.y = 0.3;

	// 한 면 안에서 반복
	texture.repeat.x = 2; 
	texture.repeat.y = 2;

	// 회전
	texture.rotation = THREE.MathUtils.degToRad(45);
	texture.center.x = 0.5; // 회전의 중심을 설정
	texture.center.y = 0.5; // 회전의 중심을 설정

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
  scene.background = new THREE.Color("#ffffff");

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
	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.set(1, 1, 2);
	scene.add(ambientLight, directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Mesh
	const geometry = new THREE.BoxGeometry(2, 2, 2);
	const material = new THREE.MeshStandardMaterial({
    // 컬러가 있으면 컬러와 같이 적용됨
    map: texture,
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
