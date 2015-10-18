var TopDownGame = TopDownGame || {};

TopDownGame.Gameover = function(){};

var text; 

TopDownGame.Gameover.prototype = {

	create: function( ) {
		this.game.add.tileSprite(0, 0, 800, 400, "spacetitle"); 
		text = this.game.add.text(100, 100, "GAME OVER. \n click or press enter to play again");
        text.font = 'Revalia';
        text.fill = "#00FF00";

        var cursors; 
    	this.cursors = this.game.input.keyboard.createCursorKeys();
    	this.game.input.onTap.addOnce(this.restart,this);

	},

	update: function ( ) {
	
	},
	restart: function() {
        this.state.start("Game");
    },

}; 