/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function DropTower() {
	
	//For seats' movement
	this.yDelta;
	this.startPosition;
	
	this.object3D = this.makeDropTower();

	this.animate = function() {
		this.object3D.children[2].position.y = this.startPosition + this.yDelta * Math.sin(Date.now() / 1000);
		//console.log("yDelta: " + this.yDelta + ", startPos: " + this.startPosition);
	}
}

/**
 * 	object3D
 * 		tower
 * 		dome
 * 		seats
 * 			body
 * 			seatsG
 */

DropTower.prototype.makeDropTower = function() {

	//Measures
	let towerHeight = 75;
	let towerRadius = 6; 
	let domeX = 16; 
	let domeY = 6;
	let domeZ = domeX;
	let seatsRadius = towerRadius * 1.45;
	let seatsWidth = towerRadius / 2;

	let domeCRadius = (domeX * Math.sqrt(2)) / 2;
	let domeCHeight = domeY;

	//Materials
	let yellow = new THREE.MeshLambertMaterial({color: 0xfff30f});
	let purple = new THREE.MeshLambertMaterial({color: 0xc904e2});

	let towerGeom = new THREE.CylinderGeometry(towerRadius, towerRadius, towerHeight, 32);
	let tower = new THREE.Mesh(towerGeom, yellow);

	let domeGeom = new THREE.BoxGeometry(domeX, domeY, domeZ);
	let dome = new THREE.Mesh(domeGeom, purple);

	let domeCGeom = new THREE.CylinderGeometry(domeCRadius, domeCRadius, domeCHeight, 32, 4, true);
	let domeC = new THREE.Mesh(domeCGeom, purple.clone());
	domeC.material.wireframe = true;

	let seats = makeSeats(seatsRadius, seatsWidth, yellow, 32);

	//Groups
	var dropTower = new THREE.Object3D();
	dropTower.add(tower,dome, seats, domeC);

	tower.position.y = towerHeight / 2.0;
	dome.position.y = towerHeight - domeY / 2.0;
	seats.position.y = tower.position.y;
	domeC.position.y = dome.position.y;
	
	this.startPosition = seats.position.y;
	this.yDelta = (towerHeight - domeY - seatsWidth / 2.0) - this.startPosition;
	return dropTower;
}

function makeSeats(seatsBodyRadius, seatsBodyWidth, yellowMat, seatCount) {

	let bodyGeom = new THREE.TorusGeometry(seatsBodyRadius, seatsBodyWidth, 32, 32);
	let body = new THREE.Mesh(bodyGeom, yellowMat);

	let seats = new THREE.Object3D();
	let seatsG = new THREE.Object3D();
	seats.add(body, seatsG);

	for (var i = 0; i < seatCount; i++) {
		let seat = makeSeat();
		var angle = i * ((2 * Math.PI) / seatCount);

		seatsG.add(seat);
		seat.position.set((seatsBodyRadius + seatsBodyWidth * 1.25) * Math.cos(angle), 0, (seatsBodyRadius + seatsBodyWidth * 1.25) * Math.sin(angle));
		seat.rotation.y = -angle;
	}

	body.rotation.x = Math.PI /2;

	return seats;
}

function makeSeat() {

	let mat = new THREE.MeshLambertMaterial({color: 0x111111});

	let initialScale = 2;
	let seatWidth = .9 * initialScale;
	let seatHeight = .25 * initialScale;
	let seatGirth = .7 * initialScale;
	let backrestHeight = seatWidth * 1.5;

	let seatGeom = new THREE.BoxGeometry(seatWidth, seatHeight, seatGirth);
	let seat = new THREE.Mesh(seatGeom, mat);

	let backRestGeom = new THREE.BoxGeometry(backrestHeight, seatHeight, seatGirth);
	let backRest = new THREE.Mesh(backRestGeom, mat);
	
	let seatObj = new THREE.Object3D();
	seatObj.add(seat, backRest);

	backRest.rotation.z -= THREE.Math.degToRad(75);
	backRest.position.x -= backrestHeight / 3;
	seat.position.y -= seatHeight * 2;

	return seatObj;
}