const players = [];
var startBtn = document.getElementById("addPlayer");
var gameBtn = document.getElementById("initGame");
function Player(name, deck) {
  this.name = name;
  this.deck = deck;
  this.points = 0;
  this.id = players.length + 1;
}

function addPlayer() {
  let player = new Player(
    document.getElementById("name").value,
    document.getElementById("deck").value
  );
  //console.log(player)
  document.getElementById("name").value = "";
  document.getElementById("deck").value = "";
  players.push(player);
  logPlayers();
}

function logPlayers() {
  output = "";
  for (let index = 0; index < players.length; index++) {
    output +=
      index +
      1 +
      ") " +
      players[index].name +
      " | " +
      players[index].deck +
      "<br>";
  }
  document.getElementById("output").innerHTML = output;
}

function initGame() {
  let cube = [];
  const four = Math.ceil(players.length / 4);
  let playerIndex = 0;
  for (let index = 0; index < four; index++) {
    for (let j = 0; j < 4; j++) {
      if (!cube[index]) {
        cube[index] = [];
      }

      cube[index].push(players[playerIndex]);
      playerIndex++;
    }
  }
  console.log(cube[1]);
}
startBtn.addEventListener("click", addPlayer);
gameBtn.addEventListener("click", initGame);
