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

  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    scene.background = new Color('white');
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const material = new THREE.MeshBasicMaterial({color: 0x00ffaa});

    const loader = new GLTFLoader();
    
    loader.load('../assets/untitled.glb', (gltf) => {

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
      
      scene.add(gltf.scene);
    
    }, undefined, (error) => {
      console.error(error);
    });

    camera.position.set(-1.5, 1.5, 6.5);

    renderer.render(scene, camera);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

}
