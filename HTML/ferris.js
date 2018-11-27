/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/

//	Create capsule
//	baseRadius	Radius of the capsule
//	jointRadius	Radius of the capsule joint ring
//	material	Material to apply to the capsule
function Capsule(baseRadius, jointRadius, material) {
	this.mesh = new THREE.Object3D();
	
	this.jointRadius = jointRadius;
	this.baseRadius = baseRadius;
	this.material = material ? material : whiteMetallicSheet;
	
	//	Initialization
	let geom = new THREE.TorusGeometry(
		jointRadius * (5 / 4),
		jointRadius / 4,
		8,
		24
	);
	let joint = new THREE.Mesh( geom, aluminium );
	
	geom = new THREE.TorusGeometry(
		baseRadius * (15 / 16),
		baseRadius / 16,
		8,
		24,
		Math.PI
	);
	let handle = new THREE.Mesh( geom, aluminium );
	handle.rotation.y = Math.PI / 2;
	handle.position.y -= baseRadius;
	handle.position.y -= jointRadius * (5 / 4);
	
	geom = new THREE.SphereGeometry(
		baseRadius,
		16,
		16,
		0,
		2 * Math.PI,
		Math.PI / 2,
		Math.PI / 2
	);
	let base = new THREE.Mesh( geom, this.material );
	base.position.y -= baseRadius;
	base.position.y -= jointRadius * (5 / 4);
	
	this.mesh.add( joint );
	this.mesh.add( handle );
	this.mesh.add( base );
}

//	Create the ferris wheel
//	radius		Wheel radius
//	capsules	Amount of capsules in the wheel
//	tubeRadius	Tube radius of the wheel structure
//	ringToRing	Distance in between wheel rings
function FerrisWheelSlim(radius, capsules, tubeRadius, ringToRing) {
	this.mesh = new THREE.Object3D();
	this.wheel;
	this.capsulesArr;
	this.ridableGroup;
	this.base;
	this.baseHeight;
	
	this.radius = radius;
	this.capsules = capsules;
	this.tubeRadius = tubeRadius;
	this.ringToRing = ringToRing;
	this.supportLength = ringToRing * 0.2;
	
	this.createFixingTube = (angle) => {
		geom = new THREE.CylinderGeometry(
			tubeRadius,
			tubeRadius,
			ringToRing,
			16,
			8
		);
		let fixingTube = new THREE.Mesh( geom, whiteMetallicSheet );
		fixingTube.rotation.x = Math.PI / 2;
		fixingTube.position.x = radius * Math.cos(toRad(angle));
		fixingTube.position.y = radius * Math.sin(toRad(angle));
		
		return fixingTube;
	};
	
	this.createRadialTube = (angle, material) => {
		let joinableGroup = new THREE.Object3D();
		geom = new THREE.CylinderGeometry(
			tubeRadius / 2,
			tubeRadius / 3,
			radius,
			16,
			8
		);
		let radialTube = new THREE.Mesh( geom, material );
		radialTube.rotation.z = Math.PI / 2;
		radialTube.position.x = radius / 2;
		joinableGroup.add( radialTube );
		joinableGroup.rotation.z = toRad( angle );
		
		return joinableGroup;
	};
	
	this.createWheel = () => {
		let ringGroup = new THREE.Object3D();
		let wheelGroup = new THREE.Object3D();
		
		let geom = new THREE.TorusGeometry(
			radius,
			tubeRadius,
			8,
			capsules * 3
		);
		let ring = new THREE.Mesh( geom, whiteMetallicSheet );
		
		ringGroup.add( ring );
		for(let i = 0; i < 2 * capsules; i++) {
			let angle = (i * 360) / (2 * capsules);
			ringGroup.add( this.createRadialTube(angle, psycho) );
		}
		
		let rearRingGroup = ringGroup.clone();
		ringGroup.position.z = ringToRing / 2;
		rearRingGroup.position.z = - ringToRing / 2;
		
		geom = new THREE.CylinderGeometry(
			tubeRadius,
			tubeRadius,
			ringToRing + 2 * this.supportLength,
			16,
			8
		);
		let centralAxis = new THREE.Mesh( geom, aviationAl );
		centralAxis.rotation.x = Math.PI / 2;
		
		wheelGroup.add( ringGroup );
		wheelGroup.add( rearRingGroup );
		wheelGroup.add( centralAxis );
		for(let i = 0; i < capsules; i++) {
			wheelGroup.add( this.createFixingTube(i * 360 / capsules) );
		}
		
		return wheelGroup;
	};
	
	this.createBase = () => {
		let baseGroup = new THREE.Object3D();
		let supportGroup = new THREE.Object3D();
		let tubeLength = this.radius * 1.5;
		this.baseHeight = tubeLength * Math.sin(toRad(60));
		
		let geom = new THREE.CylinderGeometry(
			this.tubeRadius * 1.2,
			this.tubeRadius * 1.2,
			tubeLength,
			16,
			8
		);
		let tube = new THREE.Mesh( geom, whiteMetallicSheet );
		tube.position.y = -tubeLength / 2;
		supportGroup.add( tube );
		let supportGroup2 = supportGroup.clone();
		let supportGroup3 = supportGroup.clone();
		let supportGroup4 = supportGroup.clone();
		supportGroup.rotation.z = toRad(30);
		supportGroup.rotation.y = toRad(-30);
		supportGroup.position.z += this.ringToRing / 2;
		supportGroup.position.z += this.tubeRadius * 1.5;
		supportGroup.position.y = this.baseHeight;
		
		supportGroup2.rotation.z = toRad(-30);
		supportGroup2.rotation.y = toRad(30);
		supportGroup2.position.z += this.ringToRing / 2;
		supportGroup2.position.z += this.tubeRadius * 1.5;
		supportGroup2.position.y = this.baseHeight;
		
		supportGroup3.rotation.z = toRad(30);
		supportGroup3.rotation.y = toRad(30);
		supportGroup3.position.z -= this.ringToRing / 2;
		supportGroup3.position.z -= this.tubeRadius * 1.5;
		supportGroup3.position.y = this.baseHeight;
		
		supportGroup4.rotation.z = toRad(-30);
		supportGroup4.rotation.y = toRad(-30);
		supportGroup4.position.z -= this.ringToRing / 2;
		supportGroup4.position.z -= this.tubeRadius * 1.5;
		supportGroup4.position.y = this.baseHeight;
		
		baseGroup.add( supportGroup );
		baseGroup.add( supportGroup2 );
		baseGroup.add( supportGroup3 );
		baseGroup.add( supportGroup4 );
		return baseGroup;
	};
	
	this.rotate = (angle) => {
		this.ridableGroup.rotation.z += toRad(angle);
		this.capsulesArr.forEach((element) => {
			element.rotation.z -= toRad(angle);
		});
	};
	
	this.wheel = this.createWheel();
	this.ridableGroup = new THREE.Object3D();
	this.ridableGroup.add( this.wheel );
	
	this.capsulesArr = [];
	for(let i = 0; i < capsules; i++) {
		this.capsulesArr.push(new Capsule(ringToRing * 0.4, tubeRadius,
			redSteel).mesh);
		this.ridableGroup.add( this.capsulesArr[i] );
		
		let angle = i * 360 / capsules;
		this.capsulesArr[i].position.x = radius * Math.cos(toRad(angle));
		this.capsulesArr[i].position.y = radius * Math.sin(toRad(angle));
	}
	
	let base = this.createBase();
	this.ridableGroup.position.y = this.baseHeight;
	
	this.mesh.add( this.ridableGroup );
	this.mesh.add( base );
}