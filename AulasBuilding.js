
function AulasBuilding(aulasBuildingNum) {
    this.rightSideLevels = [];
    this.leftSideLevels = [];
    this.orphanLevels = [];
    this.object3D = this.makeAulasBuilding(aulasBuildingNum);
}

AulasBuilding.prototype.makeAulasBuilding = function(aulasBuildingNum) {

    var aulasBuilding = new THREE.Object3D();

    let stairsDiameter = 8;
    let middleRotationAngle = - Math.PI / 6;
    let aulaLengthX = (new Story(1, false, false, 1, false).levelLength) * Math.cos(middleRotationAngle);
    let leftSideZ = - 2 * 14;

    //Checkpoints (where main sections of AulasBuilding should be)
    let rightMainStairsX = 8;
    let rightSideX = rightMainStairsX + (new Story(1, false, true, 4, true).levelLength) / 2;
    let orphanAulasX = -rightMainStairsX - aulaLengthX / 2;
    let leftMainStairsX = orphanAulasX - aulaLengthX;
    let leftSideX = leftMainStairsX - (new Story(1, false, true, 4, true).levelLength) / 2

    //Create rightSide (where the labs were) of an aulaBuilding
    for (var i = 0; i < 4; i++) {
        var level = new Story(i + 1, aulasBuildingNum == 1, i == 3, 4, true);
        this.rightSideLevels.push(level);

        level.object3D.position.y = level.levelHeight * i;
        level.object3D.position.x = rightSideX;
        aulasBuilding.add(level.object3D);
    }

    //Create middle orphan levels (that do not belong to the left or right sections of an Aulas Building)
    for (var i = 0; i < 2; i++) {
        var level = new Story(i + 2, aulasBuildingNum == 1, false, 1, false);
        this.orphanLevels.push(level);

        level.object3D.position.y = level.levelHeight * (i + 3);
        level.object3D.position.x = orphanAulasX;
        level.object3D.position.z = leftSideZ + 2.5;
        level.object3D.rotation.y += middleRotationAngle;
        aulasBuilding.add(level.object3D);
    }

    //Create stairs
    let leftMainStairs = makeAulaStairs(5);
    leftMainStairs.position.z = leftSideZ;
    leftMainStairs.position.x = leftMainStairsX;
    aulasBuilding.add(leftMainStairs);

    //Create leftSide (parallel to OXXO?)
    for (var i = 0; i < 6; i++) {
        var level = new Story(i + 1, false, i == 5, 4, true);
        this.leftSideLevels.push(level);

        level.object3D.position.y = level.levelHeight * i;
        level.object3D.position.x = leftSideX;
        level.object3D.position.z = leftSideZ;
        level.object3D.scale.x *= -1;
        aulasBuilding.add(level.object3D);
    }

    return aulasBuilding;
}