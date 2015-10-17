var TopDownGame = TopDownGame || {};

TopDownGame.Title = function(){};

var text; 

TopDownGame.Title.prototype = {
 	preload: function() {
 		this.load.image('spacetitle', 'assets/images/spaceTitle.png');
 		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
 	
 	},

    create: function() {
    	this.game.add.tileSprite(0, 0, 800, 400, "spacetitle"); 
    	var cursors; 
    	this.cursors = this.game.input.keyboard.createCursorKeys();


    	text = this.game.add.text(100, 100, "welcome to last contact,\n Press left to enter game");
        text.font = 'Revalia';
        text.fill = "#FF0000";
        //text.fixedToCamera = true; 
        //text.cameraOffset.setTo(350, 200); 
        text.fontSize = 40; 
      
    },

 	update: function() {
    		 if (this.cursors.left.isDown) {
    		 		this.state.start("Game"); 

    		 }

    },

};
