//Sets up game
var Point = Point || {};

Point.TestState = {
  create: function() 
  {  
      this.add.sprite(0, 0, 'garage');
      this.goalText = this.add.text(350, 50, "Ugh, this truck is a mess.\nI think it might be yours.\nCan you check?", {font: '24px', fill: '#FFFFFF', align: 'center'});
      this.alertText = this.add.text(350, 50, "", {font: '24px', fill: '#FFFFFF', align: 'center'});
      this.goalText.anchor.setTo(0.5, 0.5);
      this.alertText.anchor.setTo(0.5, 0.5);
      this.counter = 0;
      this.stage = 0;
      this.garbage = this.add.group();
      this.truck = this.add.button(70, 150, 'truckO', function()
      {
            if(this.stage === 4)
            {
                this.goalText.setText('Vroom');
                console.log('Game Over');
            }
            else if(this.stage === 3)
            {
                
            }
            else
            {
                this.goalText.alpha=0;
                this.alertText.setText("Well, hitting it won't work");
                this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    this.alertText.setText('');
                    this.goalText.alpha=1;
                }, this);
            }
      }, this);
      this.wash = this.add.sprite(70, 150, 'wash');
      
      this.keyFob = this.add.sprite(0, 0, 'keyfob');
      this.keyFobLock = this.add.button(31, 35, 'keyfobLock', function()
      {
          this.goalText.alpha=0;
          this.alertText.setText("It's already locked.");
          this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
          {
            this.alertText.setText('');
              this.goalText.alpha=1;
          }, this);
      }, this);
      this.keyFobUnlock = this.add.button(31, 62, 'keyfobUnlock', function()
      {
          if(this.stage === 1)
          {
              this.goalText.setText("Well it's unlocked, but it looks like we need a\nkey to start the truck.\nMaybe it's underneath all this trash.");
              this.stage++;
          }
          else
          {
              this.goalText.alpha=0;
              this.alertText.setText("Let's not unlock your truck until\nwe are sure this is it.");
              this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
              {
                  this.alertText.setText('');
                  this.goalText.alpha=1;
              }, this);
          }
      }, this);
      this.keyFobTrunk = this.add.button(31, 93, 'keyfobTrunk', function()
      {
          this.goalText.alpha=0;
          this.alertText.setText("It's a truck, there's no trunk.");
          this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
          {
            this.alertText.setText('');
              this.goalText.alpha=1;
          }, this);
      }, this);
      this.keyFobAlarm = this.add.button(33, 125, 'keyfobAlarm', function()
      {
          //Alarm sound effect
          this.goalText.setText("Sounds like it's your truck. Now to get into it...");
          this.stage++;
      }, this);
      this.keyFob.addChild(this.keyFobLock);
      this.keyFob.addChild(this.keyFobUnlock);
      this.keyFob.addChild(this.keyFobTrunk);
      this.keyFob.addChild(this.keyFobAlarm);
      
      this.bucket = this.add.button(10, 600, 'cleanWaterBucket', function(button)
      {
          if(button.key != 'cleanWaterBucket')
          {
              this.pourWater();
          }
          else
          {
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
                  if(this.garbage.children.length === 0)
                  {
                      this.goalText.setText('You picked up all the trash!\nOh wait, there is a rag here.\nMaybe you could use it to clean something?');
                  
                      this.add.button(60, 570, 'rag2', function(rag)
                      {
                          rag.kill();
                          this.keyFob.destroy();
                          this.rag = this.game.make.sprite(0, 0, 'rag2');
                          this.rag.anchor.set(0.5, 0.5);
                          //Create the 'prize'
                          this.chaos = this.game.make.sprite(0, 0, 'maskData');
                          this.bmd = this.game.make.bitmapData(700, 651);//-for sprite
                          //console.log(this.bmd);
                          this.game.add.sprite(0, 0, this.bmd)

                          //When input is coming in...
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
        if(this.counter>3300)
        {
            this.bucket.loadTexture('waterBucket');
            this.wash.kill();
            this.bmd.clear();
            this.game.input.deleteMoveCallback(this.move, this);
            this.goalText.setText('Ugh, look at that filthy water, you should pour that out.');
        }
    },
    pourWater: function()
   {
        var waterEmitter = this.game.add.emitter(50, this.game.world.centerY - 200);
        waterEmitter.bounce.setTo(0.5, 0.5);
        waterEmitter.setXSpeed(100, 200);
        waterEmitter.setYSpeed(-50, 50);
        waterEmitter.makeParticles('waterParticle', 0, 5000, true, true);
      
        var keyEmitter = this.game.add.emitter(50, this.game.world.centerY - 200);
        keyEmitter.bounce.setTo(0, 0);
        keyEmitter.setXSpeed(100, 200);
        keyEmitter.setYSpeed(-50, 50);
        keyEmitter.enableBody = true;
        keyEmitter.inputEnableChildren = true;
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
       
       var bucketTween = this.add.tween(this.bucket).to({y: this.game.world.centerY - 200}, 1000, "Linear", true);
        bucketTween.onComplete.add(function()
        {
            var pourTween = this.add.tween(this.bucket).to({rotation: 1.2}, 500, "Linear", true);
            pourTween.onComplete.add(function()
            {
                waterEmitter.start(false, 3000, 0.1);
      
                this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                     keyEmitter.start(false, 3000, 0.1);
                }, this);
                this.world.bringToTop(this.bucket);
            }, this);
        }, this);
   }
}