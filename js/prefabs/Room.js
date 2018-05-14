//Sets up board and handles all Room functions
var Point = Point || {};


Point.Room = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     this.allData = state.allData;
     //Follows Item currently being used
     this.activeItem = null;
     //Gets the number of the room to run
     Point.Room.prototype.init = function(roomNum)
     {
         //Group to hold hint sprites
         this.hintGroup = state.add.group();
         //Sets the current Data based on the current level of difficulty and room
         this.currData = this.allData.levels[state.currentLevel].rooms[roomNum];
         //Create the room
         this.create();
     };
     Point.Room.prototype.create = function()
     {
         //Create the room background
         this.room = state.add.sprite(this.currData.room.x, this.currData.room.y, this.currData.room.asset);
         this.room.scale.setTo(this.currData.room.scaleX, this.currData.room.scaleY);
         //Create the buttons
         for(var i=0; i<this.currData.buttons.length; i++)
         {
             this.createButton(this.currData.buttons[i]);
         }
     };
     Point.Room.prototype.getItem = function(asset)
     {
         //Search through the items to find one with a matching asset
         this.currData.items.forEach(function(item)
                 {
                     if(item.uses[0] != null && item.uses[0].asset===asset)
                         {
                             //Set the item to be in the inventory
                             item.inInventory = true;
                             
                             var inventoryItem = state.add.sprite(state.inventoryOffset, 625, item.uses[0].asset);
                             inventoryItem.anchor.set(0.5);
                             inventoryItem.data = item;
                             inventoryItem.inputEnabled = true;
                             inventoryItem.glow = state.add.sprite((state.inventoryOffset-25), 601, 'inventoryGlow');
                             inventoryItem.glow.visible = false;
                             inventoryItem.events.onInputDown.add(function()
                             {
                                 //Item is selected
                                 inventoryItem.data.isSelected = true;
                                 //Set to activeItem if one does not exist if it is the activeItem deselect otherwise check for potential combination
                                 if(this.activeItem == null)
                                 {
                                     this.activeItem = inventoryItem;
                                 }
                                 else if(this.activeItem == inventoryItem)
                                 {
                                     this.activeItem = null;
                                     inventoryItem.data.isSelected = false;
                                 }
                                 else
                                 {
                                     //Check if usage path is ordered (must follow usage cases in order)
                                     if(!inventoryItem.data.uses[0].ordered)
                                     {
                                         //Check if the two items can combine and combine accordingly
                                         inventoryItem.data.uses.forEach(function(inIt)
                                         {
                                             if(inIt.combine === this.activeItem.data.uses[0].asset)
                                             {
                                                 inventoryItem.data.isCombined = true;
                                                 this.activeItem.data.isCombined = true;
                                                 state.inventoryItemUpdateAsset(this.activeItem);
                                                 state.inventoryItemUpdateAsset(inventoryItem);
                                                 state.inventoryShuffle();
                                         
                                                 if(this.activeItem != null)
                                                 {
                                                     this.activeItem.data.isSelected = false;
                                                 }
                                                 if(inventoryItem != null)
                                                 {
                                                     inventoryItem.data.isSelected = false;
                                                 }
                                         
                                             }
                                         }, this);
                                     }
                                     //Check if usage path is ordered (must follow usage cases in order)
                                     else if(!this.activeItem.data.uses[0].ordered)
                                     {
                                         //Check if the two items can combine and combine accordingly
                                         this.activeItem.data.uses.forEach(function(inIt)
                                         {
                                             if(inIt.combine === inventoryItem.data.uses[0].asset)
                                             {
                                                 this.activeItem.data.isCombined = true;
                                                 inventoryItem.data.isCombined = true;
                                                 state.inventoryItemUpdateAsset(this.activeItem);
                                                 state.inventoryItemUpdateAsset(inventoryItem);
                                                 state.inventoryShuffle();
                                         
                                                 if(this.inventoryItem != null)
                                                 {
                                                     inventoryItem.data.isSelected = false;
                                                 }
                                                 if(this.activeItem != null)
                                                 {
                                                     this.activeItem.data.isSelected = false;
                                                 }
                                         
                                             }
                                         }, this);
                                     }
                                     //If neither is unordered, both follow an order so simply check first element
                                     else
                                     {
                                         if(inventoryItem.data.uses[0].combine === this.activeItem.data.name)
                                         {
                                             inventoryItem.data.isCombined = true;
                                             this.activeItem.data.isCombined = true;
                                             state.inventoryItemUpdateAsset(this.activeItem);
                                                 state.inventoryItemUpdateAsset(inventoryItem);
                                                 state.inventoryShuffle();
                                         
                                             if(this.activeItem != null)
                                             {
                                                 this.activeItem.data.isSelected = false;
                                             }
                                             if(inventoryItem != null)
                                             {
                                                 inventoryItem.data.isSelected = false;
                                             }
                                         
                                         }
                                     }
                                     
                                     this.activeItem = null;
                                 }
                             }, this);
                             //Add the item to inventory and adjust offset for next item
                             state.inventoryObjects.add(inventoryItem);
                             state.inventoryOffset += 50;
                         }
                 }, this);
     };
     //Creates buttons
     Point.Room.prototype.createButton = function(data)
     {
         var button = state.add.button(data.x, data.y, data.asset);
             button.scale.setTo(data.scaleX, data.scaleY);
             button.rotation = data.rotation;
             button.data = data;
             
             button.events.onInputDown.add(function(button)
             {
                 if(button.data.sound != null)
                 {
                     state.objectSound = state.add.audio(button.data.sound).play();
                 }
                 var indexes = [];
                 var complete = false;
                 //Stores indexes of all items that effect the button changing
                 button.data.change.forEach(function(change)
                 {
                     for(var j=0; j<this.currData.items.length; j++)
                     {                                                 
                         if(change===this.currData.items[j].name)
                         {
                             indexes[indexes.length] = j;
                         }
                     }
                 }, this);
                 //Check if change equals null
                 //If it is null it will always be at the first index
                 if(button.data.change[0]==null && button.data.change.length == 1)
                 {
                     button.data.completed = true;
                     if(button.data.actions[0] === "this")
                     {
                         var holdData = button.reset;
                         button.destroy();
                         this.createButton(holdData);
                     }
                     else
                     {
                         this.getItem(button.data.actions[0]);
                     }
                     state.textAlert.destroy();
                     state.textAlert = state.add.text(200, 180, button.data.clickTextComplete, state.style);
                     complete=true;
                 }
                 //If the item that changes the button isSelected
                 //As there is only one item that changes the button the first index is the only one needing checked
                 else if(button.data.change.length == 1 && this.currData.items[indexes[0]].isSelected)
                 {
                     this.activeItem = null;
                     state.inventoryObjects.forEach(function(object)
                     {
                         if(object.data.name == this.currData.items[indexes[0]].name)
                         {
                             object.glow.visible = false;
                             state.inventoryObjects.remove(object);
                         }
                     }, this);
                     state.inventoryShuffle();
                     //If the button is recursive
                     button.data.completed = true;
                     if(button.data.actions[0] === "this")
                     {
                         var holdData = {
                                 "name": button.data.reset[0], 
                                 "completed": button.data.reset[1], 
                                 "clickText": button.data.reset[2], 
                                 "clickTextComplete": button.data.reset[3],
                                 "change": button.data.reset[4],
                                 "actions": button.data.reset[5],
                                 "x": button.data.reset[6],
                                 "y": button.data.reset[7],
                                 "scaleX": button.data.reset[8],
                                 "scaleY": button.data.reset[9],
                                 "rotation": button.data.reset[10],
                                 "asset": button.data.reset[11],
                                 "sound": button.data.reset[12],
                                 "reset": button.data.reset[13]
                             };
                         button.destroy();
                         this.createButton(holdData);
                     }
                     else
                     {
                         //If it is a simple button just get the corresponding item
                         this.getItem(button.data.actions[0]);
                     }
                        state.textAlert.destroy();
                        state.textAlert = state.add.text(200, 180, button.data.clickTextComplete, state.style);
                     complete=true;
                 }
                 else if(button.data.change.length > 1)
                 {
                     //Uses a boolean to confirm that every item needing to be combined is in fact combined
                     var combined = true;
                     var selected = false;
                     indexes.forEach(function(item)
                     {
                         if(combined && !this.currData.items[item].isCombined)
                         {
                             combined = false;
                         }
                         if(this.currData.items[item].isSelected)
                         {
                             selected = true;
                         }
                     }, this);
                     //Ensure they combine and one is selected, safety check for cheating
                     if(combined && selected)
                     {
                         //Reset activeItem
                         this.activeItem = null;
                         //Remove Object
                         state.inventoryObjects.forEach(function(object)
                         {
                             if(object.data.name == this.currData.items[indexes[0]].name)
                             {
                                 object.glow.visible = false;
                                 state.inventoryObjects.remove(object);
                             }
                         }, this);
                         //Shuffle
                         state.inventoryShuffle();
                         button.data.completed = true;
                         //Remove and relaunch recursive button
                         if(button.data.actions[0] === "this")
                         {
                              var holdData = button.reset;
                              button.destroy();
                              this.createButton(holdData);
                         }
                         //Other buttons just give the object
                         else
                         {
                             this.getItem(button.data.actions[0]);
                         }
                         state.textAlert.destroy();
                         state.textAlert = state.add.text(200, 180, button.data.clickTextComplete, state.style);
                         complete=true;
                     }
                     //If another action needs to be taken to complete the button and achieve the action
                     else
                     {
                        state.textAlert.destroy();
                        state.textAlert = state.add.text(200, 180, button.data.clickText, state.style);
                     }
                 }
                 else
                 {
                     state.textAlert.destroy();
                     state.textAlert = state.add.text(200, 180, button.data.clickText, state.style);  
                 }
                 //If the button has completed all actions, disable it so the player cannot get another copy of the item
                 if(button.data.actions[0]!=null && complete)
                 {
                     button.inputEnabled = false;
                 }
                 //Checks that the blink effect function should be called
                 if(button.data.call &&  button.data.call[0] == 'state.blinkEffect' && button.data.completed)
                 {
                     state.blinkEffect(button.data.call[1], button.data.call[2], button.data.call[3], button.data.call[4], button.data.call[5], button.data.call[6]);//6button.data.call;
                 }
             }, this);
     };
     //Loads a sprite over the buttons to give player the hint button overLay and vise versa
     Point.Room.prototype.switchButtons = function()
     {
         this.hintGroup.removeAll();
         for(var i=0; i<this.currData.buttons.length; i++)
         {
             if(this.currData.buttons[i].asset == 'button')
             {
                 this.currData.buttons[i].asset = 'buttonHint';
             }
             else if(this.currData.buttons[i].asset == 'buttonHint')
             {
                 this.currData.buttons[i].asset = 'button';
             }
             var asset = this.currData.buttons[i].asset;
             
             var hint = state.add.sprite(this.currData.buttons[i].x, this.currData.buttons[i].y, asset);
             hint.scale.setTo(this.currData.buttons[i].scaleX, this.currData.buttons[i].scaleY);
             hint.rotation = this.currData.buttons[i].rotation;
             hint.data = this.currData.buttons[i];
             
             this.hintGroup.add(hint);
             state.world.bringToTop(this.hintGroup);
         }
     };
};

Point.Room.prototype = Object.create(Phaser.Sprite.prototype);
Point.Room.prototype.constructor = Point.Unit;