Alien.prototype = Object.create(Phaser.Sprite.prototype);

Alien.prototype.constructor = Alien; 

Alien.prototype.force = {x: 0.0, y:0.0};


//alien will shoot bullets 
var bullets; 
var fireRate = 100; 
var nextFire = 0; 


function Alien(game, direction, speed) { 

	//var alien = group.create(0, 0, 'alien');

	//copied from keys function 
	result = this.findObjectsByType('alien', this.map, 'Objects');

    result.forEach(function(element){
    	this.createFromTiledObject(element, this.aliens);
    }, this);

	//Phaser.Sprite.call(this, game, x, y, 'alien');
	result.scale.set(.10, .10); 
	result.anchor.setTo(0, 0);
	result.physics.enable(this, Phaser.Physics.ARCADE); 

	result.body.alllowGravity; 
	result.body.gravity.y = 100; 
	result.body.allowRotation = false; 

	//give alien inital speed and direction
	alien.xSpeed = direction * speed; 

	//alien.startPosX = x;
	//alien.startPosY = y;

	//aliens bullets
	bullets = game.add.group(); 
	bullets.enableBody = true; 
	bullets.physicsBodyType = Phaser.Physics.ARCADE; 

	bullets.createMultiple(40, 'bullet');
	bullets.setAll('checkWorldBounds', true);
	bullets.setAll('outOfBoundsKill', true);

	game.add.existing(alien);


 	this.shoot = function() {

    //  Grab the first bullet we can from the pool
 	var bullet = bullets.getFirstExists(false);

	if (bullet)
		{
			 this.body.velocity.x = this.xSpeed;
	         bullet.reset(this.x, this.y);
	         bullet.body.velocity.x = this.xSpeed*10;
	         bullet.scale.set(.25, .25);
	    }
	}; 


}

//update alien position
Alien.prototype.update = function () {
	//game.physics.arcade.collide(this, platformgroup, moveAlien(this, this.x)); 
	this.body.velocity.x = this.xSpeed; 


	if(this.xSpeed > 0 && this.x > this.startPosX + 10 || this.xSpeed<0 && this.x< this.startPosX - 10) {
		this.xSpeed *= -1; 
		this.shoot();
	}

}
