document.addEventListener( 'DOMContentLoaded', () => {
  const squares=document.querySelectorAll('.grid div' )
  const sDisplay=document.querySelector('#s')
  const start= document.querySelector('#start')
  const easy=document.querySelector('#easy')
  const medium=document.querySelector('#medium')
  const hard=document.querySelector('#hard')
  const width = 10
let currentIndex = 0 
let appleIndex = 0 
let currentSnake = [2,1,0] 
let direction = 1
let score = 0
let speed=0.9
let intervalTime = 0
let interval = 0
easy.addEventListener('click',function(){
  speed=0.9
})
medium.addEventListener('click',function(){
  speed=0.6
})
hard.addEventListener('click',function(){
  speed=0.4
})
function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score=0
    randomApple()
    direction= 1
sDisplay.value=score
    intervalTime=1000
    currentSnake=[2,1,0]
    currentIndex=0
    currentSnake.forEach(index=> squares[index].classList.add('snake'))
    interval = setInterval(outcomes,intervalTime)
}
function outcomes()
{
  if (
    (currentSnake[0] + width >= (width * width) && direction === width ) || 
    (currentSnake[0] % width === width -1 && direction === 1) || 
    (currentSnake[0] % width === 0 && direction === -1) || 
    (currentSnake[0] - width < 0 && direction === -width) ||  
    squares[currentSnake[0] + direction].classList.contains('snake') 
  )
  {
    alert("Game Over!")
    return clearInterval(interval)
  }
  const tail = currentSnake.pop() 
  squares[tail].classList.remove('snake') 
  currentSnake.unshift(currentSnake[0] + direction) 

  
  if(squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    randomApple()
    score++
    sDisplay.value= score
    clearInterval(interval)
    intervalTime = intervalTime * speed
    interval = setInterval(outcomes, intervalTime)

}
 squares[currentSnake[0]].classList.add('snake')
}

function randomApple()
{
    do{
      appleIndex=Math.floor(Math.random()*squares.length)
    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
function keyboard(e)
{


  if(e.keyCode === 39) {
    direction = 1 
  } else if (e.keyCode === 38) {
    direction = -width 
  } else if (e.keyCode === 37) {
    direction = -1 
  } else if (e.keyCode === 40) {
    direction = +width
  }
  }
  document.addEventListener('keyup',keyboard)
  start.addEventListener('click',startGame)
})