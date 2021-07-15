import { Component, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Color, DirectionalLight, HemisphereLight, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { animate } from '@angular/animations';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { PopoverComponent } from '../popover/popover.component';

const clickData: {[index: string]: any} = {
  'fuel': {
    paragraphText: 'Fuel Paragraph Text',
    titleText: 'Fuel Title',
    image: 'noImage.png'
  },
  'cargo': {
    paragraphText: 'Cargo Paragraph Text',
    titleText: 'Cargo Title',
    image: 'noImage.png'
  },
  'safety': {
    paragraphText: 'Safety Paragraph Text',
    titleText: 'Safety Title',
    image: 'noImage.png'
  },
  'differences': {
    paragraphText: 'Differences Paragraph Text',
    titleText: 'Differences Title',
    image: 'noImage.png'
  }
};

@Component({
  selector: 'app-blender-model',
  templateUrl: './blender-model.component.html',
  styleUrls: ['./blender-model.component.css']
})
export class BlenderModelComponent implements OnInit {

  paragraphText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies erat sem, at viverra sem aliquam sit amet. Phasellus accumsan sem at tempor aliquam. Phasellus porttitor, tellus vel iaculis ultrices, mi leo fringilla velit, eget volutpat magna eros a velit. Cras mi diam, condimentum at porttitor et, rhoncus a nibh. Mauris malesuada tortor non purus vulputate, vitae pharetra velit fringilla. Pellentesque quam tellus, tristique non rutrum non, sollicitudin quis turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin blandit convallis blandit. Aenean sollicitudin nisi at tellus rutrum pretium sed accumsan massa. Proin rhoncus sodales elementum. Ut quis porttitor sem. Curabitur volutpat varius leo. Donec pretium tellus tincidunt nisi tempor condimentum.';
  titleText = 'Test Title';
  image = 'noImage.png';

  percent = 0.0;
  scene: Scene = new THREE.Scene();;
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  raycaster = new THREE.Raycaster();

  @ViewChild("popover")
  popoverElement?: PopoverComponent;
  
  constructor() { }

  ngOnInit(): void {
    document.addEventListener('mousedown', this.onMouseDown, false);
    var startTime	= Date.now();
    this.scene.background = new Color('skyblue');

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(this.camera, renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);

    const color = 0xFFFFFF;
    const intensity = 1;
    const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(20, 50, -400);
    light2.target.position.set(-5, 0, 0);
    this.scene.add(light2);
    this.scene.add(light2.target);


    const loader = new GLTFLoader();

    loader.load('../assets/UPSPlane.glb', (gltf) => {

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.metalness = 0;
        }
      });

      this.scene.add(gltf.scene);

    }, (event) => {
      this.percent = (event.loaded / event.total) * 100;
    }, (error) => {
      console.error(error);
    });

    const geometry = new THREE.BoxGeometry( 3, 3, 3);
    const material = new THREE.MeshBasicMaterial( {color: 0x2DBC46} );
    const fuelcube = new THREE.Mesh( geometry, material );
    fuelcube.position.x = 30;
    fuelcube.position.y = 8;
    fuelcube.position.z = 5;
    fuelcube.name = 'fuel';
    this.scene.add( fuelcube );

    const cargocube = new THREE.Mesh( geometry, material );
    cargocube.position.x = 10;
    cargocube.position.y = 7;
    cargocube.position.z = 50;
    cargocube.name = 'cargo';
    this.scene.add( cargocube );

    const saftycube = new THREE.Mesh( geometry, material );
    saftycube.position.x = -10;
    saftycube.position.y = 18;
    saftycube.position.z = 60;
    saftycube.name = 'safety'
    this.scene.add( saftycube );

    const differencescube = new THREE.Mesh( geometry, material );
    differencescube.position.x = -7;
    differencescube.position.y = 24;
    differencescube.position.z = -40;
    differencescube.name = 'differences';
    this.scene.add( differencescube );

    this.camera.position.set(-100, 100, 100);

    renderer.render(this.scene, this.camera);

    const render = () => {

      // make the cube bounce
      var dtime	= Date.now() - startTime;
      cargocube.scale.x	= 1.0 + 0.15*Math.sin(dtime/300);
      cargocube.scale.y	= 1.0 + 0.15*Math.sin(dtime/300);
      cargocube.scale.z	= 1.0 + 0.15*Math.sin(dtime/300);

      fuelcube.scale.x	= 1.0 + 0.15*Math.sin(dtime/300);
      fuelcube.scale.y	= 1.0 + 0.15*Math.sin(dtime/300);
      fuelcube.scale.z	= 1.0 + 0.15*Math.sin(dtime/300);

      saftycube.scale.x	= 1.0 + 0.15*Math.sin(dtime/300);
      saftycube.scale.y	= 1.0 + 0.15*Math.sin(dtime/300);
      saftycube.scale.z	= 1.0 + 0.15*Math.sin(dtime/300);

      differencescube.scale.x	= 1.0 + 0.15*Math.sin(dtime/300);
      differencescube.scale.y	= 1.0 + 0.15*Math.sin(dtime/300);
      differencescube.scale.z	= 1.0 + 0.15*Math.sin(dtime/300);

      // actually display the scene in the Dom element
      renderer.render(this.scene, this.camera );
    }
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      //renderer.render(scene, camera);
      render();
    }
    animate();
  }

  onMouseDown = (event: any) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = - (event.clientY / window.innerHeight) * 2 + 1;

    const pointer = new THREE.Vector2(x, y);

    this.raycaster.setFromCamera(pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
    if (intersects.length > 0) {
      const data = clickData[intersects[0].object.name];
      if (data) {
        this.titleText = data.titleText;
        this.paragraphText = data.paragraphText;
        this.image = data.image;
        if (this.popoverElement) {
          this.popoverElement.showPopover();
        }
      }
    }
  }

}
