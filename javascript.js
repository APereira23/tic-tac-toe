const gameWindows = document.querySelector('.game-windows');
const game = (() => {

  const start = () => {
    const startMenu = document.querySelector('.start-menu-display');
    document.querySelectorAll('.start-btn').forEach(btn => btn.addEventListener('click', () => {
      document.getElementById('btn-reset').style.display = "block";
      document.getElementById('btn-reset').textContent = "Quit";
      startMenu.style.display = "none";
      if (btn.id === "btn-pvp") {
        let gameMode = "pvp";
        game.randomize(gameMode);
      } else if (btn.id === "btn-pve") {
        let gameMode = "pve";
        game.randomize(gameMode);
      } else if (btn.id === "btn-rules") {
        game.showRules();
      };
    }));
  };

  const playPvp = () => {
    let playCounter = 0;
    document.querySelectorAll('.table-box').forEach(box => box.addEventListener('click', (e) => {
      if (playCounter % 2 === 0) {
        e.target.innerText = playerOne.symbol;
        playerOne.tracker.push(e.target.id);
        checkWinner(playerOne);
      } else if (playCounter % 2 !== 0) {
        e.target.innerText = playerTwo.symbol;
        playerTwo.tracker.push(e.target.id);
        checkWinner(playerTwo);
      };
      function checkWinner(player) { 
        winConditions = [
        ["b0", "b1", "b2"],
        ["b0", "b3", "b6"],
        ["b0", "b4", "b8"],
        ["b1", "b4", "b7"],
        ["b3", "b4", "b5"],
        ["b2", "b4", "b6"],
        ["b2", "b5", "b8"],
        ["b6", "b7", "b8"],
        ];
        for (const element of winConditions) {
          let points = 0;
          for (value of element) {
            for (let i = 0; i < player.tracker.length; i++) {
              if (value === player.tracker[i]) points += 1;
              if (points === 3) return winRound(player);  
            }
          }
        }
        e.target.inert = true;
      };
      playCounter++;
      if (playCounter === 10) console.log("draw");
      
      //missing function for draws!

      // sometimes between rounds the same player plays twice in a row! 


    }));  
    function winRound(player) {
      player.score += 1;
      document.querySelector('.player-one-display').textContent = `${playerOne.name}: ${playerOne.score}`;
      document.querySelector('.player-two-display').textContent = `${playerTwo.name}: ${playerTwo.score}`;
      playCounter = 0;
      playerOne.tracker = [];
      playerTwo.tracker = [];
      document.querySelectorAll('.table-box').forEach(box => {
        box.innerText = "";
        box.inert = false;
      });      

      
    };
  };

  const playPve = () => {
  };

  const showRules = () => {
    document.getElementById('btn-reset').textContent = "Go Back";

    const rulesContainer = document.createElement('div');
    rulesContainer.classList.add('rules-container','container');
    gameWindows.appendChild(rulesContainer);
    const rulesTitle = document.createElement('div');
    rulesTitle.classList.add('row', 'rules-row','rules-row-title');
    rulesTitle.innerHTML = "Rules";
    rulesContainer.appendChild(rulesTitle);
    
    const rulesRowOne = document.createElement('div');
    rulesRowOne.classList.add('row','rules-row');
    rulesContainer.appendChild(rulesRowOne);
    const rulesRowOneParagraph = document.createElement('p');
    rulesRowOneParagraph.innerHTML = "Two players take turns marking the spaces in a three-by-three grid with <strong>X</strong> or <strong>O</strong>. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.";
    rulesRowOne.appendChild(rulesRowOneParagraph);
  };

  const randomize = (gameMode) => {
    const randomizeContainer = document.createElement('div');
    randomizeContainer.classList.add('row','randomize-container');
    gameWindows.appendChild(randomizeContainer);
    const randomizer = document.createElement('div');
    randomizer.classList.add('randomizer','col-12','row');
    randomizeContainer.appendChild(randomizer); 
    
    let sortedNum = 0;
    const getXO = setInterval(function() {
      let num = Math.floor(Math.random() * 2);
      if (num % 2 !== 0) randomizer.textContent = "O";
      if (num % 2 === 0) randomizer.textContent = "X";
      sortedNum += Math.floor(Math.random() * 2  + 1);
      //edit sortedNum after completion
      if (sortedNum >= 1/*35*/) {
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
        startBtn.classList.add('game-btn');
        startBtn.setAttribute('id','btn-start');
        startBtnContainer.appendChild(startBtn);
        startBtn.innerText = "Start Game";
        playerOne.symbol = randomizer.textContent;
        if (playerOne.symbol === "X") playerTwo.symbol = "O";
        if (playerOne.symbol === "O") playerTwo.symbol = "X";
        startBtn.addEventListener('click', () => {
          randomizeContainer.style.display = "none";
          gameBoard.generate();
          document.querySelector('.player-one-display').textContent = `${playerOne.name}: ${playerOne.score}`;
          document.querySelector('.player-two-display').textContent = `${playerTwo.name}: ${playerTwo.score}`;
          if (gameMode === "pvp") game.playPvp();
          if (gameMode === "pve") game.playPve();
        });
      };
    }, 100);
  };

  const reset = () => {
    document.getElementById('btn-reset').addEventListener('click', () => {
      while (gameWindows.firstChild) {
        gameWindows.removeChild(gameWindows.firstChild);
      };
      document.querySelector('.start-menu-display').style.display = "flex";
      document.getElementById('btn-reset').style.display = "none";
      playerOne.score = 0;
      document.querySelector('.player-one-display').textContent = "";
      playerTwo.score = 0;
      document.querySelector('.player-two-display').textContent = "";
      playerOne.tracker = [];
      playerTwo.tracker = [];
      document.querySelectorAll('.table-box').forEach(box => box.inert = false);

    });

  };

  return {start, playPvp, playPve, showRules, randomize, reset};
})();

const gameBoard = (() => {
  const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  const generate = () => {
    const gameTable = document.createElement('div');
    gameTable.classList.add('container','game-table');
    gameWindows.appendChild(gameTable);
    for (let i = 0; i < board.length; i++) {
      const tableRow = document.createElement('div');
      tableRow.setAttribute('id', `table-row-${i}`);
      tableRow.classList.add('row', 'table-row');
      gameTable.appendChild(tableRow);
      for (let j = 0; j < board[i].length; j++) {
        const tableBox = document.createElement('div');
        tableBox.setAttribute('id', `b${board[i][j]}`);
        tableBox.classList.add('col','table-box');
        tableRow.appendChild(tableBox);
      }
    }
  };
  return {board, generate};

})();

const playerFactory = (name, symbol, tracker, score) => {
  return {name, symbol, tracker, score};
}

const playerOne = playerFactory('Player One', null, [], 0);
const playerTwo = playerFactory('Player Two', null, [], 0);
const cpu = playerFactory('CPU', null, [], 0);

game.start();
game.reset();