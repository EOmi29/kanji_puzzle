const kanjiData = [
    { kanji: "森", reading: "もり", words: ["森林", "森の中"] },
    { kanji: "話", reading: "はなし", words: ["会話", "電話"] },
    { kanji: "海", reading: "うみ", words: ["海岸", "海水"] }
];

let gridSize = 2;
let questionCount = 3;
let selectedKanji = [];
let questionList = [];
let currentQuestion = 0;
let gridCells = [];
const baseSize = 450; // タブレット向けサイズ

// 漢字リストの生成（ここが動かないと選べない）
const listEl = document.getElementById("kanji-list");
kanjiData.forEach(k => {
    const btn = document.createElement("button");
    btn.className = "kanji-btn";
    btn.textContent = k.kanji;
    btn.onclick = () => {
        btn.classList.toggle("selected");
        if (selectedKanji.includes(k)) {
            selectedKanji = selectedKanji.filter(x => x !== k);
        } else {
            selectedKanji.push(k);
        }
    };
    listEl.appendChild(btn);
});

// マス目と問題数の選択
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

// 開始
document.getElementById("start-button").onclick = () => {
    if (selectedKanji.length === 0) return alert("漢字をえらんでね！");
    questionList = [...selectedKanji].sort(() => Math.random() - 0.5).slice(0, questionCount);
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("puzzle-screen").style.display = "block";
    loadQuestion();
};

function createGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    gridCells = [];
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        grid.appendChild(cell);
        gridCells.push(cell);
    }
}

function splitKanji(kanji) {
    const size = baseSize / gridSize;
    const pieces = [];
    const base = document.createElement("canvas");
    base.width = baseSize; base.height = baseSize;
    const ctx = base.getContext("2d");
    ctx.font = `${baseSize * 0.8}px 'Noto Sans JP'`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(kanji, baseSize/2, baseSize/2);

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const part = document.createElement("canvas");
            part.width = size; part.height = size;
            part.getContext("2d").drawImage(base, x * size, y * size, size, size, 0, 0, size, size);
            pieces.push({ canvas: part, correctIndex: y * gridSize + x });
        }
    }
    return pieces;
}

function loadQuestion() {
    document.querySelectorAll(".piece").forEach(p => p.remove());
    document.getElementById("correct-circle").style.display = "none";
    document.getElementById("reading").textContent = "";
    document.getElementById("words").textContent = "";
    document.getElementById("next-button").style.display = "none";
    
    createGrid();
    const data = questionList[currentQuestion];
    const pieces = splitKanji(data.kanji);

    pieces.sort(() => Math.random() - 0.5).forEach(p => {
        const cvs = p.canvas;
        cvs.className = "piece piece-small";
        cvs.puzzleData = p;
        cvs.dropIndex = undefined;
        document.getElementById("parts-area").appendChild(cvs);
        enableDrag(cvs);
    });
}

function enableDrag(el) {
    let dragging = false;
    const startDrag = (e) => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.style.position = "fixed";
        el.style.zIndex = 1000;
        updatePos(e);
    };
    const moveDrag = (e) => { if (dragging) updatePos(e); };
    const stopDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        el.style.zIndex = 10;
        snap(el);
    };
    const updatePos = (e) => {
        const rect = el.getBoundingClientRect();
        el.style.left = (e.clientX - rect.width / 2) + "px";
        el.style.top = (e.clientY - rect.height / 2) + "px";
    };
    el.addEventListener("pointerdown", startDrag);
    el.addEventListener("pointermove", moveDrag);
    el.addEventListener("pointerup", stopDrag);
}

function snap(el) {
    const elRect = el.getBoundingClientRect();
    const elCenter = { x: elRect.left + elRect.width / 2, y: elRect.top + elRect.height / 2 };
    let bestIndex = -1;
    let minDistance = 80;

    gridCells.forEach((cell, i) => {
        const r = cell.getBoundingClientRect();
        const cCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        const d = Math.sqrt((elCenter.x - cCenter.x) ** 2 + (elCenter.y - cCenter.y) ** 2);
        if (d < minDistance) { minDistance = d; bestIndex = i; }
    });

    const gridContainer = document.getElementById("grid-container");
    if (bestIndex !== -1) {
        const cellRect = gridCells[bestIndex].getBoundingClientRect();
        const containerRect = gridContainer.getBoundingClientRect();
        el.style.position = "absolute";
        el.style.left = (cellRect.left - containerRect.left) + "px";
        el.style.top = (cellRect.top - containerRect.top) + "px";
        el.classList.replace("piece-small", "piece-large");
        el.dropIndex = bestIndex;
        gridContainer.appendChild(el);
    } else {
        el.style.position = "relative";
        el.style.left = "0"; el.style.top = "0";
        el.classList.replace("piece-large", "piece-small");
        el.dropIndex = undefined;
        document.getElementById("parts-area").appendChild(el);
    }
    checkAnswer();
}

function checkAnswer() {
    const pieces = document.querySelectorAll(".piece");
    const allCorrect = Array.from(pieces).every(p => p.dropIndex === p.puzzleData.correctIndex);
    if (allCorrect && pieces.length > 0) {
        document.getElementById("correct-circle").style.display = "block";
        const data = questionList[currentQuestion];
        document.getElementById("reading").textContent = data.reading;
        document.getElementById("words").textContent = data.words.join(" ・ ");
        document.getElementById("next-button").style.display = "inline-block";
    }
}

document.getElementById("next-button").onclick = () => {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
        alert("全問クリア！");
        location.reload();
    } else {
        loadQuestion();
    }
};
