
function createITESM(scene) {
    var aulas2 = new AulasBuilding(2).object3D;
    scene.add(aulas2);
    aulas2.castShadow = true;
    aulas2.receiveShadow = true;

    var aulas1 = new AulasBuilding(1).object3D;
    aulas1.scale.z *= -1;
    aulas1.scale.x *= -1;
    aulas1.position.x = -8.9;
    aulas1.position.z = 4.3;
    aulas1.position.y = 3.3;
    scene.add(aulas1);
    aulas1.castShadow = true;
    aulas1.receiveShadow = true;
}