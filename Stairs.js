
function Stairs(width, rise) {
    this.object3D = this.makeStairs(width, rise);
}

Stairs.prototype.makeStairs = function(width, rise) {

    let stepMat = new THREE.MeshLambertMaterial ({ 
		color: 0x77797c,
        side: THREE.DoubleSide,
        specular: 0x848787
    });

    let endPlatformDepth = width;
    let stepHeight = 0.18;
    let stepRun = 0.45;
    let stepCount = rise / stepHeight;
    let run = stepCount * stepRun;

    let stepGeom = new THREE.BoxGeometry(width, stepHeight, stepRun);
    var stairs = new THREE.Object3D();
    for (var i = 0; i < stepCount - 1; i++) {
        let begin = run/2;

        let step = new THREE.Mesh(stepGeom, stepMat);
        step.position.z = begin - (i + 1)*(stepRun/2);
        step.position.y = stepHeight / 2 + stepHeight * i;
        stairs.add(step);
    }
    let endPlatformGeom = new THREE.BoxGeometry(width, stepHeight, endPlatformDepth);
    let endPlatform = new THREE.Mesh(endPlatformGeom, stepMat);
    endPlatform.position.set(0, stepHeight / 2 + stepHeight * (stepCount - 1), -(endPlatformDepth / 2));
    stairs.add(endPlatform);

    return stairs;
}