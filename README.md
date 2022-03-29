#### * 우선 공부하는대로 작성중입니다. 이후 정리하여 업뎃 예정입니다.


### three.js 란?

웹에서 그래픽을 표현하는 방법으로, 

webGL은 웹상에서 그래픽을 표현하는 라이브러리, 자바스크립트 언어 이용, 2D, 3D 표현

gpu를 이용해서 그림을 그리기때문에 성능이 좋음

할 수 있는거는 많지만, 개발이 까다롭다.

이 three.js 가 webGL을 쉽고 간편하게 사용할 수  있도록 하는 라이브러리.

[Three.js - JavaScript 3D library](https://threejs.org/)

해당 링크에서 다운받아서 사용 가능

→ module 방식 사용을 권장

### javascript module

모듈을 쓰면, js를 다 연결할 필요없이, 메인이 되는 js 하나만 연결해서 사용하면 된다.

- index.html

```jsx
<script type="module" src="main.js"></script>
```

- hello.js

```jsx
export function hello1() {
  console.log("Hello 1");
}
```

- main.js

```jsx
import { hello1 } from "./hello.js";

hello1();
```

```jsx
// ** hello.js 안에 있는 모든 export 된 함수를 가지고 오고 싶을 때

// import { hello1, hello2 } from "./hello.js";
import * as hell from "./hello.js"

hell.hello1();
hell.hello2();
```

→  export 시 앞에 defalut 를 붙였다면,  import 할때 {}를 사용하지 않아도 된다.

```jsx
export defalut function hello1() {
  console.log("Hello 1");
}
_____

import defalut hello1 from "./hello.js";
```

### Webpack

번들링 : js, img, css 등의 파일을 하나하나의 모듈로 보고, 이 모듈을 배포용으로 병합하고 포장하는 것.

이런 번들링 작업을 수행하는 툴을 번들러라고 하는데, 이 웹팩이 현재 시점에서 가장 인기 많은 번들러

[webpack](https://webpack.js.org/)

### — webpack test 해보기

[https://github.com/jmyoow/webpack-js-html](https://github.com/jmyoow/webpack-js-html)

readme 에 있는대로 진행.

1. **패키지 설치**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2872fae-fdfd-4eb2-91b0-1e7dd0e04305/Untitled.png)
    
    → 해당 내용대로 설치하면 pakage.json 파일이 변경되는데, 이후 협업 시 npm i 만 입력하면 위의 명령어들이 pakage.json에 정리되어있기때문에 동일한 환경으로 세팅된다.
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/314d2dde-59eb-4ef6-b483-9fb9cd5611a1/Untitled.png)
    
    → -D : 개발환경에서만 사용할 옵션이라고 알려주는 것 
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/830cb20f-bf43-4e8d-8f9d-fe3cafa642e0/Untitled.png)
    
    → npm i three 라고 입력하면 dependencies 로 새롭게 생성된다
    

1. **개발 서버 구동**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6d5009c5-d52f-411f-a644-a727af7c589d/Untitled.png)
    
    → [localhost](http://localhost) 에서 화면 확인 가능
    
2. **빌드**
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/732511ec-a322-4fa7-b617-28fa9e91050d/Untitled.png)
    
    dist 폴더가 생성되면서 최종 배포용 파일이 생성되는 것
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/61f9831a-176e-4ca8-aa14-618bd01ec92b/Untitled.png)
    

webpack.config.js 파일에 확인해 보며, 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/86fceb09-3deb-451e-8fa1-12e586aac6bb/Untitled.png)

→ 자바스크립트 모듈 빌드할때, 시작점이 되는 파일 = 기준이 되는 파일

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ce2cb245-2333-429a-9436-81bdcc7d269d/Untitled.png)

→ output 을 dist 로 설정하고

→ 파일명 형식 설정

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/561cd576-c1b7-4df5-91c6-002915c3af00/Untitled.png)

→ 소스코드 고치면 자동 새로 고침

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e4f3179-99dc-4799-ab5a-0818f754084f/Untitled.png)

→ minimizer : 빌드할때, 소스 압축 되도록 설정

