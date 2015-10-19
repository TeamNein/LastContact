var TopDownGame = TopDownGame || {};

TopDownGame.Title = function(){};

// Text properties
var titleText;
var clickText;
var fonts = ['Revalia', 'Exo', 'Press Start 2P', 'Audiowide', 'Nova Square', 'Geo'];
var currFont = fonts[3];
var fontColor = '#00FF00';
var titleSize = 80; 
var clickSize = titleSize - 30;

WebFontConfig = {

    // Set a delay
    active: function() { 
        //this.game.time.events.add(1000, createText, this); 
       // this.createText();
    },

    // The Google Fonts we want to load, specified in the array above
    google: {
        families: fonts
    }

};

TopDownGame.Title.prototype = {

    create: function() {
    	this.game.add.tileSprite(0, 0, 800, 400, "spacetitle"); 
    	var cursors; 
    	this.cursors = this.game.input.keyboard.createCursorKeys();


    	titleText = this.game.add.text(this.game.width / 2, 100, "Last Contact");
        titleText.anchor.setTo(0.5, 0.5);
        titleText.font = currFont;
        titleText.fill = fontColor;
        titleText.fontSize = titleSize; 

        clickText = this.game.add.text(this.game.width / 2, 330, "Click to start");
        clickText.anchor.setTo(0.5, 0.5);
        clickText.font = currFont;
        clickText.fill = fontColor;
        clickText.fontSize = clickSize;


        var ship = this.game.add.sprite(0, 200, 'ship');
        ship.enableBody = true; 
        ship.scale.setTo(.5, .5);
        this.game.physics.arcade.enable(ship);
        ship.body.velocity.x = 50; 

        this.game.input.onTap.addOnce(this.start,this);

        music = this.game.add.audio('music');
        music.play();
    },

 	update: function() {

    },
    start: function() {
        this.state.start("Game");
    }

};
