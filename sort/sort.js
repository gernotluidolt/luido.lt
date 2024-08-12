document.addEventListener('click', function () {
    const rect1 = document.getElementById('rect1');
    const rect2 = document.getElementById('rect2');

    setTimeout(() => {
        rect1.classList.toggle('moveUpOver');
    }, 1000);
});