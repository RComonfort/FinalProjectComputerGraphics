/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function FerrisWheel() {
    this.object3D = makeFerrisWheel();
    this.object3D.scale.set(2.5, 2.5, 2.5);

	this.animate = function() {
		this.object3D.children[0].rotation.z += 0.001; //rotationG

		var pods = this.object3D.children[0].children[2].children; //pods
		for (var i = 0; i < pods.length; i++) {
			pods[i].rotation.z -= 0.001;
		}
	}
}
/**
 * FerrisWheel
 * 		rotationG     
 * 			body
 *      	center
 * 			podsG
 *		anchor
 */
function makeFerrisWheel() {

    //Materials
    let whiteWireMat = new THREE.MeshLambertMaterial({color: 0x868781, wireframe: true});
    let blackMat = new THREE.MeshLambertMaterial({color: 0x222222, side: THREE.DoubleSide});

    //Measures and constants
    let wheelRadius = 10;
    let wheelHeight = 3;
    let centerRadius = 1;
    let anchorRadius = 3;
    let anchorHeightScaleFactor = 2;
    let numPods = 16;

	//groups
	var ferrisWheel = new THREE.Object3D();
	var podG = new THREE.Object3D();
	var rotationG = new THREE.Object3D();

	//objects
    let bodyGeom = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelHeight, 32);
    let body = new THREE.Mesh(bodyGeom, whiteWireMat);

    let centerGeom = new THREE.CylinderGeometry(centerRadius, centerRadius, wheelHeight, 32);
    let center = new THREE.Mesh(centerGeom, blackMat);

    let anchorGeom = new THREE.ConeGeometry(anchorRadius, wheelRadius * anchorHeightScaleFactor, 3, 1, false,  -Math.PI / 2, Math.PI);
    let anchor = new THREE.Mesh(anchorGeom, blackMat);
   
	//Add objs to hierarchy
	rotationG.add(body, center, podG)
    ferrisWheel.add(rotationG, anchor);

    //Create pods
    for (var i = 0; i < numPods; i++) {
        var pod = createPod();
        var angle = i * (Math.PI * 2) / numPods;
        podG.add(pod);

        pod.position.set(wheelRadius * Math.cos(angle), wheelRadius * Math.sin(angle), 0);
    }

    anchor.position.y = wheelRadius * anchorHeightScaleFactor / 2.0;
    anchor.position.z += anchorRadius / 2.0 + .3;

	body.rotation.x += Math.PI / 2.0;
	center.rotation.x += Math.PI / 2.0;
    rotationG.position.y += anchor.position.y * 1.2;

    return ferrisWheel;
}

/**
 * 	Pod
 * 		floor
 * 		podBody
 * 		umbrella
 * 
 */
function createPod() {

    let radius = 1.25;
    let height = radius * .75;

    let material = new THREE.MeshLambertMaterial({color: 0xefeb0e});
    let blackMat = new THREE.MeshLambertMaterial({color: 0x222222, side: THREE.DoubleSide});

    var pod = new THREE.Object3D();

    let umbrella = createUmbrellaObject(radius, height / 2, material);

    let podGeom = new THREE.CylinderGeometry(radius, radius, height, 6, 1, true);
    let podBody = new THREE.Mesh(podGeom, blackMat);

    let floorGeom = new THREE.CylinderGeometry(radius, radius, 0.05, 6, 1, false);
    let floor = new THREE.Mesh(floorGeom, blackMat);
    
	pod.add(floor, podBody, umbrella);
	floor.position.y -= height / 2.0;

    return pod;
}