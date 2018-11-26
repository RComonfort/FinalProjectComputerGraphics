/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*16.nov.2018*/

//	*************************************
//	BASIC MATERIALS
//	*************************************
let wire = new THREE.MeshBasicMaterial( {
	color: 0xffff00,
	wireframe: true
} );

let basic = new THREE.MeshBasicMaterial( {
	color: 0xaa0000
} );

let lambert = new THREE.MeshLambertMaterial( {
	color:  0x00aacc
} );

//	*************************************
//	CUSTOM MATERIALS
//	*************************************
let aviationAl = new THREE.MeshLambertMaterial( {
	color: 0x404040
} );
let aluminium = new THREE.MeshLambertMaterial( {
	color: 0x828282
} );
let steel = new THREE.MeshPhongMaterial( {
	color: 0xa5a5a5
} );
let whiteMetallicSheet = new THREE.MeshLambertMaterial( {
	color: 0xeeeeee
} );
let redSteel = new THREE.MeshLambertMaterial( {
	color: 0xe51e14,
	side: THREE.DoubleSide
} );
let wood = new THREE.MeshLambertMaterial( {
	color: 0x513902
} );
let psycho = new THREE.MeshNormalMaterial();
let glass = new THREE.MeshPhongMaterial( {
	color: 0x3fd2ff,
	transparent: true,
	opacity: 0.8
} );