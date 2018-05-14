//Sets up game
var Point = Point || {};

Point.GameState = {
  init: function() 
  {   
      //Background
      this.background = this.add.sprite(0, 0, 'background');
      //Data from the JSON file
      this.allData = JSON.parse(this.game.cache.getText('pointData'));
      //Indicates level of difficulty being used
      this.currentLevel = null;
      //Current room indicator
      this.roomNum = 0;
      //Tracks which background music is playing
      this.song = 0;
      //Holds the sound for each item
      this.objectSound = null;
      //Text style
      this.style = {
          font: '16px Arial',
          align: 'center'
      };
      //Displays text for the user
      this.textAlert = this.add.text(200, 180, ' ', this.style);
      //Car sound
      this.carSound = this.add.audio('car');
      //Button to add borders to clickable areas
      this.hint = this.add.button(550, 150, 'hint');
      this.hint.inputEnabled = true;
      this.hint.events.onInputDown.add(function()
      {
          this.room.switchButtons();
      }, this);
      //Randomizes open order for vehicles opened
      var temp = [0, 1, 2, 3];
      var order = [];
      for(var i = 0; i< 4; i++)
      {
          var index = (Math.floor(Math.random()*(4-i)));
          order[i] = temp[index];
          var reTemp = [];
          var count = 0;
          for(var j = 0; j < temp.length; j++)
          {
              if(index!=j)
              {
                  reTemp[count] = temp[j];
                  count++;
              }
          }
          temp = reTemp;
      }
      //Group of vehicles being displayed
      this.vehicles = this.add.group();
      //Group of keys
      this.keys = this.add.group();
      this.allData.vehicles.forEach(function(vehicle)
      {
          //Create each car
          var car = this.add.sprite(vehicle.x, vehicle.y, vehicle.asset);
          car.scale.setTo(vehicle.scale);
          car.data = vehicle;
          car.data.room=(order[(car.data.vehicle)]+1);
          car.inputEnabled = true;
          car.events.onInputDown.add(function()
          {
              //If the activeItem is a key
              if(this.room.activeItem != null && this.room.activeItem.data.name == "key") 
              {
                  //If car matches the room
                  if(this.room.currData.room.index == car.data.room)
                  {
                      this.carSound.play();
                      //Place the key on the 'dimmed' car to indicate openness <bad word sorry>
                      var key = this.add.sprite(car.x + 100, car.y + 30, this.room.activeItem.data.uses[0].asset);
                      key.scale.setTo(1.5);
                      this.inventoryObjects.forEach(function(object)
                      {
                          object.glow.visible = false;
                      }, this);
                      this.keys.add(key);
                      this.inventoryObjects.removeAll();
                      this.inventoryShuffle();
                      car.alpha = 0.5;
                      car.data.unlocked = true;
                      //Reset andd go to the next room
                      this.roomNum ++;
                      if(this.roomNum < this.allData.levels[this.currentLevel].rooms.length)
                      {
                           this.allData.levels[this.currentLevel].rooms[(this.roomNum-1)].buttons.forEach(function(button)
                           {
                               button.sound = null;
                               button.asset = null;
                               button.clickText = null;
                               button.clickTextComplete = '';
                           }, this);
                           this.room = new Point.Room(this);
                           this.room.init(this.roomNum);  
                      }
                      //If all rooms have been visited end the game
                      else
                      {
                          this.hint.destroy();
                          this.textAlert.destroy();
                          this.inventoryObjects.removeAll();
                          this.inventory.destroy();
                          this.room.room.destroy();
                          this.room.hintGroup.removeAll();
                          
                          
                          this.display = this.add.sprite(30, 250, 'Final');
                          this.display.scale.setTo(1.5, 1.5);
                          
                          this.emitter = this.add.emitter(600, 200, 20);
                          this.emitter.makeParticles(['key1', 'key2'], [0, 1], 20, true, true);
                          this.emitter.start(false, 1000, 100);
                          
                          this.emitter1 = this.add.emitter(100, 200, 20);
                          this.emitter1.makeParticles(['key1', 'key2'], [0, 1], 20, true, true);
                          this.emitter1.start(false, 1000, 100);
                          
                          this.emitter2 = this.add.emitter(600, 500, 20);
                          this.emitter2.makeParticles(['key1', 'key2'], [0, 1], 20, true, true);
                          this.emitter2.start(false, 1000, 100);
                          
                          this.emitter3 = this.add.emitter(100, 500, 20);
                          this.emitter3.makeParticles(['key1', 'key2'], [0, 1], 20, true, true);
                          this.emitter3.start(false, 1000, 100);
                          
                          this.songSwitch.y = 0;
                          this.songSwitch.x = 0;
                      }
                 }
              }
              
          }, this);
          this.vehicles.add(car);
      }, this);
      //Draw the inventory and set an offset - the distance between display locations for objects
      this.inventory = this.add.sprite(100, 601, 'inventory');
      this.inventoryOffset = 125;
      //Store inventory Items
      this.inventoryObjects = this.add.group();
      //Start audio
      this.background = this.add.audio(this.allData.audio[this.song]).play('', 0, 1, true);
      this.instructions = this.add.sprite(0, 0, 'instructions');
      //Buttons to choose difficulty level
      this.easy = this.add.button(100, 460, 'easy');
      this.easy.inputEnabled = true;
      this.easy.scale.setTo(0.7);
      this.easy.events.onInputDown.add(function()
      {
          this.currentLevel = 0;
          this.runRoom();
      }, this);
      
      this.medium = this.add.button(250, 460, 'medium');
      this.medium.inputEnabled = true;
      this.medium.scale.setTo(0.7);
      this.medium.events.onInputDown.add(function()
      {
          this.currentLevel = 1;
          this.runRoom();
      }, this);
      
      this.hard = this.add.button(400, 460, 'hard');
      this.hard.inputEnabled = true;
      this.hard.scale.setTo(0.7);
      this.hard.events.onInputDown.add(function()
      {
          this.currentLevel = 2;
          this.runRoom();
      }, this);
  },
  create: function()
  {   
      this.songSwitch = this.add.button(50, 160, 'music');
      this.songSwitch.inputEnabled = true;
      this.songSwitch.events.onInputDown.add(function()
      {
          this.background.stop();
          this.song++;
          if(this.song > 4)
          {
              this.song = 0;
          }
          this.background = this.add.audio(this.allData.audio[this.song]).play('', 0, 1, true);
      }, this);
  },
  update: function()
  {
      //If an object is being used 'dim' it
      this.inventoryObjects.forEach(function(item)
      {
          item.glow.visible = false;
          item.alpha = 1;
          item.data.isSelected = false;
          
          if(this.room.activeItem!=null)
          {
              if(this.room.activeItem.data.name == item.data.name)
              {
                  item.alpha = 0.5;
                  item.data.isSelected = true;
                  item.glow.visible = true;
                  
              }
          }
      }, this);
  },
  //Sets up the room and removes instructions
  runRoom: function()
  {
      //Remove all instructions
      this.instructions.destroy();
      this.easy.destroy();
      this.medium.destroy();
      this.hard.destroy();
      //Start the first room
      this.room = new Point.Room(this);
      this.room.init(this.roomNum);
  },
  //Updates the inventory Items through usages
  inventoryItemUpdateAsset: function(item)
  {
      item.glow.visible = false;
      //Checks if usages follow an order
      if(item.data.uses.length > 1 && item.data.uses[0].ordered)
      {
          var usages = item.data.uses;
          var newUsages = [];
          
          for(var i=1; i<usages.length; i++)
          {
              newUsages[newUsages.length] = usages[i];
          }
          
          item.data.uses = newUsages;
      }
      else if(item.data.uses.length > 1 && !item.data.uses[0].ordered)
      {
          
      }
      //Checks if there remain multiple uses
      else if(item.data.uses.length > 0)
      {
          item.data.uses = [null];
      }
      //Finds the object to update in inventory
      this.inventoryObjects.forEach(function(itemObject)
      {
          if(itemObject.data.name === item.data.name)
          {
              if(itemObject.data.uses[0] === null)
              {
                  //set room
                  this.allData.levels[this.currentLevel].rooms[2].items.forEach(function(items)
                  {
                      this.inventoryObjects.remove(item);
                  }, this);
              }
              else
              {
                  itemObject.loadTexture(item.data.uses[0].asset, 0);
              }
          }
      }, this);
      
  },
  //Removes used inventory and shuffles all objects over
  inventoryShuffle: function()
  {
      this.inventoryOffset = 125;
      this.inventoryObjects.forEach(function(item)
      {
          item.x = this.inventoryOffset;
          item.glow.x = (this.inventoryOffset-25);
          this.inventoryOffset += 50;
      }, this);
  },
  
  blinkEffect: function(asset, x, y, speed, yoyo, time)
  { 
      var sprite = this.add.sprite(x, y, asset);

       sprite.alpha = 0;
                             
       var tween = this.add.tween(sprite).to( { alpha: 1 }, speed, "Linear", true, 0, -1);
                             
       tween.yoyo(true, speed);
      
      this.time.events.loop(Phaser.Timer.SECOND*time, function()
       {
          this.objectSound.stop();
          tween.stop();
       }, this);
  }
};