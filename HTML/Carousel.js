/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function Carousel() {
	
	this.object3D = this.makeCarousel();
	this.angularVelocity = 0.005; 

	this.animate = function () {
		this.object3D.children[1].rotation.y += this.angularVelocity;

		var animals = this.object3D.children[1].children[2].children;

		let middlePoint = this.object3D.children[1].children[1].children[0].position.y / 2.4;
		for (var i = 0; i < animals.length; i++) {
			var moveDir;
			if (i % 2 == 0)
				moveDir = 1;
			else 
				moveDir = -1;

			animals[i].position.y = middlePoint + moveDir * Math.sin(this.object3D.children[1].rotation.y * 3);
		}
	}
}

/**
 *    Carousel (object3D)
 *      fixedG
 * 			base
 * 			column
 * 			top
 *		movingG
 *			hidingRing
 *			polesG
 *			figuresG
 */
Carousel.prototype.makeCarousel = function () {

	//Materials
	let redMat = new THREE.MeshLambertMaterial({color: 0xaa0000});
	let greyMat = new THREE.MeshLambertMaterial({color: 0x595e5d});
	let blueMat = new THREE.MeshLambertMaterial({color: 0x012256});

	//Measures
	let baseRadius = 15;
	let baseHeight = .5;
	let columnRadius = 3;
	let columnHeight = 13;
	let topRadius = baseRadius * 1.1;
	let hidingRingHeight = 2;
	let hidingRingRadius = baseRadius * .341;
	let topHeight = 4.5;
	let dogScale = 1;

	let circles = 2;
	let animalsPerCircle = 8;

	//groups
	let carousel = new THREE.Object3D();
	let fixedG = new THREE.Object3D();
	let polesG = new THREE.Object3D();
	let movingG = new THREE.Object3D();
	let dogsG = new THREE.Object3D();

	//Objects
	let baseGeom = new THREE.CylinderGeometry(baseRadius, baseRadius, baseHeight, 32);
	let base = new THREE.Mesh(baseGeom, blueMat);

	let columnGeom = new THREE.CylinderGeometry(columnRadius, columnRadius, columnHeight, 32);
	let column = new THREE.Mesh(columnGeom, blueMat);

	var top = createUmbrellaObject(topRadius, topHeight, redMat);

	let hidingRingGeom = new THREE.CylinderGeometry(hidingRingRadius, hidingRingRadius, hidingRingHeight, 32);
	let hidingRing = new THREE.Mesh(hidingRingGeom, greyMat);

	//Make the circunferences of animals
	let poleGeom = new THREE.CylinderGeometry(0.07, 0.07, columnHeight, 8);
	for (var i = 0; i < circles; i++) {

		var angleStep = Math.PI * 2.0 / animalsPerCircle;
		var startAngle = i * angleStep / 2.0;
		var targetRadius = columnRadius + (i + 1) * (baseRadius - columnRadius) / (circles + 1);

		for (var j = 0; j < animalsPerCircle; j++) { 
			var angle = startAngle + j * angleStep;

			//Create animal i's pole 
			let pole = new THREE.Mesh(poleGeom, greyMat);
			polesG.add(pole);
			pole.position.set(targetRadius * Math.cos(angle), columnHeight / 2.0 - (i * .8125 + .8125), targetRadius * Math.sin(angle));

			//Create animal i
			let dog = createDogObject();
			dogsG.add(dog);
			dog.scale.set(dogScale, dogScale, dogScale);
			dog.position.set(targetRadius * Math.cos(angle), pole.position.y / 2, targetRadius * Math.sin(angle));
			dog.rotation.y = Math.PI - angle;
		}
	}
	//Create hierarchy
	carousel.add(fixedG, movingG);
	fixedG.add(base, column, top);
	movingG.add(hidingRing, polesG, dogsG);

	//Offset objects
	base.position.y = baseHeight / 2.0;
	column.position.y = baseHeight + columnHeight / 2.0;
	top.position.y = baseHeight - 2.5;
	hidingRing.position.y = column.position.y * 2 - hidingRingHeight;

	return carousel;
}

//For the top of the Carousel
function createUmbrellaObject(radius, height, material) {

	let poleFactor = 3.5;

	material.side = THREE.DoubleSide;

	let mainGeom = new THREE.ConeGeometry(radius, height, 16, 4, true);
	let main = new THREE.Mesh(mainGeom, material);

	let poleGeom = new THREE.CylinderGeometry(radius / 14, radius / 14, height * poleFactor, 32);
	let pole = new THREE.Mesh(poleGeom, material);

	var umbrella = new THREE.Object3D();
	umbrella.add(main, pole);

	pole.position.y = height * poleFactor / 2;
	main.position.y = height * poleFactor * 0.9;

	return umbrella;
}

//Animal that can be ridden
function createDogObject() {

	let color1 = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
	let color2 = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});


	var legGeom = new THREE.CubeGeometry(.25, .9, .25);
	var leftFrontLeg = new THREE.Mesh(legGeom, color1);
	leftFrontLeg.position.set(-0.2, 0, 0);

	var rightFrontLeg = new THREE.Mesh(legGeom, color1);
	rightFrontLeg.position.set(0.2, 0, 0);

	var leftBackLeg = new THREE.Mesh(legGeom, color1);
	leftBackLeg.position.set(-0.2, 0, -1.5);
	var rightBackLeg = new THREE.Mesh(legGeom, color1);
	rightBackLeg.position.set(0.2, 0, -1.5);

	var bodyGeom = new THREE.CubeGeometry(.75, .75, 1.95);
	var body = new THREE.Mesh(bodyGeom, color2);
	body.position.set(0, .75, -.73);

	var maneGeom = new THREE.CubeGeometry(.8, 0.8, 0.6);
	var mane = new THREE.Mesh(maneGeom, color1);
	mane.position.set(0, .8, 0);

	var headGeom = new THREE.CubeGeometry(.5, .5, .5);
	var head = new THREE.Mesh(headGeom, color2);
	head.position.set(0, .85, .35);

	var muzzleGeom = new THREE.CubeGeometry(.2, .17, .3);
	var muzzle = new THREE.Mesh(muzzleGeom, color2);
	muzzle.position.set(0, .73, .7);

	var earGeom = new THREE.CubeGeometry(.17, .17, .05);
	var ear = new THREE.Mesh(earGeom, color2);
	ear.position.set(-.15, 1.2, .35);

	var ear2 = new THREE.Mesh(earGeom, color2);
	ear2.position.set(.15, 1.2, .35);

	var dogGroup = new THREE.Object3D();
	dogGroup.add(leftFrontLeg);
	dogGroup.add(rightFrontLeg);
	dogGroup.add(leftBackLeg);
	dogGroup.add(rightBackLeg);
	dogGroup.add(body);
	dogGroup.add(mane);
	dogGroup.add(head);
	dogGroup.add(muzzle);
	dogGroup.add(ear);
	dogGroup.add(ear2);

	for (var i = 0; i < dogGroup.children.length; i++) {
		dogGroup.children[i].position.z += 0.5;
	}

	return dogGroup;
}