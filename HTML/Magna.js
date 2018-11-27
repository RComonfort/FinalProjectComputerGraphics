/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function Magna() {
    this.object3D = this.makeMagna();
}

/**
 * Constructs an Aula Magna
 * @returns An Object3D containing all hierarchy
 */
Magna.prototype.makeMagna = function() {

    //Materials 
    var glassMat = new THREE.MeshPhongMaterial ({ 
        color: 0x003f3f, 
        specular: 0x222222,
        transparent: true, 
        opacity: 0.8,                             
		shininess: 50,
		side: THREE.DoubleSide
	});
	var concreteMat = new THREE.MeshLambertMaterial ({ 
		color: 0xbabcbc,
        side: THREE.DoubleSide,
    });

    //Measures
    let magnaRadius = 7;
    let magnaHeight = 3.15;
    let firstBaseHeight = magnaHeight * .25;
    let windowHeight = magnaHeight * .12;
    let inBetweenBaseHeight = magnaHeight * .2;
    let topBaseHeight = magnaHeight - (firstBaseHeight + windowHeight * 2 + inBetweenBaseHeight);
    let groundHeight = .30;
    let windowRadius = magnaRadius * 1;
    let thethaLength = Math.PI * 2 - THREE.Math.degToRad(17);
    let thetaStart = THREE.Math.degToRad(-50);

    //Geometries
    let firstBaseGeom = new THREE.CylinderGeometry(magnaRadius, magnaRadius, firstBaseHeight, 128, 4, true, thetaStart, thethaLength);
    let windowGeom = new THREE.CylinderGeometry(windowRadius, windowRadius, windowHeight, 128, 4, true, thetaStart, thethaLength);
    let inBetweenBaseGeom = new THREE.CylinderGeometry(magnaRadius, magnaRadius, inBetweenBaseHeight, 128, 4, true, thetaStart, thethaLength);
    let topBaseGeom = new THREE.CylinderGeometry(magnaRadius, magnaRadius, topBaseHeight, 128, 4, true);

    let groundGeom = new THREE.CylinderGeometry(magnaRadius, magnaRadius, groundHeight, 128, 4, false);

    //Meshes 
    let firstBase = new THREE.Mesh(firstBaseGeom, concreteMat);
    let window1 = new THREE.Mesh(windowGeom, glassMat);
    let inBetweenBase = new THREE.Mesh(inBetweenBaseGeom, concreteMat);
    let window2 = window1.clone();
    let topBase = new THREE.Mesh(topBaseGeom, concreteMat);

    let ground = new THREE.Mesh(groundGeom, concreteMat);
    let ceiling = ground.clone();

    //offsets
    firstBase.position.y = firstBaseHeight / 2;
    window1.position.y = firstBaseHeight + windowHeight / 2;
    inBetweenBase.position.y = firstBaseHeight + windowHeight + inBetweenBaseHeight / 2;
    window2.position.y = firstBaseHeight + windowHeight + inBetweenBaseHeight + windowHeight /2;
    topBase.position.y = firstBaseHeight + windowHeight + inBetweenBaseHeight + windowHeight + topBaseHeight / 2;

    ground.position.y = -groundHeight/2;
    ceiling.position.y = magnaHeight + groundHeight / 2;

    //
    var magna = new THREE.Object3D();
    magna.add(ground, ceiling, firstBase, window1, window2, inBetweenBase, topBase);

    return magna;

}