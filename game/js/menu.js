var star, texture, max = 400, xx = [], yy = [], zz = [], distance = 300,  speed = 2;

var menuState = {
  preload() {
    game.load.image('tinystar', 'assets/menu/star2.png');
  },

  create() {
    // this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    // this.background.autoScroll(-80, 0);

    // this.vortex = this.add.sprite(0, 0, 'vortex');
    // this.vortex.animations.add('flying', [9,6, 4, 2, 0]);
    // this.vortex.play('flying', 12, true, true);

    star = game.make.sprite(0, 0, 'tinystar');
    texture = game.add.renderTexture(800, 600, 'texture');

    game.add.sprite(0, 0, texture);

    for (var i = 0; i < max; i++) {
      xx[i] = Math.floor(Math.random() * 800) - 400;
      yy[i] = Math.floor(Math.random() * 600) - 300;
      zz[i] = Math.floor(Math.random() * 1700) - 100;
    }
    this.score = 0;

    //SCOREBOARD HERE TOP 5

    // var displayhi5 = game.add.text(game.world.width/4, game.world.height*1/10, hi5, {font: '20px monospace', fill:'#fff'})
    // function error (data, response){
    //   // console.log(response);
    // }


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
