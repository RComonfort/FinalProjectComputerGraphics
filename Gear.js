//Rafael Antonio Comonfort Viveros A01324276

function Gear(radius, height, color, externalCogs, internalCogs = 0) {

    this.object3D = new THREE.Object3D();
    this.mat = new THREE.MeshLambertMaterial({color: color, wireframe: false, flatShading: false});

	//Create gear geometry
	var mainGearCSG = this.makeGearGeom(radius, height, externalCogs);

	//If the gear should have internal cogs, create the smaller gear and remove its shape from the main one
	if (internalCogs > 1) {
		var internalGearCSG = this.makeGearGeom(radius / 4.0, height, internalCogs);
		mainGearCSG = mainGearCSG.subtract(internalGearCSG);
	}

	var gearMesh = THREE.CSG.toMesh(mainGearCSG, this.mat);
	
	this.object3D.add(gearMesh);
}

Gear.prototype.makeGearGeom = function(radius, height, externalCogs) {

	var gear = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64));
	var gear_csg = THREE.CSG.fromMesh (gear);

    var circunference = Math.PI * radius * 2;
    var cogSize = circunference / (externalCogs * 2.0);
    var angleStepSize = Math.PI / externalCogs;

    for (var i = 0; i < externalCogs * 2; i+=2) {
		var targetAngle = i * angleStepSize;
		
		//Create cog, place it on circunference and rotate it
		var cog = new THREE.Mesh(new THREE.BoxGeometry(cogSize, height, cogSize));
		cog.position.set((radius + cogSize / 2.1) * Math.cos(targetAngle), 0, (radius + cogSize / 2.1) * Math.sin(targetAngle));
		cog.rotation.y -= targetAngle;

		var cog_csg = THREE.CSG.fromMesh (cog);

		//Add it to gear
		gear_csg = gear_csg.union(cog_csg);
	}
	
	return gear_csg;
}