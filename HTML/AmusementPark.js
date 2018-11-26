
function AmusementPark(scene) {
    
    this.object3D = new THREE.Object3D();
    
    this.carousel = new Carousel();
    this.carousel.object3D.position.set(0, 0, -10);
    this.object3D.add(this.carousel.object3D);

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
        this.wheel.animate();
        this.carousel.animate();
        this.dropTower.animate();
    }
}