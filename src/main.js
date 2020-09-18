const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

const obstacles = [{
        x: 0,
        y: 0
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 2,
        y: 0
    },
    {
        x: 3,
        y: 0
    },
    {
        x: 4,
        y: 0
    },
    {
        x: 5,
        y: 0
    },
    {
        x: 6,
        y: 0
    },
    {
        x: 7,
        y: 0
    },
    {
        x: 8,
        y: 0
    },
    {
        x: 9,
        y: 0
    },
    {
        x: 10,
        y: 0
    },
    {
        x: 11,
        y: 0
    },
    {
        x: 12,
        y: 0
    },
    {
        x: 13,
        y: 0
    },
    {
        x: 14,
        y: 0
    },
    {
        x: 15,
        y: 0
    },
    {
        x: 16,
        y: 0
    },
    {
        x: 17,
        y: 0
    },


    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 2
    },

    {
        x: 0,
        y: 4
    },
    {
        x: 0,
        y: 5
    },
    {
        x: 0,
        y: 6
    },
    {
        x: 0,
        y: 7
    },
    {
        x: 0,
        y: 8
    },

    {
        x: 1,
        y: 8
    },
    {
        x: 2,
        y: 8
    },
    {
        x: 3,
        y: 8
    },
    {
        x: 4,
        y: 8
    },
    {
        x: 5,
        y: 8
    },
    {
        x: 6,
        y: 8
    },
    {
        x: 7,
        y: 8
    },
    {
        x: 8,
        y: 8
    },
    {
        x: 9,
        y: 8
    },
    {
        x: 10,
        y: 8
    },
    {
        x: 11,
        y: 8
    },
    {
        x: 12,
        y: 8
    },
    {
        x: 13,
        y: 8
    },
    {
        x: 14,
        y: 8
    },
    {
        x: 15,
        y: 8
    },
    {
        x: 16,
        y: 8
    },
    {
        x: 17,
        y: 8
    },

    {
        x: 17,
        y: 7
    },
    {
        x: 17,
        y: 6
    },
    {
        x: 17,
        y: 5
    },
    {
        x: 17,
        y: 4
    },
    {
        x: 17,
        y: 2
    },
    {
        x: 17,
        y: 1
    },

    {
        x: 1,
        y: 2
    },
    {
        x: 1,
        y: 4
    },

    {
        x: 16,
        y: 2
    },
    {
        x: 16,
        y: 4
    },

    {
        x: 3,
        y: 2
    },
    {
        x: 4,
        y: 2
    },
    {
        x: 3,
        y: 3
    },
    {
        x: 4,
        y: 3
    },
    {
        x: 3,
        y: 4
    },
    {
        x: 4,
        y: 4
    },
    {
        x: 3,
        y: 6
    },
    {
        x: 4,
        y: 6
    },


    {
        x: 13,
        y: 2
    },
    {
        x: 14,
        y: 2
    },
    {
        x: 13,
        y: 3
    },
    {
        x: 14,
        y: 3
    },
    {
        x: 13,
        y: 4
    },
    {
        x: 14,
        y: 4
    },
    {
        x: 13,
        y: 6
    },
    {
        x: 14,
        y: 6
    },

    {
        x: 6,
        y: 2
    },
    {
        x: 7,
        y: 2
    },
    {
        x: 8,
        y: 2
    },
    {
        x: 9,
        y: 2
    },
    {
        x: 10,
        y: 2
    },
    {
        x: 11,
        y: 2
    },


    {
        x: 6,
        y: 4
    },
    {
        x: 7,
        y: 4
    },

    {
        x: 10,
        y: 4
    },
    {
        x: 11,
        y: 4
    },

    {
        x: 6,
        y: 5
    },
    {
        x: 11,
        y: 5
    },

    {
        x: 6,
        y: 6
    },
    {
        x: 11,
        y: 6
    },

    {
        x: 7,
        y: 6
    },
    {
        x: 8,
        y: 6
    },
    {
        x: 9,
        y: 6
    },
    {
        x: 10,
        y: 6
    },
];

let play = true,
    right = false,
    up = false;

let score = 0;

let pacmanDirection = 'right';

let fps = 5, now, then = Date.now(), interval = 1000 / fps, delta;

canvas.width = 1400;
canvas.height = 800;

