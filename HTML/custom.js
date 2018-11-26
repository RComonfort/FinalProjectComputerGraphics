/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/

//	*************************************
//	GLOBAL VARIABLES
//	*************************************
let scene, camera, renderer;
let car, park;

//	*************************************
//	WORLD CREATION
//	*************************************

//	Add custom objects to the world
let addWorldObjects = () => {
	car = new Car();
	car.mesh.scale.set( 1, 1, 1 );
	car.mesh.position.set( 70, 0, 5 );
	car.mesh.rotation.y = toRad(-160);
	scene.add( car.mesh );
	
	createITESM(scene);
	park = new AmusementPark(scene);
}

//	Add light points to the scene
let addLights = () => {
	var front = new THREE.DirectionalLight( 0xffffff, .05 );
	front.position.set(-10, 1000, 1500);
	front.rotation.x += THREE.Math.degToRad(30);
	front.rotation.y += THREE.Math.degToRad(35);
	scene.add(front);
	front.castShadow = true;
	front.shadow.camera.near = 1.0;

	var right = new THREE.DirectionalLight( 0xffffff, .8 );
	right.position.set(-1030, 1000, 1500);
	right.rotation.y += THREE.Math.degToRad(90);
	scene.add(right);

	var left = new THREE.DirectionalLight( 0xffffff, .7 );
	left.position.set(1030, 1000, 1500);
	left.rotation.y += THREE.Math.degToRad(90);
	scene.add(left);

	var back = new THREE.DirectionalLight( 0xffffff,.75  );
	back.position.set(-10, 1000, -1500); 
	back.rotation.x -= THREE.Math.degToRad(30);
	back.rotation.y -= THREE.Math.degToRad(35);
	scene.add(back);
}

//	Initialize the scene
let init = () => {
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.5, 500 );
	camera.position.x = 105;
	camera.position.y = 17;
	camera.position.z = 41;
	camera.rotation.y = 0.79;
	
	addWorldObjects();
	addLights();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x2a313d, 1); // set the background color
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'keydown', keyDownController, true );
	
	renderer.shadowMap.enabled = true;
};

//	Animate the scene
let animate = () => {
	requestAnimationFrame( animate );
	car.animateDrone();
	park.animate();
	renderer.render( scene, camera );
};

//	*************************************
//	CONTROLLER
//	*************************************

//	Controller for key events
let keyDownController = (evt) => {
	switch ( evt.keyCode ) {
		case 38:	// Up arrow
			goForward(1);
			break;
		case 40:	// Down arrow
			goForward(-1);
			break;
		case 37:	// Left arrow
			rotateCamera(5);
			break;
		case 39:	// Right arrow
			rotateCamera(-5);
			break;
		case 87:	// w
			elevateCamera(0.5);
			break;
		case 83:	// s
			elevateCamera(-0.5);
			break;
		case 65:	// a
			moveHorizontally(0.5);
			break;
		case 68:	// d
			moveHorizontally(-0.5);
			break;
		
		case 84:	// t
			car.goForward(0.5);
			break;
		case 71:	// g
			car.goForward(-0.2);
			break;
		case 72:	// h
			car.steer(5);
			break;
		case 70:	// f
			car.steer(-5);
			break;
		case 85:	// u
			car.openDoors();
			break;
		case 74:	// j
			car.closeDoors();
			break;
		case 89:	// y
			car.openHood();
			break;
		case 82:	// r
			car.closeHood();
			break;
		case 86:	// v
			car.openTrunk();
			break;
		case 66:	// b
			car.closeTrunk();
			break;
		case 88:	// x
			car.toggleDrone();
			break;
		default:
//			console.log(`Pressed key ${evt.keyCode}`);
			break;
	}
};

// Rotate the camera on y axis
let rotateCamera = (degrees) => {
	camera.rotation.y += toRad(degrees);
};

// Make the camera go forward
let goForward = (distance) => {
	let alpha = camera.rotation.y;
	let sinA = Math.sin(alpha);
	let cosA = Math.cos(alpha);
	
	camera.position.x -= sinA * distance;
	camera.position.z -= cosA * distance;
};

//	Move the camera horizontally from its viewing direction
let moveHorizontally = (distance) => {
	let alpha = toRad(90) - camera.rotation.y;
	let sinA = Math.sin(alpha);
	let cosA = Math.cos(alpha);
	
	camera.position.x -= sinA * distance;
	camera.position.z += cosA * distance;
}

//	Vertical translation of the camera
let elevateCamera = (elevation) => {
	camera.position.y += elevation;
};

//	*************************************
//	BOOTSTRAP
//	*************************************

//	Bootstrap the element
init();
animate();