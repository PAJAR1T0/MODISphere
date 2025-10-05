import '../style.css';
import {THREE, Earth, Stars, Lights, Satelite, TimeLine } from './index';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class Main {
  app : HTMLElement
  width! : number
  height! : number
  camera! : THREE.Camera
  aspect! : number
  scene! : THREE.Scene
  renderer! : THREE.WebGLRenderer
  control! : OrbitControls
  domElement! : HTMLCanvasElement
  time! : THREE.Timer
  earth! : Earth
  stars! : Stars
  lights! : Lights
  satelite! : Satelite
  timeLine! : TimeLine
  logosDiv! : HTMLDivElement
  UNAQLogo! : HTMLImageElement
  NASALogo! : HTMLImageElement

  constructor() {
    this.app = document.getElementById('app')!;
    this.addLogos();
    this.SetWindowSizes();
    this.setUpdateTimer();
    this.setCamera();
    this.addscene();
    this.setRenderer();
    this.setControl();
    this.add3dElements();
    this.startAnimation();
    this.setTimeLine();
  }

  addLogos() {
    this.logosDiv = document.createElement('div');
    this.logosDiv.id = 'logosDiv';
    this.UNAQLogo = document.createElement('img');
    this.UNAQLogo.src = '/imagenes/UNAQ_Logo.png';
    this.logosDiv.appendChild(this.UNAQLogo);
    this.NASALogo = document.createElement('img');
    this.NASALogo.src = '/imagenes/NASA_Logo.svg';
    this.logosDiv.appendChild(this.NASALogo);
    this.app.appendChild(this.logosDiv);
  }

  setUpdateTimer() {
    if (!this.time) this.time = new THREE.Timer(); 
    this.time.update()
    return this.time.getDelta()
  }

  SetWindowSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width/this.height
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(70, this.aspect, 0.01, 20);
    this.camera.position.set(-0.31, -0.075, -1.97)
  }

  addscene() {
    this.scene = new THREE.Scene();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({antialias : true})
    this.renderer.setSize(this.width, this.height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1; 

    this.domElement = this.renderer.domElement
    
    this.app.appendChild(this.domElement);
  }

  setControl() {
    this.control = new OrbitControls(this.camera, this.domElement)
  }

  renderScene() {
     this.renderer.render(this.scene, this.camera)
     this.control.update();
  }

  startAnimation() {
    const loop = () => {
      const delta = this.setUpdateTimer();
      this.earth.rotate(delta);
      this.satelite.changeModelPosition(delta)

      this.renderScene();
      requestAnimationFrame(loop)
    }
    loop();
  }

  add3dElements() {
    this.earth = new Earth(this.scene, this.width, this.height);
    this.stars = new Stars(this.scene);
    this.lights = new Lights(this.scene, this.renderer);
    this.satelite = new Satelite(this.scene);
  }
 
  setTimeLine() {
    this.timeLine = new TimeLine(this.app, this.earth)
  }
}

const clase = new Main()