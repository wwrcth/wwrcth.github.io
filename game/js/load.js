var loadState = {


  preload() {

    // var anh = game.add.text(game.world.width/2.5, game.world.height*3/4,
    // 'Dogemation games',
    // {font: '20px monospace', fill: 'white', align: 'center'})


    var loadingLabel = game.add.text(this.game.width / 2, this.game.height / 2 ,
      'LOADING...',
      {font: '24px "Press Start 2P"', fill: '#fff', align: 'center'});
      loadingLabel.anchor.setTo(0.5, 0.5);

    //load backgrounds
    for (i=1; i<=10; i++){
      this.load.image('background'+i, 'assets/seamless-space/bg'+i+'.jpg');
    }

    //sprites and images
    this.load.spritesheet('vortex', 'assets/props/vortex.jpg', 800, 600);

    //nyancat
    this.load.spritesheet('player', 'assets/cat/nyancat.png', 61, 28);

    // //powerups!
    // this.load.spritesheet('powerupLife', 'assets/props/powerup.png', 36, 35);
    // this.load.image('powerup2x', 'assets/props/powerup2.png');

    this.load.image('beam', 'assets/props/beam.png');
    this.load.image('bullet', 'assets/props/bullet.png');
    this.load.spritesheet('nyantail', 'assets/cat/tail.png', 38, 28);
    this.load.spritesheet('bombEnemy', 'assets/bogeys/bombs_.png', 16, 14);
    //explosions
    this.load.spritesheet('explosion', 'assets/props/explosion.png', 94, 94);
    this.load.spritesheet('explosion2', 'assets/props/explosion2.png', 94, 94);
    this.load.spritesheet('explosion3', 'assets/props/explosion3.png', 94, 94);
    this.load.spritesheet('explosion4', 'assets/props/explosion4.png', 94, 94);
    this.load.spritesheet('explosion5', 'assets/props/explosion5.png', 94, 94);

    //reaperEnemy
    this.load.spritesheet('reaperEnemy', 'assets/reaper/cat.png',145,95 );
    // this.load.spritesheet('reaperEnemy', 'assets/reaper/reaperSlice.png', 76, 99);

    // this.load.spritesheet('reaperSlice', 'assets/reaper/reaperSlice.png', 76, 99);

    // this.load.spritesheet('fireReaper', 'assets/reaper/firereaperSlicing.png', 142, 139);
    this.load.spritesheet('reaperShot', 'assets/reaper/sliceShot.png', 17, 100);

    //sounds
    // this.load.audio('sad','assets/sounds/sad.mp3');
    this.load.audio('pew','assets/sounds/pew.mp3');
    this.load.audio('evilcat','assets/sounds/reaperdeath2.wav');
    this.load.audio('evilcatDeath','assets/sounds/reaperdeath.wav');
    this.load.audio('poweralert','assets/sounds/powerappears.wav');
    this.load.audio('lifedown', 'assets/sounds/lifedown.wav');
  },

  create()  {
    var LOADING_TEXT = "LOADING...";
    var tween = game.add.tween(LOADING_TEXT).to({
        alpha: 0
    }, 2000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function() {
        game.state.start('menu');
    }, this);
     // game.state.start('menu')
  }
}
