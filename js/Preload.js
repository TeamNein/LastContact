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
        this.load.tilemap('level1', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'assets/tilemaps/level2-map2.json', null, Phaser.Tilemap.TILED_JSON);


        this.load.image('spacetiles', 'assets/images/tileset.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.spritesheet('alien', 'assets/images/alien_sheet.png', 32, 60);
        this.load.spritesheet('astronaut', 'assets/images/astro_sheet.png', 38, 60);
        this.load.image('Background', 'assets/images/starBGpixel.jpg');
        this.load.image('startdoor', 'assets/images/door.png');
        this.load.image('finishdoor', 'assets/images/doorend.png');

        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('bulletreversed', 'assets/images/bulletreversed.png');
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.audio('shootAudio', 'assets/sounds/Laser_Shoot.mp3');
        this.load.audio('dieAudio', 'assets/sounds/Powerup13.mp3');
        this.load.audio('keyAudio', 'assets/sounds/keyAudio.mp3');
        this.load.audio('lasershootAudio', 'assets/sounds/New_Laser_Shoot.wav');
        this.load.audio('jumpAudio', 'assets/sounds/Jump.wav');
        this.load.audio('music', 'assets/sounds/Music.mp3');
        },
        
    create: function() {
        this.state.start('Title');
    }
};