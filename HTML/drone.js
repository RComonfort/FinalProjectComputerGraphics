/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
const loader2 = new THREE.GLTFLoader();
const mtlLoader2 = new THREE.MTLLoader();

//	Import propeller and scale
function Propeller() {
	this.mesh = new THREE.Object3D();
	this.group = new THREE.Object3D();
	
	this.init = () => {
		mtlLoader2.setTexturePath('./objects/');
		mtlLoader2.setPath('./objects/');
		mtlLoader2.load('propeller.mtl', (materials) => {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('./objects/');
			objLoader.load('propeller.obj', (object) => {
				this.group.add( object );
			});
		});
		
		this.group.rotation.z = toRad(-90);
		this.group.scale.set( 0.1, 0.1, 0.1);
		this.mesh.add( this.group );
	};
	
	this.init();
}

//	Import drone body and attach propellers
function Drone() {
	this.mesh = new THREE.Object3D();
	this.group = new THREE.Object3D();
	this.activated;	// Control flag
	this.onBottom = true;	// Control flag
	
	this.propL;
	this.propR;
	
	this.init = () => {
		loader2.load( './drone.glb', ( gltf ) => {
			this.group.add( gltf.scene );
		}, undefined, function ( error ) {
			console.error( error );
		} );
		
		this.group.rotation.y = toRad(90);
		this.group.scale.set( 0.8, 0.8, 0.8 );
		this.mesh.add( this.group );
		this.mesh.position.y = 1.15;
		
		this.propL = new Propeller();
		this.mesh.add( this.propL.mesh );
		this.propL.mesh.position.z -= 0.2;
		
		this.propR = new Propeller();
		this.mesh.add( this.propR.mesh );
		this.propR.mesh.position.z += 0.2;
	};
	
	//	Animate propellers if required,
	//	update height if required
	this.animate = () => {
		if(this.activated && !this.onTop) {
			this.mesh.position.y += 0.02;
			
			if(this.mesh.position.y >= 3)
			this.onTop = true;
		}
		
		if(!this.activated && this.onTop) {
			this.mesh.position.y -= 0.02;
			
			if(this.mesh.position.y <= 1.15)
				this.onTop = false;
		}
		
		if(this.mesh.position.y <= 1.15)
			this.onBottom = true;
		else
			this.onBottom = false;	
				
		if(!this.onBottom) {
			this.propL.mesh.rotation.y += toRad(15);
			this.propR.mesh.rotation.y += toRad(15);
		}
	};
	
	//	Activate the drone
	this.activate = () => {
		this.activated = true;
	};
	
	//	Re-attach the drone
	this.settle = () => {
		this.activated = false;
	};
	
	this.init();
}