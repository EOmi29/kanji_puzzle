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

const grid = document.getElementById("grid");
const partsArea = document.getElementById("parts-area");
const circle = document.getElementById("correct-circle");
const readingDiv = document.getElementById("reading");
const wordsDiv = document.getElementById("words");
const nextBtn = document.getElementById("next-button");

// 初期化（漢字リスト）
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
    document.getElementById("kanji-list").appendChild(btn);
});

// ボタンイベント設定
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

document.getElementById("start-button").onclick = () => {
    if(selectedKanji.length === 0) return alert("漢字を選んでください");
    questionList = [...selectedKanji].sort(() => Math.random() - 0.5).slice(0, questionCount);
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("puzzle-screen").style.display = "block";
    loadQuestion();
};

function createGrid() {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        grid.appendChild(cell);
        cells.push(cell);
    }
    return cells;
}

function splitKanji(kanji) {
    const size = 720 / gridSize;
    const pieces = [];
    const base = document.createElement("canvas");
    base.width = 720; base.height = 720;
    const ctx = base.getContext("2d");
    ctx.font = "600px 'Noto Sans JP'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(kanji, 360, 360);

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

let gridCells = [];

function loadQuestion() {
    circle.style.display = "none";
    readingDiv.textContent = "";
    wordsDiv.textContent = "";
    nextBtn.style.display = "none";
    gridCells = createGrid();
    const pieces = splitKanji(questionList[currentQuestion].kanji);
    
    partsArea.innerHTML = "";
    pieces.sort(() => Math.random() - 0.5).forEach(p => {
        const cvs = p.canvas;
        cvs.className = "piece piece-small";
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
        el.setPointerCapture(e.pointerId);
        const rect = el.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        el.style.position = "fixed";
        el.style.zIndex = 1000;
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
    const elRect = el.getBoundingClientRect();
    const elCenter = { x: elRect.left + elRect.width / 2, y: elRect.top + elRect.height / 2 };
    
    let bestIndex = -1;
    let minDistance = 100;

    gridCells.forEach((cell, i) => {
        const r = cell.getBoundingClientRect();
        const cCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        const d = Math.sqrt((elCenter.x - cCenter.x) ** 2 + (elCenter.y - cCenter.y) ** 2);
        if (d < minDistance) { minDistance = d; bestIndex = i; }
    });

    if (bestIndex !== -1) {
        const cell = gridCells[bestIndex];
        const cellRect = cell.getBoundingClientRect();
        const containerRect = document.getElementById("grid-container").getBoundingClientRect();

        // 修正：コンテナの相対位置を正しく計算して配置
        el.style.position = "absolute";
        el.style.left = (cellRect.left - containerRect.left) + "px";
        el.style.top = (cellRect.top - containerRect.top) + "px";
        el.classList.replace("piece-small", "piece-large");
        el.dropIndex = bestIndex;
        // グリッドコンテナに要素を移動（これでスクロールしてもズレない）
        document.getElementById("grid-container").appendChild(el);
    } else {
        el.style.position = "relative";
        el.style.left = "0"; el.style.top = "0";
        el.classList.replace("piece-large", "piece-small");
        el.dropIndex = undefined;
        partsArea.appendChild(el);
    }
    checkAnswer();
}

function checkAnswer() {
    const pieces = document.querySelectorAll(".piece");
    const allCorrect = Array.from(pieces).every(p => p.dropIndex === p.puzzleData.correctIndex);

    if (allCorrect && pieces.length > 0) {
        circle.style.display = "block";
        const data = questionList[currentQuestion];
        readingDiv.textContent = data.reading;
        wordsDiv.textContent = data.words.join("・");
        nextBtn.style.display = "inline-block";
    }
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
        alert("おわり！");
        location.reload();
    } else {
        loadQuestion();
    }
};
