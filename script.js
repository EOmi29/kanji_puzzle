const kanji = "森"

const gridSize = 2

const canvasSize = 700

const grid = document.getElementById("grid")
const partsArea = document.getElementById("parts-area")
const circle = document.getElementById("correct-circle")

const gridCells=[]

let completed=false

function createGrid(){

for(let i=0;i<gridSize*gridSize;i++){

const cell=document.createElement("div")

cell.className="grid-cell"

grid.appendChild(cell)

gridCells.push(cell)

}

}

function splitKanji(){

const base=document.createElement("canvas")

base.width=canvasSize
base.height=canvasSize

const ctx=base.getContext("2d")

ctx.fillStyle="black"

ctx.font="560px 'Noto Sans JP'"

ctx.textAlign="center"
ctx.textBaseline="middle"

ctx.fillText(kanji,canvasSize/2,canvasSize/2)

const partSize=canvasSize/gridSize

const pieces=[]

for(let y=0;y<gridSize;y++){

for(let x=0;x<gridSize;x++){

const part=document.createElement("canvas")

part.width=partSize
part.height=partSize

const pctx=part.getContext("2d")

pctx.drawImage(
base,
x*partSize,
y*partSize,
partSize,
partSize,
0,
0,
partSize,
partSize
)

pieces.push({
canvas:part,
correctX:x,
correctY:y
})

}

}

return pieces

}

function createPieces(pieces){

/* 完全ランダム配置 */

pieces.sort(()=>Math.random()-0.5)

pieces.forEach(p=>{

p.canvas.classList.add("piece")

p.canvas.puzzleData=p

partsArea.appendChild(p.canvas)

enableDrag(p)

})

}

function enableDrag(piece){

let dragging=false

let offsetX=0
let offsetY=0

piece.canvas.addEventListener("pointerdown",e=>{

if(completed)return

dragging=true

piece.canvas.classList.add("dragging")

offsetX=e.offsetX
offsetY=e.offsetY

})

document.addEventListener("pointermove",e=>{

if(!dragging)return

piece.canvas.style.left=e.pageX-offsetX+"px"
piece.canvas.style.top=e.pageY-offsetY+"px"

})

document.addEventListener("pointerup",()=>{

if(!dragging)return

dragging=false

piece.canvas.classList.remove("dragging")

snapToGrid(piece)

})

}

function snapToGrid(piece){

const rects=gridCells.map(c=>c.getBoundingClientRect())

const pieceRect=piece.canvas.getBoundingClientRect()

let bestIndex=-1
let bestDist=99999

rects.forEach((r,i)=>{

const dx=r.left-pieceRect.left
const dy=r.top-pieceRect.top

const dist=Math.sqrt(dx*dx+dy*dy)

if(dist<bestDist){

bestDist=dist
bestIndex=i

}

})

if(bestDist<250){

const cell=gridCells[bestIndex]

const rect=cell.getBoundingClientRect()

piece.canvas.style.left=rect.left+"px"
piece.canvas.style.top=rect.top+"px"

piece.dropIndex=bestIndex

checkAnswer()

}

}

function checkAnswer(){

let correct=true

const pieces=[...document.querySelectorAll(".piece")]

pieces.forEach(p=>{

const data=p.puzzleData

const expectedIndex=data.correctY*gridSize + data.correctX

if(p.dropIndex!==expectedIndex){

correct=false

}

})

if(correct && !completed){

completed=true

grid.style.background="transparent"

gridCells.forEach(c=>c.style.visibility="hidden")

circle.style.display="block"

}

}

createGrid()

const pieces=splitKanji()

createPieces(pieces)
