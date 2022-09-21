import Paleta from "../gameObjects/Paleta.js";

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({key: 'PlayScene'})
    }

    create(){
        this.ancho_juego = this.sys.game.config.width;
        this.alto_juego = this.sys.game.config.height;
        this.centro_x = this.ancho_juego / 2;
        this.centro_y = this.alto_juego / 2;

        this.add.image(this.centro_x, this.centro_y, 'separador');

        // Paletas
        this.paleta_izq = new Paleta(this, 30, this.centro_y, 'paleta_izq');
        this.paleta_der = new Paleta(this, this.ancho_juego - 30, this.centro_y, 'paleta_der');

        // Bola
        this.bola = this.physics.add.image(this.centro_x, this.centro_y, 'bola');
        this.bola.setScale(2);
        this.bola.setVelocityX(-400);
        this.bola.setCollideWorldBounds(true);
        this.bola.setBounce(1);

        // Fisicas
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.physics.add.collider(this.bola, this.paleta_izq, this.palaCollide, null, this);
        this.physics.add.collider(this.bola, this.paleta_der, this.palaCollide, null, this);

        // Controles
        this.cursor = this.input.keyboard.createCursorKeys();
        this.s_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.input.addPointer(2);

        var fullscreen_button = this.add.image(this.ancho_juego - 16, 16, 'fullscreen', 0)
                                .setOrigin(1, 0)
                                .setInteractive()
                                .setScale(0.5);
                                
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
        this.bola.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}