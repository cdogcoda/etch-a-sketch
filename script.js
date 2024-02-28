// TOP's pseudocode steps

// Create a 16x16 grid first of square divs using JS (the space should be 960px wide)
// -> These sqaures should go inside a container div that can then go directly in the html
// -> This means that the container div will be a flex container to the squares (flex items)
// Add event listeners to every square such that when the mouse hovers over it, it changes the background color of the square
// Create a popup that allows users to enter a number for which a new grid with those dimensions can be generated
// -> Gives user opportunities to create new grids and drawings

const gridContainer = document.querySelector(".container");
gridContainer.style.cssText = "width: 960px; height: 960px; border: 2px solid black; margin: 0 auto; display: flex; flex-flow: column wrap";
const gridDimensionsButton = document.createElement("button");
gridDimensionsButton.textContent = "Click Me!";
gridDimensionsButton.style.cssText = "padding: 8px 16px; font-size: 24px; border-radius: 8px; margin-bottom: 16px;";
document.body.insertBefore(gridDimensionsButton, gridContainer);
const gridResetButton = document.createElement("button");
gridResetButton.textContent = "Reset Grid";
gridResetButton.style.cssText = "padding: 8px 16px; font-size: 24px; border-radius: 8px; margin-bottom: 16px; margin-left: 16px";
document.body.insertBefore(gridResetButton, gridContainer);

gridDimensionsButton.addEventListener("click", function() {
    let numberChoice;
    while (!(Number.isInteger(numberChoice)) || (+numberChoice > 100)) {
        numberChoice = +prompt("Number: ");
    }
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    generateGrid(numberChoice);
})

gridResetButton.addEventListener("click", function() {
    let hoveredSquares = document.querySelectorAll(".mouseover");
    for (const hoveredSquare of hoveredSquares) {
        hoveredSquare.classList.remove("mouseover");
    }
})

function generateGrid(number) {
    for (let i = 0; i < number; i++) {
        const gridSquaresRowContainer = document.createElement("div");
        gridSquaresRowContainer.style.cssText = "display: flex; flex: 1 0 0"
        for (let j = 0; j < number; j++) {
            const gridSquare = document.createElement("div");
            gridSquare.style.cssText = "flex: 1 0 0; border: 1px solid black";
            gridSquare.addEventListener("mouseover", function() {
                gridSquare.classList.add("mouseover");
            })
            gridSquaresRowContainer.appendChild(gridSquare);
        }
        gridContainer.appendChild(gridSquaresRowContainer);
    }
}