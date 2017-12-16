myAudio = new Audio('assets/tracks/mainTheme.mp3');
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.volume = 0.5;
myAudio.play();
