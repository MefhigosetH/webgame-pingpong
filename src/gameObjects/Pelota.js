export default class Pelota extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y) {
        super(scene, x, y, 10, 10, 0xffffff, 1);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);
    }
}