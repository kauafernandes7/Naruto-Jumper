const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');
const gameBoard = document.querySelector('.game-board');

document.addEventListener('keydown', (event) => {
    if (!hasStartedOnce) {
        startGame(); // Inicia o jogo com a primeira tecla pressionada
    } else if (gameStarted) {
        jump(); // Depois, qualquer tecla faz pular
    }
});

let time = 0;
let timer;
let loop;
let speed = 1.5;
let gameStarted = false;
let hasStartedOnce = false;
let pipeDelayMin = 2000;
let pipeDelayMax = 3000;



function startGame() {
    if (hasStartedOnce) return;
    hasStartedOnce = true;
    gameStarted = true;

    mario.src = './img/narutorun.gif';
    mario.style.width = '12em';

    gameBoard.style.animation = `mover-fundo 60s infinite linear`;

    pipe.style.animation = `pipe-animation ${speed}s infinite linear`;


    timer = setInterval(() => {
        time++;
        scoreDisplay.textContent = `Time: ${time}s`;
    }, 1000);


    loop = setInterval(checkColision, 10);

    spawnPipe();

    setInterval(() => {
        if (!gameStarted) return;

        speed = speed - 0.25;
        pipe.style.animation = `pipe-animation ${speed}s infinite linear`;

    }, 10000);

    setInterval(() => {
        if (!gameStarted) return;

        // Aumentar a velocidade do pipe
        speed -= 0.1;
        pipe.style.animation = `pipe-animation ${speed}s infinite linear`;

        // Diminuir o tempo entre os troncos
        pipeDelayMin = Math.max(300, pipeDelayMin - 200);
        pipeDelayMax = Math.max(500, pipeDelayMax - 200);

    }, 10000); // a cada 10 segundos
}

function jump() {
    if (!mario.classList.contains('jump') && gameStarted == true) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 700);
    }
}

function checkColision() {
    const pipePosition = pipe.offsetLeft;
    const marioBottom = parseFloat(window.getComputedStyle(mario).bottom);

    if (pipePosition <= 100 && pipePosition > 0 && marioBottom > 40 && marioBottom < 100) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioBottom}px`;

        clearInterval(timer);
        clearInterval(loop);
        gameStarted = false;

        showGameOver();
        mario.src = './img/narutocry.png';
        mario.style.width = '8em';
    }

    if (pipePosition <= 200 && pipePosition > 0 && marioBottom < 40) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioBottom}px`;

        clearInterval(timer);
        clearInterval(loop);
        gameStarted = false;

        showGameOver();
        mario.src = './img/narutocry.png';
        mario.style.width = '8em';
    }
}

function spawnPipe() {
    if (!gameStarted) return;

    pipe.style.left = '100%';
    pipe.style.transition = 'none';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            pipe.style.transition = `left ${speed}s linear`;
            pipe.style.left = '-6.5em';
        });
    });

    const delay = Math.random() * (pipeDelayMax - pipeDelayMin) + pipeDelayMin;

    setTimeout(spawnPipe, speed * 1000 + delay);
}

function showGameOver() {
    const gameOverScreen = document.getElementById('game-over');
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = `Final Time: ${time}s`;
    gameOverScreen.style.display = 'flex';
}

function reset() {
    location.reload();
}