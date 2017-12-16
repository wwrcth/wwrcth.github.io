var loadState = {
  preload() {

    var loadingLabel = game.add.text(this.game.width / 2, this.game.height / 2 ,
      'LOADING...',
      {font: '24px "Press Start 2P"', fill: '#fff', align: 'center'});
      loadingLabel.anchor.setTo(0.5, 0.5);

    //backgrounds
    for (i=1; i<=10; i++){
      this.load.image('background'+i, 'assets/seamless-space/bg'+i+'.jpg');
    }

    //nyancat
    this.load.spritesheet('player', 'assets/cat/nyancat.png', 61, 28);

    this.load.image('beam', 'assets/props/beam.png');
    this.load.spritesheet('nyantail', 'assets/cat/tail.png', 38, 28);
    this.load.spritesheet('bombEnemy', 'assets/bogeys/bombs_.png', 16, 14);

    this.load.spritesheet('explosion', 'assets/props/explosion.png', 94, 94);
    this.load.spritesheet('explosion5', 'assets/props/explosion5.png', 94, 94);

    //evilcat
    this.load.spritesheet('catEnemy', 'assets/reaper/cat.png',145,95 );

    //sounds
    this.load.audio('pew','assets/sounds/pew.mp3');
    this.load.audio('evilcat','assets/sounds/reaperdeath2.wav');
    this.load.audio('evilcatDeath','assets/sounds/reaperdeath.wav');
    this.load.audio('poweralert','assets/sounds/powerappears.wav');
    this.load.audio('lifedown', 'assets/sounds/lifedown.wav');
  },

  create()  {
      game.state.start('menu')
  }
}
