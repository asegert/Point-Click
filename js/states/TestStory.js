//Sets up game
var Point = Point || {};

Point.TestStoryState = {
    create: function()
    {
        this.add.sprite(0, 0, 'garage');
        this.add.sprite(120, 150, 'testTitle');
        this.add.button(250, 350, 'easy', function()
        {
            if (this.game.sound.context.state === 'suspended')
            {
                this.game.sound.context.resume();
            }
            this.state.start('Test');
        }, this);
    }
}