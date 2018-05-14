var Point = Point || {};

Point.BootState = {
  init: function() {
    //Begins audio
    this._manageAudio('init', this);
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    //assets we'll use in the loading screen
    //this.load.image('bar', 'assets/images/preloader-bar.png');
  },
  create: function() {
    this.state.start('Preload');
  },
   _manageAudio: function(mode, game) 
    {
		if(mode == 'init') 
        {
			Point._audioStatus = true;
			Point._soundClick = game.add.audio('audio-click');
		}
		else if(mode == 'switch') 
        {
			Point._audioStatus = !Point._audioStatus;
		}
		if(Point._audioStatus) 
        {
			Point._audioOffset = 0;
		}
		else 
        {
			Point._audioOffset = 4;
		}
	}
};