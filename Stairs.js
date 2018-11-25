
function Stairs(width, rise) {
    this.stepHeight = 0.18;
    this.stepCount = rise / this.stepHeight;
    this.stepRun =  0.45;
    this.run = this.stepCount * this.stepRun;
    this.object3D = this.makeStairs(width, rise);
}

Stairs.prototype.makeStairs = function(width, rise) {

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

    return stairs;
}

function makeUShapedStair(width, rise) {

    var stair = new Stairs(width / 2, rise / 2);
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

function makeAulaStairs (levels) {

    //Materials
    let coverMat = new THREE.MeshPhongMaterial({
        color: 0xb7b7b7,
        shininess: 0.6,
        reflectivity: 0.8,
        side: THREE.DoubleSide

    });


    //Measures
    let levelHeight = (new THREE.Box3().setFromObject(new Aula().object3D)).getSize().y;
    let coverRadius = 5;
    let thetaLength = Math.PI;
    let thetaStart = Math.PI / 2;
    let coverHeight = levelHeight * (levels + 1);
    let latWallX = 0.1;
    let latWallY = coverHeight;
    let latWallZ = coverRadius;
    
    //Geometries 
    let coverGeom = new THREE.CylinderGeometry(coverRadius, coverRadius, coverHeight, 64, levels, false, thetaStart, thetaLength);
    let latWallGeom = new THREE.BoxGeometry(latWallX, latWallY, latWallZ);

    //Object
    let aulaStairs = new THREE.Object3D();

    //Meshes
    let cover = new THREE.Mesh(coverGeom, coverMat);
    let wall1 = new THREE.Mesh(latWallGeom, coverMat);
    let wall2 = wall1.clone();
    
    aulaStairs.add(cover, wall1, wall2);
    //Stairs
    for (var i = 0; i < levels; i++) {
        var stairs = makeUShapedStair(coverRadius * 2, levelHeight);
        stairs.position.y = i * levelHeight;

        aulaStairs.add(stairs);
    }

    cover.position.y = coverHeight / 2;
    cover.position.z = - 3/2*coverRadius;
    wall1.position.y = wall2.position.y = cover.position.y;
    wall1.position.z = wall2.position.z = -latWallZ;
    wall1.position.x = -coverRadius;
    wall2.position.x = coverRadius;

    return aulaStairs;
}