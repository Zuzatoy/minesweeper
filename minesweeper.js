document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
}

var size = 3;

function creatBoard(size) {
  for (var i = 0; i < size; i++) {
    for (var k = 0; k < size; k++) {
      var cell = {
        row: i,
        col: k,
        isMarked: false,
        surroundingMines: null,
        hidden: true,
        isMine: Math.random() >= 0.5,
        
      };

      board.cells.push(cell);
   
    }
  }
}




function startGame () {

  creatBoard(size);
  
  // Don't remove this function call: it makes the game work!
  lib.initBoard();

  for(var i=0; i < board.cells.length; i++) {
    countSurroundingMines(board.cells[i]);
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    }

    if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    lib.displayMessage('You win!')
  }
}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCelsl`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);

  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine === true) {
      count++;
    }
  };
  return count;
}

