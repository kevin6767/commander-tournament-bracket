const players = [];

let startBtn = document.querySelector("form");
let gameBtn = document.getElementById("initGame");
let gameHolder = document.getElementById('game')
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
      players[index].deck  +
      "<br>";
  }
  document.getElementById("output").innerHTML = output;
}
function deleteItem(){
  this.remove()
}
function buildCubes() {
  let cube = [];
  const four = Math.floor(players.length / 4);
  const remainder = players.length % 4 
  for (let i = 0; i < players.length; i = i + 4) {
    //console.log(i)
    cube = [...cube, players.slice(i, i + 4)]
  }
  console.log("cube => ", cube)
  if (!remainder) {
    shuffle(cube)
    return cube
  }
  if (remainder < 3) {
    const lastCubeIndex = cube.length - 1
    cube[lastCubeIndex] = makeThreeOrMore(lastCubeIndex, lastCubeIndex - 1, cube)
    
  }
  
  
}

let overrunControl = 0

const makeThreeOrMore = (currentPodIndex, prevPodIndex, cube) => {

  // Ignore this overrun stuff.. it's to control out of control loops
  overrunControl++
  //console.log('overrunControl => ', overrunControl)
  if(overrunControl >= 50) {
    //console.error('OVERRUN')
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
    //console.log('cube[currentPodIndex] => ', cube[currentPodIndex])
    //console.log('prevPod => ', prevPod)
    shuffle(cube)
  }
  return prevPod.length < 3 ? makeThreeOrMore(prevPodIndex, prevPodIndex - 1, cube) : cube[currentPodIndex]
}


function initGame(cube) {
    console.log('starting')
    console.log('I got the cube',cube)
    console.log(cube.length)
    
    for (let index = 0; index < cube.length; index++) {
      let podHolder = document.createElement('ul')
      podHolder.setAttribute('id', 'pod'+index)
      for (let j = 0; j < cube[index].length; j++) {
        let podIndex = document.createElement('li')
        podIndex.setAttribute('id','index'+j)
        podIndex.innerHTML = cube[index][j].name
        
        podHolder.appendChild(podIndex)
      }
      gameHolder.appendChild(podHolder)
    }
    
}

function shuffle (cube) {
  for (let index = 0; index < cube.length; index++) {
    for (let j = 0; j < cube[index].length; j++) {
      cube[index].sort(() => Math.random() - 0.5)
      
    }
    
  }
  initGame(cube)
}





startBtn.addEventListener("submit", function(e){
  e.preventDefault()
  addPlayer()
});
gameBtn.addEventListener("click", buildCubes);
