// TOP's pseudocode steps

// Create a 16x16 grid first of square divs using JS (the space should be 960px wide)
// -> These sqaures should go inside a container div that can then go directly in the html
// -> This means that the container div will be a flex container to the squares (flex items)
// Add event listeners to every square such that when the mouse hovers over it, it changes the background color of the square
// Create a popup that allows users to enter a number for which a new grid with those dimensions can be generated
// -> Gives user opportunities to create new grids and drawings

// My extended pseudocode

// Create a button feature to give each hover fill a random fill color
// -> Said another way, every time a square is hovered over there is a new color
// Refactor function generateGrid to only generate the grid
// -> Have a function call to another function that sets the default color fill (black)
// -> Use that function to set the hover fill of each square to a new color(?)

let globalNumberChoice;
let darknessOpacity = 0;
const gridSquareDefaultStyling = "flex: 1 0 0px; border: 1px solid black;";
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
const gridSquareColorFillRandomizerButton = document.createElement("button");
gridSquareColorFillRandomizerButton.textContent = "Randomize Fill!";
gridSquareColorFillRandomizerButton.style.cssText = "padding: 8px 16px; font-size: 24px; border-radius: 8px; margin-bottom: 16px; margin-left: 16px";
document.body.insertBefore(gridSquareColorFillRandomizerButton, gridContainer);
const gridSquareRainbowColorButton = document.createElement("button");
gridSquareRainbowColorButton.textContent = "Rainbow!";
gridSquareRainbowColorButton.style.cssText = "padding: 8px 16px; font-size: 24px; border-radius: 8px; margin-bottom: 16px; margin-left: 16px";
document.body.insertBefore(gridSquareRainbowColorButton, gridContainer);
const gridSquareDarkeningFillButton = document.createElement("button");
gridSquareDarkeningFillButton.textContent = "Darkening Fill";
gridSquareDarkeningFillButton.style.cssText = "padding: 8px 16px; font-size: 24px; border-radius: 8px; margin-bottom: 16px; margin-left: 16px";
document.body.insertBefore(gridSquareDarkeningFillButton, gridContainer);

gridDimensionsButton.addEventListener("click", function() {
    let numberChoice;
    while (!(Number.isInteger(numberChoice)) || (+numberChoice > 100)) {
        numberChoice = +prompt("Number: ");
        globalNumberChoice = numberChoice;
    }
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    generateGrid(numberChoice);
    assignFillColor("black");
})

gridResetButton.addEventListener("click", function() {
    darknessOpacity = 0;
    let hoveredSquares = document.querySelectorAll(".square-identifier");
    for (const hoveredSquare of hoveredSquares) {
        hoveredSquare.style.cssText = gridSquareDefaultStyling;
    }
})

gridSquareColorFillRandomizerButton.addEventListener("click", function() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    let randomRValue = Math.floor(Math.random()*256);
    let randomGValue = Math.floor(Math.random()*256);
    let randomBValue = Math.floor(Math.random()*256);
    generateGrid(globalNumberChoice);
    assignFillColor(`rgb(${randomRValue}, ${randomGValue}, ${randomBValue})`);
})

gridSquareRainbowColorButton.addEventListener("click", function() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    generateGrid(globalNumberChoice);
    assignFillColor("rainbow", "RGB");
})

gridSquareDarkeningFillButton.addEventListener("click", function() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    generateGrid(globalNumberChoice);
    assignFillColor("darken", "Darkening");
})

function generateGrid(number) {
    for (let i = 0; i < number; i++) {
        const gridSquaresRowContainer = document.createElement("div");
        gridSquaresRowContainer.style.cssText = "display: flex; flex: 1 0 0"
        for (let j = 0; j < number; j++) {
            const gridSquare = document.createElement("div");
            gridSquare.style.cssText = gridSquareDefaultStyling;
            gridSquare.classList.add("square-identifier");
            gridSquaresRowContainer.appendChild(gridSquare);
        }
        gridContainer.appendChild(gridSquaresRowContainer);
    }
}

function assignFillColor(fillColor, condition) {
    let gridSquares = document.querySelectorAll(".square-identifier");
    if (condition == "RGB") {
        for (const gridSquare of gridSquares) {
            let randomRValue = Math.floor(Math.random()*256);
            let randomGValue = Math.floor(Math.random()*256);
            let randomBValue = Math.floor(Math.random()*256);
            gridSquare.addEventListener("mouseover", function() {
                gridSquare.style.cssText = gridSquareDefaultStyling + `background-color: rgb(${randomRValue}, ${randomGValue}, ${randomBValue})`;
            })
        }
    } else if (condition == "Darkening") {
        darknessOpacity = 0;
        gridContainer.addEventListener("mouseover", function(e) {
            let hoveredSquare = e.target;
            if (hoveredSquare.style.cssText == gridSquareDefaultStyling) {
                hoveredSquare.style.cssText = gridSquareDefaultStyling + `background-color: rgba(0,0,0,${darknessOpacity})`;
                darknessOpacity += .01;
            }
        })
    } else {
        for (const gridSquare of gridSquares) {
            gridSquare.addEventListener("mouseover", function() {
                gridSquare.style.cssText = gridSquareDefaultStyling + `background-color: ${fillColor}`;
            })
        }
    } 
}