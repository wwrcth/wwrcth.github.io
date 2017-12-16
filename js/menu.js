var star, texture, max = 400, xx = [], yy = [], zz = [], distance = 300,  speed = 2;

var menuState = {
  preload() {
    game.load.image('tinystar', 'assets/menu/star2.png');
  },

  create() {
    star = game.make.sprite(0, 0, 'tinystar');
    texture = game.add.renderTexture(800, 600, 'texture');

    game.add.sprite(0, 0, texture);

    for (var i = 0; i < max; i++) {
      xx[i] = Math.floor(Math.random() * 800) - 400;
      yy[i] = Math.floor(Math.random() * 600) - 300;
      zz[i] = Math.floor(Math.random() * 1700) - 100;
    }
    this.score = 0;

    var startLabel = game.add.text(game.world.width / 2, game.world.height / 2,
      'Press spacebar to start', {
        font: '20px "Press Start 2P"',
        fill: '#fff',  align: 'center'
      });
      startLabel.anchor.setTo(0.5, -9.5);

    var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    startKey.onDown.addOnce(this.start, this)
  },

  update() {
    texture.clear();

    for (var i = 0; i < max; i++) {
      var perspective = distance / (distance - zz[i]);
      var x = game.world.centerX + xx[i] * perspective;
      var y = game.world.centerY + yy[i] * perspective;

      zz[i] += speed;

      if (zz[i] > 300) {
        zz[i] -= 600;
      }

      texture.renderXY(star, x, y);
    }
  },
  
  start() {
    game.state.start('nyanCat')
  }
}
