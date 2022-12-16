const gameDisplay = document.querySelector('.game-display');
const game = (() => {

  const start = () => {
    const startMenu = document.querySelector('.start-menu-display');
    document.querySelectorAll('.start-btn').forEach(btn => btn.addEventListener('click', () => {
      startMenu.style.display = "none";
      if (btn.id === "btn-pvp") game.playPvp();
      if (btn.id === "btn-pve") game.playPve();
      if (btn.id === "btn-rules") game.showRules();
    }));
  };

  const playPvp = () => {
      game.randomize();
  };

  const playPve = () => {
      game.randomize();
  };

  const showRules = () => {

  };

  const randomize = () => {
    const randomizeContainer = document.createElement('div');
    randomizeContainer.classList.add('row','randomize-container');
    gameDisplay.appendChild(randomizeContainer);
    const randomizer = document.createElement('div');
    randomizer.classList.add('randomizer','col-12','row');
    randomizeContainer.appendChild(randomizer); 
    
    let sortedNum = 0;
    const getXO = setInterval(function() {
      let num = Math.floor(Math.random() * 2);
      if (num % 2 !== 0) randomizer.textContent = "O";
      if (num % 2 === 0) randomizer.textContent = "X";
      sortedNum += Math.floor(Math.random() * 2  + 1);
      //edit progress number after completion
      if (sortedNum >= 5) {
        clearInterval(getXO);
        randomizer.style.transition = "500ms";
        randomizer.style.fontSize = "2rem";
        randomizer.style.transform = "scale(1.1)";
        randomizer.style.backgroundColor = "gold";
        const selection = document.createElement('div');
        selection.classList.add('selection','row');
        randomizeContainer.appendChild(selection);
        selection.textContent = `Player One gets the "${randomizer.textContent}"`;
        const startBtnContainer = document.createElement('div');
        startBtnContainer.classList.add('start-btn-container','row');
        randomizeContainer.appendChild(startBtnContainer);
        const startBtn = document.createElement('button');
        startBtn.classList.add('start-btn');
        startBtnContainer.appendChild(startBtn);
        startBtn.innerText = "Start Game";
        playerOne.symbol = randomizer.textContent;
        if (playerOne.symbol === "X") playerTwo.symbol = "O";
        if (playerOne.symbol === "O") playerTwo.symbol = "X";
        startBtn.addEventListener('click', () => {
          randomizeContainer.style.display = "none";
          gameBoard.generate();
          game.playRoundPvp();
        });
      };
    }, 100);
  };

  const playRoundPvp = () => {
    document.querySelectorAll('.table-box').forEach(box => box.addEventListener('click', (e) => {
      e.target.classList.add('cross');
      e.target.inert = true;
      e.target.innerText += "X";
    }));
  };

  const reset = () => {
    document.getElementById('btn-reset').addEventListener('click', () => {
      if (document.querySelector('.randomize-container') !== null) {
        document.querySelector('.randomize-container').remove();
      };
      if (document.querySelector('.game-table') !== null) {
        document.querySelector('.game-table').remove();
      }
      document.querySelector('.start-menu-display').style.display = "flex";
    });
  };

  return {start, playPvp, playPve, showRules, randomize, playRoundPvp, reset};
})();


const gameBoard = (() => {
  const board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const generate = () => {
    const gameTable = document.createElement('div');
    gameTable.classList.add('container','game-table');
    gameDisplay.appendChild(gameTable);
    for (let i = 0; i < board.length; i++) {
      const tableRow = document.createElement('div');
      tableRow.setAttribute('id', `table-row-${i + 1}`);
      tableRow.classList.add('row', 'table-row');
      gameTable.appendChild(tableRow);
      for (let j = 0; j < board[i].length; j++) {
        const tableBox = document.createElement('div');
        tableBox.setAttribute('id', `box-${board[i][j]}`);
        tableBox.classList.add('col','table-box');
        tableRow.appendChild(tableBox);
      }
    }
  };
  return {board, generate};

})();

const playerFactory = (name, symbol) => {
  return {name, symbol};
}

const playerOne = playerFactory('Player 1', null);
const playerTwo = playerFactory('player 2', null);

game.start();
game.reset();