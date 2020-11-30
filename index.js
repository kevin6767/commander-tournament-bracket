const players = [];
let round = 0
let counter = 0
let startBtn = document.querySelector("form");
let gameBtn = document.getElementById("initGame");
let gameHolder = document.getElementById('game')
let roundBtn = document.getElementById("endRound");
function Player(name, deck) {
  this.name = name;
  this.deck = deck;
  this.points = 0;
  this.id = players.length + 1;
  this.strengthPoints = 0
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
  round++
  if (round < 2) {
    shuffle(players)
  }
  
  let cube = [];
  const four = Math.floor(players.length / 4);
  const remainder = players.length % 4 
  for (let i = 0; i < players.length; i = i + 4) {
    //console.log(i)
    cube = [...cube, players.slice(i, i + 4)]
  }
  console.log("cube => ", cube)
  if (!remainder) {
    initRound(cube)
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
    initRound(cube)
  }
  return prevPod.length < 3 ? makeThreeOrMore(prevPodIndex, prevPodIndex - 1, cube) : cube[currentPodIndex]
}


function initRound(cube) {
    counter++
    console.log('starting')
    console.log('I got the cube',cube)
    console.log(cube.length)
    let roundHeading = document.createElement('h1')
    roundHeading.classList.add('roundHeading')
    roundHeading.innerHTML = 'Round ' + counter

    gameHolder.appendChild(roundHeading)
    for (let index = 0; index < cube.length; index++) {
      let podHolder = document.createElement('div')
      podHolder.classList.add('pod')
      podHolder.classList.add(index)
      
      let podHeading = document.createElement('h1')
      podHeading.classList.add('podHeading')
      podHeading.innerHTML = 'Pod' + ' ' + (index + 1)

      podHolder.appendChild(podHeading)
      for (let j = 0; j < cube[index].length; j++) {
        let playerHolder = document.createElement('div')
        playerHolder.classList.add('index')

        let playerName = document.createElement('h2')
        playerName.setAttribute('id',cube[index][j].name)
        playerName.innerHTML = cube[index][j].name

        let firstBtn = document.createElement('button')
        firstBtn.classList.add(cube[index][j].id)
        firstBtn.innerHTML = '1st place'
        firstBtn.addEventListener('click', e => {
            firstCounters(cube[index][j])
            firstBtn.disabled = true
        } )
        let secondBtn = document.createElement('button')
        secondBtn.innerHTML = '2nd Place'
        secondBtn.classList.add(cube[index][j].id)
        secondBtn.addEventListener('click', e => {
          secondCounters(cube[index][j])
          secondBtn.disabled = true
          
      } )
      let thirdBtn = document.createElement('button')
        thirdBtn.innerHTML = '3rd Place'
        thirdBtn.classList.add(cube[index][j].id)
        thirdBtn.addEventListener('click', e => {
          lastCounters(cube[index][j])
          thirdBtn.disabled = true
          
      } )
      let fourthBtn = document.createElement('button')
        fourthBtn.innerHTML = '4th Place'
        fourthBtn.classList.add(cube[index][j].id)
        fourthBtn.addEventListener('click', e => {
          lastCounters(cube[index][j])
          fourthBtn.disabled = true
          calcStrengthPoints(cube)
      } )
        playerHolder.appendChild(playerName)
        playerHolder.appendChild(firstBtn)
        playerHolder.appendChild(secondBtn)
        playerHolder.appendChild(thirdBtn)
        playerHolder.appendChild(fourthBtn)
        podHolder.appendChild(playerHolder)
      }
      gameHolder.appendChild(podHolder)
    }
    
}

function shuffle (players) {
  console.log(players)
  for (let index = 0; index < players.length; index++) {
      players.sort(() => Math.random() - 0.5)
      
    }
  
  return players
}

function firstCounters(player){
  console.log(player)
  player.points = 4 + player.points;
  
  return player
}

function secondCounters(player){
  console.log(player)
  player.points = 3 + player.points;

  return player
}
function lastCounters(player){
  console.log(player)
  player.points = 2 + player.points;

  return player
}
function calcStrengthPoints(cube){
  console.log('---Calculating Strength of Schedule---')
  let total = 0
  for (let index = 0; index < cube.length; index++) {
    total = cube[index].reduce((a, {points}) => a + points, 0);
    cube[index].map(function(x){
      x.strengthPoints = total
      return x
    })
  }
  return cube
}
// NEXT ROUND

function nextRound(){
  console.log('---Starting Next Round---')
  players.sort(compareIndexFound)

  let list = document.createElement('ul')
  list.classList.add('top8Holder')
  list.innerHTML = 'Top 8 after round'
  for (let index = 0; index < players.length; index++) {
    let node = document.createElement('li')
    node.classList.add('top8playerHolder')
    node.setAttribute('id', 'listIndex')
    node.innerHTML = players[index].name + ' ' + players[index].points

    list.appendChild(node)
    
  }
  gameHolder.appendChild(list)
  let nextRoundBtn = document.createElement('button')
  nextRoundBtn.classList.add('nextRoundBtn')
  nextRoundBtn.innerHTML = 'Start Next Round'
  nextRoundBtn.addEventListener('click', buildCubes)
  gameHolder.appendChild(nextRoundBtn)
}
function compareIndexFound(a, b) {
  console.log('---Calculating Top 8---')
  if (a.points < b.points) { return 1; }
  if (a.points > b.points) { return -1; }
  return 0;
}

startBtn.addEventListener("submit", function(e){
  e.preventDefault()
  addPlayer()
});
gameBtn.addEventListener("click", buildCubes);

endRound.addEventListener("click", nextRound);
