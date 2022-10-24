let mouseDown = false;
const slider = document.querySelector('.slider');
const colorSelector = document.querySelector('#color-selector');
const eraseAllButton = document.querySelector('.erase-all');
const eraserButton = document.querySelector('.eraser');
const colorButton = document.querySelector('.color');
let color = colorSelector.value;
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
    // color buttons
    if (this.classList.length) {
        color = this.classList[1];
    }
    // color slider
    else {
        color = this.value;
        updateColorButton(color);
    }
}

function eraseAll() {
    const gridCells = document.querySelectorAll('.gridCell');
    gridCells.forEach(cell => {
        cell.style.background = '#ffffff';
    });
}

function updateColorButton(newColor) {
    const oldColor = colorButton.classList[1];
    colorButton.style.background = newColor;
    colorButton.classList.replace(oldColor, newColor);
}

window.addEventListener('mousedown', () => {
    mouseDown = true;
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
});

// separate change and input events to prevent lag from constantly updating the grid
// update the grid only when user settles on a value
slider.addEventListener('change', changeGridSize);
slider.addEventListener('input', updateGridSizeDisplay);
colorSelector.addEventListener('input', changeColor);
colorButton.addEventListener('click', changeColor)
eraseAllButton.addEventListener('click', eraseAll);
eraserButton.addEventListener('click', () => {
    color = '#ffffff';
});