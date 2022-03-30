export class KeyController {
  // 클래스의 인스턴스가 생성될때 기본적으로 실행되는 함수
  constructor() {
    // 생성자
    this.keys = [];
    
    window.addEventListener('keydown', e => { // 첫번째매개변수 e
      console.log( e.code + " 누름" );
      this.keys[e.code] = true; 
      // e.code = 키보드 알파벳 keyW 이런식으로 찍힘
      // this.keys["keyW"]
    });

    window.addEventListener('keyup', e => { 
      console.log( e.code + " 뗌" );
      delete this.keys[e.code];
      // 키에서 손을 떼면, this.keys 배열에서 'keyW' 이름의 속성을 삭제 = this.keys["keyW"] 삭제
    });

    
  }
}