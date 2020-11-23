const players = [];
const numOfPlayers = 9
for (let n = 1; n <= numOfPlayers; n++) {
  players.push({
    id: n,
    name: "FOO",
    deck: "bar",
    points: 0
  })
}
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

function buildCubes(players) {
  let cube = [];
  const four = Math.floor(players.length / 4);
  const remainder = players.length % 4 
  for (let i = 0; i < players.length; i = i + 4) {
    console.log(i)
    cube = [...cube, players.slice(i, i + 4)]
  }
  console.log("cube => ", cube)
  if (!remainder) {
    return cube
  }
  if (remainder < 3) {
    const lastCubeIndex = cube.length - 1
    cube[lastCubeIndex] = makeThreeOrMore(lastCubeIndex, lastCubeIndex - 1, cube)
    // let overrunControl = 0
    // const lastCubeIndex = cube.length - 1
    // console.log('cube[lastCubeIndex] => ', cube[lastCubeIndex])
    // while (cube[lastCubeIndex].length < 3) {
    //   console.log('cube[lastCubeIndex] => ', cube[lastCubeIndex])
    //   if(overrunControl >= 50) {
    //     console.error('OVERRUN')
    //     break
    //   }
    //   cube[lastCubeIndex] = [cube[lastCubeIndex - 1].pop(), ...cube[lastCubeIndex]]
    // }
  }
  // for (let index = 0; index < four; index++) {
  //   for (let j = 0; j < 4; j++) {
  //     if (!cube[index]) {
  //       cube[index] = [];
  //     }

  //     cube[index].push(players[playerIndex]);
  //     playerIndex++;
  //   }
  // }
  return cube
}

let overrunControl = 0

const makeThreeOrMore = (currentPodIndex, prevPodIndex, cube) => {

  // Ignore this overrun stuff.. it's to control out of control loops
  overrunControl++
  console.log('overrunControl => ', overrunControl)
  if(overrunControl >= 50) {
    console.error('OVERRUN')
    return
  }
  //////

  const prevPod = cube[prevPodIndex]
  let innerOverrunControl = 0
  while (cube[currentPodIndex].length < 3) {
    // again.. ignore this
    if (innerOverrunControl++ >= 50) {
      console.log('INNEROVERRUN')
      break
    }
    /////////
    cube[currentPodIndex] = [prevPod.pop(), ...cube[currentPodIndex]]
    console.log('cube[currentPodIndex] => ', cube[currentPodIndex])
    console.log('prevPod => ', prevPod)
  }
  return prevPod.length < 3 ? makeThreeOrMore(prevPodIndex, prevPodIndex - 1, cube) : cube[currentPodIndex]
}


console.log(buildCubes(players))
startBtn.addEventListener("click", addPlayer);
gameBtn.addEventListener("click", buildCubes);
