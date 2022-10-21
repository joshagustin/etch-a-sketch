let mouseDown = false;
let color = '#011627';
const slider = document.querySelector('.slider');
const eraserButton = document.querySelector('.color');
const colorSelector = document.querySelector('#color-selector');
const eraseAllButton = document.querySelector('.erase-all');
createGrid(Number(slider.value));

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
    // prevents dragging behavior of pointer on cells
    e.preventDefault();
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
    if (this.classList.length) {
        color = this.classList[1];
        return;
    }
    color = this.value;
}

function eraseAll() {
    const gridCells = document.querySelectorAll('.gridCell');
    gridCells.forEach(cell => {
        cell.style.background = '#ffffff';
    });
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
eraserButton.addEventListener('click', changeColor);
colorSelector.addEventListener('input', changeColor);
eraseAllButton.addEventListener('click', eraseAll);