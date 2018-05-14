var Point = Point || {};

Point.game = new Phaser.Game(700, 651, Phaser.AUTO);

Point.game.state.add('Boot', Point.BootState); 
Point.game.state.add('Preload', Point.PreloadState); 
Point.game.state.add('Game', Point.GameState);
Point.game.state.add('Test', Point.TestState);
Point.game.state.add('Scratcher', Point.ScratcherState);

Point.game.state.start('Boot');