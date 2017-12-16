var playState = {
  create() {
    //background
    var bgrandom = this.rnd.integerInRange(1, 10);
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background' + bgrandom);
    this.background.autoScroll(-80, 0);

    //tail
    this.tailPool = this.add.group();
    this.tailPool.enableBody = true;
    this.tailPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.tailPool.createMultiple(50, 'nyantail');
    this.tailPool.setAll('anchor.x', 0.5);
    this.tailPool.setAll('anchor.y', 0.5);
    this.tailPool.setAll('outOfBoundsKill', true);
    this.tailPool.setAll('checkWorldBounds', true);

    //cat
    this.player = this.add.sprite(64, 220, 'player');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('wiggle', [0, 1, 2, 3, 4], 10, true);
    this.player.animations.play('wiggle')
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(20, 20, 35, 5);

    this.beamPool = this.add.group();
    this.beamPool.enableBody = true;
    this.beamPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.beamPool.createMultiple(100, 'beam');
    this.beamPool.setAll('anchor.x', 0.5);
    this.beamPool.setAll('anchor.y', 0.5);
    this.beamPool.setAll('outOfBoundsKill', true);
    this.beamPool.setAll('checkWorldBounds', true);
    this.shotDelay = 40;

    this.cursors = this.input.keyboard.createCursorKeys();

    //bombs
    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(150, 'bombEnemy');
    this.enemyPool.setAll('anchor.x', 0.5)
    this.enemyPool.setAll('anchor.y', 0.5)
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);
    this.enemyPool.setAll('reward', 100, false, false, 0, true);
    this.enemyPool.forEach(function(enemy) {
      enemy.animations.add('bombMovement', [0, 2, 1, 3], 5, true);
    });

    this.nextEnemyAt = 0;
    this.enemyDelay = (200);
    this.reaperCounter = 0;
    this.speedCounter = 0;
    this.spawnCounter = 0;

    //evils
    this.reaperPool = this.add.group();
    this.reaperPool.enableBody = true;
    this.reaperPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.reaperPool.createMultiple(80, 'catEnemy');
    this.reaperPool.setAll('anchor.x', 0.5)
    this.reaperPool.setAll('anchor.y', 0.5)
    this.reaperPool.setAll('outOfBoundsKill', true);
    this.reaperPool.setAll('checkWorldBounds', true);
    this.reaperPool.setAll('reward', 500, false, false, 0, true);
    this.reaperPool.forEach(function(reaper) {
      reaper.animations.add('reaperMovement', [0, 1, 2, 3], 10, true);
    });

    this.beamPool.enableBody = true;
    this.beamPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.beamPool.createMultiple(100, 'beam');
    this.beamPool.setAll('anchor.x', 0.5);
    this.beamPool.setAll('anchor.y', 0.5);
    this.beamPool.setAll('outOfBoundsKill', true);
    this.beamPool.setAll('checkWorldBounds', true);
    this.nextFire = 0;

    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function(explosion) {
      explosion.animations.add('boom');
    });

    this.explosion5Pool = this.add.group();
    this.explosion5Pool.enableBody = true;
    this.explosion5Pool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosion5Pool.createMultiple(100, 'explosion5');
    this.explosion5Pool.setAll('anchor.x', 0.5);
    this.explosion5Pool.setAll('anchor.y', 0.5);
    this.explosion5Pool.forEach(function(explosion5) {
      explosion5.animations.add('boom');
    });

    //audio
    this.deathSFX = this.add.audio('lifedown');
    this.pewSFX = this.add.audio('pew');
    this.evilcatSFX = this.add.audio('evilcatDeath');
    this.powerAlertSFX = this.add.audio('evilcat');
    this.lifedownSFX = this.add.audio('lifedown');

    //playerscore
    this.score = 0;
    this.scoreText = this.add.text(
      795, 20, '' + this.score, {
        font: '20px "Press Start 2P"',
        fill: '#fff',
        align: 'center'
      }
    );
    this.scoreText.anchor.setTo(1, 0.5);

    this.lifes = 1;
    this.lifesText = this.add.text(
      795, 40, this.lifes + ' HP', {
        font: '20px "Press Start 2P"',
        fill: '#fff',
        align: 'center'
      }
    );
    this.lifesText.anchor.setTo(1, 0.5);


    //instructionsmessage
    this.instructions = this.add.text(400, 550,
      'Use the arrow keys to move nyan cat\n' +
      'and space to shouting', {
        font: '20px "Press Start 2P"',
        fill: '#fff',
        align: 'center'
      });
    this.instructions.anchor.setTo(0.5, 0.5);
    this.instExpire = this.time.now + 3000;
  },

  update() {

    this.background.autoScroll(-80 - (this.speedCounter * .2), this.speedCounter);

    if ((this.reaperCounter > 3) && (this.reaperPool.countDead() > 0)) {
      this.reaperCounter = 0;
      var reaper = this.reaperPool.getFirstExists(false);
      reaper.reset(
        this.rnd.integerInRange(20, this.game.width - 20), 0);
      var target = this.rnd.integerInRange(20, this.game.width - 20);
      reaper.rotation = this.physics.arcade.moveToXY(
        reaper, target, this.game.height, this.rnd.integerInRange(200, 300)) - Math.PI / 2;
      this.powerAlertSFX.play();
      reaper.play('reaperMovement');
      reaper.nextShotAt = 0;
    }

    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      enemy.reset(800, this.rnd.integerInRange(0, 600));
      enemy.body.velocity.x = -this.rnd.integerInRange(60, 300);
      enemy.play('bombMovement');
    }


    this.physics.arcade.overlap(
      this.beamPool, this.enemyPool, this.enemyHit, null, this
    )
    this.physics.arcade.overlap(
      this.beamPool, this.reaperPool, this.reaperHit, null, this
    )

    this.physics.arcade.overlap(
      this.player, this.enemyPool, this.playerHit, null, this
    )
    this.physics.arcade.overlap(
      this.player, this.reaperPool, this.playerbyReaperHit, null, this
    )

    this.physics.arcade.overlap(
      this.tailPool, this.enemyPool, this.enemyHitbyTail, null, this
    )
    this.physics.arcade.overlap(
      this.tailPool, this.reaperPool, this.reaperHitbyTail, null, this
    )

    //shooting
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      if (this.returnText && this.returnText.exists) {
        this.restartGame();
      } else {
        this.fire();
      }
      this.player.speed = 400;
    }
    if (!this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.player.speed = 600;
    }
    //tail
    this.maketail();

    //player movement
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
    }

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.player.speed;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = this.player.speed;
    }
    if (this.instructions.exists && this.time.now > this.instExpire) {
      this.instructions.destroy();
    }
    if (this.showReturn && this.time.now > this.showReturn) {
      this.returnText = this.add.text(
        this.game.width / 2 - 200, this.game.height / 2 + 250,
        'Hit space to play again', {
          font: '20px "Press Start 2P"',
          fill: '#fff',
          align: 'center'
        }
      )
      this.showReturn = false;
    }

  },

  playerHit(player, enemy) {
    if (this.lifes == 1) {
      player.kill();
      enemy.kill();
      var explosion = this.add.sprite(player.x, player.y, 'explosion3');
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      explosion.play('boom', 15, false, true);
      this.deathSFX.play();
      this.displayEnd(false);

    } else {
      player.reset(this.player.x, this.player.y);
      enemy.kill();
      this.explode(enemy);
      this.lifedownSFX.play();
      this.lifes -= 1;
      this.lifesText.text = this.lifes + " HP";
      // console.log("LIFETEST i got hit by bomb "+this.lifes);
    }
  },
  playerbyReaperHit(player, reaper) {
    if (this.lifes == 1) {
      player.kill();
      var explosion = this.add.sprite(player.x, player.y, 'explosion3');
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      explosion.play('boom', 15, false, true);
      this.deathSFX.play();
      this.displayEnd(false);

    } else {
      player.reset(this.player.x, this.player.y);
      reaper.kill();
      this.explode5(reaper);
      this.lifedownSFX.play();
      this.lifes -= 1;
      this.lifesText.text = this.lifes + " HP";;

    }
  },

  enemyHit(beam, enemy) {
    beam.kill();
    this.explode(enemy);
    enemy.kill();
    this.addToScore(enemy.reward);
    this.pewSFX.play();
    this.reaperCounter++;;
    this.speedCounter++;
    this.spawnCounter++;
  },
  reaperHit(beam, reaper) {
    beam.kill();
    this.evilcatSFX.play();
    this.explode5(reaper);
    reaper.kill();
    this.addToScore(reaper.reward);
  },

  enemyHitbyTail(tail, enemy) {
    tail.kill();
    this.explode(enemy);
    enemy.kill();
    this.addToScore(enemy.reward);
    this.pewSFX.play();
    this.reaperCounter++;
    this.firereaperCounter++;
    this.speedCounter++;
    this.spawnCounter++;

  },
  reaperHitbyTail(tail, reaper) {
    tail.kill();
    this.explode5(reaper);
    reaper.kill();
    this.addToScore(reaper.reward);
    this.evilcatSFX.play();
    this.firereaperCounter++
  },


  fire() {
    if (!this.player.alive || this.time.now < this.nextFire) {
      return;
    }
    if (this.beamPool.countDead() === 0) {
      return;
    }
    this.nextFire = this.time.now + this.shotDelay;

    var beam = this.beamPool.getFirstExists(false);

    beam.reset(this.player.x + 70, this.player.y);
    beam.body.velocity.x = 1000; //firerate

  },
  maketail() {
    if (!this.player.alive || this.tailPool.countDead() === 0) {
      return;
    }
    var tail = this.tailPool.getFirstExists(false);
    tail.reset(this.player.x - 12, this.player.y);
    tail.body.velocity.x = -700;

  },

  explode(sprite) {
    if (this.explosionPool.countDead() === 0) {
      return;
    }
    var explosion = this.explosionPool.getFirstExists(false);
    explosion.reset(sprite.x, sprite.y);
    explosion.play('boom', 15, false, true);
    explosion.body.velocity.x = sprite.body.velocity.x;
    explosion.body.velocity.y = sprite.body.velocity.y;
  },

  explode5(sprite) {
    if (this.explosion5Pool.countDead() === 0) {
      return;
    }
    var explosion5 = this.explosion5Pool.getFirstExists(false);
    explosion5.reset(sprite.x, sprite.y);
    explosion5.play('boom', 15, false, true);
    explosion5.body.velocity.x = sprite.body.velocity.x;
    explosion5.body.velocity.y = sprite.body.velocity.y;
  },

  addToScore(score) {
    this.score += score;
    this.scoreText.text = this.score;
  },

  minusToLifes(life) {
    this.lifedownSFX.play();
    this.lifes = this.lifes - life;
    this.lifesText.text = this.lifes + " HP";
  },
  displayEnd(win) {
    if (this.endText && this.endText.exists) {
      return;
    }

    var msg = win ? 'You Win!!!' : 'Game Over!';
    this.lifesText.text = this.lifes + " HP";;
    this.endText = this.add.text(
      this.game.width / 2, this.game.height / 2 - 60, msg, {
        font: '72px "Press Start 2P"',
        fill: '#fff'
      }
    );

    this.endText.anchor.setTo(0.5, 0);

    this.showReturn = this.time.now + 2000;
  },

  restartGame() {
    this.enemyPool.destroy();
    this.reaperPool.destroy();
    this.speedCounter = 0;
    this.spawnCounter = 0;
    this.reaperCounter = 0;
    this.lifes = 1;
    obj = null;
    game.state.start('menu');
  },


};
