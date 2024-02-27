let isJumping = false;
let player = document.createElement('div');
player.classList.add('player');

let isGame = true;
document.querySelector('.game-container').appendChild(player);

player.style.left = '0';
player.style.position = 'absolute';
let user_score = 0;

document.querySelector('#Score').textContent = "Score: " + user_score;


document.addEventListener('keydown', (event) => {
    movement(event);
    sitDown(event);
    jump(event);
});

function jump(event) {
    if (event.key === "ArrowUp") {
        if (!isJumping) {
            isJumping = true;
            const playerBottom = parseInt(player.style.bottom) || 0;
            if (playerBottom < 200) {
                player.style.bottom = playerBottom + 200 + 'px';
            } else {
                player.style.bottom = '0';
            }
            setTimeout(() => {
                player.style.bottom = '0';
                isJumping = false;
            }, 500);
        }
    }
}

function movement(event) {
    const movementSpeed = 5; // Увеличьте значение для увеличения скорости

    if (event.key === 'ArrowRight') {
        // Move right
        player.style.transform = 'scale(1, 1)';
        const playerLeft = parseInt(player.style.left) || 0;
        const newLeft = Math.min(playerLeft + movementSpeed, 1300);
        player.style.left = newLeft + 'px';
    } else if (event.key === 'ArrowLeft') {
        // Move left
        player.style.transform = 'scale(-1, 1)';
        const playerLeft = parseInt(player.style.left) || 0;
        const newLeft = Math.max(playerLeft - movementSpeed, 0);
        player.style.left = newLeft + 'px';
    }

    // Проверка столкновения с рунами
    checkRuneCollision();
    checkZombieCollision();
    checkDoorCollision();
}

function checkRuneCollision() {
    const playerRect = player.getBoundingClientRect();
    const runes = document.getElementsByClassName('rune');

    Array.from(runes).forEach(rune => {
        const runeRect = rune.getBoundingClientRect();
        if (checkCollision(playerRect, runeRect)) {
            user_score += 1;
            document.querySelector('#Score').textContent = "Score: " + user_score;
            localStorage.setItem('current_score', user_score);
            rune.style.display = 'none'; // Прячем собранную руну (ваш способ обработки может отличаться)
        }
    });
}

function checkDoorCollision() {
    const playerRect = player.getBoundingClientRect();
    const door = document.querySelector('.door');

    const runeRect = door.getBoundingClientRect();
    if (checkCollision(playerRect, runeRect)) {
        gameEnd();
    }
}

let health = 5; // начальное значение здоровья
let isBlinking = false; // флаг для отслеживания состояния мигания

function checkZombieCollision() {
    const playerRect = player.getBoundingClientRect();
    const zombies = document.getElementsByClassName('zombie');

    Array.from(zombies).forEach(zombie => {
        const runeRect = zombie.getBoundingClientRect();
        if (checkCollision(playerRect, runeRect)) {
            // Если персонаж не мигает, обрабатываем столкновение
            if (!isBlinking) {
                // Уменьшаем здоровье на 1
                health--;
                const healfContainer = document.getElementById('healf');

                // Находим последний элемент с классом 'point-hp'
                const lastPoint = healfContainer.querySelector('.point-hp:last-child');
                
                // Проверяем, что элемент существует, прежде чем его удалять
                if (lastPoint) {
                    // Удаляем последний элемент
                    healfContainer.removeChild(lastPoint);
                }
                // Включаем анимацию мигания
                player.classList.add('blink');
                isBlinking = true;

                // Если здоровье стало меньше или равно 0, перезагружаем страницу
                if (health <= 0) {
                    location.reload();
                }

                // Задержка перед следующим уменьшением здоровья
                setTimeout(() => {
                    // Выключаем анимацию мигания
                    player.classList.remove('blink');
                    isBlinking = false;
                }, 500); // Время анимации мигания (в миллисекундах)
            }
        }
    });
}

function checkCollision(rect1, rect2) {
    return (
        rect1.right > rect2.left &&
        rect1.left < rect2.right &&
        rect1.bottom > rect2.top &&
        rect1.top < rect2.bottom
    );
}

document.addEventListener("keydown", movement);

function sitDown(event) {
    if (event.key === 'ArrowDown') {
        // Hide underground
        player.style.bottom = '-50px';
        setTimeout(() => {
            player.style.bottom = '0';
        }, 500);
    }
}

function deleteRune(player) {
    document.querySelectorAll('.rune').forEach( (element, key) => {
        if (parseInt(element.style.left) === parseInt(player.style.left))
        {
            document.querySelector('.game-container').removeChild(element);
            user_score += 1;
            document.querySelector('#Score').textContent = "Score: " + user_score;
            localStorage.setItem('current_score', user_score);
        }
    });
}