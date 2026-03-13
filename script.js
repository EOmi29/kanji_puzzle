const kanjiData = [
    { kanji: "森", reading: "もり", words: ["森林", "森の中"] },
    { kanji: "話", reading: "はなし", words: ["会話", "電話"] },
    { kanji: "海", reading: "うみ", words: ["海岸", "海水"] }
];

let gridSize = 2;
let questionCount = 5;
let selectedKanji = [];
let questionList = [];
let currentQuestion = 0;

const home = document.getElementById("home-screen");
const puzzle = document.getElementById("puzzle-screen");
const grid = document.getElementById("grid");
const partsArea = document.getElementById("parts-area");
const circle = document.getElementById("correct-circle");
const readingDiv = document.getElementById("reading");
const wordsDiv = document.getElementById("words");
const nextBtn = document.getElementById("next-button");
const kanjiList = document.getElementById("kanji-list");

const canvasSize = 720;
const gridCells = [];

// 漢字選択ボタンの生成
kanjiData.forEach(k => {
    const btn = document.createElement("button");
    btn.className = "kanji-btn";
    btn.textContent = k.kanji;
    btn.onclick = () => {
        btn.classList.toggle("selected");
        if (selectedKanji.includes(k)) {
            selectedKanji = selectedKanji.filter(x => x != k);
        } else {
            selectedKanji.push(k);
        }
    };
    kanjiList.appendChild(btn);
});

// 設定ボタンのイベント
document.querySelectorAll(".split-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".split-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gridSize = parseInt(btn.dataset.size);
    };
});

document.querySelectorAll(".count-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".count-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        questionCount = parseInt(btn.textContent);
    };
});

// 開始ボタン
document.getElementById("start-button").onclick = () => {
    if (selectedKanji.length === 0) {
        alert("漢字をえらんでね！");
        return;
    }
    questionList = [...selectedKanji];
    questionList.sort(() => Math.random() - 0.5);
    questionList = questionList.slice(0, questionCount);
    
    home.style.display = "none";
    puzzle.style.display = "block";
    currentQuestion = 0;
    loadQuestion();
};

function createGrid() {
    gridCells.length = 0;
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        grid.appendChild(cell);
        gridCells.push(cell);
    }
}

function splitKanji(kanji) {
    const base = document.createElement("canvas");
    base.width = canvasSize;
    base.height = canvasSize;
    const ctx = base.getContext("2d");

    ctx.fillStyle = "black";
    ctx.font = "600px 'Noto Sans JP'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(kanji, canvasSize / 2, canvasSize / 2);

    const size = canvasSize / gridSize;
    const pieces = [];

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const part = document.createElement("canvas");
            part.width = size;
            part.height = size;
            const pctx = part.getContext("2d");
            pctx.drawImage(base, x * size, y * size, size, size, 0, 0, size, size);

            pieces.push({
                canvas: part,
                correctIndex: y * gridSize + x
            });
        }
    }
    return pieces;
}

function createPieces(pieces) {
    partsArea.innerHTML = ""; // クリア
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach(p => {
        const cvs = p.canvas;
        cvs.classList.add("piece", "piece-small");
        cvs.puzzleData = p;
        cvs.dropIndex = undefined;
        partsArea.appendChild(cvs);
        enableDrag(cvs);
    });
}

function enableDrag(el) {
    let dragging = false;
    let startX, startY;

    el.addEventListener("pointerdown", e => {
        dragging = true;
        el.style.zIndex = 1000;
        // 要素の左上からのマウス位置を保持
        const rect = el.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        
        el.style.position = "fixed";
        el.style.left = (e.clientX - startX) + "px";
        el.style.top = (e.clientY - startY) + "px";
        el.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", e => {
        if (!dragging) return;
        el.style.left = (e.clientX - startX) + "px";
        el.style.top = (e.clientY - startY) + "px";
    });

    el.addEventListener("pointerup", e => {
        if (!dragging) return;
        dragging = false;
        el.style.zIndex = 10;
        snap(el);
    });
}

function snap(el) {
    let bestIndex = -1;
    let minDistance = 150; // 吸着する距離

    const elRect = el.getBoundingClientRect();
    const elCenter = {
        x: elRect.left + elRect.width / 2,
        y: elRect.top + elRect.height / 2
    };

    gridCells.forEach((cell, i) => {
        const cellRect = cell.getBoundingClientRect();
        const cellCenter = {
            x: cellRect.left + cellRect.width / 2,
            y: cellRect.top + cellRect.height / 2
        };

        const dist = Math.sqrt(
            Math.pow(elCenter.x - cellCenter.x, 2) + 
            Math.pow(elCenter.y - cellCenter.y, 2)
        );

        if (dist < minDistance) {
            minDistance = dist;
            bestIndex = i;
        }
    });

    if (bestIndex !== -1) {
        const targetCell = gridCells[bestIndex];
        const targetRect = targetCell.getBoundingClientRect();
        
        el.style.position = "absolute";
        // 親要素(#grid-container)からの相対位置に変換
        const containerRect = document.getElementById("grid-container").getBoundingClientRect();
        el.style.left = (targetRect.left - containerRect.left) + "px";
        el.style.top = (targetRect.top - containerRect.top) + "px";
        
        el.classList.remove("piece-small");
        el.classList.add("piece-large");
        el.dropIndex = bestIndex;
    } else {
        // 枠外に離した場合は元の場所（parts-area）に戻す
        el.style.position = "relative";
        el.style.left = "0px";
        el.style.top = "0px";
        el.classList.add("piece-small");
        el.classList.remove("piece-large");
        el.dropIndex = undefined;
        partsArea.appendChild(el);
    }
    checkAnswer();
}

function checkAnswer() {
    const pieces = document.querySelectorAll(".piece");
    let allPlaced = true;
    let allCorrect = true;

    pieces.forEach(p => {
        if (p.dropIndex === undefined) {
            allPlaced = false;
        } else if (p.dropIndex !== p.puzzleData.correctIndex) {
            allCorrect = false;
        }
    });

    if (allPlaced && allCorrect) {
        circle.style.display = "block";
        const data = questionList[currentQuestion];
        readingDiv.textContent = data.reading;
        wordsDiv.textContent = data.words.join("　");
        nextBtn.style.display = "inline-block";
    } else {
        circle.style.display = "none";
        nextBtn.style.display = "none";
    }
}

function loadQuestion() {
    circle.style.display = "none";
    readingDiv.textContent = "";
    wordsDiv.textContent = "";
    nextBtn.style.display = "none";
    
    createGrid();
    const data = questionList[currentQuestion];
    const pieces = splitKanji(data.kanji);
    createPieces(pieces);
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
        alert("全問終了！お疲れ様でした！");
        location.reload();
    } else {
        loadQuestion();
    }
};
