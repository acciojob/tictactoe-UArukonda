//your JS code here. If required.
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

const winLines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9], 
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9], 
        [1, 5, 9],
        [3, 5, 7],
      ];

let players = []
let marks = ["x", "o"];
      let turn = 0; 
      let gameOver = false;

document.getElementById("submit").addEventListener("click", ()=>{
	const p1 = document.getElementById("player-1").value.trim();
	const p2 = document.getElementById("player-2").value.trim();

	if(p1 || p2) return;

	players = [p1, p2]

	setup.style.display = "none"
	game.style.display = "flex"

	message.textContent = `${players[turn]}, you're up`
	});

	cells.forEach((cell)=>{
		cell.addEventListener("click", ()=>{
			if (gameOver || cell.textContent !== "") return;

			cell.textContent = marks[turn]

			const winningLine = findWin(marks[turn])

			if(winningLine){
				winningLine.forEach(function (id) {
              document.getElementById(id).classList.add("win");
            });
				message.textContent = `${players[turn]}, congratulations you won!`;
            gameOver = true;
            return;
			}
			const boardFull = [...cells].every((c) => c.textContent !== "");
          if (boardFull) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
          }
			turn = turn === 0 ? 1 : 0;
          message.textContent = `${players[turn]}, you're up`;
		})
	})

function findWin(mark) {
        return (
          winLines.find(function (line) {
            return line.every(function (id) {
              return document.getElementById(id).textContent === mark;
            });
          }) || null
        );
      }

