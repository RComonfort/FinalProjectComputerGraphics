
function Magna() {
    this.object3D = this.makeMagna();
}

Magna.prototype.makeMagna = function() {

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
    });

    //Measures
    let magnaRadius = 7;
    let magnaHeight = 2.75;
    let groundHeight = .30;

    let doorCutX = 6.5 * .19 * 2;
    let doorCutY = 2.75 * .75;
    let doorCutZ = .25 * 2;

    //Geometries
    let bodyGeom = new THREE.CylinderGeometry(magnaRadius, magnaRadius, magnaHeight, 128, 4, false);
    let groundGeom = new THREE.CylinderGeometry(magnaRadius, magnaRadius, groundHeight, 128, 4, false);
    let doorCutGeom = new THREE.BoxGeometry(doorCutX, doorCutY, doorCutZ);

    //Meshes 
    let body = new THREE.Mesh(bodyGeom, concreteMat);
    let ground = new THREE.Mesh(groundGeom, concreteMat);
    let ceiling = ground.clone();
    let doorCut = new THREE.Mesh(doorCutGeom, concreteMat);

    //offsets
    ground.position.y = -groundHeight/2;
    body.position.y = magnaHeight/2;
    ceiling.position.y = magnaHeight + groundHeight / 2;
    doorCut.position.set(magnaRadius ,doorCutY / 2, magnaRadius);


    //CSG
    var magnaCSG = THREE.CSG.fromMesh (body);
    magnaCSG = magnaCSG.union(THREE.CSG.fromMesh (ground));
    magnaCSG = magnaCSG.union(THREE.CSG.fromMesh (ceiling));

    magnaCSG = magnaCSG.subtract(THREE.CSG.fromMesh (doorCut));

    //
    let magnaBody = THREE.CSG.toMesh(magnaCSG, concreteMat);

    var magna = new THREE.Object3D();
    magna.add(magnaBody);

    return magna;

}