//Sets up game
var Point = Point || {};

Point.TestState = {
  create: function() 
  {  
      this.counter = 0;
      this.garbage = this.add.group();
      this.add.sprite(50, 100, 'truckO');
      this.wash = this.add.sprite(50, 100, 'wash');
      this.bucket = this.add.button(0, 500, 'cleanWaterBucket', function(button)
      {
          if(button.key != 'cleanWaterBucket')
          {
              console.log('pour');
          }
      }, this);
      
      
      //test
      var leftEmitter = this.game.add.emitter(50, this.game.world.centerY - 200);
    leftEmitter.bounce.setTo(0.5, 0.5);
    leftEmitter.setXSpeed(100, 200);
    leftEmitter.setYSpeed(-50, 50);
    leftEmitter.makeParticles('waterParticle', 0, 5000, true, true);
      
      var rightEmitter = this.game.add.emitter(50, this.game.world.centerY - 200);
    rightEmitter.bounce.setTo(0, 0);
    rightEmitter.setXSpeed(100, 200);
    rightEmitter.setYSpeed(-50, 50);
      rightEmitter.enableBody = true;
      rightEmitter.inputEnableChildren = true;
      rightEmitter.onChildInputDown.add(function(key, pointer)
      {
          key.kill();
          rightEmitter.kill();
          leftEmitter.on = false;
      }, this);
    rightEmitter.makeParticles('key1', 0, 1, true, true);
      
      
      leftEmitter.start(false, 3000, 0.1);
      
      this.game.time.events.add(Phaser.Timer.SECOND * 2, function()
      {
      rightEmitter.start(false, 3000, 0.1);
      }, this);
      //
      
      this.add.button(50, 400, 'pin', function(pin)
      {
          pin.kill();
          console.log('pop');
          
      }, this);
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
              this.garbage.remove(button);
              button.kill();
              if(this.garbage.children.length === 0)
              {
                  console.log('You picked up all the trash! Oh wait, there is a rag here. Maybe you could use it to clean something?');
                  
                  this.add.button(150, 400, 'rag', function(rag)
                  {
                      rag.kill();
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
            console.log('Game Over');
        }
    }
}