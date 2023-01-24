document.addEventListener('DOMContentLoaded', () => {

  const scoreDisplay = document.getElementById('score')
  const width = 28
  let score = 0
  const grid = document.querySelector('.grid')
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]
  // 0 - pac-dots
  // 1 - zeď
  // 2 - ghost-lair
  // 3 - power-dot
  // 4 - prázdné

  const squares = []

  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      
      if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')     //tímto se layout vykreslí hrací pole
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
      }
    }
  }
  createBoard()



  let pacmanCurrentIndex = 490 //nastavíme kde se má pacman objevit
  squares[pacmanCurrentIndex].classList.add('pac-man')

  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:  //šipka doleva
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') && //zabrání pacmanovi aby projel zdí
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') //zabrání pacmanovi projet do spawnu duchů
          )
        pacmanCurrentIndex -= 1
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 38: //šipka dolu
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') && //zabrání pacmanovi aby projel zdí
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') //zabrání pacmanovi projet do spawnu duchů
          ) 
        pacmanCurrentIndex -= width
        break
      case 39: //šipka doprava
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') && //zabrání pacmanovi aby projel zdí
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') //zabrání pacmanovi projet do spawnu duchů
        )
        pacmanCurrentIndex += 1
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 40: //šipka nahoru
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') && //zabrání pacmanovi aby projel zdí
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair') //zabrání pacmanovi projet do spawnu duchů
        )
        pacmanCurrentIndex += width
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()     //spuštění ostatních funkcí které budeme potřebovat
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
  }
  document.addEventListener('keyup', movePacman) // lposlouchá jestli je zmáčknuta klávesa

  
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) { 
      score++ //přídává po jednom bodu po snězení malé tečky
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot') // pokud se nachází pacman na indexu tečky tak zmizí a přidá se bod
    }
  }

  
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score +=10 //po snězení velkkého bonbonku se nám přidá 10 bodů
      ghosts.forEach(ghost => ghost.isScared = true) // po snězení se duchové vyděsí
      setTimeout(unScareGhosts, 10000) // za čas 10 sekund se duchové zase zpět oddděsí
      squares[pacmanCurrentIndex].classList.remove('power-pellet') // a velký bonbon zmizí
    }
  }

  //make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false) // funkce která se spustí když uplyne těch 10 sekund
  }

  
  class Ghost { // vlastnosti ducha uvedené ve třídě ghost  a vytvořen pomocí construktor
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  
  ghosts = [ 
    new Ghost('blinky', 348, 250), //určíme si 4 duchy
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
    ]

  
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost') // a následně je vykreslíme na jejích souřadnicích
    })

  
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width] //náhodné pohyby
    let direction = directions[Math.floor(Math.random() * directions.length)] //náhodný pohyb duchů

    ghost.timerId = setInterval(function() {
      
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') && //tady jsou kontroly duchů aby nenarazili do sebe
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) { //tady jsou kontroly duchů aby nenarazili do zdi
          //odtraní se classy duchů
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          //pokud se nenachází zed ani duch posune se tam
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //jinak najde novou cestu
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //pokud je duch vyděšený
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //pokud je vyděšený a potká se s pacmanem
      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) { //pokud je vyděšen a potká se index ducha s indexem pacmana
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex // duch se po své smrti přesune zpátky na spawn
        score +=100 //přidá se nám 100 score
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
    checkForGameOver()
    }, ghost.speed)
  }

  
  function checkForGameOver() {   
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && //pokud pacman narazí do ducha hra končí
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) { //pokud narazí do ducha který je vyděšen hra pokračuje
      ghosts.forEach(ghost => clearInterval(ghost.timerId)) 
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Game Over"); }, 500)//vyhodí nám to popup okno s tím že jsme prohrálí
    }
  }

  
  function checkForWin() {
    if (score === 274) { // pokud se skore rovná 274 (max počet budů pokud nepočítáme snězení ducha)
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman) // přestanou fungovat šipky pro pohyb
      setTimeout(function(){ alert("You have WON!"); }, 500) //vyhodí nám to popup okno s tím že jsme vyhrálí
    }
  }
})
