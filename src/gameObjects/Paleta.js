export default class Paleta extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y) {
        super(scene, x, y, 10, 80, 0xffffff, 1);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.body.setCollideWorldBounds(true);
    }
}