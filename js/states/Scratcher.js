var Point = Point || {};

//loading the game assets
Point.ScratcherState = {
    preload: function ()
    {

    },
    create: function ()
    {
        //Tracks the last position of the pointer
        this.lastPosX = 0;
        this.lastPosY = 0;
        //Counter for amount of time pointer is moving
        this.counter = 0;
        //Create the scratch mark
        this.background = this.game.add.sprite(0, 0, 'truckO');
        this.background2 = this.game.add.sprite(0, 0, 'wash');
        this.phaser = this.game.make.sprite(0, 0, 'rag');
        this.phaser.anchor.set(0.5, 0.5)
        //Create the 'prize'
        this.chaos = this.game.make.sprite(0, 0, 'truckO');
        console.log(this.chaos);

        //Create bitmapData cover and instructions
        this.bmd = this.game.make.bitmapData(600, 400);

        this.game.add.sprite(0, 0, this.bmd)

        //When input is coming in...
        this.game.input.addMoveCallback(this.move, this);
    },
    update: function ()
    {
        //Check that the pointer has moved and add to the time in motion
        /*if ((this.game.input.activePointer.position.x != this.lastPosX && this.game.input.activePointer.position.y != this.lastPosY) && (this.game.input.activePointer.position.x > 230 && this.game.input.activePointer.position.x < 730 && this.game.input.activePointer.position.y > 230 && this.game.input.activePointer.position.y < 563))
        {
            //Reset the last position   
            this.lastPosX = this.game.input.activePointer.position.x;
            this.lastPosY = this.game.input.activePointer.position.y;
            //Update the counter
            this.counter = this.counter + 1;
        }*/
    },
    move: function (pointer, x, y)
    {
        //move our brush
        this.phaser.x = pointer.position.x;
        this.phaser.y = pointer.position.y;

        //If enough has been covered...
        /*if (this.counter > 100)
        {
            //remove bmd
            this.bmd.resize(0, 0);
            //Recreate prize
            this.temp = this.game.add.sprite(230, 230, 'truckO');
            this.temp.scale.set(1 / 1.8, 1 / 1.8);
            //Set up to allow player to move on
            this.sprite = this.game.add.sprite(0, 0, 'match');
            this.game.add.tween(this.sprite).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

            this.emitter = this.game.add.emitter(this.game.world.centerX, 50, 20);
            this.emitter.makeParticles(null);

            this.emitter.start(true, 6000, null, 500);

            this.emitter1 = this.game.add.emitter(100, 250, 20);
            this.emitter1.makeParticles(null);

            this.emitter1.start(true, 6000, null, 500);

            this.emitter2 = this.game.add.emitter(200, 150, 20);
            this.emitter2.makeParticles(null);

            this.emitter2.start(true, 6000, null, 500);

            this.emitter3 = this.game.add.emitter(400, 150, 20);
            this.emitter3.makeParticles(null);

            this.emitter3.start(true, 6000, null, 500);

            this.emitter4 = this.game.add.emitter(this.game.world.centerX, 50, 20);
            this.emitter4.makeParticles(null);

            this.emitter4.start(true, 6000, null, 500);

            this.emitter5 = this.game.add.emitter(800, 250, 20);
            this.emitter5.makeParticles(null);

            this.emitter5.start(true, 6000, null, 500);

            this.emitter6 = this.game.add.emitter(500, 150, 20);
            this.emitter6.makeParticles(null);

            this.emitter6.start(true, 6000, null, 500);

            this.emitter7 = this.game.add.emitter(700, 150, 20);
            this.emitter7.makeParticles(null);

            this.emitter7.start(true, 6000, null, 500);

            this.button = this.game.add.button(650, 500, 'playOne', function ()
            {
                this.game.state.start('Story');
            }, this, 1, 0, 2);
        }*/
        //'Alpha-ize' the area covered by the scratch
        //Clear the instruction data
        this.bmd.alphaMask(this.chaos, this.phaser);
    }
};