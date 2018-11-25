
function AulasBuilding(aulasBuildingNum) {
    this.rightSideLevels = [];
    this.leftSideLevels = [];
    this.orphanLevels = [];
    this.object3D = this.makeAulasBuilding(aulasBuildingNum);
}

AulasBuilding.prototype.makeAulasBuilding = function(aulasBuildingNum) {

    var aulasBuilding = new THREE.Object3D();

    //Create rightSide (where the labs were) of an aulaBuilding
    for (var i = 0; i < 4; i++) {
        var level = new Story(i + 1, aulasBuildingNum == 1, i == 3, 4, true);
        this.rightSideLevels.push(level);

        level.object3D.position.y = level.levelHeight * i;
        aulasBuilding.add(level.object3D);
    }

    return aulasBuilding;
}