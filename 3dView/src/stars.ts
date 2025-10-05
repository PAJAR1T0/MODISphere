import { THREE } from "./index"

export class Stars {
  scene : THREE.Scene
  geometry! : THREE.BufferGeometry;
  material! : THREE.PointsMaterial;
  starsMesh! : THREE.Points;
  starsChors! : Float32Array;
  starsMinDistanceValue : number
  starsMaxDistanceValue : number
  stars : number


  constructor(scene : THREE.Scene) {
    this.scene = scene
    this.stars = 1000
    this.starsMinDistanceValue = 3
    this.starsMaxDistanceValue = 20
    this.setStarsChors()
    this.setStarsGeometry()
    this.setStarsMaterial()
    this.setStarsMesh()
    this.addStars()
  }

  setStarsChors() {
    this.starsChors = new Float32Array(this.stars * 3)
    for (let i = 0; i < this.stars; i++) {
      let starVector3 = this.setStarVector3();
      starVector3.forEach((element, index) => this.starsChors[i * 3 + index] = element);
    }
  }

  setStarVector3() {
    let chors = []
    let randomDirectionVector = new THREE.Vector3().randomDirection();
    let randomRadius = Math.cbrt(this.starsMinDistanceValue**3+Math.random()*(this.starsMaxDistanceValue**3-this.starsMinDistanceValue**3));
    chors[0] = randomRadius * randomDirectionVector.x;
    chors[1] = randomRadius * randomDirectionVector.y;
    chors[2] = randomRadius * randomDirectionVector.z;
    return chors;
  }

  setStarsGeometry() {
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.starsChors, 3));
  }

  setStarsMaterial() {
    this.material = new THREE.PointsMaterial({
      size : 0.03,
      sizeAttenuation : true
    })
  }

  setStarsMesh() {
    this.starsMesh = new THREE.Points(this.geometry, this.material)
  }

  addStars() {
    this.scene.add(this.starsMesh)
  }

}