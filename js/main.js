var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(1024, 512, Phaser.AUTO, 'window');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game', TopDownGame.Game);

TopDownGame.game.state.start('Boot');