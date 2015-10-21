var TopDownGame = TopDownGame || {};

var TOTAL_LEVELS = 2;

// Update text for player lives and teammates 
var text;
var teamText;
var keyText;

// Invincibility
var player_invincible_time = 2;
var player_is_invincible = false;

var current_level = 0;
var jump_velocity = 350;
var x_velocity = 150;
var shootAudio; 
var dieAudio; 
var keyAudio; 
var keys_collected;
var team_found;
var total_keys;
var total_team;
var total_found_teammates = 0;
var level_names = ["level0", "level1"];

TopDownGame.Game = function(){};

TopDownGame.Game.prototype = {
    create: function() {

        var sky = this.game.add.image(0, 0, 'Background');

        this.resetCounters();
        this.createTilemap(0);
        this.createLevelObjects();
        this.createPlayer();
        this.createText();
        // Move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
       
        
        // Audio
        shootAudio = this.game.add.audio('shootAudio'); 
        dieAudio = this.game.add.audio ('dieAudio');
        keyAudio = this.game.add.audio ('keyAudio'); 
        newshootAudio = this.game.add.audio('lasershootAudio');
        jumpAudio = this.game.add.audio('jumpAudio');
        teamAudio = this.game.add.audio('teamAudio');
    },

    resetCounters: function(){
         // Reset all counters 
        keys_collected = 0;
        team_found = 0;
        total_keys = 0;
        total_team = 0;
    },

    createText: function(){
         // Create text to display player lives 
        text = this.game.add.text(650, 50, "LIVES: " + this.player.health);
        text.font = currFont;
        text.fill = "#00FF00";

        // Specify position
        text.fixedToCamera = true; 
        text.cameraOffset.setTo(650, 20); 
        text.fontSize = 20;

        // Create text to display teammate count
        teamText = this.game.add.text(650, 50, "TEAM: " + team_found + "/" + total_team);
        teamText.font = currFont;
        teamText.fill = "#f1940f"; 
        // Specify position
        teamText.fixedToCamera = true; 
        teamText.cameraOffset.setTo(50, 20); 
        teamText.fontSize = 20;

        keyText = this.game.add.text(650, 80, "");
        keyText.font = currFont;
        keyText.fill = "#fac458";
        // Specify position
        keyText.fixedToCamera = true; 
        keyText.cameraOffset.setTo(50, 50); 
        keyText.fontSize = 20;


    },

    createBullets: function(){
        console.log('creating bullets');
        // Create bullets to for aliens to shoot
        bullets = this.game.add.group(); 
        bullets.enableBody = true; 
        this.game.physics.enable(bullets, Phaser.Physics.ARCADE); 
        bullets.createMultiple(40, 'bullet');
        // Make bullets recyclable 
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        // Create bullets to shoot in the opposite direction
        bulletsreversed = this.game.add.group(); 
        bulletsreversed.enableBody = true; 
        this.game.physics.enable(bulletsreversed, Phaser.Physics.ARCADE); 
        // Make them recyclable as well
        bulletsreversed.createMultiple(40, 'bulletreversed');
        bulletsreversed.setAll('checkWorldBounds', true);
        bulletsreversed.setAll('outOfBoundsKill', true);
        console.log(bullets.getFirstExists());
    },

    createPlayer: function(){
        // Create player
        var result = this.findObjectsByType('playerStart', this.map, 'Objects')
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'astronaut');
        this.player.scale.setTo(0.5, 0.5);
        // Set up player animations
        var spriteFPS = 5;
        this.player.animations.add('left', [0, 1, 2, 3], spriteFPS, true);
        this.player.animations.add('right', [6, 7, 8, 9], spriteFPS, true);
        this.player.animations.add('still', [4, 5], 2, true);
        this.player.animations.add('lefthurt', [0, 10, 2, 10], spriteFPS, true);
        this.player.animations.add('righthurt', [6, 10, 8, 10], spriteFPS, true);
        this.player.animations.add('stillhurt', [4, 10], spriteFPS, true);

        // Add player to the game
        this.game.physics.arcade.enable(this.player);
        //  Player physics properties
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 500;
        this.player.body.collideWorldBounds = true;
        // Give the player 5 lives, lost on contact with alien/bullet
        this.player.health = 5; 

        // Makes the camera follow the player in the world
        this.game.camera.follow(this.player);
    },
    createTilemap: function(index){
        this.map = this.game.add.tilemap(level_names[index]);
        this.map.addTilesetImage('tiles', 'spacetiles');

          // Create layers
        this.blockedLayer = this.map.createLayer('TileLayer');
        this.toxicLayer = this.map.createLayer('ToxicLiquidLayer');

        // Collision on blockedLayer
        this.map.setCollisionBetween(0, 2000, true, 'TileLayer');
        this.map.setCollisionBetween(400, 405, true, 'ToxicLiquidLayer');

        // Resize the game world to match the layer dimensions
        this.blockedLayer.resizeWorld();

    },
    createLevelObjects: function(){
        this.createKey();
        this.createAlien();
        this.createFriend();

        this.createStartDoors();
        this.createFinishDoors();
        this.createBullets();
        //this.createText();

    },

    createFriend: function () {

        this.friends = this.game.add.group();

        var result = this.findObjectsByType('friend', this.map, 'Objects');

        var index;
        for (index = 0; index < result.length; index++) {
            this.friend = this.game.add.sprite(result[index].x, result[index].y, 'friend');
            var spriteFPS = 2; 
            this.friend.animations.add('still', [0, 1], spriteFPS, true);
            this.friend.scale.setTo(0.5, 0.5);
            this.friend.enableBody = true;
            this.game.physics.arcade.enable(this.friend);
            this.friend.body.collideWorldBounds = true;
            this.game.physics.arcade.collide(this.friend, this.blockedLayer);
            this.friend.body.gravity.y = 25;
            this.friend.anchor.setTo(0.5, 0.5);
            this.friends.add(this.friend);
            total_team++;
        }

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
            this.alien.body.gravity.y = 250;
            this.alien.body.velocity.x = 10; 
            this.alien.startPosX = this.alien.x; 
            this.alien.anchor.setTo(0.5, 0.5);
            this.enemies.add(this.alien);
        }
    },

    createKey: function () {
        // Create keys the player can pick up
        this.keys = this.game.add.group();
        this.keys.enableBody = true;
        var key;    
        result = this.findObjectsByType('key', this.map, 'Objects');

        result.forEach(function(element){
            total_keys++;
          this.createFromTiledObject(element, this.keys);
        }, this);
        console.log(total_keys);
    },
    
    createStartDoors: function () {
        this.startDoors = this.game.add.group();
        this.startDoors.enableBody = true;
        var startdoor; 
        result = this.findObjectsByType('startdoor', this.map, 'Objects');

        result.forEach(function(element){
            console.log(element.x + " and " + element.y);
            this.startdoor = this.game.add.sprite(element.x, element.y, 'startdoor');
            this.startdoor.anchor.setTo(.5, .5);
            this.startdoor.scale.setTo(0.12, 0.12);
            this.startDoors.add(this.startdoor);
        }, this);
    },
    createFinishDoors: function () {
        this.finishDoors = this.game.add.group();
        this.finishDoors.enableBody = true;
        var finishdoor;
        result = this.findObjectsByType('finishdoor', this.map, 'Objects');
        result.forEach(function(element){
            this.finishdoor = this.game.add.sprite(element.x, element.y, 'finishdoor');
            this.finishdoor.anchor.setTo(.5, .5);
            this.finishdoor.scale.setTo(0.12, 0.12);
            this.finishDoors.add(this.finishdoor);
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

    update: function () {
        // Collide every sprite with the blocks
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.friends, this.blockedLayer);
        this.game.physics.arcade.collide(this.enemies, this.blockedLayer);

        // Let enemies walk on the toxic waste
        this.game.physics.arcade.collide(this.enemies, this.toxicLayer);
        // Don't let player sink in toxic waste, but punish for colliding with it
        this.game.physics.arcade.collide(this.player, this.toxicLayer, this.PlayerToxicOverlap, null, this);

        // Handle player interaction with other object and block types
        this.game.physics.arcade.overlap(this.player, this.keys, this.collect, null, this);
        this.game.physics.arcade.overlap(this.player, this.friends, this.PlayerFriendOverlap, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemies, this.PlayerEnemyOverlap, null, this);
        this.game.physics.arcade.overlap(this.player, bullets, this.PlayerBulletOverlap, null, this);
        this.game.physics.arcade.overlap(this.player, bulletsreversed, this.PlayerBulletOverlap, null, this);
        this.game.physics.arcade.overlap(this.player, this.finishDoors, this.PlayerFinished, null, this);

        this.player.body.velocity.x *= .1;

        if (this.cursors.left.isDown)
        {
            // Move to the left
            this.player.body.velocity.x = -x_velocity;

            if (this.player.invincible)
                this.player.animations.play('lefthurt');
            else
                this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            // Move to the right
            this.player.body.velocity.x = x_velocity;

            if (this.player.invincible)
                this.player.animations.play('righthurt');
            else
                this.player.animations.play('right');
        }
        else
        {
            // Stand still
            if (this.player.invincible)
                this.player.animations.play('stillhurt');
            else
                this.player.animations.play('still');
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.blocked.down)
        {
            this.player.body.velocity.y = -jump_velocity;
            jumpAudio.play();
        }

        this.friends.forEach(function(friend){
            friend.animations.play('still');
        }); 

        this.enemies.forEach(function(alien){      

             if (alien.body.velocity.x > 0) {

                if (alien.x > alien.startPosX + 20) {
                    alien.body.velocity.x *= -1; 
                    var bullet = this.bullets.getFirstExists(false);


                    if (bullet)
                    {
                        bullet.reset(alien.x, alien.y);
                        bullet.body.velocity.x = 250; 
                        bullet.scale.set(.025, .025);
                    }
                    newshootAudio.play();
                }
                alien.animations.play('right');


             } else if (alien.body.velocity.x < 0) {

                 if (alien.x < alien.startPosX - 20) {
                     alien.body.velocity.x *= -1;
                     var bullet = this.bulletsreversed.getFirstExists(false);

                     if (bullet)
                     {
                         bullet.reset(alien.x, alien.y);
                         bullet.enableBody = true;
                         bullet.body.velocity.x = -250;
                         bullet.scale.set(0.025, 0.025);
                     }
                    newshootAudio.play();

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

    PlayerFinished: function(player, door) {
       // console.log(keys_collected + " and " + total_keys);
        if(keys_collected > 0){
            console.log("move to next level!");
            current_level++;
            total_found_teammates += team_found;
            localStorage.setItem('teammates', total_found_teammates);

            if(current_level == TOTAL_LEVELS)
                this.state.start("EndGame");
            else
                this.LoadLevel(current_level);
            //this.state.start("level2");
        }
    },
    LoadLevel: function(index){
        this.DestroyAllObjects();
        this.resetCounters();
        this.createTilemap(1);
        this.createLevelObjects();
        this.createPlayer();
        this.createText();
        teamText.setText("TEAM: " + team_found + "/" + total_team);

    },

    DestroyAllObjects: function(){
        this.player.destroy();
        this.enemies.destroy(true, false);
        bullets.destroy(true, false);
        bulletsreversed.destroy(true, false);
        this.startDoors.destroy(true, false);
        this.finishDoors.destroy(true, false);
        this.blockedLayer.destroy();
        this.toxicLayer.destroy();
        this.keys.destroy(true, false);
        text.destroy();
        teamText.destroy();
        keyText.destroy();
    },


    PlayerFriendOverlap: function(mplayer, friend){
        teamAudio.play();
        friend.destroy();
        team_found++;
        teamText.setText("TEAM: " + team_found + "/" + total_team);
    },

    PlayerEnemyOverlap: function(mplayer, enemy){
         if(!this.player.invincible) {
                this.player.damage(1);   
                this.toggleInvincible(this.player); 
                this.game.time.events.add(1000 * player_invincible_time, this.toggleInvincible, this); 
            

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
                this.game.time.events.add(1000 * player_invincible_time, this.toggleInvincible, this); 
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
        shootAudio.play();
        
    },
   
    collect: function(player, collectable) {
        console.log('collected');
        // Remove sprite
        keyAudio.play(); 
        collectable.destroy();
        keys_collected++;
        keyText.setText("KEY FOUND!");

    },

    enterDoor: function(player, door) {
        console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
    },
};    
