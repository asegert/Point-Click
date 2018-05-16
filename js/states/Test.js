//Sets up game
var Point = Point || {};

Point.TestState = {
  create: function() 
  {  
      this.goalText = this.add.text(150, 0, "Ugh, this truck is a mess.\nI think it might be yours.\nCan you check?", {font: '24px', align: 'center'});
      this.counter = 0;
      this.stage = 0;
      this.garbage = this.add.group();
      this.truck = this.add.button(50, 100, 'truckO', function()
      {
            if(this.stage === 3)
            {
                console.log('Vroom');
                console.log('Game Over');
            }
      }, this);
      this.wash = this.add.sprite(50, 100, 'wash');
      
      this.keyFob = this.add.sprite(0, 0, 'keyfob');
      this.keyFobLock = this.add.button(31, 35, 'keyfobLock', function()
      {
          this.goalText.setText("It's already locked.");
      }, this);
      this.keyFobUnlock = this.add.button(31, 63, 'keyfobUnlock', function()
      {
          if(this.stage === 1)
          {
              this.goalText.setText("Well it's unlocked, but it looks like we need a key to start the truck. Maybe it's underneath all this trash.");
              this.stage++;
          }
      }, this);
      this.keyFobTrunk = this.add.button(31, 94, 'keyfobTrunk', function()
      {
          this.goalText.setText("It's a truck, there's no trunk.");
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
      }, this);
      this.bucket.anchor.setTo(0.1, 0.9);
      
      for(var i=0; i<30; i++)
      {
          var rand = Math.floor(Math.random()*540)+60;
          
          if(rand <200)
          {
              var newRand = Math.floor(Math.random()*200)+390;
          }
          else
          {
              var newRand = Math.floor(Math.random()*100)+490;
          }
          
          this.garbage.add(this.add.button(rand, newRand, 'garbage', function(button)
          {
              if(this.stage === 2)
              {
                  this.garbage.remove(button);
                  button.kill();
                  if(this.garbage.children.length === 0)
                  {
                      this.goalText.setText('You picked up all the trash! Oh wait, there is a rag here. Maybe you could use it to clean something?');
                  
                      this.add.button(150, 400, 'rag', function(rag)
                      {
                          rag.kill();
                          this.keyFob.destroy();
                          this.rag = this.game.make.sprite(0, 0, 'rag');
                          this.rag.anchor.set(0.5, 0.5);
                          //Create the 'prize'
                          this.chaos = this.game.make.sprite(0, 0, 'truckO');
                          this.bmd = this.game.make.bitmapData(600, 400);
                          //console.log(this.bmd);
                          this.game.add.sprite(50, 100, this.bmd)

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
        this.rag.x = pointer.position.x-50;
        this.rag.y = pointer.position.y-100;
        //'Alpha-ize' the area covered by the scratch
        //Clear the instruction data
        this.bmd.alphaMask(this.chaos, this.rag);
        if(pointer.x>50 && pointer.x<650 && pointer.y>100 && pointer.y<500)
        {
            this.counter++;
        }
        if(this.counter>3500)
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