→ drop_console : console.log 자동으로 삭제

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fbadec6f-886a-4f39-ad66-def69d6b17e4/Untitled.png)

→ babel : 최신 문법의 자바스크립트를 구브라우저에서도 잘 작동하도록 변환해주는것

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/da3f9d79-04bc-4806-ac3c-82902539b9bc/Untitled.png)

→ index.html 을 여기서 지정

→ main.js 는 index.html 에서 따로 연결을 안해도, dist에서 보면 연결이 되어 있음. promiss로 자동으로 연결했기 때문에. 알아서 연결할 수 있음

→ css 와 images는 그대로 복제시킬것이기 때문에 이와같이 입력

### webpack 방식으로 three js 실행

```jsx
import * as THREE from 'three';
```

three.js를 가져올 때, ./three.js 와 같은 형식이 아닌, three 로 가져오면 된다.

main.js 를 따로 연결할 필요 x → 웹팩에서 추가해 줄거기 때문에.

### three js 기본 장면 구성요소 살펴보기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d08b8906-7401-49ff-90b3-ab28b0c746ef/Untitled.png)

scene: 장면/무대

mesh(메쉬) : scene 에 올려진 사물 하나하나 - geometry(모양) 과 materiual(재질)로 구성

camera : 장면을 보여줄 카메라 / 시야각을 가짐- 어느정도 시야로 표현할 것인지

light : 조명 / 필수요소는 아님

renderer: 이것들을 화면에 그려주는 것 = 카메라가 보여주는 것

위치 : x, y, z 축 - 파란색 화살표가 정면 앞이라고 가정, x 축은 좌우 이동 / y 축은 위아래 이동 / z 축은 앞뒤 이동

( +, - 방향 잘 체크 )

### Renderer 생성

```jsx
// 방법 1. 
// const renderer = new THREE.WebGLRenderer(); // 랜더러 생성
// renderer.setSize(window.innerWidth, window.innerHeight); // 랜더러 사이즈 설정
// document.body.appendChild(renderer.domElement);  // 렌더러 가지고 있는 캔버스를 화면에 보여주는 것

// 방법 2. --- html에서 canvas 에 직접 사용하는게 활용범위가 넓음
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas }); // canvas 속성의 값을 canvas 로
renderer.setSize(window.innerWidth, window.innerHeight);
```

### Scene 과 Camera 생성

```jsx
// scene 만들기
const scene = new THREE.Scene;

// 카메라 만들기 - 원근카메라 PerspectiveCamera
const camera = new THREE.PerspectiveCamera( 
  75, // fov
  window.innerWidth / window.innerHeight,  // aspect
  0.1, // near
  1000 // far
);
// camera 포지션 설정 - m로 가정
camera.position.x = 1; 
camera.position.y = 2; 
camera.position.z = 5;
scene.add( camera );
```

- 원근카메라
    
    [three.js](https://threejs.org/docs/index.html?q=camera#api/ko/cameras/PerspectiveCamera)
    
    **PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )**
    
    - fov — 카메라 절두체 수직 시야.
    - aspect — 카메라 절두체 종횡비. → 가로 세로 비율 = 화면 너비 / 화면 높이
    - near — 카메라 절두체 근평면. → 어느정도 가까이 오면 안보이게 하고
    - far — 카메라 절두체 원평면. → 어느정도 멀리가게 하면 안보이게 하는것
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3b4d3b0-455c-4e5d-bba6-23161ac309d3/Untitled.png)
    
    → 시야각에서 벗어나 있는 똥과, near 안과 far 밖에 있는 똥은 카메라에 보이지 않는 것
    
- 카메라의 포지션x, y, z 를 설정하지 않으면 0, 0, 0이 기본값 → 위에서 1분이가 있는 자리가 0, 0, 0 이라고 하면, 카메라도 그 자리에서 조립이 된다는것 → 좌표 설정이 필요 — 보통 z 를 설정해서 멀어지게 함

### Mesh 생성 후 그리기

