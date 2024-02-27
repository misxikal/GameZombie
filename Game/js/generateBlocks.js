const gameContainer = document.getElementById('game-container');

function isColliding(obstacle1, obstacle2) {
    const rect1 = obstacle1.getBoundingClientRect();
    const rect2 = obstacle2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}
function checkCollisions(newObstacle) {
    const obstacles = document.getElementsByClassName(newObstacle.className);
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i] !== newObstacle && isColliding(newObstacle, obstacles[i])) {
            return true; // если обнаружено пересечение
        }
    }
    return false; // если пересечений не обнаружено
}
function generateObstacle(className) {
    let obstacle;
    do {
        obstacle = document.createElement('div');
        obstacle.classList.add(className);
        obstacle.classList.add('static'); // добавляем общий класс obstacle
        obstacle.style.left = (Math.floor(Math.random() * (gameContainer.offsetWidth - 150)) + (Math.random() * 100)) + 'px';
    }
    while (checkCollisions(obstacle)); // проверяем пересечения

    gameContainer.appendChild(obstacle);
}

function generatePlatforms() {
    for (let i = 0; i < 3; i++) {
        generateObstacle('platform');
    }
}

function generateSingleSquares() {
    for (let i = 0; i < 2; i++) {
        generateObstacle('single-square');
    }
}

function generateDoubleSquares() {
    for (let i = 0; i < 2; i++) {
        generateObstacle('double-square');
    }
}

function generateSingleRunes() {
    for (let i = 0; i < Math.round(Math.random() * 5); i++) {
        generateObstacle('rune');
    }
}

function generateZombie() {
    let obstacle;
    obstacle = document.createElement('div');
    obstacle.classList.add('zombie'); // добавляем общий класс obstacle
    obstacle.style.left = 1000 + 'px';
    gameContainer.appendChild(obstacle);
}

function generateDoor() {
    let obstacle;
    obstacle = document.createElement('div');
    obstacle.classList.add('door'); // добавляем общий класс obstacle
    obstacle.style.left = 1200 + 'px';
    gameContainer.appendChild(obstacle);
}


generatePlatforms();
generateSingleSquares();
generateDoubleSquares();
generateSingleRunes();
generateZombie();
generateDoor();