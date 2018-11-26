/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
const loader = new THREE.GLTFLoader();
const mtlLoader = new THREE.MTLLoader();

function Door( passenger ) {
	this.mesh = new THREE.Object3D();
	this.group = new THREE.Object3D();
	
	this.init = () => {
		mtlLoader.setTexturePath('./objects/');
		mtlLoader.setPath('./objects/');
		mtlLoader.load('door.mtl', (materials) => {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('./objects/');
			objLoader.load('door.obj', (object) => {
				this.group.add( object );
			});
		});
	};
	this.group.scale.set( 0.7, 0.7, 0.7 );
	this.group.rotation.y = toRad(90);
	
	this.mesh.add( this.group );
	this.mesh.position.x = 0.76;
	this.mesh.position.y = 0.43;
	this.mesh.position.z = 0.83 * passenger;
	
	this.init();
}

function Hood() {
	this.mesh = new THREE.Object3D();
	this.group = new THREE.Object3D();
	
	this.init = () => {
		mtlLoader.setTexturePath('./objects/');
		mtlLoader.setPath('./objects/');
		mtlLoader.load('hood.mtl', (materials) => {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('./objects/');
			objLoader.load('hood.obj', (object) => {
				this.group.add( object );
			});
		});
		
		this.group.rotation.y = toRad(90);
		this.group.scale.set( 0.7, 0.7, 0.7 );
		
		this.mesh.add( this.group );
		this.mesh.position.x = 1.05;
		this.mesh.position.y = 0.65;
	};
	
	this.init();
}

function Trunk() {
	this.mesh = new THREE.Object3D();
	this.group = new THREE.Object3D();
	
	this.init = () => {
		mtlLoader.setTexturePath('./objects/');
		mtlLoader.setPath('./objects/');
		mtlLoader.load('trunk.mtl', (materials) => {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('./objects/');
			objLoader.load('trunk.obj', (object) => {
				this.group.add( object );
			});
		});
		this.group.rotation.y = toRad(90);
		this.group.scale.set( 0.7, 0.7, 0.7 );
		
		this.mesh.add( this.group );
		this.mesh.position.x = -1.63;
		this.mesh.position.y = 0.76;
	};
	
	this.init();
}

function Wheel() {
	this.mesh = new THREE.Object3D();
	
	this.init = () => {		
		loader.load( './wheel.glb', ( gltf ) => {
			this.mesh.add( gltf.scene );
		}, undefined, function ( error ) {
			console.error( error );
		} );
	};
	
	this.init();
}

function Body() {
	this.mesh = new THREE.Object3D();
	
	this.init = () => {		
		mtlLoader.setTexturePath('./objects/');
		mtlLoader.setPath('./objects/');
		mtlLoader.load('body.mtl', (materials) => {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('./objects/');
			objLoader.load('body.obj', (object) => {
				this.mesh.add( object );
			});
		});
		
		this.mesh.rotation.y = toRad(90);
		this.mesh.scale.set( 0.7, 0.7, 0.7 );
		this.mesh.position.x = -0.33;
		this.mesh.position.y = -0.27;
	};
	
	this.init();
}

