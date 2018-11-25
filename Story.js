
function Story(level, shouldHaveGlass, isTopLevel, aulaCount, shouldHaveMagna) {
    this.glassMat = new THREE.MeshPhongMaterial ({ 
        color: 0x003f3f, 
        specular: 0x222222,
        transparent: true, 
        opacity: 0.8,                             
		shininess: 50,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -0.1
	});
	this.concreteMat = new THREE.MeshLambertMaterial ({ 
		color: 0xbabcbc,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -0.07
    });
    this.waterProofMat = new THREE.MeshLambertMaterial ({ 
		color: 0xc43e2d,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 0.05
    });
    this.rockMat = new THREE.MeshLambertMaterial ({ 
		color: 0x77797c,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 0.1
    });
    
    this.object3D = this.makeStory(level, shouldHaveGlass, isTopLevel, aulaCount, shouldHaveMagna);
}

Story.prototype.makeStory = function(level, shouldHaveGlass, isTopLevel, aulaCount, shouldHaveMagna) {
    
    let aulaBase = new Aula().object3D;
    let aulaDimensions = (new THREE.Box3().setFromObject(aulaBase)).getSize();

    let magnaBase = new Magna().object3D;
    let magnaDimensions = (new THREE.Box3().setFromObject(magnaBase)).getSize();

    let aulaLength = aulaDimensions.x;
    let magnaDiameter = magnaDimensions.x;
    let magnaStairsX = 4;
    let levelHeight = Math.min(aulaDimensions.y, magnaDimensions.y);

    //Measures
    let walkwayWidth = Math.abs(aulaDimensions.z - magnaDiameter);
    let walkwayHeight = 0.3;
    this.levelLength = aulaCount * aulaLength + (shouldHaveMagna ? magnaDiameter / 2 +  magnaStairsX: 0);

    let barrierY = aulaDimensions.y / 2;
    let barrierZ = 0.3

    let glassY = aulaDimensions.y - barrierY;
    let glassZ = barrierZ / 5;

    //Geometries
    let floorGeom = new THREE.BoxGeometry(this.levelLength, walkwayHeight, walkwayWidth);
    let barrierGeom = new THREE.BoxGeometry(this.levelLength, barrierY, barrierZ);
    let glassGeom = new THREE.BoxGeometry(this.levelLength, glassY, glassZ);

    //Create hierarchy
    var storyObj = new THREE.Object3D();
    var currentX = this.levelLength/2;

    //if this floor should have an aula magna 
    if (shouldHaveMagna) {
        storyObj.add(magnaBase);
        magnaBase.position.x = currentX;
        magnaBase.position.z -= walkwayWidth / 2 * .92;

        currentX -= magnaDiameter / 2 + magnaStairsX / 2;
        //make stairs to downwards if level > 1 && !isTopLevel
        if (level > 1 && !isTopLevel) {
            let stairs = makeUShapedStair(magnaStairsX, levelHeight);
            storyObj.add(stairs);
            
            stairs.position.x = currentX;
            stairs.position.y -= levelHeight;
        }
        currentX -= magnaStairsX / 2;
    }
    currentX -= aulaLength / 2;

    
    //Add aulas
    if (!isTopLevel) {
        for (var i = 0; i < aulaCount; i++) {
            let aula = aulaBase.clone();
            storyObj.add(aula);
            aula.position.x = currentX;
            currentX -= aulaLength;
        }

        //Floor
        let floor = new THREE.Mesh(floorGeom, this.rockMat);
        floor.position.z = walkwayWidth / 2;
        floor.position.y = -walkwayHeight / 2;
        storyObj.add(floor);
    }
    else {
        let bigFloorGeom = new THREE.BoxGeometry(this.levelLength, walkwayHeight, magnaDiameter);
        var bigFloor = new THREE.Mesh(bigFloorGeom, this.waterProofMat);
        bigFloor.position.y = -walkwayHeight / 2;
        bigFloor.position.z = magnaBase.position.z;
        storyObj.add(bigFloor);
    } 

    

    //Create barriers if level > 1 on both sides
    if (level > 1) {
        let frontBarrier = new THREE.Mesh(barrierGeom, this.concreteMat);
        frontBarrier.position.z = walkwayWidth - barrierZ / 2;

        let backBarrier = frontBarrier.clone();
        backBarrier.position.z = - aulaDimensions.z - walkwayHeight / 2;

        storyObj.add(frontBarrier, backBarrier);

        //Add glass if needed
        if (shouldHaveGlass) {
            let glassCover = new THREE.Mesh(glassGeom, this.glassMat);
            storyObj.add(glassCover);
            glassCover.position.z = frontBarrier.position.z;
            glassCover.position.y = frontBarrier.position.y + barrierY / 2 + glassY / 2; 
        }
    }
    return storyObj;
}

