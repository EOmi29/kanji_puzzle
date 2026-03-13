// --- 漢字データ管理エリア (将来的に別ファイル化しやすいよう独立) ---
const kanjiData = [
    { kanji: "森", reading: "もり", words: ["森林", "森の中"] },
    { kanji: "話", reading: "はなし", words: ["会話", "電話"] },
    { kanji: "海", reading: "うみ", words: ["海岸", "海水"] }
    // ここに1000文字まで追加可能
];

// --- グローバル変数 ---
let gridSize = 2;
let questionCount = 5;
let selectedKanji = [];
let questionList = [];
let currentQuestion = 0;
let gridCells = [];

const home = document.getElementById("home-screen");
const puzzle = document.getElementById("puzzle-screen");
const grid = document.getElementById("grid");
const partsArea = document.getElementById("parts-area");
const circle = document.getElementById("correct-circle");
const readingDiv = document.getElementById("reading");
const wordsDiv = document.getElementById("words");
const nextBtn = document.getElementById("next-button");
const gridContainer = document.getElementById("grid-container");

// --- 初期設定 ---
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

// 各種設定ボタン
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
    if (selectedKanji.length === 0) return alert("漢字をえらんでね！");
    questionList = [...selectedKanji].sort(() => Math.random() - 0.5).slice(0, questionCount);
    home.style.display = "none";
    puzzle.style.display = "block";
    loadQuestion();
};

// --- パズルロジック ---

function createGrid() {
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

function loadQuestion() {
    // 【重要】前回のパーツを完全に消去（partsAreaだけでなくgridContainerからも）
    document.querySelectorAll(".piece").forEach(p => p.remove());
    
    circle.style.display = "none";
    readingDiv.textContent = "";
    wordsDiv.textContent = "";
    nextBtn.style.display = "none";
    
    createGrid();
    const data = questionList[currentQuestion];
    const pieces = splitKanji(data.kanji);

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

    el.addEventListener("pointerdown", e => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.style.position = "fixed";
        el.style.zIndex = 1000;
        
        // 【修正点】クリックした瞬間にパーツの中心がマウスに来るように調整
        updatePosition(el, e);
    });

    el.addEventListener("pointermove", e => {
        if (!dragging) return;
        updatePosition(el, e);
    });

    el.addEventListener("pointerup", e => {
        if (!dragging) return;
        dragging = false;
        el.style.zIndex = 10;
        snap(el);
    });
}

// パーツの中心をマウスに合わせる補助関数
function updatePosition(el, e) {
    const rect = el.getBoundingClientRect();
    el.style.left = (e.clientX - rect.width / 2) + "px";
    el.style.top = (e.clientY - rect.height / 2) + "px";
}

function snap(el) {
    const elRect = el.getBoundingClientRect();
    const elCenter = { x: elRect.left + elRect.width / 2, y: elRect.top + elRect.height / 2 };
    
    let bestIndex = -1;
    let minDistance = 120; // 判定距離を少し広げて吸着しやすく

    gridCells.forEach((cell, i) => {
        const r = cell.getBoundingClientRect();
        const cCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        const d = Math.sqrt((elCenter.x - cCenter.x) ** 2 + (elCenter.y - cCenter.y) ** 2);
        if (d < minDistance) { minDistance = d; bestIndex = i; }
    });

    if (bestIndex !== -1) {
        const cell = gridCells[bestIndex];
        const cellRect = cell.getBoundingClientRect();
        const containerRect = gridContainer.getBoundingClientRect();

        el.style.position = "absolute";
        el.style.left = (cellRect.left - containerRect.left) + "px";
        el.style.top = (cellRect.top - containerRect.top) + "px";
        el.classList.remove("piece-small");
        el.classList.add("piece-large");
        el.dropIndex = bestIndex;
        gridContainer.appendChild(el); // グリッド内に物理的に移動
    } else {
        el.style.position = "relative";
        el.style.left = "0"; el.style.top = "0";
        el.classList.add("piece-small");
        el.classList.remove("piece-large");
        el.dropIndex = undefined;
        partsArea.appendChild(el); // パーツエリアに戻す
    }
    checkAnswer();
}

function checkAnswer() {
    const pieces = document.querySelectorAll(".piece");
    // 全パーツが正しい位置にあるかチェック
    const allCorrect = Array.from(pieces).every(p => p.dropIndex === p.puzzleData.correctIndex);

    if (allCorrect && pieces.length > 0) {
        circle.style.display = "block";
        const data = questionList[currentQuestion];
        readingDiv.textContent = data.reading;
        wordsDiv.textContent = data.words.join(" ・ ");
        nextBtn.style.display = "inline-block";
    }
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
        alert("全問クリアです！");
        location.reload();
    } else {
        loadQuestion();
    }
};
