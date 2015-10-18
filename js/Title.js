var TopDownGame = TopDownGame || {};

TopDownGame.Title = function(){};

var text; 

TopDownGame.Title.prototype = {

    create: function() {
    	this.game.add.tileSprite(0, 0, 800, 400, "spacetitle"); 
    	var cursors; 
    	this.cursors = this.game.input.keyboard.createCursorKeys();


    	text = this.game.add.text(100, 100, "Welcome to last contact, [type directions here] \n Press left to enter game");
        text.font = 'Revalia';
        text.fill = "#00FF00";
        //text.fixedToCamera = true; 
        //text.cameraOffset.setTo(350, 200); 
        text.fontSize = 30; 

        var ship = this.game.add.sprite(0, 200, 'ship');
        ship.enableBody = true; 
        ship.scale.setTo(.5, .5);
        this.game.physics.arcade.enable(ship);
        ship.body.velocity.x = 50; 
        this.game.input.onTap.addOnce(this.start,this);
    },

 	update: function() {

    },
    start: function() {
        this.state.start("Game");
    }

};
