import * as THREE from 'three';

// 동적으로 캔버스 조립하기

// 방법 1. 
// const renderer = new THREE.WebGLRenderer(); // 랜더러 생성
// renderer.setSize(window.innerWidth, window.innerHeight); // 랜더러 사이즈 설정
// document.body.appendChild(renderer.domElement);  // 렌더러 가지고 있는 캔버스를 화면에 보여주는 것

// 방법 2. --- html에서 canvas 에 직접 사용하는게 활용범위가 넓음
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas }); // canvas 속성의 값을 canvas 로
renderer.setSize(window.innerWidth, window.innerHeight);

