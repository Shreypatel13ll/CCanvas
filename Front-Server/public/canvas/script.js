/**
 * @type HTMLCanvasElement
 */
const sock  =  new WebSocket(`ws://localhost:8080/draw?id=${window.location.href.split("draw?=")[1]}`);
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide");
const pallet = document.getElementById("pallet");
const drawingContext = canvas.getContext("2d");
const CELL_SIDE_COUNT = 96;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
var colorHistory = {};

// Set default color
colorInput.value = "#009578";

// Initialize the canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// Setup the guide
{
  guide.style.width = `${canvas.width}px`;
  guide.style.height = `${canvas.height}px`;
  guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
  guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

  [...Array(CELL_SIDE_COUNT ** 2)].forEach(() =>
    guide.insertAdjacentHTML("beforeend", "<div></div>")
  );
}

function handleCanvasMousedown(e) {
  // Ensure user is using their primary mouse button
  if (e.button !== 0) {
    return;
  }

  const canvasBoundingRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasBoundingRect.left;
  const y = e.clientY - canvasBoundingRect.top;
  const cellX = Math.floor(x / cellPixelLength);
  const cellY = Math.floor(y / cellPixelLength);
  var currentColor = colorHistory[`${cellX}_${cellY}`];

  if (e.ctrlKey) {
    if (currentColor) {
      colorInput.value = currentColor;
    }
  } else {
    fillCell(cellX, cellY, colorInput.value).then(e=>send());
    fillCell(cellX, cellY, colorInput.value)
    fillCell(cellX, cellY, colorInput.value)
    fillCell(cellX, cellY, colorInput.value)
    fillCell(cellX, cellY, colorInput.value)
  }
}

function handleToggleGuideChange() {
  guide.style.display = guide.style.display=="none"? null : "none";
}

async function fillCell(cellX, cellY, colorInput) {
  const startX = await cellX * cellPixelLength;
  const startY = await cellY * cellPixelLength;

  drawingContext.fillStyle = await  colorInput;
  await drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength);
  colorHistory[`${cellX}_${cellY}`] = await colorInput;
  return;
}

async function update(e){
  colorHistory = {...colorHistory, ...e}
  for (const key in colorHistory) {
    fillCell(key.split('_')[0],key.split('_')[1], colorHistory[key]);
    fillCell(key.split('_')[0],key.split('_')[1], colorHistory[key])
    fillCell(key.split('_')[0],key.split('_')[1], colorHistory[key])
    fillCell(key.split('_')[0],key.split('_')[1], colorHistory[key])
    fillCell(key.split('_')[0],key.split('_')[1], colorHistory[key])
}
}

canvas.addEventListener("mousedown", handleCanvasMousedown);
toggleGuide.addEventListener("click", handleToggleGuideChange);

// ------ websoccket

sock.onmessage = (e) =>{
    update(JSON.parse(e.data));
}
const send = () =>{
  sock.send(JSON.stringify(colorHistory))
}

//pallet

pallet.addEventListener("click", e=>{
  if (e.target.className != "pallet"){
    console.log( e.target.style.backgroundColor)
  }
  if (e.target.id == "add"){
    
  }
})