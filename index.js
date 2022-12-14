const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const size = 20;
const rows = canvas.height / size;
const columns = canvas.width / size;

const spacings = [250, 200, 180, 150, 130, 120, 110, 100, 1];
const spaceTarget = [0, 5, 10, 20, 30, 40, 55, 80, 99999];
let spacingIdx = 0; // 200 milliseconds

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

let snake = new Snake(size, { canvas, ctx });
let target = new Target(size, { canvas, ctx, rows, columns });
let mainCycle = null;

function init() {
    target.genRandomLocation(snake);
    target.draw();
    snake.draw();
}

init();

function runGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    target.draw();
    snake.update();
    snake.draw();

    console.log("tails length: " + snake.len)

    if (snake.eatTarget(target)) {
        if (snake.targetNum >= spaceTarget[spacingIdx + 1]) {
            ++spacingIdx;
            clearInterval(mainCycle);
            mainCycle = setInterval(runGame, spacings[spacingIdx]);
            document.getElementById('score').innerText = snake.targetNum;
        }
    }

    document.getElementById('score').innerText = snake.targetNum;

    if (snake.checkCollision()) {
        gameover();
        endCycle();
        snake.init();
        spacingIdx = 0;
    }
}

function startCycle() {
    if (mainCycle != null) return;
    document.getElementById('canvas').className = 'canvas';
    pauseButton.style.display = 'block';
    startButton.style.display = 'none';
    mainCycle = setInterval(runGame, spacings[spacingIdx]);
}

function endCycle() {
    if (mainCycle == null) return;
    document.getElementById('canvas').className = 'canvas disabled-canvas';
    startButton.style.display = 'block';
    pauseButton.style.display = 'none';
    clearInterval(mainCycle);
    mainCycle = null;
}

function gameover() {
    document.getElementById('scoreDiv').style.display = 'none';
    document.getElementById('gameoverMsg').style.display = 'block';
    document.getElementById('finalscore').innerText = snake.targetNum;
    console.log('gameover');
    function hideMsg() {
        console.log('  >> running "hideMsg()"');
        document.getElementById('gameoverMsg').style.display = 'none';
        document.getElementById('scoreDiv').style.display = 'block';
        if (startButton.removeEventListener) {                   // // ???????????????????????? IE 8 ?????????IE??????
            startButton.removeEventListener("click", hideMsg);
        } else if (startButton.detachEvent) {                   // IE 8 ?????????IE??????
            startButton.detachEvent("onclick", hideMsg);
        }
    }
    startButton.addEventListener('click', hideMsg);
}

startButton.addEventListener('click', () => {
    startCycle();
})
pauseButton.addEventListener('click', () => {
    endCycle();
})

window.addEventListener('keydown', (event) => {
    const direction = event.key.replace('Arrow', '');
    console.log('direction: ' + direction);
    snake.changeDirection(direction);
})