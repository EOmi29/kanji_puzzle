const kanji="森"

/* 4分割なら2、9分割なら3 */

const gridSize=3

const canvasSize=720

const grid=document.getElementById("grid")

const partsArea=document.getElementById("parts-area")

const circle=document.getElementById("correct-circle")

const gridCells=[]

let completed=false

/* グリッド作成 */

function createGrid(){

grid.style.gridTemplateColumns=`repeat(${gridSize},1fr)`
grid.style.gridTemplateRows=`repeat(${gridSize},1fr)`

for(let i=0;i<gridSize*gridSize;i++){

const cell=document.createElement("div")

cell.className="grid-cell"

grid.appendChild(cell)

gridCells.push(cell)

}

}

/* 漢字分割 */

function splitKanji(){

const base=document.createElement("canvas")

base.width=canvasSize
base.height=canvasSize

const ctx=base.getContext("2d")

ctx.fillStyle="black"

ctx.font="600px 'Noto Sans JP'"

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

/* パーツ作成 */

function createPieces(pieces){

pieces.sort(()=>Math.random()-0.5)

pieces.forEach(p=>{

p.canvas.classList.add("piece")
p.canvas.classList.add("piece-small")

p.canvas.puzzleData=p

partsArea.appendChild(p.canvas)

enableDrag(p)

})

}

/* ドラッグ */

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

piece.canvas.style.position="absolute"

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

/* グリッド吸着 */

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

if(bestDist<260){

const cell=gridCells[bestIndex]

const rect=cell.getBoundingClientRect()

piece.canvas.style.left=rect.left+"px"
piece.canvas.style.top=rect.top+"px"

piece.dropIndex=bestIndex

piece.canvas.classList.remove("piece-small")
piece.canvas.classList.add("piece-large")

checkAnswer()

}

}

/* 正解判定 */

function checkAnswer(){

const pieces=[...document.querySelectorAll(".piece")]

for(let p of pieces){

if(p.dropIndex===undefined)return

}

let correct=true

pieces.forEach(p=>{

const data=p.puzzleData

const expected=data.correctY*gridSize+data.correctX

if(p.dropIndex!==expected){

correct=false

}

})

if(correct&&!completed){

completed=true

grid.style.background="transparent"

gridCells.forEach(c=>c.style.visibility="hidden")

circle.style.display="block"

}

}

/* 初期化 */

createGrid()

const pieces=splitKanji()

createPieces(pieces)
