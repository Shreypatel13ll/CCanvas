const dimension = 20;
const grid = document.getElementById("guide");
const height = window.innerHeight/1;
const width = window.innerWidth/1;
let tiles;

let colums = Math.floor(width/dimension),rows = Math.floor(height/dimension);
const createTiles = async () =>{
  {
    grid.style.width = `${width}px`;
    grid.style.height = `${height}px`;
    grid.style.gridTemplateColumns = `repeat(${colums}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  
    [...Array(colums*rows)].forEach(() =>
      grid.insertAdjacentHTML("beforeend", "<div class='tile' id='tile'></div>")
    );
  }
  tiles = document.querySelectorAll('.tile')
  return;
}



createTiles().then(
  anime({
    targets: tiles,
    scale: [
      {value: .1, easing: 'easeOutSine', duration: 500},
      {value: 1, easing: 'easeInOutQuad', duration: 1200}
    ],
    delay: anime.stagger(50, {grid: [colums, rows], from: 'center'}),
    loop:true
  })
)