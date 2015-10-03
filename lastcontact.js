var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});

function preload() {

    game.load.image('backdrop', 'starBG.jpg');
    game.load.image('astronaut', 'astronaut.png');

    //... enemy and such

}

var player;
var cursors;
//var enemy;
//var platform;
//var button;

function create() {
    game.physics.enable(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    player = new Player(game, game.world.centerX, game.world.centerY);

    game.camera.follow(player);
}

function update() {

}
