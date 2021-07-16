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
    paragraphText: 'These planes take a lot of fuel in order to fly in the air! They have a fuel capacity of 38,615 gallons. The fueling panels are inside the wings. The tank fills up and is connected in order to even out the weight of the fuel among the plane.',
    titleText: 'Fuel',
    image: 'fuel.png'
  },
  'cargo': {
    paragraphText: 'It is important to understand the different lengths of the plane in order to maneuver around it.\nThe plane is 202 feet long, as well as having a wingspan of 169’ 10’’.\nThe total area of the wing amounts to 3,648 feet.\nManually opening the door requires two people. One must open the hatch below the plane and the other has to pull the hatch in the middle of the plane to open up the side cargo door. The plane can also be loaded from the front',
    titleText: 'Cargo',
    image: 'cargo.png'
  },
  'safety': {
    paragraphText: 'Make sure to know the safety protocols. From the cockpit it can be hard to see what is directly behind the plane as well as on top of the plane.  Know where the oxygen masks are. There are extra masks behind the pilot seats just in case. You can open the pilot windows with a handle crank and use ropes to get down in case of an emergency. There is a first aid kit to the left of the pilot seat.',
    titleText: 'Safety',
    image: 'safty.png'
  },
  'differences': {
    paragraphText: 'There are many differences between the passenger plane and the freight plane. Here is a list of some of the many differences.\nThe Passenger plane has no lower or main cargo, while the freight plan has both. \nThe passenger plane has a much larger max range with up to 8,225nm, while for the freight it is only 4,450nm.  \nThe freights max weight is 630,500 lbs while the max weight of the passenger plane varies from 602,500 - 630,500 lbs',
    titleText: 'Differences',
    image: 'differences.png'
  },
  'info': {
    paragraphText: "MD-11 Aircraft Specifications" + "/n" +  "Length – 202’’ Wingspan- 169’ 10’’    Wing Area- 3,648ft^2Height- 57’11’’ Fuel Capacity- 38,615 Top Speed - 587 MPH",
    titleText: 'Information',
    image: 'info.png'
  },
  'apu': {
    paragraphText: 'The auxiliary power unit provides additional energy for functions on the aircraft. The APU creates power to operate the galley and cockpit electrics and also can heat or cool the aircraft all while being parked at the gate.The APU is important because it saves fuel as the aircraft engine does not need to be operating in order for there to be power on the aircraft.',
    titleText: 'APU',
    image: 'apu.png'
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
    differencescube.position.z = -30;
    differencescube.name = 'differences';
    this.scene.add( differencescube );

    const infocube = new THREE.Mesh( geometry, material );
    infocube.position.x = 0;
    infocube.position.y = 25;
    infocube.position.z = 30;
    infocube.name = 'info';
    this.scene.add( infocube );

    const apucube = new THREE.Mesh( geometry, material );
    apucube.position.x = -2;
    apucube.position.y = 2;
    apucube.position.z = -45;
    apucube.name = 'apu';
    this.scene.add( apucube );

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

      infocube.scale.x	= 1.0 + 0.15*Math.sin(dtime/300);
      infocube.scale.y	= 1.0 + 0.15*Math.sin(dtime/300);
      infocube.scale.z	= 1.0 + 0.15*Math.sin(dtime/300);

      apucube.scale.x	= 1.0 + 0.15*Math.sin(dtime/300);
      apucube.scale.y	= 1.0 + 0.15*Math.sin(dtime/300);
      apucube.scale.z	= 1.0 + 0.15*Math.sin(dtime/300);

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
