function moveLeftAndRight(block, distance, speed) {
    const currentLeft = parseInt(block.style.left) || 0;
    
    function moveLeft() {
        let left = currentLeft;
        block.style.transform = 'scale(-1, 1)';
        const leftInterval = setInterval(() => {
            left -= speed;
            block.style.left = left + 'px';

            if (left <= currentLeft - distance) {
                clearInterval(leftInterval);
                moveRight();
            }
        }, 10);
    }

    function moveRight() {
        let left = parseInt(block.style.left) || 0;
        block.style.transform = 'scale(1, 1)';
        const rightInterval = setInterval(() => {
            left += speed;
            block.style.left = left + 'px';

            if (left >= currentLeft) {
                clearInterval(rightInterval);
                moveLeft();
            }
        }, 10);
    }

    // Начинаем с движения влево
    moveLeft();
}
// Пример использования
const block = document.querySelector(".zombie");
 // Замените "yourBlockId" на реальный идентификатор вашего блока

moveLeftAndRight(block, 250, .5);

 // Двигаем блок на 100 пикселей со скоростью 2 пикселя за шаг

 