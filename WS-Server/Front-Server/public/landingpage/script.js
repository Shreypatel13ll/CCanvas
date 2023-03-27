const dimension = 20;
const grid = document.getElementById("guide");
const height = window.innerHeight/1;
const width = window.innerWidth/1;
const btn = document.getElementById("container");
const input = document.getElementById("inpId");

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
};

const inpIdCheck = ()=>{
  var x = input.value.toLowerCase();
  if(isAlphaNumeric(x) && x.length<=10){
    input.style.borderBottom = "6px solid #3782F7";
  }
  else{
    input.style.borderBottom = "6px solid #f73737";
  }
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
  }));

btn.addEventListener("click",()=>{
  var x = input.value.toLowerCase();
  if ((isAlphaNumeric(x) || x=="")){
    req({id: x});
  }
});

function isNumeric(str){
  return /^[0-9]+$/i.test(str);
}

function isAlphaNumeric(str) {
  return /^[a-z0-9]+$/i.test(str);
}

function req(obj){
  fetch("http://localhost:3000/", {
  method: "POST",
  body: JSON.stringify(obj),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}).then(function(response) {
  console.log(response.status); // Will show you the status
  if (!response.ok) {
      throw new Error("HTTP status " + response.status);
  }
  else{
    window.location.href = response.url;                               
  }
})
};

document.addEventListener('keydown', function(event) {
  if(event.keyCode == 13) {
    var x = input.value.toLowerCase();
    if ((isAlphaNumeric(x) || x=="")){
      req({id: x});
    }
  }
});