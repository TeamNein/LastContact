var TopDownGame = TopDownGame || {};

TopDownGame.EndGame = function(){};

var text; 

TopDownGame.EndGame.prototype = {

	create: function() {
		this.game.add.tileSprite(0, 0, 800, 400, "spacetitle"); 

        titleText = this.game.add.text(this.game.width / 2, 100, "YOU WON!");
        titleText.anchor.setTo(0.5, 0.5);
        titleText.font = currFont;
        titleText.fill = fontColor;
        titleText.fontSize = titleSize; 

        var numTeammates = localStorage.getItem('teammates');

        titleText = this.game.add.text(this.game.width / 2, 300, "Found " + numTeammates +  " Teammates!");
        titleText.anchor.setTo(0.5, 0.5);
        titleText.font = currFont;
        titleText.fill = fontColor;
        titleText.fontSize = clickSize; 

        localStorage.setItem('teammates', 0);



        clickText = this.game.add.text(this.game.width / 2, 530, "Click to play again");
        clickText.anchor.setTo(0.5, 0.5);
        clickText.font = currFont;
        clickText.fill = fontColor;
        clickText.fontSize = clickSize; 

        var cursors; 
    	this.cursors = this.game.input.keyboard.createCursorKeys();
    	this.game.input.onTap.addOnce(this.restart,this);

	},

	update: function () {
	
	},
    
	restart: function() {
        this.state.start("Game");
    },

}; 