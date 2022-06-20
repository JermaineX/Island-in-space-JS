// Title: Our World, It Fell So Silently.
// 1. Draw a straight-line (either horizontally or vertically) which is 10 dots long in an open space for a nice effect
// 2. Firework sections (including particle.js & firework.js) were coded based upon the following youtube video: https://www.youtube.com/watch?v=CKeyIbT3vXI&ab_channel=TheCodingTrain
// 3. Firework particles are used to simulate exploding stars, the particles do not interact with the game of life cells that you can draw
// 4. Game of life cell interaction was taught by Tutor Jacob


// Game of Life (interactive background stars)
let stars = [];
let starSize = 15;
let numRows, numCols;

// Image (floating island created by me in photoshop)
let img;

//Fireworks (exploding stars)
const fireworks = [];
let gravity;

// Call image to preload to optimise the code
function preload() {
  img = loadImage('island.png');
  
}

// Game of life (start)
function setup() {
  createCanvas(windowWidth, windowHeight);
  sideLength = min(windowWidth, windowHeight);
  
  numCols = floor(width / starSize);
  numRows = floor(height / starSize);

  noStroke();

  stars = make2DArray();

// Partical gravity for firework effect
  gravity = createVector(0, 0.2);
  
  
}

// responsive sizing for different browser sizes
  function windowResized() {
  sideLength = min(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  }

// creating arrays of columns and rows for the stars to generate on
function make2DArray() {
  let cols = [];

  for (let i = 0; i < numCols; i++) {
    let rows = [];
    cols[i] = rows;
    for (let j = 0; j < numRows; j++) {
      cols[i][j] = random([0, 1]);
    }
  }
  return cols;
}

// following the principles of cellular automata
function countNeighbours(stars, i, j) {
  let sum = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      sum += stars[(i + x + numCols) % numCols][(j + y + numRows) % numRows];
    }
  }
  sum -= stars[i][j];
  return sum;
}

// following the principles of cellular automata as seen in the else if section below, depending on the number variable the "newStar" will generate accordingly to its neighbours
function generate() {
  let newStars = make2DArray();

  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      let neighbours = countNeighbours(stars, i, j);

      if (stars[i][j] == 1 && (neighbours < 2 || neighbours > 3)) {
        newStars[i][j] = 0;
      } else if (stars[i][j] == 0 && neighbours == 3) {
        newStars[i][j] = 1;
      } else {
        newStars[i][j] = stars[i][j];
      }
    }
  }

  stars = newStars;
}

function draw() {

  // constraints to create a responsive web experience for different sized browsers for the game of life matrix
  let originX= (windowWidth - sideLength)/2;
  let originY= (windowHeight - sideLength)/2;
  
  translate(originX, originY);
  
background(0);
    for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      if (stars[x][y] == 1) {
        stroke(255);
        point(x * starSize, y * starSize);
      } else {
        stroke(0);
      }
    }
  }

  // interactive component allowing the user to draw stars in the background (able to draw all over)
  if (
    mouseIsPressed &&
    mouseX < width &&
    mouseX > 0 &&
    mouseY < height &&
    mouseY > 0
  ) {
    frameRate(60);
    stars[floor(mouseX / starSize)][floor(mouseY / starSize)] = 1;
  } else {
    // the lower the framerate here, the laggier it will appear as it is generating at a slower rate. When increased it goes extremely fast. 10 was a nice number for the movements.
    frameRate(10);

    generate();
    
  }
// Game of life (end)
  
// Fireworks
    if (random(1) < 0.2) {
    fireworks.push(new Firework());
  }
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  
// Load image with a blue tint to fit the moody space aesthetic as cooler colours are associated with space
  image(img, 0, 0, sideLength, sideLength);
  tint(110,140,255);
  
// Moon, decided not to include a moon as I felt it detracted from the overall aesthetic rather than add to it due to its large presences and light colouring
 // noStroke();
 //  fill(130);
 //  ellipse(75, 100, 100, 100);
 //  fill(100);
 //  ellipse(35, 100, 10, 40);
 //  ellipse(65, 75, 40, 30);
  
}

