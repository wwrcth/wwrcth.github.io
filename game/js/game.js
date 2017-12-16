
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');



  game.state.add('boot', bootState);
  game.state.add('load', loadState);
  game.state.add('menu', menuState);
  game.state.add('nyanCat', playState);

  game.state.start('boot');
