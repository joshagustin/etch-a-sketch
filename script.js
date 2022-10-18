function createGrid() {
    const container = document.querySelector('.container');
    console.log(container);
    for (let i = 0; i < 16; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('gridCell');
        container.appendChild(gridCell);
    }
}

createGrid();