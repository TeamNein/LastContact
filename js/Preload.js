var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
    preload: function() {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //for pregme screen
        this.load.image('ship', 'assets/images/ship2.png');
        this.load.image('spacetitle', 'assets/images/spaceTitle.jpg');

        //load game assets
        this.load.tilemap('level1', 'assets/tilemaps/level1-7.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('spacetiles', 'assets/images/tileset.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('alien', 'assets/images/alienTest.png');
        this.load.spritesheet('astronaut', 'assets/images/astro_sheet.png', 38, 60);
        // // this.load.image('browndoor', 'assets/images/browndoor.png');
        this.load.image('Background', 'assets/images/starBG.jpg');
        this.load.image('startdoor', 'assets/images/door.png');
        this.load.image('finishdoor', 'assets/images/doorend.jpg');

        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('bulletreversed', 'assets/images/bulletreversed.png');
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


        },
        
    create: function() {
        this.state.start('Title');
    }
};