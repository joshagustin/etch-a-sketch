let mouseDown = false;
createGrid();

function createGrid() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 16; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('gridCell');
        container.appendChild(gridCell);
    }
}

function colorCellClick() {
    this.style.background = '#00FFFF';
}

function colorCellMouse() {
    if (!mouseDown) return;
    this.style.background = '#00FFFF';
}

const gridCells = document.querySelectorAll('.gridCell');
gridCells.forEach(cell => {
    cell.addEventListener('mousedown', colorCellClick);
    cell.addEventListener('mouseover', colorCellMouse);
})

window.addEventListener('mousedown', () => {
    mouseDown = true;
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
});