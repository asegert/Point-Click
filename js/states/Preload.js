var Point = Point || {};

//loading the game assets
Point.PreloadState = {
  preload: function() {
    //show loading screen
    /*this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);*/

    //audio
    this.load.audio('background0', ['assets/audio/background0.m4a', 'assets/audio/background0.mp3', 'assets/audio/background0.ogg']);
    this.load.audio('background1', ['assets/audio/background1.m4a', 'assets/audio/background1.mp3', 'assets/audio/background1.ogg']);
    this.load.audio('background2', ['assets/audio/background2.m4a', 'assets/audio/background2.mp3', 'assets/audio/background2.ogg']);
    this.load.audio('background3', ['assets/audio/background3.m4a', 'assets/audio/background3.mp3', 'assets/audio/background3.ogg']);
    this.load.audio('background4', ['assets/audio/background4.m4a', 'assets/audio/background4.mp3', 'assets/audio/background4.ogg']);
    
    this.load.audio('key', ['assets/audio/key.m4a', 'assets/audio/key.mp3', 'assets/audio/key.ogg']);
    this.load.audio('car', ['assets/audio/car.m4a', 'assets/audio/car.mp3', 'assets/audio/car.ogg']);
    
      //Audio for Room1
    this.load.audio('coins', ['assets/audio/coins.m4a', 'assets/audio/coins.mp3', 'assets/audio/coins.ogg']);
    this.load.audio('glovebox', ['assets/audio/glovebox.m4a', 'assets/audio/glovebox.mp3', 'assets/audio/glovebox.ogg']);
    this.load.audio('flashlight', ['assets/audio/flashlight.m4a', 'assets/audio/flashlight.mp3', 'assets/audio/flashlight.ogg']);
    this.load.audio('vent', ['assets/audio/vent.m4a', 'assets/audio/vent.mp3', 'assets/audio/vent.ogg']);
    this.load.audio('honk', ['assets/audio/honk.m4a', 'assets/audio/honk.mp3', 'assets/audio/honk.ogg']);
    this.load.audio('trunk', ['assets/audio/trunk.m4a', 'assets/audio/trunk.mp3', 'assets/audio/trunk.ogg']);
    
    //Audio for Room2
    this.load.audio('book', ['assets/audio/book.m4a', 'assets/audio/book.mp3', 'assets/audio/book.ogg']);
    this.load.audio('tear', ['assets/audio/rip.m4a', 'assets/audio/rip.mp3', 'assets/audio/rip.ogg']);
    this.load.audio('pry', ['assets/audio/pry.m4a', 'assets/audio/pry.mp3', 'assets/audio/pry.ogg']);
      
    //Audio for Room3
    this.load.audio('trash', ['assets/audio/trash.m4a', 'assets/audio/trash.mp3', 'assets/audio/trash.ogg']);
    this.load.audio('cleaner', ['assets/audio/cleaner.m4a', 'assets/audio/cleaner.mp3', 'assets/audio/cleaner.ogg']);
    this.load.audio('window', ['assets/audio/window.m4a', 'assets/audio/window.mp3', 'assets/audio/window.ogg']);
      
    //Audio for Room3
    this.load.audio('wrench', ['assets/audio/wrench.m4a', 'assets/audio/wrench.mp3', 'assets/audio/wrench.ogg']);
    this.load.audio('wipers', ['assets/audio/wipers.m4a', 'assets/audio/wipers.mp3', 'assets/audio/wipers.ogg']);
    this.load.audio('tire', ['assets/audio/tire.m4a', 'assets/audio/tire.mp3', 'assets/audio/tire.ogg']);
    this.load.audio('scrape', ['assets/audio/scrape.m4a', 'assets/audio/scrape.mp3', 'assets/audio/scrape.ogg']);
    this.load.audio('wipe', ['assets/audio/wipe.m4a', 'assets/audio/wipe.mp3', 'assets/audio/wipe.ogg']);
    this.load.audio('lights', ['assets/audio/lights.m4a', 'assets/audio/lights.mp3', 'assets/audio/lights.ogg']);
    
    //images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('Final', 'assets/images/Final.png');
    this.load.image('smallCar', 'assets/images/smallCar.png');
    this.load.image('car', 'assets/images/car.png');
    this.load.image('suv', 'assets/images/suv.png');
    this.load.image('truck', 'assets/images/truck.png');
    this.load.image('interior', 'assets/images/interior.png');
    this.load.image('backseat', 'assets/images/backseat.jpg');
    this.load.image('trunk', 'assets/images/trunk.jpg');
    this.load.image('trash', 'assets/images/trash.png');
    this.load.image('goo', 'assets/images/goo.png');
    this.load.image('outside', 'assets/images/outside2.jpg');
    this.load.image('outsideLights', 'assets/images/outside2Lights.png');
    this.load.image('buttonHint', 'assets/images/button.png');
    this.load.image('button', 'assets/images/button1.png');
    this.load.image('inventory', 'assets/images/inventory.png');
    this.load.image('inventoryGlow', 'assets/images/inventoryGlow.png');
    this.load.image('hint', 'assets/images/hint.png');
    this.load.image('music', 'assets/images/music.png');
    this.load.image('easy', 'assets/images/easyButton.png');
    this.load.image('medium', 'assets/images/mediumButton.png');
    this.load.image('hard', 'assets/images/hardButton.png');
    this.load.image('instructions', 'assets/images/instructions.png');
      
    //Items for Room1
    this.load.image('key1', 'assets/images/key1.png');
    this.load.image('key2', 'assets/images/key2.png');
    this.load.image('coins', 'assets/images/coins.png');
    this.load.image('phone', 'assets/images/phone.png');
    this.load.image('phoneActive', 'assets/images/phone_active.png');
    this.load.image('code', 'assets/images/code.png');
    this.load.image('flashlight', 'assets/images/flashlight_temp.png');
    
    //Items for Room1
    this.load.image('wrench', 'assets/images/wrench.png');
    this.load.image('exactoKnife', 'assets/images/exactoKnife.png');
    this.load.image('book', 'assets/images/book.png');
      
    //Items for Room3
    this.load.image('redpill', 'assets/images/redpill.png');
    this.load.image('greenpill', 'assets/images/greenpill.png');
    this.load.image('yellowpill', 'assets/images/yellowpill.png');
    this.load.image('bluepill', 'assets/images/bluepill.png');
    this.load.image('redpillOpen', 'assets/images/redpillOpen.png');
    this.load.image('greenpillOpen', 'assets/images/greenpillOpen.png');
    this.load.image('yellowpillOpen', 'assets/images/yellowpillOpen.png');
    this.load.image('bluepillOpen', 'assets/images/bluepillOpen.png');
    this.load.image('redBeaker', 'assets/images/redBeaker.png');
    this.load.image('greenBeaker', 'assets/images/greenBeaker.png');
    this.load.image('yellowBeaker', 'assets/images/yellowBeaker.png');
    this.load.image('blueBeaker', 'assets/images/blueBeaker.png');
    this.load.image('beaker', 'assets/images/beaker.png');
    this.load.image('knife', 'assets/images/knife.png');
      
    //Items for Room3
    this.load.image('outside', 'assets/images/outside.png');
    this.load.image('scraper', 'assets/images/scraper.png');
    this.load.image('ticket', 'assets/images/ticket.png');
    this.load.image('washMe', 'assets/images/washMe.png');
    this.load.image('rag', 'assets/images/rag.png');
    this.load.image('side', 'assets/images/side.png');
    //Use wrench
    //Test
    this.load.image('garage', 'assets/images/garage.png');
    this.load.image('truckO', 'assets/images/outside.png');
    this.load.image('maskData', 'assets/images/maskData.png');
    this.load.image('wash', 'assets/images/wash.png');
    this.load.image('garbage', 'assets/images/garbage.png');
    this.load.image('pin', 'assets/images/pin.png');
    this.load.image('waterBucket', 'assets/images/waterBucket.png');
    this.load.image('cleanWaterBucket', 'assets/images/cleanWaterBucket.png');
    this.load.image('waterParticle', 'assets/images/waterParicle.png');
    this.load.image('keyfob', 'assets/images/keyfob.png');
    this.load.image('keyfobAlarm', 'assets/images/keyfobAlarm.png');
    this.load.image('keyfobTrunk', 'assets/images/keyfobTrunk.png');
    this.load.image('keyfobUnlock', 'assets/images/keyfobUnlock.png');
    this.load.image('keyfobLock', 'assets/images/keyfobLock.png');
    this.load.image('rag2', 'assets/images/rag2.png');
    this.load.image('testTitle', 'assets/images/testTitle.png');
      
    this.load.audio('testBackground', ['assets/audio/Point_and_Click_background.m4a', 'assets/audio/Point_and_Click_background.mp3', 'assets/audio/Point_and_Click_background.ogg']);
    this.load.audio('rev', ['assets/audio/Point_and_Click_rev.m4a', 'assets/audio/Point_and_Click_rev.mp3', 'assets/audio/Point_and_Click_rev.ogg']);
    this.load.audio('alarm', ['assets/audio/Point_and_Click_alarm.m4a', 'assets/audio/Point_and_Click_alarm.mp3', 'assets/audio/Point_and_Click_alarm.ogg']);
    //Data
    //Contains levels which each hold a level 0-2
      //Each level contains 4 rooms 0-3
        //Each room contains room specs, buttons, and items
            //Room: asset, x, y, scaleX, scaleY, index (image, position x, position y, how much to scale x, how much to scale y, room number 1-4)
            //Buttons: * contains several
                //name, completed (boolean), clickText (text displayed to the player if clicked, null if player completes the button's actions simply by clicking it), clickTextComplete (text displayed to the player when button has completed it's purpose), change ( an array of objects required to be used on the button to activate an action, if multiple they must both be combined, null means button can be clicked to complete the action), actions (array of things the player receives when button is completed, if null player gets nothing, if this button is recursive and calls reset), x (position at x), y (position at y), scaleX (scale amount at x), scaleY (scale amount at y), rotation (amount to rotate the button), asset (image), sound (any sound that should play), reset (an array that holds the same button with new values, generally null, only has values if button is recursive), call (generally null, only has value if a function should be called when the button is clicked, originally only set for the blinkEffect function)
            //Items: * contains several
                //name, inInventory (boolean), isSelected (boolean), isCombined (boolean), uses (array for each time an item should be used, contains the asset for the use, combine which holds the item that combines with this item to start the next usage, ordered which indicates whether or not the uses must be followed as written or any order of usages can be used)
    //Also contains vehicles which have a vehicle number (0-3), a vehicle type, an asset, x and y positions, a scale equal scaling for x and y, a room which indicates which room will have a key for the vehicle, and unlocked a boolean to indicate if the car has been 'unlocked'
        
    this.load.text('pointData', 'assets/data/pointData.json');

  },
  create: function() {
    this.state.start('TestStory');
  }
};