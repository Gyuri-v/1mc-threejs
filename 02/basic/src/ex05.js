import * as THREE from 'three';

// 주제 : 브라우저 창 사이즈 변경에 대응하기

export default function example() {
  // render
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({ 
    canvas, // canvas 속성의 값을 canvas 로
    antialias: true, // 표면 부드럽게 처리
    // alpha: true, // 배경이 투명해짐
  }); 
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 캔버스 고해상도 처리를 하기위해서는 크기를 크게 한다음에, 줄여서 표현을 해야함 = pixel 밀도가 다르기 때문에
  // console.log(window.devicePixelRatio) // 해당 기기의 픽셀 밀도를 숫자로 나타내는 값
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setClearColor("#00ff00"); // 배경 색 설정
  // renderer.setClearAlpha(0.5); // 배경을 반투명하게 설정 

  // scene 만들기
  const scene = new THREE.Scene();
  // renderer 위에 scene 이 있음
  // scene.background = new THREE.Color('#ff2'); // scene 의 bg 색 변경

  // 카메라 만들기 - 원근카메라 PerspectiveCamera
  const camera = new THREE.PerspectiveCamera( 
    75, // fov
    window.innerWidth / window.innerHeight,  // aspect
    0.1, // near
    1000 // far
  );
  // camera 포지션 설정 - m로 가정
  // camera.position.x = 2; 
  // camera.position.y = 2; 
  camera.position.z = 5; 

  // 직교카메라 orthographic camera
  // const camera = new THREE.OrthographicCamera(
  //   -(window.innerWidth / window.innerHeight), // left
  //   window.innerWidth / window.innerHeight, // right
  //   1, // top
  //   -1, // bottom
  //   0.1, // near
  //   1000 // far
  // );
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;
  // camera.lookAt(0, 0, 0); // 카메라가 포지션쪽(0, 0, 0)을 바라보도록
  // camera.zoom = 0.5; // 1이 기본값  --> z 는 뷰 각도에 영향을 주는거고, 줌아웃효과를 원하면 orthographic 에서는 꼭 zoom 으로 사용
  // camera.updateProjectionMatrix(); // zoom 하면 update를 해줘야함
  // scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1); // DirectionalLight : 태양빛과 비슷함. 위에서 비춰줌  (색, 빛의 강도)
  light.position.x = 3;
  light.position.z = 2;
  scene.add(light);

  // mesh 만들기 - geometry(모양) 과 materiual(재질) 을 만들어 조합
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 기본으로 많이 사용하는 직육면체의 박스 지오메트리 (x, y, z) 
  const meterial = new THREE.MeshStandardMaterial({ // MeshBasicMaterial 는 빛에 영향을 안받음
    color: "#ff0000", // 색상 0x + rgb값  == "#ff0000"
  });
  const mesh = new THREE.Mesh(geometry, meterial); // mesh 생성
  scene.add(mesh); // scene 에 올림  -> renderer 해줘야 눈에 보임

  // 그리기
  function draw() {
    // 각도는 Radian 을 이용
    // 360도는 2파이
    // mesh.rotation.y += 0.1;  
    mesh.rotation.y += THREE.MathUtils.degToRad(1); // degToRad = deg값을 라디안으로 변경
    mesh.position.y += 0.01;
    if ( mesh.position.y > 3 ){
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); 
    // requestAnimationFrame 대신에 사용할 수 있는 three.js 의 renderer에 저장되어 있는 문법. 
    // 내부에서 requestAnimationFrame을 실행함 
    // requestAnimationFrame 을 사용해도 되지만 ar, vr 콘텐츠를 만들때는 setAnimationLoop 을 꼭 사용해야함
  }
  draw();

  // 이벤트
  function setSize() {
    // 카메라 조정
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    // 캔버스 고해상도 처리를 하기위해서는 크기를 크게 한다음에, 줄여서 표현을 해야함 = pixel 밀도가 다르기 때문에

  }

  window.addEventListener('resize', setSize);
}
