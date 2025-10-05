import { THREE } from "./index"

export class Lights {
  directionalLight! : THREE.DirectionalLight
  directionalLightIntensity : number
  directionalLightPosition : THREE.Vector3
  ambientLight! : THREE.AmbientLight
  ambientLightIntensity! : number
  lightsColor : string
  scene : THREE.Scene
  cubeRenderTarget! : THREE.WebGLCubeRenderTarget
  cubeRenderTargetSize : number
  cubeCamera! : THREE.CubeCamera
  renderer : THREE.WebGLRenderer

  constructor(scene : THREE.Scene, renderer : THREE.WebGLRenderer) {
    this.scene = scene
    this.renderer = renderer
    this.lightsColor = 'white'
    this.directionalLightIntensity = 1.5
    this.directionalLightPosition = new THREE.Vector3(-5, 0, 0)
    this.ambientLightIntensity = .5
    this.cubeRenderTargetSize = 256
    this.setDirectionalLight();
    this.setAmbientLight();
    this.addLights();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(this.lightsColor, this.ambientLightIntensity)
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight(this.lightsColor, this.directionalLightIntensity);
    this.directionalLight.position.copy(this.directionalLightPosition);
  }

  addLights() {
    this.scene.add(this.directionalLight, this.ambientLight)
  }

}