const gameWindows = document.querySelector('.game-windows');
document.getElementById('btn-pve').disabled = "true";

const game = (() => {

  const start = () => {
    const startMenu = document.querySelector('.start-menu-display');
    document.querySelectorAll('.start-btn').forEach(btn => btn.addEventListener('click', () => {
      document.getElementById('btn-reset').style.display = "block";
      document.getElementById('btn-reset').textContent = "Quit";
      startMenu.style.display = "none";
      if (btn.id === "btn-pvp") {
        document.getElementById('background-music').play();
        document.getElementById('background-music').loop = true;
        let gameMode = "pvp";
        game.randomize(gameMode);
      } else if (btn.id === "btn-pve") {
        document.getElementById('background-music').play();
        document.getElementById('background-music').loop = true;
        let gameMode = "pve";
        game.randomize(gameMode);
      } else if (btn.id === "btn-rules") {
        game.showRules();
      };
    }));
  };

  const playPvp = () => {
    let playCounter = 0;
    document.querySelector('.player-one-display').classList.add('player-active');  
    document.querySelectorAll('.table-box').forEach(box => box.addEventListener('click', (e) => {
      if (!e.target.classList.contains('marked-box')) {
        document.getElementById('play-sound').play();
        if (playCounter % 2 === 0) {
          document.querySelector('.player-one-display').classList.remove('player-active');
          document.querySelector('.player-two-display').classList.add('player-active');
          e.target.innerText = playerOne.symbol;
          playerOne.tracker.push(e.target.id);
          playCounter++;
          checkWinner(playerOne);
        } else if (playCounter % 2 !== 0) {
          document.querySelector('.player-two-display').classList.remove('player-active');
          document.querySelector('.player-one-display').classList.add('player-active');
          e.target.innerText = playerTwo.symbol;
          playerTwo.tracker.push(e.target.id);
          playCounter++;
          checkWinner(playerTwo);
        };
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
          for (let i = 0; i < element.length; i++) {
            for (let j = 0; j < player.tracker.length; j++) {
              if (element[i] === player.tracker[j]) points += 1;
              if (points === 3) {
                return winRound(player, element);  
              };
            }
          }
        }
        e.target.classList.add('marked-box');
      };
      if (playCounter === 9) draw();
      function draw() {
        document.getElementById('draw-sound').play();
        document.querySelectorAll('.table-box').forEach(box => {
          box.style.transition = "500ms";
          box.style.backgroundColor = "red";
          box.style.transform = "scale(1.1)";
        });
        setTimeout(resetBoard, 700);
        
        document.querySelector('.player-one-display').classList.add('player-active');   
        document.querySelector('.player-two-display').classList.remove('player-active');
      };

    }));  



    function winRound(player, element) {
      document.getElementById('win-sound').play();
      setTimeout(() => {
        player.score += 1;
        document.querySelector('.player-one-display').textContent = `${playerOne.name}: ${playerOne.score}`;
        document.querySelector('.player-two-display').textContent = `${playerTwo.name}: ${playerTwo.score}`;
      }, 700);
      document.querySelectorAll('.table-box').forEach(box => {
        for (value of element) {
          if (value === box.id) {
            box.style.transition = "500ms";
            box.style.backgroundColor = "gold";
            box.style.transform = "scale(1.1)";
          }
        }
      });
      setTimeout(resetBoard, 700);
      document.querySelector('.player-one-display').classList.add('player-active');   
      document.querySelector('.player-two-display').classList.remove('player-active');  
    };


    function resetBoard() {
      document.querySelectorAll('.table-box').forEach(box => {
        box.style.backgroundColor = "aliceblue";
        box.style.transform = "scale(1.0)";
      });
      playCounter = 0;
      playerOne.tracker = [];
      playerTwo.tracker = [];
      document.querySelectorAll('.table-box').forEach(box => {
        box.innerText = "";
        box.classList.remove('marked-box');
      });
    };
  };

  const playPve = () => {
    //to be added later!;
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
      if (sortedNum >= 2/*35*/) {
        clearInterval(getXO);
        randomizer.style.transition = "500ms";
        randomizer.style.fontSize = "2rem";
        randomizer.style.transform = "scale(1.1)";
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
      document.querySelectorAll('.table-box').forEach(box => box.classList.remove('marked-box'));

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

document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('btn-clicks').play();
}));

muteSound();
function muteSound() {
  const btnSound = document.getElementById('btn-sound');
  btnSound.addEventListener('click', () => {
    if (btnSound.classList != "mute-sound") {
      document.querySelectorAll('audio').forEach(elem => elem.muted = true);
      btnSound.classList.toggle('mute-sound');
      btnSound.innerHTML = "&#128263";
    } else if (btnSound.classList == "mute-sound") {
      document.querySelectorAll('audio').forEach(elem => elem.muted = false);
      btnSound.classList.toggle('mute-sound');
      btnSound.innerHTML = "&#128266";        
    }
  });
}
