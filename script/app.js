/*

    4 things needed to get going with Three.js:

    1. Scene
    2. Camera
    3. Renderer
    4. Set up function - init. Call render function within it
    5. animation - request animation frame API. Call within a render function but within the requestAnimationFrame function's callback

    When creating a shape, for it to be seen you need light - just like in real life.
    For shadows enable shadow maps - it is a renderer objects method. Then in our liht object we want to cast the shadow. 
    Also, we can give near and far shadow values for the camera all within the light object.
    We need an object to recieve the shadows as well - a plane for instance. So the object has a methos called - recieveShadow for us to use.
    We also have to tell our shape to cast the shadow, only then will the plane for example recieve the shadow: sphere.castShadow = true;

*/ 

let scene,
    camera,
    renderer,
    num = 30, // 30 particles
    objects = [],
    raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2(),
    light, 
    tetrahedron;

function createCamera(){

    camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5);

    console.log("from camera, tet is: " + tetrahedron);

}    

function createRenderer(){

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    console.log("from renderer, camera is: " + camera);


}

function createLight(){

    let spotlight = new THREE.SpotLight( 0xccddff, 0.8 );
    spotlight.position.set( 0, 0, 5 );

    scene.add(spotlight);

}

function createMaterial(image, shape, metalness, roughness){

    let texture = new THREE.TextureLoader().load(image),
    material;

    if(shape === "tetrahedron"){

        let envMap = new THREE.CubeTextureLoader()
        .setPath("../assets/images/")
        .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg",
            "pz.jpg", "nz.jpg"]);

        material = new THREE.MeshPhysicalMaterial({
        map: texture, envMap: envMap,
        metalness: metalness, roughness: roughness
    });

       
    }else{

        texture.wrapS = texture.wrapT = texture.RepeatWrapping;
        texture.repeat.set(12, 12);
        
        material = new THREE.MeshPhysicalMaterial({
            map: texture, bumpMap: texture});

    }

    return material;   

}

function createGround(){

    let groundGeometry = new THREE.PlaneGeometry(40, 40),
        groundMaterial = createMaterial("../assets/images/stone.jpg"),
        ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.z = Math.PI/180 * -45;
        ground.rotation.x = Math.PI/180 * -90;
        ground.position.y = -2.0;

    scene.add(ground);    

}

function createShape(){

    let geometry = new THREE.TetrahedronBufferGeometry(2, 0),
        material = createMaterial("../assets/images/rock_01_diffusion.jpg", "tetrahedron", 1.0, 0),
        tetrahedron = new THREE.Mesh(geometry, material);

    tetrahedron.rotation.x = Math.PI/180 * -10;
    camera.lookAt(tetrahedron.position);

    scene.add(tetrahedron);

    console.log("from createShape, tet is: " + tetrahedron);

}


function init(){

    scene = new THREE.Scene();
    
    createCamera();
    createRenderer();
    createLight();
    createGround();
    createShape();

    console.log("from init, tet is: " + tetrahedron); // undefined..

    render();

}

function render(){

    requestAnimationFrame(render);

    renderer.render(scene, camera);
    // camera.rotation.y -= 0.005;

}

init();



    