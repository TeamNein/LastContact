var TopDownGame = TopDownGame || {};

// Title screen
TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
    create: function() {

        this.map = this.game.add.tilemap('level1-5');
        var sky = this.game.add.image(0, 0, 'Background');

        // Arguments: tileset name as specified in Tiled
        //            key to the asset
        this.map.addTilesetImage('tiles', 'spacetiles');

        // Create layer
        this.blockedLayer = this.map.createLayer('TileLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(0, 2000, true, 'TileLayer');

        // Resize the game world to match the layer dimensions
        this.blockedLayer.resizeWorld();

        this.createKey();
 
        this.createAlien();

        // this.createDoors();    

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

        //this.player.hits = 0; 

        //give the player 5 lives, lost when hit alien/bullet
        this.player.health = 5; 
        //this.player.alive = true; 

        // Makes the camera follow the player in the world
        this.game.camera.follow(this.player);

        // Move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //create bullets to shoot
        bullets = this.game.add.group(); 
        bullets.enableBody = true; 
        //bullets.physicsBodyType = Phaser.Physics.ARCADE; 

        this.game.physics.enable(bullets, Phaser.Physics.ARCADE); 

        bullets.createMultiple(40, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        var text = this.game.add.text(650, 50, "lives left: " + this.player.health);
        text.font = 'Revalia';
        text.fill = "#00FF00";
        text.fixedToCamera = true; 
        text.cameraOffset.setTo(650, 50); 
        text.fontSize = 20;

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
            this.alien.scale.setTo(.075, .075);
            this.alien.enableBody = true; 
            this.game.physics.arcade.enable(this.alien);
            this.alien.body.collideWorldBounds = true;
            this.game.physics.arcade.collide(this.alien, this.blockedLayer);
            this.alien.body.gravity.y = 25;
            this.alien.body.velocity.x = 10; 
            this.alien.startPosX = this.alien.x; 
            this.enemies.add(this.alien); 
        }
    },
    
    createDoors: function() {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;

        result = this.findObjectsByType('door', this.map, 'Objects');
        result.forEach(function(element){
          this.createFromTiledObject(element, this.doors);
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
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    },

    update: function() {
        // Handle collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);  
        this.game.physics.arcade.collide(this.enemies, this.blockedLayer);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            // Move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            // Move to the right
            this.player.body.velocity.x = 150;

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
            this.player.body.velocity.y = -350;
        }

        // arcade.collide for barrier Object 
        this.game.physics.arcade.overlap(this.player, this.keys, this.collect, null, this);
        // this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);


        this.enemies.forEach(function(alien){        
             if((alien.body.velocity.x > 0 && alien.x > alien.startPosX + 20) || 

                (alien.body.velocity.x < 0 && alien.x < alien.startPosX - 20)) {

                    alien.body.velocity.x *= -1; 

                    var bullet = bullets.getFirstExists(false);

                    if (bullet)
                    {
                        bullet.reset(alien.x, alien.y);
                        bullet.enableBody = true; 
                        //multiply by sign of alien x velcity to send in correct direction 
                        bullet.body.velocity.x = (alien.body.velocity.x/alien.body.velocity.x) * 250; 
                        bullet.scale.set(.05, .05);
                    }

                } 
        }); 

        //could change to colllide instead of overlap         
        if(this.game.physics.arcade.overlap(this.player, this.enemies, null, null, this.game)) {
            this.player.damage(1);   
            //move it backwards so it doesn't get hit again... this sort of sucks
            //this.player.x = 0;
            //this.player.y = 1000;  

            this.player.body.velocity.y = -350;  
            //for dubugging
            console.log('Alien hit! You have ' + this.player.health + ' lives left'); 
        }


        if (this.game.physics.arcade.collide(this.player, bullets, null, null, this.game)) {
            this.player.damage(1);
            //this.player.x = 0; 
            //this.player.y = 1050; 
             this.player.body.velocity.y = -350; 
            //for debugging
            //bullets.remove();
            console.log('Bullet hit! You have '  + this.player.health + ' lives left' );
        }

    },

    collect: function(player, collectable) {
        console.log('collected');
        // Remove sprite
        collectable.destroy();
    },
    enterDoor: function(player, door) {
        console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
    },
  

};    





