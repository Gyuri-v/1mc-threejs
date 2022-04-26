import { Mesh } from 'three';
import { cm1, cm2, geo, mat } from './common';

export class SideLight {
  constructor(info) {
    const container = info.container || cm1.scene;

    this.name = info.name || '';
    this.x = info.x || 0;
    this.y = info.y || 0;
    this.z = info.z || 0;

    this.geometry = geo.sideLight;
    this.material = mat.sideLight;

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);

    container.add(this.mesh);
    // bar 에 종속시켜서 bar가 움직일때 따라 움직일 수 있도록 한다.
  }

  turnOff() {
    this.mesh.material.color.set(cm2.lightOffColor);
  }
}
