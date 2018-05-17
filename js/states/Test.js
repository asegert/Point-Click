//Sets up game
var Point = Point || {};

Point.TestState = {
  create: function() 
  {   
      //Start music
      Point.Music = this.add.audio('testBackground');
      Point.Music.play('', 0, 1, true);
      //Add background
      this.add.sprite(0, 0, 'garage');
      //Add placeholder text
      this.goalText = this.add.text(350, 50, "Ugh, this truck is a mess.\nI think it might be yours.\nCan you check?", {font: '24px', fill: '#FFFFFF', align: 'center'});
      this.alertText = this.add.text(350, 50, "", {font: '24px', fill: '#FFFFFF', align: 'center'});
      this.goalText.anchor.setTo(0.5, 0.5);
      this.alertText.anchor.setTo(0.5, 0.5);
      //Counters
      this.counter = 0;
      this.stage = 0;
      //Create group for the trash pieces to be collected
      this.garbage = this.add.group();
      //Add the truck as a button so it can be selected at the end
      this.truck = this.add.button(70, 150, 'truckO', function()
      {
            //Check that it is the right stage to end the game
            if(this.stage === 5)
            {
                var rev = this.add.audio('rev');
                rev.play();
                this.goalText.setText('Vroom');
                console.log('Game Over');
            }
            //Check if it is the water stage when no alert should be launched
            else if(this.stage === 3 || this.stage === 4)
            {
                
            }
            //When any other stage alert a message
            else
            {
                this.game.time.events.removeAll();
                this.goalText.alpha=0;
                this.alertText.setText("Well, hitting it won't work");
                this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    this.alertText.setText('');
                    this.goalText.alpha=1;
                }, this);
            }
      }, this);
      //Add the dirt that needs washed off
      this.wash = this.add.sprite(70, 150, 'wash');
      //Add the keyfob base
      this.keyFob = this.add.sprite(0, 0, 'keyfob');
      //Add the top 'Lock' button with alert
      this.keyFobLock = this.add.button(31, 35, 'keyfobLock', function()
      {
          this.game.time.events.removeAll();
          this.goalText.alpha=0;
          this.alertText.setText("It's already locked.");
          this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
          {
            this.alertText.setText('');
              this.goalText.alpha=1;
          }, this);
      }, this);
      //Add the second 'Unlock' button with alert and advancement when on correct stage
      this.keyFobUnlock = this.add.button(31, 62, 'keyfobUnlock', function()
      {
          if(this.stage === 1)
          {
              this.goalText.setText("Well it's unlocked, but it looks like we need a\nkey to start the truck.\nMaybe it's underneath all this trash.");
              this.stage++;
          }
          else
          {
              this.game.time.events.removeAll();
              this.goalText.alpha=0;
              this.alertText.setText("Let's not unlock your truck until\nwe are sure this is it.");
              this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
              {
                  this.alertText.setText('');
                  this.goalText.alpha=1;
              }, this);
          }
      }, this);
      //Add the third 'Trunk' button with alert
      this.keyFobTrunk = this.add.button(31, 93, 'keyfobTrunk', function()
      {
          this.game.time.events.removeAll();
          this.goalText.alpha=0;
          this.alertText.setText("It's a truck, there's no trunk.");
          this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
          {
              this.alertText.setText('');
              this.goalText.alpha=1;
          }, this);
      }, this);
      //Add the final 'Alarm' button with alert and advancement when on correct stage
      this.keyFobAlarm = this.add.button(33, 125, 'keyfobAlarm', function()
      {
          var alarm = this.add.audio('alarm');
          alarm.play();
          this.goalText.setText("Sounds like it's your truck. Now to get into it...");
          this.stage++;
      }, this);
      //Add the buttons to the fob background
      this.keyFob.addChild(this.keyFobLock);
      this.keyFob.addChild(this.keyFobUnlock);
      this.keyFob.addChild(this.keyFobTrunk);
      this.keyFob.addChild(this.keyFobAlarm);
      //A bucket of water button. The texture will change once it can activate the next stage otherwise a simple alert is launched.
      this.bucket = this.add.button(10, 600, 'cleanWaterBucket', function(button)
      {
          if(button.key != 'cleanWaterBucket')
          {
              this.pourWater();
          }
          else
          {
              this.game.time.events.removeAll();
              this.goalText.alpha=0;
              this.alertText.setText("It's a bucket of water.");
              this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
              {
                  this.alertText.setText('');
                  this.goalText.alpha=1;
              }, this);
          }
      }, this);
      this.bucket.anchor.setTo(0.1, 0.9);
      //Create the trash at random positions using a for loop
      for(var i=0; i<30; i++)
      {
          var rand = Math.floor(Math.random()*540)+80;
          
          if(rand <200)
          {
              var newRand = Math.floor(Math.random()*200)+440;
          }
          else
          {
              var newRand = Math.floor(Math.random()*50)+540;
          }
          
          this.garbage.add(this.add.button(rand, newRand, 'garbage', function(button)
          {
              if(this.stage === 2)
              {
                  this.garbage.remove(button);
                  button.kill();
                  //If all the garbage has been picked up activate the next stage
                  if(this.garbage.children.length === 0)
                  {
                      this.goalText.setText('You picked up all the trash!\nOh wait, there is a rag here.\nMaybe you could use it to clean something?');
                      //Add a rag to 'remove the dirt' from the truck
                      this.add.button(60, 570, 'rag2', function(rag)
                      {
                          rag.kill();
                          this.keyFob.destroy();
                          this.rag = this.game.make.sprite(0, 0, 'rag2');
                          this.rag.anchor.set(0.5, 0.5);
                          //Create the data to remove the dirt
                          this.chaos = this.game.make.sprite(0, 0, 'maskData');
                          this.bmd = this.game.make.bitmapData(700, 651);
                          this.game.add.sprite(0, 0, this.bmd)

                          //When input is coming in remove dirt
                          this.game.input.addMoveCallback(this.move, this);
          
                      }, this);
                      this.stage++;
                  }
              }
          }, this));
      }
      this.world.bringToTop(this.garbage);
   },
   move: function (pointer)
   {
       //move our brush
       this.rag.x = pointer.position.x-0;
       this.rag.y = pointer.position.y-0;
       //'Alpha-ize' the area covered by the scratch
       //Clear the instruction data
       this.bmd.alphaMask(this.chaos, this.rag);
       if(pointer.x>50 && pointer.x<650 && pointer.y>100 && pointer.y<500)
       {
           this.counter++;
       }
       //If enough should be uncovered remove the dirt and the bitmap data
       if(this.counter>3300)
       {
           this.bucket.loadTexture('waterBucket');
           this.wash.kill();
           this.bmd.clear();
           this.game.input.deleteMoveCallback(this.move, this);
           this.goalText.setText('Ugh, look at that filthy water, you should pour that out.');
       }
       this.world.bringToTop(this.bucket);
   },
   pourWater: function()
   {
        //Create an emitter for water particles
        var waterEmitter = this.game.add.emitter(50, this.game.world.centerY - 200);
        waterEmitter.bounce.setTo(0.5, 0.5);
        waterEmitter.setXSpeed(100, 200);
        waterEmitter.setYSpeed(-50, 50);
        //Allow the water to be clicked
        waterEmitter.enableBody = true;
        waterEmitter.inputEnableChildren = true;
        //When a water drop is clicked display an alert
        waterEmitter.onChildInputDown.add(function(drop, pointer)
        {
            this.game.time.events.removeAll();
            this.goalText.alpha=0;
            this.alertText.setText('Ooo, pretty water');
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
            {
                this.alertText.setText('');
                this.goalText.alpha=1;
            }, this);
        }, this);
        //Start the water emitter
        waterEmitter.makeParticles('waterParticle', 0, 5000, true, true);
        //The emitter for the key
        var keyEmitter = this.game.add.emitter(50, this.game.world.centerY - 200);
        keyEmitter.bounce.setTo(0, 0);
        keyEmitter.setXSpeed(100, 200);
        keyEmitter.setYSpeed(-50, 50);
        //Allow the key to be clicked
        keyEmitter.enableBody = true;
        keyEmitter.inputEnableChildren = true;
        //When the key is clicked move on to the next stage
        keyEmitter.onChildInputDown.add(function(key, pointer)
        {
            key.kill();
            keyEmitter.kill();
            waterEmitter.on = false;
            this.bucket.destroy();
            this.goalText.setText('You found the key, now you can start it up!');
            this.stage++;
        }, this);
        keyEmitter.makeParticles('key1', 0, 1, true, true);
       //Move the bucket to the pouring location
       var bucketTween = this.add.tween(this.bucket).to({y: this.game.world.centerY - 200}, 1000, "Linear", true);
        bucketTween.onComplete.add(function()
        {
            if(this.stage === 3)
            {
                var pourTween = this.add.tween(this.bucket).to({rotation: 1.2}, 500, "Linear", true);
                pourTween.onComplete.add(function()
                {
                 waterEmitter.start(false, 3000, 0.1);
      
                    //Time tween to delay the key falling, using a null tween as a timer could be removed if an alert is triggered
                    var timeTween = this.add.tween(this.bucket).to({alpha: 1}, 2000, "Linear", true);
                    timeTween.onComplete.add(function()
                    {
                        //Start the key emitter
                        keyEmitter.start(false, 3000, 0.1);
                    }, this);
                    this.world.bringToTop(this.bucket);
                }, this);
                this.stage++;
            }
        }, this);
   }
}