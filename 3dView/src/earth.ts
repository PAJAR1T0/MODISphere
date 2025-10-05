import { THREE } from "./index"

export class Earth {
  scene : THREE.Scene
  geometry! : THREE.SphereGeometry
  material! : THREE.MeshStandardMaterial
  mesh! : THREE.Mesh
  day : number
  month : number
  year : number
  width : number
  height : number
  canvas! : HTMLCanvasElement
  ctx! : CanvasRenderingContext2D
  canvastexture! : THREE.CanvasTexture


  constructor(scene : THREE.Scene, width : number, height: number) {
    this.scene = scene
    this.day = 4;
    this.month = 10;
    this.year = 2020;
    this.width = width;
    this.height = height;
    this.setCanvas();
    this.setMaterial();
    this.setGeometry();
    this.addEarth();
  }

  updateWidthHeight(width : number, height : number) {
    this.width = width;
    this.height = height;
  }

  setCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height * .8;
    this.ctx = this.canvas.getContext('2d')!;
  }

  setURL(day: number, month : number, year : number) {
    let dayString = String(day).padStart(2, "0")
    let monthString = String(month).padStart(2, "0")
    let yearString = String(year)


    const url = 
    `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?` +
    `SERVICE=WMS` +
    `&VERSION=1.3.0` +
    `&REQUEST=GetMap` +
    `&LAYERS=MODIS_Terra_CorrectedReflectance_TrueColor` +
    `&TIME=${yearString}-${monthString}-${dayString}` +
    `&CRS=EPSG:4326&BBOX=-90,-180,90,180` +
    `&WIDTH=${this.width}` +
    `&HEIGHT=${this.height}` +
    `&FORMAT=image/jpeg`;
    this.getTextureImage(url);
  }

  getTextureImage(url : string) {
    fetch(url).then(data => {
      if (!data.ok) {
        throw new Error(`Ha sucedido el siguiente error: ${data.status}`)
      }
      return data.blob()
    }).then(async img => {
      const imageFixed = await createImageBitmap(img, 0, 0, this.width, this.height * .8)
      this.ctx?.drawImage(imageFixed, 0, 0)
      this.material.wireframe = false
      this.updatetexture()
    });
  }

  setMaterial() {
    if (!this.material) this.material = new THREE.MeshStandardMaterial({wireframe : true, color : 'white', roughness : 1, metalness : 0});
  }

  updatetexture() {
    this.canvastexture = new THREE.CanvasTexture(this.canvas);
    this.material.map = this.canvastexture;
    this.material.needsUpdate = true;
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(1, 50, 50)
  }

  addEarth() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  rotate(deltaTime : number) {
    this.mesh.rotateY(deltaTime * .01);
  }
}