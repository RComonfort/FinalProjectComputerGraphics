//Rafael Antonio Comonfort Viveros A01324276

function Cafeteria() {
	this.object3D = this.makeCafeteria();
}

Cafeteria.prototype.makeCafeteria = function() {

    //Materials 
    var glassMat = new THREE.MeshPhongMaterial ({ 
        color: 0x19c1a8, 
        specular: 0x555555,
        transparent: true, 
        opacity: 0.3,                             
		shininess: 20,
		side: THREE.DoubleSide
	});
	var concreteMat = new THREE.MeshLambertMaterial ({ 
		color: 0xbabcbc,
		side: THREE.DoubleSide,
		polygonOffset: true,
        polygonOffsetFactor: 0.05
	});
	var waterProofMat = new THREE.MeshLambertMaterial ({ 
		color: 0xaa2001,
		side: THREE.DoubleSide,
		polygonOffset: true,
        polygonOffsetFactor: -0.01
	});
	var ringMat = new THREE.MeshLambertMaterial ({ 
		color: 0xffffff,
		side: THREE.DoubleSide,
		wireframe: true
	});
	var floorMat = new THREE.MeshLambertMaterial ({ 
		color: 0xd16f00,
		side: THREE.DoubleSide
	});
	
	
	//Measures
	let cafeteriaRadius = 20;
	let cafeteriaHeight = 5;
	let outerRadius = cafeteriaRadius * 1.2;
	let thetaLength = THREE.Math.degToRad(230);
	let middleRadius = cafeteriaRadius / 2;
	let middleHeight = cafeteriaHeight; 
	let topRadius = middleRadius / 3;
	let topHeight = middleHeight / 2;

	let complementTheta = 2 * Math.PI - thetaLength;
	let wallY = cafeteriaHeight * 2;
	let wallX = 0.005;
	let wallZ = outerRadius - cafeteriaRadius;

	//Geometries
	let firstFloorGeom = new THREE.CylinderGeometry(cafeteriaRadius, cafeteriaRadius, cafeteriaHeight, 16, 1, true, 0, thetaLength);
	let middleGeom = new THREE.CylinderGeometry(middleRadius, middleRadius, middleHeight, 16, 1, true);
	let topGeom = new THREE.CylinderGeometry(topRadius, topRadius, topHeight, 16, 1, true);
	let ringGeom = new THREE.RingGeometry(cafeteriaRadius, outerRadius, 10, 6, -complementTheta - .17, thetaLength);
	let floorGeom = new THREE.CircleGeometry(outerRadius, 32);

	let mainHoodGeom = new THREE.CircleGeometry(cafeteriaRadius, 32);
	let middleHoodGeom = new THREE.CircleGeometry(middleRadius, 32);
	let topHoodGeom = new THREE.CircleGeometry(topRadius, 32);
	let complementGeom = new THREE.CylinderGeometry(outerRadius, outerRadius, 3 * cafeteriaHeight, 32, 4, false, - complementTheta, complementTheta);
	let wallGeom = new THREE.BoxGeometry(wallX, wallY, wallZ);

	//Meshes
	let firstFloorGlass = new THREE.Mesh(firstFloorGeom, glassMat);
	let firstFloorConcrete = new THREE.Mesh(firstFloorGeom, concreteMat);
	let middleFloor = new THREE.Mesh(middleGeom, glassMat);
	let topFloor = new THREE.Mesh(topGeom, glassMat);
	let ring = new THREE.Mesh(ringGeom, ringMat);
	let floor = new THREE.Mesh(floorGeom, floorMat);

	let mainHood = new THREE.Mesh(mainHoodGeom, waterProofMat);
	let middleHood = new THREE.Mesh(middleHoodGeom, concreteMat);
	let topHood = new THREE.Mesh(topHoodGeom, concreteMat);
	let complement = new THREE.Mesh(complementGeom, concreteMat);
	let wall1 = new THREE.Mesh(wallGeom, concreteMat);
	let wall2 = new THREE.Mesh(wallGeom, concreteMat);


	//Placement
	var cafeteria = new THREE.Object3D();
	cafeteria.add(firstFloorGlass, firstFloorConcrete, middleFloor, topFloor, ring, complement, floor, mainHood, middleHood, topHood, wall1, wall2);

	firstFloorGlass.position.y = cafeteriaHeight / 2;
	firstFloorConcrete.position.y = firstFloorGlass.position.y + cafeteriaHeight;
	middleFloor.position.y = firstFloorConcrete.position.y + cafeteriaHeight / 2 + middleHeight / 2;
	topFloor.position.y = middleFloor.position.y + middleHeight / 2 + topHeight / 2;
	ring.position.y = cafeteriaHeight;
	ring.rotation.x += Math.PI / 2;
	floor.rotation.x += Math.PI / 2;

	mainHood.position.y = firstFloorConcrete.position.y + cafeteriaHeight / 2;
	middleHood.position.y = middleFloor.position.y + middleHeight / 2;
	topHood.position.y = topFloor.position.y + topHeight / 2;
	mainHood.rotation.x += Math.PI / 2;
	middleHood.rotation.x += Math.PI / 2;
	topHood.rotation.x += Math.PI / 2;
	complement.position.y = (3 *cafeteriaHeight /2) - cafeteriaHeight;
	wall1.position.y = wall2.position.y = cafeteriaHeight;
	wall1.position.z += cafeteriaRadius + wallZ / 2;
	wall2.rotation.y += THREE.Math.degToRad(50);
	wall2.translateZ(-(cafeteriaRadius + wallZ / 2));

	return cafeteria;
}