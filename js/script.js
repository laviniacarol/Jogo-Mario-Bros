const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const restartButton = document.querySelector('.restart');

const backgroundMusic = new Audio('./sounds/mario-music.mp3');
const jumpSound = new Audio('./sounds/jump.mp3');

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2; 
backgroundMusic.play();

let score = 0;
let gameOver = false;

const jump = () => {
    if (!gameOver) {
        mario.classList.add('jump');
        jumpSound.currentTime = 0;  
        jumpSound.play();

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = '/images/game-over.png';
        mario.style.width = '60px';
        mario.style.marginLeft = '50px';

        gameOver = true;
        restartButton.style.display = 'block';

        clearInterval(loop);
        clearInterval(scoreInterval);
    }
}, 10);

const scoreInterval = setInterval(() => {
    if (!gameOver) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }
}, 100);

restartButton.addEventListener('click', () => {
    location.reload();
});

document.addEventListener('keydown', jump);
