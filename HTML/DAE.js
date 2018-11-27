/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function DAE() {
    this.object3D = this.makeDae();
}

/**
 * Constructs a Centro Estudiantil building object
 * @returns An Object3D containing all hierarchy
 */
DAE.prototype.makeDae = function(){

    //Mats
    var glassMat = new THREE.MeshPhongMaterial ({ 
        color: 0x01AA83, 
        specular: 0x555555,
        transparent: true, 
        opacity: 0.6,                             
		shininess: 20,
		side: THREE.DoubleSide
	});
	var concreteMat = new THREE.MeshLambertMaterial ({ 
		color: 0xbabcbc,
		side: THREE.DoubleSide 
    });

    //Measures
    let daeX = 60;
    let daeY = 12;
    let daeZ = 50;

    let daeRoofX = daeX;
    let daeRoofY = 2/3*daeY;
    let daeRoofZ = daeZ;

    let daeCutX = daeX / 2;
    let daeCutY = daeY;
    let daeCutZ = 40;

    let blockX = daeX/4 * 2/3;
    let blockY = daeY * 1.23;
    let blockZ = 6.5;

    let terraceX = blockX * 1.12;
    let terraceY = 2;
    let terraceZ = 19;

    //Geometries
    let daeGeom = new THREE.BoxGeometry(daeX, daeY, daeZ);
    let daeRoofGeom = new THREE.BoxGeometry(daeRoofX, daeRoofY, daeRoofZ);
    let daeCutGeom = new THREE.BoxGeometry(daeCutX, daeCutY, daeCutZ);
    let glassGeom = new THREE.BoxGeometry(daeCutX, daeCutY, 1);
    let blockGeom = new THREE.BoxGeometry(blockX, blockY, blockZ);
    let block2Geom = new THREE.BoxGeometry(blockX, terraceZ, blockZ);
    let terraceGeom = new THREE.BoxGeometry(terraceX, terraceY, terraceZ);

    //Meshes
    let dae = new THREE.Mesh(daeGeom);
    let daeRoof = new THREE.Mesh(daeRoofGeom);
    let daeCut = new THREE.Mesh(daeCutGeom);
    let block = new THREE.Mesh(blockGeom, concreteMat);
    let block2 = new THREE.Mesh(block2Geom, concreteMat);
    let terrace = new THREE.Mesh(terraceGeom, concreteMat);
    let glass = new THREE.Mesh(glassGeom, glassMat);

    //Offsets
    dae.position.y = daeY / 2;
    daeRoof.position.y = daeY + daeRoofY / 2;
    daeCut.position.y = dae.position.y;
    daeCut.position.z = daeZ / 2;
    glass.position.y = daeCutY / 2;
    glass.position.z = daeZ / 2 - 2.5;
    
    block.position.x = -daeX / 2 - blockX/2 + 1;
    block.position.y = dae.position.y * .365;
    block.position.z = daeZ / 2 - 3*blockZ/2;

    block2.position.copy(block.position);
    block2.rotation.x += Math.PI / 2;
    block2.rotation.y += Math.PI / 2;
    block2.position.z = terrace.position.z;
    block2.position.x += blockX / 3;
    block2.position.y += 3.5;

    terrace.position.x = -daeX / 2 - terraceX /2;

    //CSG
    var daeCSG = THREE.CSG.fromMesh(dae);
    daeCSG = daeCSG.union(THREE.CSG.fromMesh (daeRoof));
    daeCSG = daeCSG.subtract(THREE.CSG.fromMesh (daeCut));

    let daeObj = THREE.CSG.toMesh(daeCSG, concreteMat);

    var daeGroup = new THREE.Object3D();
    daeGroup.add(daeObj, glass, terrace, block, block2);

    return daeGroup;
}