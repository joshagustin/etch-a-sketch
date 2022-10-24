let mouseDown = false;
let rainbowMode = false;
let selectorMode = false;
const slider = document.querySelector('.slider');
const colorSelector = document.querySelector('#color-selector');
const eraseAllButton = document.querySelector('.erase-all');
const eraserButton = document.querySelector('.eraser');
const colorButton = document.querySelector('.color');
const rainbowButton = document.querySelector('.rainbow');
const selectorButton = document.querySelector('.selector');
const optionButtons = document.querySelectorAll('.option');
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
        gridCell.style.background = '#ffffff';
        container.appendChild(gridCell);
    }
    addEventListenerToCells();
    updateGridSizeDisplay();
}

function colorCellClick(e) {
    // prevents dragging behavior of pointer on cells
    e.preventDefault();
    if (selectorMode) {
        storeCellColor(this);
        return;
    }
    if (rainbowMode) {
        this.style.background = generateRandomColor();
        return;
    }
    this.style.background = color;
}

function colorCellMouse() {
    if (!mouseDown) return;
    if (selectorMode) {
        storeCellColor(this);
        return;
    }
    if (rainbowMode) {
        this.style.background = generateRandomColor();
        return;
    }
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
    const container = document.querySelector('.container');;
    container.innerHTML = '';
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
    rainbowMode = false;
    selectorMode = false;
    // color button
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
    if (newColor.length > 7) {
        newColor = rgbToHex(newColor);
        colorSelector.value = newColor;
    }
    const oldColor = colorButton.classList[1];
    colorButton.style.background = newColor;
    colorButton.classList.replace(oldColor, newColor);
}

function generateRandomColor() {
    const randRed = Math.floor(Math.random() * 256);
    const randGreen = Math.floor(Math.random() * 256);
    const randBlue = Math.floor(Math.random() * 256);
    return `rgb(${randRed}, ${randGreen}, ${randBlue})`;
}

function storeCellColor(cell) {
    color = cell.style.background;
    updateColorButton(color);
}

function rgbToHex(rgb) {
    rgb = rgb.split(/[\s,()]+/);
    const red = rgb[1];
    const green = rgb[2];
    const blue = rgb[3];
    return '#' + componentToHex(red) + componentToHex(green) + componentToHex(blue);
}

function componentToHex(c) {
    c = Number(c);
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

function highlightButton() {
    const formerActiveButton = document.querySelector('.active');
    if (formerActiveButton) {
        formerActiveButton.classList.toggle('active');
    }
    this.classList.toggle('active');
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
    rainbowMode = false;
    selectorMode = false;
});
rainbowButton.addEventListener('click', () => {
    rainbowMode = true;
    selectorMode = false;
});
selectorButton.addEventListener('click', () => selectorMode = true);
optionButtons.forEach(optionButton => optionButton.addEventListener('click', highlightButton));