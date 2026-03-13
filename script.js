const kanjiData=[

{kanji:"森",reading:"もり",words:["森林","森の中"]},
{kanji:"話",reading:"はなし",words:["会話","電話"]},
{kanji:"海",reading:"うみ",words:["海岸","海水"]}

]

let gridSize=2
let questionCount=5
let selectedKanji=[]

let questionList=[]
let currentQuestion=0

const home=document.getElementById("home-screen")
const puzzle=document.getElementById("puzzle-screen")

const grid=document.getElementById("grid")
const partsArea=document.getElementById("parts-area")
const circle=document.getElementById("correct-circle")

const readingDiv=document.getElementById("reading")
const wordsDiv=document.getElementById("words")

const nextBtn=document.getElementById("next-button")

const canvasSize=720

/* 漢字ボタン */

const kanjiList=document.getElementById("kanji-list")

kanjiData.forEach(k=>{

const btn=document.createElement("button")

btn.className="kanji-btn"

btn.textContent=k.kanji

btn.onclick=()=>{

btn.classList.toggle("selected")

if(selectedKanji.includes(k)){

selectedKanji=selectedKanji.filter(x=>x!=k)

}else{

selectedKanji.push(k)

}

}

kanjiList.appendChild(btn)

})

/* 分割 */

document.querySelectorAll(".split-btn").forEach(btn=>{

btn.onclick=()=>{

gridSize=parseInt(btn.dataset.size)

}

})

/* 問題数 */

document.querySelectorAll(".count-btn").forEach(btn=>{

btn.onclick=()=>{

questionCount=parseInt(btn.textContent)

}

})

/* スタート */

document.getElementById("start-button").onclick=()=>{

questionList=[...selectedKanji]

questionList.sort(()=>Math.random()-0.5)

questionList=questionList.slice(0,questionCount)

home.style.display="none"

puzzle.style.display="block"

currentQuestion=0

loadQuestion()

}

/* 問題ロード */

function loadQuestion(){

grid.innerHTML=""
partsArea.innerHTML=""
circle.style.display="none"
readingDiv.textContent=""
wordsDiv.textContent=""
nextBtn.style.display="none"

const data=questionList[currentQuestion]

createGrid()

const pieces=splitKanji(data.kanji)

createPieces(pieces)

}

/* グリッド */

const gridCells=[]

function createGrid(){

gridCells.length=0

grid.style.gridTemplateColumns=`repeat(${gridSize},1fr)`
grid.style.gridTemplateRows=`repeat(${gridSize},1fr)`

for(let i=0;i<gridSize*gridSize;i++){

const cell=document.createElement("div")

cell.className="grid-cell"

grid.appendChild(cell)

gridCells.push(cell)

}

}

/* 分割 */

function splitKanji(kanji){

const base=document.createElement("canvas")

base.width=canvasSize
base.height=canvasSize

const ctx=base.getContext("2d")

ctx.fillStyle="black"

ctx.font="600px 'Noto Sans JP'"

ctx.textAlign="center"
ctx.textBaseline="middle"

ctx.fillText(kanji,canvasSize/2,canvasSize/2)

const size=canvasSize/gridSize

const pieces=[]

for(let y=0;y<gridSize;y++){

for(let x=0;x<gridSize;x++){

const part=document.createElement("canvas")

part.width=size
part.height=size

const pctx=part.getContext("2d")

pctx.drawImage(
base,
x*size,
y*size,
size,
size,
0,
0,
size,
size
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

/* パーツ */

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

dragging=true

piece.canvas.style.position="absolute"

offsetX=e.offsetX
offsetY=e.offsetY

piece.canvas.setPointerCapture(e.pointerId)

})

piece.canvas.addEventListener("pointermove",e=>{

if(!dragging)return

piece.canvas.style.left=(e.pageX-offsetX)+"px"
piece.canvas.style.top=(e.pageY-offsetY)+"px"

})

piece.canvas.addEventListener("pointerup",e=>{

dragging=false

snap(piece)

})

}
/* 吸着 */

function snap(piece){

let best=-1
let bestDist=99999

gridCells.forEach((cell,i)=>{

const r=cell.getBoundingClientRect()

const dx=r.left-piece.canvas.getBoundingClientRect().left
const dy=r.top-piece.canvas.getBoundingClientRect().top

const d=Math.sqrt(dx*dx+dy*dy)

if(d<bestDist){

bestDist=d
best=i

}

})

if(bestDist<250){

const cell=gridCells[best]

const r=cell.getBoundingClientRect()

piece.canvas.style.left=r.left+"px"
piece.canvas.style.top=r.top+"px"

piece.canvas.classList.remove("piece-small")
piece.canvas.classList.add("piece-large")

piece.dropIndex=best

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

const d=p.puzzleData

const expect=d.correctY*gridSize+d.correctX

if(p.dropIndex!=expect){

correct=false

}

})

if(correct){

circle.style.display="block"

const data=questionList[currentQuestion]

readingDiv.textContent=data.reading
wordsDiv.textContent=data.words.join("　")

nextBtn.style.display="inline-block"

}

}

/* 次 */

nextBtn.onclick=()=>{

currentQuestion++

if(currentQuestion>=questionList.length){

location.reload()

}else{

loadQuestion()

}

}
