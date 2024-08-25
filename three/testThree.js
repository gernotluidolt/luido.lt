//import * as THREE from 'https://unpkg.com/three@0.152.0/build/three.module.js';

function init(){
    // Set up the scene, basically the world
    var scene = new THREE.Scene();
    var gui = new dat.GUI();

    var enableFog = false;

    if (enableFog){
        scene.fog = new THREE.FogExp2(0xFFFFFF, 0.2)
    }
    
    var box = getBox(1,1,1)
    var plane =getPlane(20);

    plane.name = "plane1"

    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;


    var light = getPointLight(1);
    var lightbulb = getSphere(0.05);
    light.add(lightbulb);
    light.position.y = 2;

    gui.add(light, "intensity", 0,10);
    gui.add(light.position, "y", box.geometry.parameters.height,5);
    gui.add(light.position, "x", -5,5);
    gui.add(light.position, "z", -5,5);

    scene.add(box);
    scene.add(plane);
    scene.add(light);

    // Set up camera
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    camera.lookAt(new THREE.Vector3(0,0,0));

    // renderer to convert 3d data into 2d image
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("rgb(255,255,255)");

    // embed renderer in DOM
    document.getElementById("webgl").appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}

function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshPhongMaterial({
        color: "rgb(120,120,120)"
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.castShadow = true;

    return mesh
}

function getSphere(r){
    var geometry = new THREE.SphereGeometry(r, 24, 24);
    var material = new THREE.MeshBasicMaterial({
        color: "rgb(255,0,0)"
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh
}

function getPlane(size){
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: "rgb(120,120,120)",
        side: THREE.DoubleSide
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.receiveShadow = true;

    return mesh
}

function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light
}


function update(renderer, scene, camera, controls){
    renderer.render(
        scene,
        camera
    );

    controls.update();

    
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    })
}

window.addEventListener('resize', function() {
 renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


init();