```jsx
// mesh 만들기 - geometry(모양) 과 materiual(재질) 을 만들어 조합
const geometry = new THREE.BoxGeometry(1, 1, 1); // 기본으로 많이 사용하는 직육면체의 박스 지오메트리 (x, y, z) 
const meterial = new THREE.MeshBasicMaterial({
  color: "#ff0000", // 색상 0x + rgb값  == "#ff0000"
});
const mesh = new THREE.Mesh(geometry, meterial); // mesh 생성
scene.add(mesh); // scene 에 올림  -> renderer 해줘야 눈에 보임

// 그리기
renderer.render(scene, camera);
```

결과물 →

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/571d876b-86a6-41e1-b32c-50845060e666/Untitled.png)

측면의 계단형식으로 보이는 표면을 부드럽게 처리하려면, 

renderer 생성에서 antialias 처리를 해줘야함 — 해당 코드 아래와 같이 변경

→ 대신 성능저하가 있음 

```jsx
const renderer = new THREE.WebGLRenderer({ 
  canvas, // canvas 속성의 값을 canvas 로
  antialias: true, // 표면 부드럽게 처리
});
```

### Orthographic Camera 직교카메라

[three.js](https://threejs.org/docs/index.html?q=camera#api/ko/cameras/OrthographicCamera)

객체의 크기가 카메라의 거리와 관계없이 유지됨

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c9c2f17-71ea-4116-bdbc-5d253ddcb5fc/Untitled.png)

- left — 카메라 절두체 좌평면.
- right — 카메라 절두체 우평면.
- top — 카메라 절두체 상평면.
- bottom — 카메라 절두체 하평면.
- near — 카메라 절두체 근평면.
- far — 카메라 절두체 원평면.

→ 절두체 : near 과 far 면을 끝면으로 가지고 있는 도형 → orthogaphic의 절두체는 직육면체 형태

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3017085b-8688-4960-99e1-2d368e4da8d4/Untitled.png)

```jsx
// 직교카메라 orthographic camera
const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight), // left
  window.innerWidth / window.innerHeight, // right
  1, // top
  -1, // bottom
  0.1, // near
  1000 // far
);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(0, 0, 0); // 카메라가 포지션쪽(0, 0, 0)을 바라보도록
camera.zoom = 0.5; // 1이 기본값  --> z 는 뷰 각도에 영향을 주는거고, 줌아웃효과를 원하면 orthographic 에서는 꼭 zoom 으로 사용
camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행
scene.add(camera);
```

결과물 →

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d79ae23-0c0e-43aa-95cd-3b0f7dc603aa/Untitled.png)

### 사이즈 변경 대응

```jsx
function setSize() {
  // 카메라 조정
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

window.addEventListener('resize', setSize);
```

aspect 재조정 후 카메라 없데이트 → renderer 사이즈 재조정 및 다시 render

캔버스 고해상도 처리를 하기위해서는 크기를 크게 한다음에, 줄여서 표현을 해야함 

= 디바이스 pixel 밀도가 다르기 때문에

그래서 디바이스 pixel 밀도만큼의 크기로 설정

```jsx
// console.log(window.devicePixelRatio) // 해당 기기의 픽셀 밀도를 숫자로 나타내는 값
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
```

### 배경 색 변경

1. renderer 배경 변경

```jsx
const renderer = new THREE.WebGLRenderer({ 
  canvas, // canvas 속성의 값을 canvas 로
  antialias: true, // 표면 부드럽게 처리
  alpha: true, // 배경이 투명해짐
});

renderer.setClearColor("#00ff00"); // 배경 색 설정
renderer.setClearAlpha(0.5); // 배경을 반투명하게 설정
```

1. scene 배경 변경 — renderer 위에 scene이 있음 = z-index가 위임

```jsx
scene.background = new THREE.Color('#ff2'); // scene 의 bg 색 변경
```

### 빛 light 적용

카메라 다음으로 설정 

DirectionalLight : 태양빛과 비슷함. 위에서 비춰줌  (색, 빛의 강도)

```jsx
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.x = 3;
light.position.z = 2;
scene.add(light);
```

- meterial 이 MeshBasicMaterial 으로 설정되어 있으면 빛의 영향을 받지않음 → MeshStandardMaterial으로 설정해서 확인
