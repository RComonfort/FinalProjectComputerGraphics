/*A01328937	Luis Francisco Flores Romero*/
/*A01324276	Rafael Antonio Comonfort Viveros*/
/*25.nov.2018*/
function AmusementPark(scene) {
    
    this.object3D = new THREE.Object3D();
    
    this.carousel = new Carousel();
    this.carousel.object3D.position.set(0, 0, -10);
    this.object3D.add(this.carousel.object3D);

    this.wheelSlim = new FerrisWheelSlim( 40, 24, 0.4, 4.5 );
    this.wheelSlim.mesh.position.set( -110, 0, -50 );
    this.wheelSlim.mesh.rotation.y += Math.PI / 5;
    this.object3D.add(this.wheelSlim.mesh);
    
    this.wheel = new FerrisWheel();
    this.wheel.object3D.position.set(30, 0, -25);
    this.wheel.object3D.rotation.y -= Math.PI / 5;
    this.object3D.add(this.wheel.object3D);
    
    this.dropTower = new DropTower();
    this.dropTower.object3D.position.set(-30, 0, -30);
    this.object3D.add(this.dropTower.object3D);

    this.object3D.position.set(-40, 0, -90);
    this.object3D.scale.set(.48, .48, .48);
    scene.add(this.object3D);

    this.animate = function() {
        this.wheelSlim.rotate(-0.2);
        this.wheel.animate();
        this.carousel.animate();
        this.dropTower.animate();
    }
}