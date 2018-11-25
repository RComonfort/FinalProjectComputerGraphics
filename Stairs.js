
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