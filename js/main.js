var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(800, 400, Phaser.AUTO, 'window');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Title', TopDownGame.Title); 

TopDownGame.game.state.add('Game', TopDownGame.Game);
TopDownGame.game.state.add('level2', TopDownGame.level2); 
TopDownGame.game.state.add('Gameover', TopDownGame.Gameover);

TopDownGame.game.state.start('Boot');