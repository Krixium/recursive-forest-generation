const treeSeedingChance = 0.002
const treeSpawnChance = 0.12
const recursiveCallChance = 0.30
const recallCoeff = 0.4

const gridSize = 200
const canvasSize = 800
const squareSize = 4

// Field representation, 0 is nothing, 1 is tree
let field = []

// Create a field of all 0s
let initField = () => {
    for (let i = 0; i < canvasSize; i++)
    {
        let tmp = [];
        for (let j = 0; j < canvasSize; j++)
        {
            tmp.push(0)
        }
        field.push(tmp)
    }
}

// Spawn some initial trees on the field
let seedTrees = () => {
    // For each element in 2D array f...
    for (let i = 0; i < gridSize; i++) 
    {
        for (let j = 0; j < gridSize; j++)
        {
            if (Math.random() > (1 - treeSeedingChance))
            {
                field[i][j] = 1;
            }
        }
    }
}

// Recursively spread trees
let recursive = (x, y, callChance) => {
    // Make changes to temporary field
    let tmp = field;

    // Check all 8 surronding squares
    for (let i = -1; i <= 1; i++)
    {
        for (let j = -1; j <= 1; j++)
        {
            let a = x + i;
            let b = y + j;
            // If the square is within bounds
            if ((a >= 0 && a < gridSize) && (b >= 0 && b < gridSize))
            {
                // If the square is not a tree
                if (field[a][b] !== 1)
                {
                    // Roll the dice and place a tree there
                    if (Math.random() > (1 - treeSpawnChance))
                    {
                        tmp[a][b] = 1
                    }
                    else
                    {
                        tmp[a][b] = 0;
                    }
                }

                // Random chance for recursive call on a neighbouring square
                if (a !== x && b !== y)
                {
                    if (Math.random() > (1 - callChance))
                    {
                        let chance = callChance * recallCoeff
                        recursive(a, b, chance)
                    }
                }
            }
        }
    }

    field = tmp;
}

// Run the recursive algorithm
let runAlgo = () => {
    field.forEach((element, i) => {
        element.forEach((cell, j) => {
            if (cell === 1)
            {
                recursive(i, j, recursiveCallChance)
            }
        })
    })
}

// Draw the field on the canvas
let paintField = () => {
    noStroke();
    field.forEach((c, i) => {
        c.forEach((d, j) => {
            if (d == 0)
            {
                fill(0, 150, 255)
            }
            else
            {
                fill(0, 255, 80)
            }
            rect(i * squareSize, j * squareSize, squareSize, squareSize)
        })
    })
}

// Program entry point
var setup = () => {
    // Setup canvas
    createCanvas(800, 800)
    background(230)

    initField();
    seedTrees()
    runAlgo();
    paintField();
}

// Debugging Tool
// Displays mouse position in console when clicked
var mousePressed = () => {
    console.log(Math.floor(mouseX / squareSize), Math.floor(mouseY / squareSize))
}