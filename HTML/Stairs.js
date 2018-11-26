/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function Stairs(width, rise, makeBeginPlatform = false) {
    this.stepHeight = 0.18;
    this.stepCount = rise / this.stepHeight;
    this.stepRun =  0.45;
    this.run = this.stepCount * this.stepRun;
    this.object3D = this.makeStairs(width, rise, makeBeginPlatform);
}

Stairs.prototype.makeStairs = function(width, rise, makeBeginPlatform) {

    let stepMat = new THREE.MeshLambertMaterial ({ 
		color: 0x77797c,
        side: THREE.DoubleSide,
    });

    let endPlatformDepth = width;

    var nextZ = -this.stepRun/2;
    var nextY = this.stepHeight / 2;
    let stepGeom = new THREE.BoxGeometry(width, this.stepHeight, this.stepRun);
    var stairs = new THREE.Object3D();
    for (var i = 0; i < this.stepCount - 1; i++) {

        let step = new THREE.Mesh(stepGeom, stepMat);
        
        stairs.add(step);
        step.position.set(0, nextY, nextZ);

        nextZ -= this.stepRun;
        nextY += this.stepHeight;
    }
    let endPlatformGeom = new THREE.BoxGeometry(width, this.stepHeight, endPlatformDepth);
    let endPlatform = new THREE.Mesh(endPlatformGeom, stepMat);
    endPlatform.position.set(0, nextY, nextZ + this.stepRun/2 - endPlatformDepth / 2);
    stairs.add(endPlatform);

    if (makeBeginPlatform) {
        let beginPlatform = endPlatform.clone();
        beginPlatform.position.set(0, this.stepHeight / 2, endPlatformDepth / 2);

        stairs.add(beginPlatform);
    }

    return stairs;
}

function makeUShapedStair(width, rise, makeBeginPlatform = false) {

    var stair = new Stairs(width / 2, rise / 2, makeBeginPlatform);
    let stepHeight = stair.stepHeight;

    var firstHalf = stair.object3D;
    var secondHalf = firstHalf.clone();

    firstHalf.position.x = width / 4;
    firstHalf.position.y -= stepHeight/2;
    secondHalf.rotation.z += Math.PI;
    secondHalf.position.y = rise;
    secondHalf.position.x = -width/4;

    var stairSet = new THREE.Object3D();
    stairSet.add(firstHalf, secondHalf);

    return stairSet;
}

function makeAulaStairs (levels, makeBeginPlatform = false) {

    //Materials
    let coverMat = new THREE.MeshPhongMaterial({
        color: 0xb7b7b7,
        shininess: 0.6,
        reflectivity: 0.8,
        side: THREE.DoubleSide
    });
    let stepMat = new THREE.MeshLambertMaterial ({ 
		color: 0x77797c,
        side: THREE.DoubleSide,
    });

    //Measures
    let levelHeight = (new THREE.Box3().setFromObject(new Aula().object3D)).getSize().y;
    let coverRadius = 4;
    let thetaLength = Math.PI;
    let thetaStart = Math.PI / 2;
    let coverHeight = levelHeight * (levels + 1);
    let latWallX = 0.1;
    let latWallY = coverHeight;
    let latWallZ = coverRadius * 1.5;
    let floorZ = 5;
    
    //Geometries 
    let coverGeom = new THREE.CylinderGeometry(coverRadius, coverRadius, coverHeight, 64, levels, false, thetaStart, thetaLength);
    let latWallGeom = new THREE.BoxGeometry(latWallX, latWallY, latWallZ);
    let floorGeom = new THREE.BoxGeometry(coverRadius * 2, .3, floorZ);

    //Object
    let aulaStairs = new THREE.Object3D();

    //Meshes
    let cover = new THREE.Mesh(coverGeom, coverMat);
    let wall1 = new THREE.Mesh(latWallGeom, coverMat);
    let wall2 = wall1.clone();
    
    aulaStairs.add(cover, wall1, wall2);
    //Stairs
    for (var i = 0; i <= levels; i++) {

        if (i < levels) {
            var stairs = makeUShapedStair(coverRadius * 2, levelHeight, makeBeginPlatform);
            stairs.position.y = i * levelHeight;

            aulaStairs.add(stairs);
        }
        
        let floor = new THREE.Mesh(floorGeom, stepMat);
        floor.position.z = floorZ / 2;
        floor.position.y = i * levelHeight - .15;
        aulaStairs.add(floor);
    }

    cover.position.y = coverHeight / 2;
    cover.position.z = - 3/2*coverRadius;

    wall1.position.y = wall2.position.y = cover.position.y;
    wall1.position.z = wall2.position.z = - latWallZ / 2;
    wall1.position.x = -coverRadius;
    wall2.position.x = coverRadius;

    return aulaStairs;
}