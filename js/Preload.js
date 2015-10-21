var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
    preload: function() {
        // For preload
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        // For title screen
        this.load.image('ship', 'assets/images/ship2.png');
        this.load.image('spacetitle', 'assets/images/spacetitle.jpg');

        // Tilemaps:
        //     Tutorial:
        this.load.tilemap('level0', 'assets/tilemaps/L0.json', null, Phaser.Tilemap.TILED_JSON);
        //     Level 1
        this.load.tilemap('level1', 'assets/tilemaps/L1.json', null, Phaser.Tilemap.TILED_JSON);
        //     Level 2
        this.load.tilemap('level2', 'assets/tilemaps/level2-map2.json', null, Phaser.Tilemap.TILED_JSON);

        // Sprites:
        this.load.image('Background', 'assets/images/starBGpixel.jpg');
        this.load.image('spacetiles', 'assets/images/tileset.png');
        this.load.image('key', 'assets/images/key.png');
        this.load.image('startdoor', 'assets/images/door.png');
        this.load.image('finishdoor', 'assets/images/doorend.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('bulletreversed', 'assets/images/bulletreversed.png');        
        this.load.spritesheet('alien', 'assets/images/alien_sheet.png', 32, 60);
        this.load.spritesheet('astronaut', 'assets/images/new_astro_sheet.png', 38, 60);
        this.load.spritesheet('friend', 'assets/images/team_sheet.png', 38, 60);

        // Fonts: 
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Audio: 
        this.load.audio('shootAudio', 'assets/sounds/Laser_Shoot.mp3');
        this.load.audio('dieAudio', 'assets/sounds/Powerup13.mp3');
        this.load.audio('keyAudio', 'assets/sounds/keyAudio.mp3');
        this.load.audio('lasershootAudio', 'assets/sounds/New_Laser_Shoot.wav');
        this.load.audio('jumpAudio', 'assets/sounds/Jump.wav');
        this.load.audio('teamAudio', 'assets/sounds/yay.wav');
        this.load.audio('music', 'assets/sounds/Music.mp3');
    },
        
    create: function() {
        this.state.start('Title');
    }
};