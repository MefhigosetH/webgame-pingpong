/*
* See https://phaser.io/examples/v3/view/physics/arcade/custom-bounds
*/
import Paleta from "../gameObjects/Paleta.js";
import Pelota from "../gameObjects/Pelota.js";

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({key: 'PlayScene'})
    }

    create(){
        this.ancho_juego = this.sys.game.config.width;
        this.alto_juego = this.sys.game.config.height;
        this.centro_x = this.ancho_juego / 2;
        this.centro_y = this.alto_juego / 2;

        // Cancha
        let cancha = new Phaser.Geom.Rectangle(50, 50, this.ancho_juego - 100, this.alto_juego - 100);
        this.add.image(this.centro_x, this.centro_y, 'separador');

        // Paletas
        this.paleta_izq = new Paleta(this, 70, this.centro_y);
        this.paleta_izq.body.setBoundsRectangle(cancha);

        this.paleta_der = new Paleta(this, this.ancho_juego - 70, this.centro_y);
        this.paleta_der.body.setBoundsRectangle(cancha);

        // Bola
        this.bola = new Pelota(this, this.centro_x, this.centro_y);
        this.bola.body.setVelocityX(-400);
        this.bola.body.setBoundsRectangle(cancha);

        this.add.graphics()
        .lineStyle(5, 0xffffff, 1)
        .strokeRectShape(this.bola.body.customBoundsRectangle);

        // Fisicas
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.physics.add.collider(this.bola, this.paleta_izq, this.palaCollide, null, this);
        this.physics.add.collider(this.bola, this.paleta_der, this.palaCollide, null, this);

        // Controles
        this.cursor = this.input.keyboard.createCursorKeys();
        this.s_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.input.addPointer(2);

        var fullscreen_button = this.add.image(this.ancho_juego - 50, 10, 'fullscreen', 0)
                                .setOrigin(1, 0)
                                .setInteractive()
                                .setScale(0.4);
                                
        fullscreen_button.on('pointerup', function () {

            if (this.scale.isFullscreen) {
                fullscreen_button.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                fullscreen_button.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);
    }

    update() {

        // Control bola
        if(this.bola.x < 0 || this.bola.x > this.ancho_juego) {
            this.bola.setPosition(this.centro_x, this.centro_y);
            this.palaCollide();
        }

        // Control pala derecha
        if( this.cursor.up.isDown ) {
            this.paleta_der.body.setVelocityY(-300);
        }
        else if (this.cursor.down.isDown) {
            this.paleta_der.body.setVelocityY(300);
        }
        else {
            this.paleta_der.body.setVelocityY(0);
        }

        if (this.input.pointer1.isDown &&
            this.input.pointer1.x > this.centro_x) {
            this.paleta_der.y = this.input.pointer1.y;
        }

        if (this.input.pointer2.isDown &&
            this.input.pointer2.x > this.centro_x) {
            this.paleta_der.y = this.input.pointer2.y;
        }

        // Control pala izquierda
        if( this.w_key.isDown ) {
            this.paleta_izq.body.setVelocityY(-300);
        }
        else if ( this.s_key.isDown ) {
            this.paleta_izq.body.setVelocityY(300);
        }
        else {
            this.paleta_izq.body.setVelocityY(0);
        }

        if (this.input.pointer1.isDown &&
            this.input.pointer1.x < this.centro_x) {
            this.paleta_izq.y = this.input.pointer1.y;
        }

        if (this.input.pointer2.isDown &&
            this.input.pointer2.x < this.centro_x) {
            this.paleta_izq.y = this.input.pointer2.y;
        }
        
    }

    palaCollide() {
        this.bola.body.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}