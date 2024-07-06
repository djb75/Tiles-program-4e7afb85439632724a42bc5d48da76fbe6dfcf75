const rows = 14;
const columns = 11;
const image1 = 'image1.jpg';
const image2 = 'image2.jpg';
const image3 = 'image3.jpg';
const image4 = 'image4.jpg';

// Function to create the matrix editor
function createMatrixEditor() {
    const matrixEditor = document.getElementById('matrix-editor');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = 0; // Default value
            input.className = 'matrix-input';
            input.id = `cell-${i}-${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        matrixEditor.appendChild(row);
    }
}

// Function to read the matrix from the editor
function readMatrixFromEditor() {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            const cellValue = document.getElementById(`cell-${i}-${j}`).value;
            row.push(parseInt(cellValue, 10));
        }
        matrix.push(row);
    }
    return matrix;
}

// Function to create the mosaic based on the matrix
function createMosaic(matrix, images) {
    const mosaicContainer = document.getElementById('mosaic');
    mosaicContainer.innerHTML = ''; // Clear previous mosaic
    matrix.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement('div');
            div.className = 'cell';
            div.style.backgroundImage = `url(${images[cell]})`;
            mosaicContainer.appendChild(div);
        });
    });
}

// Function to update the mosaic based on user input
function updateMosaic() {
    const matrix = readMatrixFromEditor();
    createMosaic(matrix, [image1, image2, image3, image4]);
    document.getElementById('mosaic').style.opacity = 1; // Ensure the mosaic is visible
    updateCounters(matrix);
}

// Function to randomize the matrix with skewed probabilities
function randomizeMatrix() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const randomValue = getRandomSkewedValue();
            document.getElementById(`cell-${i}-${j}`).value = randomValue;
        }
    }
    revealMosaic();
}

// Function to get a random skewed value
function getRandomSkewedValue() {
    const random = Math.random();
    if (random < 0.1) return 0; // 10% chance for image1
    if (random < 0.2) return 1; // 10% chance for image2
    if (random < 0.6) return 2; // 40% chance for image3
    return 3; // 40% chance for image4
}

// Function to reveal the mosaic with an animation
function revealMosaic() {
    const mosaicContainer = document.getElementById('mosaic');
    mosaicContainer.style.opacity = 0; // Hide the mosaic initially
    setTimeout(() => {
        const matrix = readMatrixFromEditor();
        createMosaic(matrix, [image1, image2, image3, image4]);
        mosaicContainer.style.opacity = 1; // Fade in the mosaic
        updateCounters(matrix);
    }, 500); // Delay to simulate the randomize process
}

// Function to update the counters
function updateCounters(matrix) {
    let count1And2 = 0;
    let count3And4 = 0;
    matrix.forEach(row => {
        row.forEach(cell => {
            if (cell === 0 || cell === 1) {
                count1And2++;
            } else if (cell === 2 || cell === 3) {
                count3And4++;
            }
        });
    });
    document.getElementById('count-1-2').innerText = `Number of 1s and 2s: ${count1And2}`;
    document.getElementById('count-3-4').innerText = `Number of 3s and 4s: ${count3And4}`;
}

// Initialize the matrix editor on page load with falling animation
window.onload = function() {
    createMatrixEditor();
    setTimeout(() => {
        const inputs = document.querySelectorAll('.matrix-input');
        inputs.forEach((input, index) => {
            input.style.animationDelay = `${index * 0.03}s`;
        });
    }, 100); // Slight delay to ensure all elements are in the DOM
};