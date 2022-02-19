document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;

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
  timerId = setInterval(moveDown, 1000);
  // assign function to keycodes
  function control(e) {
    if (e.keyCode === 37) {
      moveleft();
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
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
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape()
    }
  }
  // move tetramino left
  function moveleft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -=1;

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPositino +=1;
    }
    draw();
  }

  // move tetromino right
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if (!isAtRightEdge) currentPosition +=1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }

  // rotate the tetromino
  function rotate() {
    undraw()
    currentRotation ++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  // show next tetramino
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  // Next tetramino no rotate
  const upNextTetraoinoes = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidthe*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
  ]

  // display shape in mini grid
  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTetraoinoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }
});