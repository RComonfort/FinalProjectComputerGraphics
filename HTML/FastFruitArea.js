/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function makeFastFruitArea() {
    //Materials
    let concreteMat = new THREE.MeshLambertMaterial ({ 
		color: 0xbabcbc,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -0.08
    });
    let fakeGrassMat = new THREE.MeshLambertMaterial ({ 
		color: 0x009336,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -0.09
    });
    let glassMat = new THREE.MeshPhongMaterial ({ 
        color: 0x003f3f, 
        specular: 0x222222,
        transparent: true, 
        opacity: 0.4,                             
		shininess: 50,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -0.1
	});

    //Measures
    let sideLength = 32; 
    let bodyHeight = 3.55;
    let centerRadius = sideLength / 3;

    //Geometries
    let mainBodyGeom = new THREE.BoxGeometry(sideLength, bodyHeight, sideLength);
    let centerGeom = new THREE.SphereGeometry(centerRadius, 64, 64);
    let exitGeom = new THREE.BoxGeometry(sideLength - 1.2, bodyHeight - .6, sideLength + 1);
    let glassGeom = new THREE.CylinderGeometry(centerRadius, centerRadius, bodyHeight - .3, 32, 1, true);
    let grassGeom = new THREE.BoxGeometry(sideLength, sideLength, 0.05);

    //Meshes
    let mainBody = new THREE.Mesh(mainBodyGeom);
    let center = new THREE.Mesh(centerGeom);
    let exit = new THREE.Mesh(exitGeom);
    let glass = new THREE.Mesh(glassGeom, glassMat);
    let grass = new THREE.Mesh(grassGeom);
    grass.rotation.x += Math.PI/2;

    let southCorridor = makeAdjacentToFF();
    southCorridor.position.z -= sideLength / 2 + 4.70;
    southCorridor.position.y -= 8.15;
    southCorridor.position.x += 4;

    let northCorridor = makeAdjacentToFF(true);
    northCorridor.scale.x *= -1;
    northCorridor.scale.z *= -1;
    northCorridor.position.z = sideLength / 2 + 4.75;
    northCorridor.position.y = -8.15 + 3.25;
    northCorridor.position.x = -4

    //CSG
    var mainBodyCSG = THREE.CSG.fromMesh(mainBody);
    mainBodyCSG = mainBodyCSG.subtract(THREE.CSG.fromMesh(center));
    mainBodyCSG = mainBodyCSG.subtract(THREE.CSG.fromMesh(exit));

    exit.rotation.y = Math.PI / 2;
    mainBodyCSG = mainBodyCSG.subtract(THREE.CSG.fromMesh(exit));

    var topCSG = THREE.CSG.fromMesh(grass);
    topCSG = topCSG.subtract(THREE.CSG.fromMesh(new THREE.Mesh(centerGeom)));

    //Hierarchy
    var FFarea = new THREE.Object3D();
    var grassTop = THREE.CSG.toMesh(topCSG, fakeGrassMat);
    grassTop.position.y += bodyHeight / 2;
    FFarea.add(THREE.CSG.toMesh(mainBodyCSG, concreteMat), glass, grassTop, southCorridor, northCorridor);

    return FFarea;
}

/**
 * Constructs a hallway adjacent to fast fruit area
 * @param {boolean} isForNorthSide Whether the hallway is north (towards fountain) or south (towards library). Used mainly to add glass to one of the hallways if in north side
 * @returns An Object3D containing all hierarchy
 */
function makeAdjacentToFF(isForNorthSide = false) {
    var object = new THREE.Object3D();

    //only 1 aula
    let level1 = new Story(1, false, false, 1, false);
    let level2 = new Story(2, false, false, 1, false);
    level2.object3D.position.y = level2.levelHeight;

    //3 aulas
    let level3 = new Story(3, false, false, 3, false, false);
    level3.object3D.position.y = level3.levelHeight * 2;
    level3.object3D.position.x -= 8;

    //none
    let level4 = new Story(4, false, true, 3, false, isForNorthSide);
    level4.object3D.position.y = level4.levelHeight * 3;
    level4.object3D.position.x -= 8;

    let stairs = makeAulaStairs(3);
    stairs.position.x += 8; //aula and stairs

    object.add(level1.object3D, level2.object3D, level3.object3D, level4.object3D, stairs);

    return object;
}
    