const clearCanvas = () => { // clears the canvas' context
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawRect = (param) => { // draws the blocks of game
    ctx.beginPath();
    ctx.strokeStyle = param.strokeColor;
    ctx.strokeRect(param.x, param.y, param.width, param.height);
    ctx.fill();
};

const drawFood = (cell) => {
    ctx.beginPath();
    ctx.fillStyle = 'brown';
    ctx.fillRect(100 + cell.x * (50 + 10) + 20, 100 + cell.y * (50 + 10) + 20, 10, 10);
    ctx.fill();
};


let rightleft = '(0.25 * Math.PI, 1.25 * Math.PI, right), (0.75 * Math.PI, 1.75 * Math.PI, right)',
    updown = '(0.75 * Math.PI, 1.75 * Math.PI, right), (1.25 * Math.PI, 2.25 * Math.PI, right)';

const drawPacman = (cell, pacmanOpen) => {
    // let floatOpen = pacmanOpen / 100;
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    if (pacmanDirection === 'right' || pacmanDirection === 'left') {
        ctx.arc(100 + cell.x * (50 + 10) + 25, 100 + cell.y * (50 + 10) + 25, 20, 0.25 * Math.PI, 1.25 * Math.PI, right);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(100 + cell.x * (50 + 10) + 25, 100 + cell.y * (50 + 10) + 25, 20, 0.75 * Math.PI, 1.75 * Math.PI, right);
        ctx.fill();
    } else {
        ctx.arc(100 + cell.x * (50 + 10) + 25, 100 + cell.y * (50 + 10) + 25, 20, 0.75 * Math.PI, 1.75 * Math.PI, up);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(100 + cell.x * (50 + 10) + 25, 100 + cell.y * (50 + 10) + 25, 20, 1.25 * Math.PI, 2.25 * Math.PI, up);
        ctx.fill();
    }
};

const createGameMap = (rows, columns) => { // creates map by adding rows and columns
    const map = [];
    for (let x = 0; x < columns; x++) {
        const row = [];

        for (let y = 0; y < rows; y++) {
            row.push({
                x: x,
                y: y,
                pacman: false,
                obstacle: false,
                freeCell: true,
                food: true
            });
        }

        map.push(row);
    }
    return map;
};

const addingObjects = (cells) => {
    for (const cell of cells) {

        for (const obstacle of obstacles) {
            if (cell.x === obstacle.x && cell.y === obstacle.y) {
                cell.freeCell = !cell.freeCell;
                cell.obstacle = !cell.obstacle;
            }
        }

        if ((cell.x === 0 && cell.y === 3) || (cell.x === 17 && cell.y === 3) || (cell.x === 8 && cell.y === 4) ||
            (cell.x === 9 && cell.y === 4) || (cell.x === 7 && cell.y === 5) || (cell.x === 8 && cell.y === 5) ||
            (cell.x === 9 && cell.y === 5) || (cell.x === 10 && cell.y === 5)) {
            cell.food = !cell.food;
        }

        if (cell.x === 0 && cell.y === 3) {
            cell.pacman = !cell.pacman;
        }
    }
};

const drawGameMap = (map) => { // sets parameters by each sell and calls function that draws them
    for (const cell of map.flat()) {
        const param = {
            x: 100 + cell.x * (50 + 10),
            y: 100 + cell.y * (50 + 10),
            width: 50,
            height: 50,
            strokeColor: '#fff',
        };

        if (cell.obstacle) {
            param.strokeColor = 'blue';
        } else {
            if (cell.food) {
                drawFood(cell);
            }
            if (cell.pacman) {
                drawPacman(cell);
            }
        }
        drawRect(param);
    }
};

const map = createGameMap(9, 18),
    cells = map.flat();
addingObjects(cells);
drawGameMap(map);

const getCell = (x, y) => {
    for (const cell of map.flat()) {
        if (cell.x === x && cell.y === y) {
            return cell;
        }
    }
};

const getPacman = () => {
    for (const cell of map.flat()) {
        if (cell.pacman) return cell;
    }
};

const movePacman = () => {
    const pacmanCell = getCell(getPacman().x, getPacman().y);
    let newCell;
    if (pacmanDirection === 'right') {
        newCell = getCell(getPacman().x + 1, getPacman().y);
        right = false;
    } else if (pacmanDirection === 'left') {
        newCell = getCell(getPacman().x - 1, getPacman().y);
        right = true;
    } else if (pacmanDirection === 'up') {
        newCell = getCell(getPacman().x, getPacman().y - 1);
    } else if (pacmanDirection === 'down') {
        newCell = getCell(getPacman().x, getPacman().y + 1);
    }
    if (!newCell.obstacle) {
        pacmanCell.pacman = false;
        newCell.pacman = true;
        if (newCell.food) {
            newCell.food = false; 
            score++;
        }
    }
};

const showState = () => { // showing the score and difficulty right now
    ctx.fillStyle = 'yellow';
    ctx.font = '20px Arial';
    ctx.fillText(`Очки: ${score * 5}`, 100, 80);
};

const loop = (timestamp) => {
    requestAnimationFrame(loop);  
    now = Date.now();
    delta = now - then;
    console.log(delta);
    if (play && delta > interval) {
        then = now - (delta % interval);
            requestAnimationFrame(loop);       
        if (score === 68) {
            alert('win');
            play = false;
        }
        clearCanvas();
        movePacman();
        showState();
        drawGameMap(map);
    }
};

loop();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') requestAnimationFrame(loop);

    if (e.key === 'ArrowLeft' && !getCell(getPacman().x - 1, getPacman().y).obstacle) {
        pacmanDirection = 'left';
    } else if (e.key === 'ArrowRight' && !getCell(getPacman().x + 1, getPacman().y).obstacle) {
        pacmanDirection = 'right';
    } else if (e.key === 'ArrowUp' && !getCell(getPacman().x, getPacman().y - 1).obstacle) {
        pacmanDirection = 'up';
        up = true;
    } else if (e.key === 'ArrowDown' && !getCell(getPacman().x, getPacman().y + 1).obstacle) {
        pacmanDirection = 'down';
        up = false;
    }
});