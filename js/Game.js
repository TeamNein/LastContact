var TopDownGame = TopDownGame || {};

// Title screen

//to update text for player lives 
var text; 
var player_invinsible_time = 2;
var player_is_invinsible = false;
var jump_velocity = 350;
var x_velocity = 150;
var shootAudio; 
var dieAudio; 
var keyAudio; 

TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
    create: function() {

        this.map = this.game.add.tilemap('level1');
        var sky = this.game.add.image(0, 0, 'Background');

        // Arguments: tileset name as specified in Tiled
        // key to the asset
        this.map.addTilesetImage('tiles', 'spacetiles');

        // Create layer
        this.blockedLayer = this.map.createLayer('TileLayer');
        this.toxicLayer = this.map.createLayer('ToxicLiquidLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(0, 2000, true, 'TileLayer');
        this.map.setCollisionBetween(400, 405, true, 'ToxicLiquidLayer');

        // Resize the game world to match the layer dimensions
        this.blockedLayer.resizeWorld();

        this.createKey();
 
        this.createAlien();

        this.createStartDoors();
        this.createFinishDoors();

        // Create player
        var result = this.findObjectsByType('playerStart', this.map, 'Objects')
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'astronaut');
        this.player.scale.setTo(0.5, 0.5);


        var spriteFPS = 5;
        this.player.animations.add('left', [0, 1, 2], spriteFPS, true);
        this.player.animations.add('right', [4, 5, 6], spriteFPS, true);

        this.game.physics.arcade.enable(this.player);

        //  Player physics properties
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;


        //give the player 5 lives, lost when hit alien/bullet
        this.player.health = 5; 

        // Makes the camera follow the player in the world
        this.game.camera.follow(this.player);

        // Move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //create bullets to shoot
        bullets = this.game.add.group(); 
        bullets.enableBody = true; 

        this.game.physics.enable(bullets, Phaser.Physics.ARCADE); 

        bullets.createMultiple(40, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        bulletsreversed = this.game.add.group(); 
        bulletsreversed.enableBody = true; 
        this.game.physics.enable(bulletsreversed, Phaser.Physics.ARCADE); 

        bulletsreversed.createMultiple(40, 'bulletreversed');
        bulletsreversed.setAll('checkWorldBounds', true);
        bulletsreversed.setAll('outOfBoundsKill', true);

        text = this.game.add.text(650, 50, "LIVES: " + this.player.health);
        text.font = 'Revalia';
        text.fill = "#00FF00";
        text.fixedToCamera = true; 
        text.cameraOffset.setTo(650, 50); 
        text.fontSize = 20;

         shootAudio = this.game.add.audio('shootAudio'); 
         dieAudio = this.game.add.audio ('dieAudio');
         keyAudio = this.game.add.audio ('keyAudio'); 

    },
    

    createKey: function() {
        // Create keys the player can pick up
        this.keys = this.game.add.group();
        this.keys.enableBody = true;
        var key;
        result = this.findObjectsByType('key', this.map, 'Objects');

        result.forEach(function(element){
          this.createFromTiledObject(element, this.keys);
        }, this);
    },

    createAlien: function () {

        this.enemies = this.game.add.group();

        var result = this.findObjectsByType('alien', this.map, 'Objects');

        //loop through array of found aliens in tilemap 
        var index; 
        for(index = 0; index < result.length; index++){
            this.alien = this.game.add.sprite(result[index].x, result[index].y, 'alien');
            var spriteFPS = 5; 
            this.alien.animations.add('left', [0, 1, 2, 3], spriteFPS, true);
            this.alien.animations.add('right', [5, 6, 7, 8], spriteFPS, true);
            this.alien.scale.setTo(0.7, 0.7);
            this.alien.enableBody = true; 
            this.game.physics.arcade.enable(this.alien);
            this.alien.body.collideWorldBounds = true;
            this.game.physics.arcade.collide(this.alien, this.blockedLayer);
            this.alien.body.gravity.y = 25;
            this.alien.body.velocity.x = 10; 
            this.alien.startPosX = this.alien.x; 
            this.alien.anchor.setTo(0.5, 0.5);
            this.enemies.add(this.alien); 
        }
    },

    createKey: function() {
        // Create keys the player can pick up
        this.keys = this.game.add.group();
        this.keys.enableBody = true;
        var key;    
        result = this.findObjectsByType('key', this.map, 'Objects');

        result.forEach(function(element){
          this.createFromTiledObject(element, this.keys);
        }, this);
    },
    
    createStartDoors: function() {
        //create doors
        this.startDoors = this.game.add.group();
        this.startDoors.enableBody = true;
        var startdoor; 
        result = this.findObjectsByType('startdoor', this.map, 'Objects');

        result.forEach(function(element){
          this.createFromTiledObject(element, this.startDoors);
        }, this);
    },
    createFinishDoors: function() {
        //create doors
        this.finishDoors = this.game.add.group();
        this.finishDoors.enableBody = true;
        var finishdoor;
        result = this.findObjectsByType('finishdoor', this.map, 'Objects');
        result.forEach(function(element){
            console.log(element.x + " and " + element.y);
          this.createFromTiledObject(element, this.finishDoors);
        }, this);
    },

    // Find objects such that containt a property called "type" equal to a certain value
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                // Phaser uses top left, Tiled bottom left
                // Note: keep in mind the size of objects relative to tiles
                element.y -= map.tileHeight;
                result.push(element);
            }      
        });
        return result;
    },

    // Create a sprite from an object
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        // Copy all properties to the sprite
                    console.log(element);

        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    },

    update: function() {
        // Handle collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);  
        this.game.physics.arcade.collide(this.enemies, this.blockedLayer);
        this.game.physics.arcade.collide(this.player, this.toxicLayer, this.PlayerToxicOverlap, null, this);
        this.game.physics.arcade.overlap(this.player, this.keys, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemies, this.PlayerEnemyOverlap, null, this);
        this.game.physics.arcade.overlap(this.player, bullets, this.PlayerBulletOverlap, null, this);
        this.game.physics.arcade.overlap(this.player, bulletsreversed, this.PlayerBulletOverlap, null, this);


        this.player.body.velocity.x *= .1;

        if (this.cursors.left.isDown)
        {
            // Move to the left
            this.player.body.velocity.x = -x_velocity;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            // Move to the right
            this.player.body.velocity.x = x_velocity;

            this.player.animations.play('right');
        }
        else
        {
            // Stand still
            this.player.animations.stop();

            this.player.frame = 3;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.blocked.down)
        {
            this.player.body.velocity.y = -jump_velocity;
        }

        this.enemies.forEach(function(alien){      

             if (alien.body.velocity.x > 0) {
                //alien.animations.play('right');
                if (alien.x > alien.startPosX + 20) {


                    alien.body.velocity.x *= -1; 
                    var bullet = bullets.getFirstExists(false);


                    if (bullet)
                    {
                        bullet.reset(alien.x, alien.y);
                        bullet.body.velocity.x = 250; 
                        bullet.scale.set(.025, .025);
                    }
                }
                alien.animations.play('right');

             } else if (alien.body.velocity.x < 0) {
                //alien.animations.play('left');

                 if (alien.x < alien.startPosX - 20) {
                     alien.body.velocity.x *= -1;
                     var bullet = bulletsreversed.getFirstExists(false);

                     if (bullet)
                     {
                         bullet.reset(alien.x, alien.y);
                         bullet.enableBody = true;
                         bullet.body.velocity.x = -250;
                         bullet.scale.set(0.025, 0.025);
                     }
                 }
                alien.animations.play('left');
             }
        });

        if (this.player.health == 0 ) {
            dieAudio.play(); 
             this.state.start("Gameover");
        }
    },

    toggleInvincible: function (mplayer) {
        this.player.invincible = !this.player.invincible; 
    },


    PlayerEnemyOverlap: function(mplayer, enemy){
         if(!this.player.invincible) {
                this.player.damage(1);   
                this.toggleInvincible(this.player); 
                this.game.time.events.add(1000 * player_invinsible_time, this.toggleInvincible, this); 
            

                mplayer.body.velocity.y = -jump_velocity; 
             
                console.log('Bullet hit! You have '  + mplayer.health + ' lives left' );
                text.setText("LIVES: " + mplayer.health); 
                shootAudio.play(); 
        }
    },

    PlayerBulletOverlap: function(mplayer, bullet){
         if(!this.player.invincible) {
                this.player.damage(1);   
                this.toggleInvincible(this.player); 
                this.game.time.events.add(1000 * player_invinsible_time, this.toggleInvincible, this); 
                bullet.kill();
             
                console.log('Bullet hit! You have '  + mplayer.health + ' lives left' );
                text.setText("LIVES: " + mplayer.health); 
               
                shootAudio.play(); 
        }
    },


    PlayerToxicOverlap: function(mplayer, enemy){
    
        this.player.damage(1);

        mplayer.body.velocity.y = -jump_velocity; 
     
        console.log('Bullet hit! You have '  + mplayer.health + ' lives left' );
        text.setText("LIVES: " + mplayer.health); 
        
    },
   
    collect: function(player, collectable) {
        console.log('collected');
        // Remove sprite
        keyAudio.play(); 
        collectable.destroy();
    },
    enterDoor: function(player, door) {
        console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
    },
};    



