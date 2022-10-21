let mouseDown = false;
let color = '#011627';
const slider = document.querySelector('.slider');
const colorButtons = document.querySelectorAll('.color');
createGrid(4);

function createGrid(size) {
    const container = document.querySelector('.container');
    // size in px;
    const containerSize = container.offsetWidth;
    const cellSideLength = containerSize / size;
    const totalCells = size ** 2
    for (let i = 0; i < totalCells; i++) {
        const gridCell = document.createElement('div')
        gridCell.classList.add('gridCell');
        gridCell.style.width = `${cellSideLength}px`;
        gridCell.style.height = `${cellSideLength}px`;
        container.appendChild(gridCell);
    }
    addEventListenerToCells();
    updateGridSizeDisplay();
}

function colorCellClick(e) {
    this.style.background = color;
}

function colorCellMouse() {
    if (!mouseDown) return;
    this.style.background = color;
}

function changeGridSize() {
    const newSize = this.value;
    console.log(newSize);
    if (newSize == null) return;
    deleteGrid();
    createGrid(newSize);
}

function getGridSize() {
    let newSize = '';
    while (!Number.isInteger(newSize) || newSize < 1 || newSize > 100) {
        newSize = prompt("Enter an integer (1 - 100): ");
        if (newSize == null) break;
        newSize = Number(newSize);
    }
    return newSize;
}

function deleteGrid() {
    const gridCells = document.querySelectorAll('.gridCell');
    const container = document.querySelector('.container');;
    gridCells.forEach(cell => {
        container.removeChild(cell);
    });
}

function addEventListenerToCells() {
    const gridCells = document.querySelectorAll('.gridCell');
    gridCells.forEach(cell => {
        cell.addEventListener('mousedown', colorCellClick);
        cell.addEventListener('mouseover', colorCellMouse);
    });
}

function updateGridSizeDisplay() {
    const size = document.querySelector('.slider').value;
    const textContainer = document.querySelector('.grid-size-display');
    const text = `${size} x ${size}`;
    textContainer.textContent = text;
}

function changeColor() {
    color = this.classList[1];
}

window.addEventListener('mousedown', e => {
    mouseDown = true;
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
});

// separate change and input events to prevent lag from constantly updating the grid
// update the grid only when user settles on a value
slider.addEventListener('change', changeGridSize);
slider.addEventListener('input', updateGridSizeDisplay);
colorButtons.forEach(button => {
    button.addEventListener('click', changeColor);
});