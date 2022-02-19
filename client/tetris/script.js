document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;

  // The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ];

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ];

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ];

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ];

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  console.log(theTetrominoes[0][0]);

  // Random select tetromino
  let random = Math.floor(Math.random()*theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];
  console.log(currentPosition);

  // 1st tetromino rotation
  function draw() {
    current.forEach((index) => {
      squares[currentPosition = index].classList.add('tetromino');
    });
  }

  // Undraw Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition = index].classList.remove('tetromino');
    });
  }

  // Make tetromino move down every second
  // timerId = setInterval(moveDown, 1000);
  // assign function to keycodes
  function control(e) {
    if (e.keyCode === 37) {
      moveleft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);

  // Move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
  }

  function freeze() {
    if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
      // Start new tetramino
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
    }
  }
  // move tetramino left
  function moveleft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -=1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPositino +=1;
    }
    draw();
  }

  // move tetromino right
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some((index) => (currentPosition + index) % width === width -1);

    if (!isAtRightEdge) currentPosition +=1;

    if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1;
    }
    draw();
  }

  // rotate the tetromino
  function rotate() {
    undraw();
    currentRotation ++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  // show next tetramino
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displayIndex = 0;

  // Next tetramino no rotate
  const upNextTetraoinoes = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidthe*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
  ];

  // display shape in mini grid
  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
    });
    upNextTetraoinoes[nextRandom].forEach( (index) => {
      displaySquares[displayIndex + index].classList.add('tetromino');
    });
  }

  // add function to button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random()* theTetrominoes.length);
      displayShape();
    }
  });

  // add score
  function addScore() {
    for (let i = 0; i< 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      if(row.every((index) => squares[index].classList.contains('taken'))) {
        score +=10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classListy.remove('taken');
          squares[index].classList.remove('tetromino');
        });
        const squaresRemoved = squares.splice(i,width);
        squares = squaresRemoved.concat(squares);
        square.forEach((cell) => grid.appendChild(cell));
      }
    }
  }
});