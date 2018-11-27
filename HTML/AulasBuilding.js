/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function AulasBuilding(aulasBuildingNum) {
    this.rightSideLevels = [];
    this.leftSideLevels = [];
    this.orphanLevels = [];
    this.object3D = this.makeAulasBuilding(aulasBuildingNum);
}

/**
 * Constructs an aula building object
 * @param {Number} aulasBuildingNum 1 or 2, depending on which aula we want
 * @returns An Object3D containing all hierarchy
 */
AulasBuilding.prototype.makeAulasBuilding = function(aulasBuildingNum) {

    var aulasBuilding = new THREE.Object3D();

    let stairsDiameter = 8;
    let middleRotationAngle = - Math.PI / 6;
    let aulaLengthX = (new Story(1, false, false, 1, false).levelLength) * Math.cos(middleRotationAngle);
    let leftSideZ = - 2 * 14;

    //Checkpoints (where main sections of AulasBuilding should be)
    let rightMainStairsX = 8;
    let rightSideX = rightMainStairsX + (new Story(1, false, true, 4, true).levelLength) / 2 + 11.5;
    let orphanAulasX = -rightMainStairsX - aulaLengthX / 2;
    let leftMainStairsX = orphanAulasX - aulaLengthX;
    let leftSideX = leftMainStairsX - (new Story(1, false, true, 4, true).levelLength) / 2 - .5;

    //Create rightSide (where the labs were) of Aulas2
    for (var i = 0; i < 4; i++) {
        var level = new Story(i + 1, false, i == 3, 4, true, true, true);
        this.rightSideLevels.push(level);

        level.object3D.position.y = level.levelHeight * i;
        level.object3D.position.x = rightSideX;
        level.object3D.position.z = -8;
        aulasBuilding.add(level.object3D);
    }

    //Create middle orphan levels (that do not belong to the left or right sections of an Aulas Building)
    for (var i = 0; i < 5; i++) {
        var level = new Story(i + 1, aulasBuildingNum == 1, false, 1, false);
        this.orphanLevels.push(level);

        level.object3D.position.y = level.levelHeight * i;
        level.object3D.position.x = orphanAulasX;
        level.object3D.position.z = leftSideZ + 2.5;
        level.object3D.rotation.y += middleRotationAngle;
        aulasBuilding.add(level.object3D);
    }

    //Create fast fruit/banderas only once
    if (aulasBuildingNum == 2) 
    {
        var ffArea = makeFastFruitArea();
        ffArea.rotation.y += middleRotationAngle;
        ffArea.position.y = 3.25 * 5/2 + .1;
        ffArea.position.x -= 4.28;
        ffArea.position.z += 2.18;
        aulasBuilding.add(ffArea);
    }

    //Create left stairs
    let leftMainStairs = makeAulaStairs(5);
    leftMainStairs.position.z = leftSideZ;
    leftMainStairs.position.x = leftMainStairsX;
    aulasBuilding.add(leftMainStairs);

    //Create leftSide (parallel to OXXO?)
    for (var i = 0; i < 6; i++) {
        var level = new Story(i + 1, aulasBuildingNum == 1, i == 5, 4, true, true, true);
        this.leftSideLevels.push(level);

        level.object3D.position.y = level.levelHeight * i;
        level.object3D.position.x = leftSideX;
        level.object3D.position.z = leftSideZ;
        level.object3D.scale.x *= -1;
        aulasBuilding.add(level.object3D);
    }

    return aulasBuilding;
}