function Car() {
	this.wheel_fr;
	this.wheel_fl;
	this.wheel_rr;
	this.wheel_rl;
	
	this.doorR;
	this.doorL;
	this.hood;
	this.trunk;
	this.drone;
	
	this.doorsClosed = true;
	this.doorsOpen = false;
	this.hoodClosed = true;
	this.hoodOpen = false;
	this.trunkClosed = true;
	this.trunkOpen = false;
	
	this.mesh = new THREE.Object3D();
	this.forwardAngle;	// Degrees
	this.steeringOffset;	// Degrees
	this.maxSteeringDelta;	// Degrees
	
	this.init = () => {
		let axisToAxis = 2.53;
		let wheelToWheel = 1.4;
		
		this.wheel_fr = new Wheel();
		this.mesh.add( this.wheel_fr.mesh );
		this.wheel_fr.mesh.rotation.y = toRad(180);
		this.wheel_fr.mesh.position.x = axisToAxis / 2;
		this.wheel_fr.mesh.position.z = wheelToWheel / 2;
		
		this.wheel_fl = new Wheel();
		this.mesh.add( this.wheel_fl.mesh );
		this.wheel_fl.mesh.position.x = axisToAxis / 2;
		this.wheel_fl.mesh.position.z = -wheelToWheel / 2;
		
		this.wheel_rr = new Wheel();
		this.mesh.add( this.wheel_rr.mesh );
		this.wheel_rr.mesh.rotation.y = toRad(180);
		this.wheel_rr.mesh.position.x = -axisToAxis / 2;
		this.wheel_rr.mesh.position.z = wheelToWheel / 2;
		
		this.wheel_rl = new Wheel();
		this.mesh.add( this.wheel_rl.mesh );
		this.wheel_rl.mesh.position.x = -axisToAxis / 2;
		this.wheel_rl.mesh.position.z = -wheelToWheel / 2;
		
		let b = new Body();
		this.mesh.add( b.mesh );
		
		this.hood = new Hood();
		this.mesh.add( this.hood.mesh );
		
		this.trunk = new Trunk();
		this.mesh.add( this.trunk.mesh );
		
		this.doorR = new Door( 1 );
		this.mesh.add( this.doorR.mesh );
		this.doorR.mesh.scale.set( 1, 1, -1 );
		
		this.doorL = new Door( -1 );
		this.mesh.add( this.doorL.mesh );
		
		this.drone = new Drone();
		this.mesh.add( this.drone.mesh );
		
		this.mesh.position.y = 0.33;
		this.forwardAngle = 0;
		this.steeringOffset = 0;
		this.maxSteeringDelta = 30;
	}
	
	this.goForward = (step) => {
		let wheelsDir = this.forwardAngle + this.steeringOffset;
		let dx = step * Math.cos(toRad(wheelsDir));
		let dz = step * Math.sin(toRad(wheelsDir));
		this.mesh.position.x += dx;
		this.mesh.position.z -= dz;
		
		let newRotation = toRad(this.steeringOffset * 0.5) * step;
		this.mesh.rotation.y += newRotation;
		this.forwardAngle = toDeg(this.mesh.rotation.y);
		
		this.wheel_fr.mesh.rotation.z += toRad(step * 60);
		this.wheel_fl.mesh.rotation.z -= toRad(step * 60);
		this.wheel_rr.mesh.rotation.z += toRad(step * 60);
		this.wheel_rl.mesh.rotation.z -= toRad(step * 60);
	};
	
	this.steer = (angle) => {
		if(Math.abs(this.steeringOffset + angle) <=
			Math.abs( this.maxSteeringDelta )) {
				this.steeringOffset = this.steeringOffset + angle;
				this.wheel_fr.mesh.rotation.y += toRad(angle);
				this.wheel_fl.mesh.rotation.y += toRad(angle);
		}
	};
	
	this.openDoors = () => {
		if(!this.doorsOpen) {
			this.doorL.mesh.rotation.y -= 0.1;
			this.doorR.mesh.rotation.y += 0.1;
			this.doorsClosed = false;
		}
		
		if(this.doorL.mesh.rotation.y <= -1 || this.doorR.mesh.rotation.y >= 1) {
			this.doorsOpen = true;
		}
	};
	
	this.closeDoors = () => {
		if(!this.doorsClosed) {
			this.doorL.mesh.rotation.y += 0.1;
			this.doorR.mesh.rotation.y -= 0.1;
			this.doorsOpen = false;
		}
		
		if(this.doorL.mesh.rotation.y >= 0.05 || this.doorR.mesh.rotation.y <= 0.05) {
			this.doorsClosed = true;
		}
	};
	
	this.openHood = () => {
		if(!this.hoodOpen) {
			this.hood.mesh.rotation.z += 0.1;
			this.hoodClosed = false;
		}
		
		if(this.hood.mesh.rotation.z >= 1)
			this.hoodOpen = true;
	};
	
	this.closeHood = () => {
		if(!this.hoodClosed) {
			this.hood.mesh.rotation.z -= 0.1;
			this.hoodOpen = false;
		}
		
		if(this.hood.mesh.rotation.z <= 0.05)
			this.hoodClosed = true;
	};
	
	this.openTrunk = () => {
		if(!this.trunkOpen) {
			this.trunk.mesh.rotation.z -= 0.1;
			this.trunkClosed = false;
		}
		
		if(this.trunk.mesh.rotation.z <= -1)
			this.trunkOpen = true;
	};
	
	this.closeTrunk = () => {
		if(!this.trunkClosed) {
			this.trunk.mesh.rotation.z += 0.1;
			this.trunkOpen = false;
		}
		
		if(this.trunk.mesh.rotation.z >= -0.05)
			this.trunkClosed = true;
	};
	
	this.animateDrone = () => {
		this.drone.animate();
	}
	
	this.toggleDrone = () => {
		if(this.droneActivated)
			this.drone.settle();
		else
			this.drone.activate();
		
		this.droneActivated = !this.droneActivated;
	};
	
	this.init();
}