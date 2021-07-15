import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Color, DirectionalLight, HemisphereLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-blender-model',
  templateUrl: './blender-model.component.html',
  styleUrls: ['./blender-model.component.css']
})
export class BlenderModelComponent implements OnInit {

  paragraphText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies erat sem, at viverra sem aliquam sit amet. Phasellus accumsan sem at tempor aliquam. Phasellus porttitor, tellus vel iaculis ultrices, mi leo fringilla velit, eget volutpat magna eros a velit. Cras mi diam, condimentum at porttitor et, rhoncus a nibh. Mauris malesuada tortor non purus vulputate, vitae pharetra velit fringilla. Pellentesque quam tellus, tristique non rutrum non, sollicitudin quis turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin blandit convallis blandit. Aenean sollicitudin nisi at tellus rutrum pretium sed accumsan massa. Proin rhoncus sodales elementum. Ut quis porttitor sem. Curabitur volutpat varius leo. Donec pretium tellus tincidunt nisi tempor condimentum.';
  titleText = 'Test Title';

  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    scene.background = new Color('white');
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // const material = new THREE.MeshBasicMaterial({color: 0x00ffaa});

    const loader = new GLTFLoader();
    
    loader.load('../assets/UPSPlane.glb', (gltf) => {

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.metalness = 0;
        }
      });
      
      scene.add(gltf.scene);
    
    }, (event) => {
      console.log(event)
    }, (error) => {
      console.error(error);
    });

    camera.position.set(-100, 100, 100);

    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

}
