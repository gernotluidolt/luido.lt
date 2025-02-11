//import * as THREE from 'https://unpkg.com/three@0.152.0/build/three.module.js';

var angle = 0;

function init(){
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x19a8dc);

    var enableFog = false;

    if (enableFog){
        scene.fog = new THREE.FogExp2(0xccccff, 0.05);
    }
    
    var box = getBox(1,1,1)

    var plane = getPlane(20);
    plane.name = "plane1";
    plane.rotation.x = Math.PI / 2;

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('../assets/green-grass-texture.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
        plane.material.map = texture;
        plane.material.needsUpdate = true;
    });

    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;


    var light = getPointLight(1);
    var lightbulb = getSphere(0.05);
    light.add(lightbulb);
    light.position.y = 2;
    light.position.x = 2;
    light.position.z = 1;

    var sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 10, 7.5);
    sunLight.castShadow = true;
    scene.add(sunLight);

    scene.add(box);
    scene.add(plane);
    scene.add(light);

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

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("rgb(255,255,255)");

    document.getElementById("webgl").appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);

    return scene;
}

function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshPhongMaterial({
        color: "rgb(157, 77, 179)"
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
    angle += 0.01;
    var radius = 2;
    var light = scene.children.find(obj => obj.type === "PointLight");

    if (light) {
        light.position.x = radius * Math.cos(angle);
        light.position.z = radius * Math.sin(angle);
    }

    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    });
}


window.addEventListener('resize', function() {
 renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


init();
