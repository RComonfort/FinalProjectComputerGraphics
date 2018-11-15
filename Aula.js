
function Aula() {
    this.object3D = this.makeAula();
}

Aula.prototype.makeAula = function() {

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
		side: THREE.DoubleSide 
    });
    
    //Measures
    let groundX = 6.5;
    let groundY = 0.3;
    let groundZ = groundX;
    let latWallX = groundX;
    let latWallY = 2.75;
    let latWallZ = .25;
    let backWallX = latWallZ;
    let backWallY = latWallY;
    let backWallZ = latWallX;

    let bigWindowsCutX = latWallX - backWallX ;
    let bigWindowsCutY = latWallY * .6;
    let bigWindowsCutZ = latWallZ * 2;

    let windowsCutX = latWallX *.62;
    let windowsCutY = latWallY * .2;
    let windowsCutZ = latWallZ * 2;

    let doorCutX = latWallX * .19;
    let doorCutY = latWallY * .75;
    let doorCutZ = latWallZ * 2;

    let windowSmallX = windowsCutX;
    let windowSmallY = windowsCutY;
    let windowSmallZ = 0.05;
    let windowBigX = bigWindowsCutX;
    let windowBigY = bigWindowsCutY;
    let windowBigZ = 0.05;

    //Geometries
    let groundGeom = new THREE.BoxGeometry(groundX, groundY, groundZ);
    let latWallGeom = new THREE.BoxGeometry(latWallX, latWallY, latWallZ);
    let backWallGeom = new THREE.BoxGeometry(backWallX, backWallY, backWallZ);

    let bigWindowsCutGeom = new THREE.BoxGeometry(bigWindowsCutX, bigWindowsCutY, bigWindowsCutZ);
    let windowsCutGeom = new THREE.BoxGeometry(windowsCutX, windowsCutY, windowsCutZ);
    let doorCutGeom = new THREE.BoxGeometry(doorCutX, doorCutY, doorCutZ);
    let windowSmallGeom = new THREE.BoxGeometry(windowSmallX, windowSmallY, windowSmallZ);
    let windowBigGeom = new THREE.BoxGeometry(windowBigX, windowBigY, windowBigZ);

    //Meshes
    let ground = new THREE.Mesh(groundGeom);
    let ceiling = ground.clone();
    let backWall = new THREE.Mesh(backWallGeom);
    let frontWall = backWall.clone();
    let doorWall = new THREE.Mesh(latWallGeom);
    let windowsWall = doorWall.clone();

    let bigWindowsCut = new THREE.Mesh(bigWindowsCutGeom);
    let windowsCut = new THREE.Mesh(windowsCutGeom);
    let doorCut = new THREE.Mesh(doorCutGeom);
    let windowSmall = new THREE.Mesh(windowSmallGeom, glassMat);
    let windowBig = new THREE.Mesh(windowBigGeom, glassMat);

    //Offsets
    ground.position.y -= groundY/2;
    backWall.position.y = frontWall.position.y = doorWall.position.y = windowsWall.position.y = backWallY / 2;
    ceiling.position.y += backWallY + groundY / 2;
    backWall.position.x = groundX / 2 - backWallX / 2;
    frontWall.position.x -= groundX / 2 - backWallX / 2;
    doorWall.position.z += groundZ / 2 - latWallZ / 2;
    windowsWall.position.z -= groundZ / 2 - latWallZ / 2;

    bigWindowsCut.position.z =  windowsWall.position.z;
    bigWindowsCut.position.y =  latWallY *.37 + bigWindowsCutY / 2;
    windowsCut.position.z = doorWall.position.z;
    windowsCut.position.y = latWallY * .9 - windowsCutY / 2;
    windowsCut.position.x = -latWallX / 2 + backWallX * 1.6 + windowsCutX / 2;
    doorCut.position.z = doorWall.position.z;
    doorCut.position.y = doorCutY / 2;
    doorCut.position.x = latWallX / 2 - backWallX * 1.6 - doorCutX / 2;
    windowSmall.position.copy(windowsCut.position);
    windowBig.position.copy(bigWindowsCut.position);

    //Create aula using CSG
    var classroomCSG = THREE.CSG.fromMesh (ground);
    classroomCSG = classroomCSG.union(THREE.CSG.fromMesh (ceiling));
    classroomCSG = classroomCSG.union(THREE.CSG.fromMesh (backWall));
    classroomCSG = classroomCSG.union(THREE.CSG.fromMesh (frontWall));
    classroomCSG = classroomCSG.union(THREE.CSG.fromMesh (doorWall));
    classroomCSG = classroomCSG.union(THREE.CSG.fromMesh (windowsWall));

    classroomCSG = classroomCSG.subtract(THREE.CSG.fromMesh (bigWindowsCut));
    classroomCSG = classroomCSG.subtract(THREE.CSG.fromMesh (windowsCut));
    classroomCSG = classroomCSG.subtract(THREE.CSG.fromMesh (doorCut));

    let classroom = THREE.CSG.toMesh(classroomCSG, concreteMat);

    var aula = new THREE.Object3D();
    aula.add(classroom, windowSmall, windowBig);

    return aula;
}