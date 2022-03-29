import * as THREE from 'three';
import gsap from 'gsap';

export default function example() {
  // render
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({ 
    canvas, // canvas 속성의 값을 canvas 로
    antialias: true, // 표면 부드럽게 처리
    // alpha: true, // 배경이 투명해짐
  }); 
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 1, 7); // 색, near, far

  // camera
  const camera = new THREE.PerspectiveCamera( 
    75, // fov
    window.innerWidth / window.innerHeight,  // aspect
    0.1, // near
    1000 // far
  );
  camera.position.y = 1; 
  camera.position.z = 5; 
  scene.add(camera);

  // light
  const light = new THREE.DirectionalLight(0xffffff, 1); // DirectionalLight : 태양빛과 비슷함. 위에서 비춰줌  (색, 빛의 강도)
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 기본으로 많이 사용하는 직육면체의 박스 지오메트리 (x, y, z) 
  const meterial = new THREE.MeshStandardMaterial({ // MeshBasicMaterial 는 빛에 영향을 안받음
    color: "#ff0000", // 색상 0x + rgb값  == "#ff0000"
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // const meshes = [];
  // let mesh;
  // for (let i = 0; i < 10; i++) {
  //   mesh = new THREE.Mesh(geometry, meterial);
  //   mesh.position.x = Math.random() * 5 - 2.5;
  //   mesh.position.z = Math.random() * 5 - 2.5;
  //   scene.add(mesh);
  //   meshes.push(mesh);
  // }
  

  // 그리기
  let time = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    // meshes.forEach(item => {
    //   item.rotation.y += deltaTime * 0.001;
    // })

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw); 
  }
  draw();

  // gsap
  gsap.to(
    mesh.position, // 첫번째 인자 : 변화주고 싶은 오브젝트
    {
      duration: 1,
      y: 2,
      z: 1,
    }// 두번째 인자 : 객체 생성해서 바꾸기 원하는 속성, 재생시간, 어떤값으로 변경 등등
  );

  // 이벤트
  function setSize() {
    // 카메라 조정
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', setSize);
}
