import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 기본 Geometry 파티클

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
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
  controls.enableDamping = true;

  // Mesh
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.PointsMaterial({
    size: 1, // 파티클 사이즈 조정
    sizeAttenuation: false, // 가까운것은 크게, 먼것은 작게 보이는 원근을 사용 x - 동일한 크기로 보임
  });
  // material.size = 0.02; // 이렇게 사용도 가능
  const points = new THREE.Points(geometry, material);
  // PointsMaterial : 파티클을 사용할 수 있는 Material / Points : 파티클만들때 Mesh 대신 사용
  scene.add(points);

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
