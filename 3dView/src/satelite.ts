import type { Object3D } from "three";
import { THREE, GLTFLoader, DRACOLoader, Lights } from ".";
import type { GLTF, Group, Object3DEventMap } from ".";

export class Satelite {
    dracoLoader! : DRACOLoader
    scene : THREE.Scene
    GLTFLoader! : GLTFLoader
    satelite! : Object3D<Object3DEventMap>
    lightsClass! : Lights
    sateliteGroup! : THREE.Group
    sateliteOrbitRadius : number
    deltaSum : number

    constructor(scene : THREE.Scene) {
        this.scene = scene;
        this.sateliteOrbitRadius = 1
        this.deltaSum = 0
        this.setDracoLoader();
        this.loadModel();
    }

    setDracoLoader() {
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath('/draco/');
        this.dracoLoader.preload();
    }

    loadModel() {
        
        this.GLTFLoader = new GLTFLoader();
        this.GLTFLoader.setDRACOLoader(this.dracoLoader);
        this.GLTFLoader.load('/satelite.glb', (sceneData : GLTF) => this.addModelToScene(sceneData));
    }

    addModelToScene(GLTFScene : GLTF) {
        this.satelite = GLTFScene.scene.getObjectByName('satelite')!
        this.satelite.rotation.set(2, -.3, 2);
        this.sateliteGroup = new THREE.Group();
        this.sateliteGroup.add(GLTFScene.scene)
    
        this.sateliteGroup.scale.set(.005,.005,.005);
        this.scene.add(this.sateliteGroup);
    }

    changeModelPosition(delta : number) {
        this.deltaSum += delta * .3;
        let x = Math.cos(this.deltaSum) * this.sateliteOrbitRadius;
        let y = Math.cos(this.deltaSum) * this.sateliteOrbitRadius;
        let z = Math.sin(this.deltaSum) * this.sateliteOrbitRadius;

        if (this.sateliteGroup) {
            this.sateliteGroup.position.set(x, y, z);
            this.sateliteGroup.rotateX(delta * .3);
        }
    }
}