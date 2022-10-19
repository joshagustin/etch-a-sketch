let mouseDown = false;
const sizeButton = document.querySelector('.size.button');
createGrid(4);

function createGrid(size) {
    const container = document.querySelector('.container');
    // size in px
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
}

function colorCellClick() {
    this.style.background = '#00FFFF';
}

function colorCellMouse() {
    if (!mouseDown) return;
    this.style.background = '#00FFFF';
}

function changeGridSize() {
    const newSize = getGridSize();
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

window.addEventListener('mousedown', () => {
    mouseDown = true;
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
});

sizeButton.addEventListener('click', changeGridSize);