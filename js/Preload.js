var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
    preload: function() {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('spacetiles', 'assets/images/tileset.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.spritesheet('astronaut', 'assets/images/astro_sheet.png', 38, 60);
        // // this.load.image('browndoor', 'assets/images/browndoor.png');
        this.load.image('Background', 'assets/images/starBG.jpg');

        },
        create: function() {
        this.state.start('Game');
    }
};