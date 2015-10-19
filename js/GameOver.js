var TopDownGame = TopDownGame || {};

TopDownGame.Gameover = function(){};

var text; 

TopDownGame.Gameover.prototype = {

	create: function( ) {
		this.game.add.tileSprite(0, 0, 800, 400, "spacetitle"); 
        titleText = this.game.add.text(this.game.width / 2, 100, "GAME OVER!");
        titleText.anchor.setTo(0.5, 0.5);
        titleText.font = currFont;
        titleText.fill = fontColor;
        titleText.fontSize = titleSize; 

        clickText = this.game.add.text(this.game.width / 2, 330, "Click to play again");
        clickText.anchor.setTo(0.5, 0.5);
        clickText.font = currFont;
        clickText.fill = fontColor;
        clickText.fontSize = clickSize; 

		//text = this.game.add.text(100, 100, "GAME OVER! \n Click to play again");
        //text.font = currFont;
        //text.fill = "#00FF00";

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