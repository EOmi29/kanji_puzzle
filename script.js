let selectedGrade = null;
let selectedTerm = null;
let selectedKanji = [];
let gridSize = 2;
let questionCount = 5;
let currentQuestion = 0;
let questionList = [];
let gridCells = [];
const baseSize = 450;

// ① 学年ボタンのクリック処理
document.querySelectorAll(".grade-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".grade-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedGrade = parseInt(btn.dataset.grade);
        
        const termArea = document.getElementById("term-area");
        const termSelect = document.getElementById("term-select");
        
        termArea.style.display = "block";
        termSelect.innerHTML = ""; // 学年が変わるときは一度ボタンをクリア
        selectedTerm = null;

        // 【修正ポイント】1年生のときは「2学期・3学期」のみ、それ以外は「1〜3学期」を動的に生成
        let termsToShow = [1, 2, 3];
        if (selectedGrade === 1) {
            termsToShow = [2, 3];
        }

        termsToShow.forEach(num => {
            const tBtn = document.createElement("button");
            tBtn.className = "term-btn";
            tBtn.textContent = `${num}学期`;
            tBtn.dataset.term = num;
            tBtn.onclick = () => handleTermClick(tBtn, num);
            termSelect.appendChild(tBtn);
        });
        
        // 学年を変えたら下の漢字選択エリアやスタートボタンは一度リセット
        document.getElementById("kanji-sections").innerHTML = "";
        document.getElementById("kanji-container").style.display = "none";
        document.getElementById("start-button").style.display = "none";
        selectedKanji = [];
    };
});

// ② 学期ボタンがクリックされた時の処理
function handleTermClick(btn, termValue) {
    selectedTerm = termValue;
    
    const existingId = `section-${selectedGrade}-${selectedTerm}`;
    const targetSection = document.getElementById(existingId);

    if (targetSection) {
        // すでに画面に出ているグループのボタンをもう一度押した場合は消す（トグル動作）
        btn.classList.remove("active");
        
        const filtered = kanjiData.filter(k => k.grade === selectedGrade && k.term === selectedTerm);
        filtered.forEach(k => {
            selectedKanji = selectedKanji.filter(x => x.kanji !== k.kanji);
        });
        
        targetSection.remove();
        
        const container = document.getElementById("kanji-sections");
        if (container.children.length === 0) {
            document.getElementById("kanji-container").style.display = "none";
            document.getElementById("start-button").style.display = "none";
        }
    } else {
        // まだ画面に出ていないグループなら追加
        btn.classList.add("active");
        addKanjiSection();
    }
}

// 漢字リストを画面に作り出す処理
function addKanjiSection() {
    const container = document.getElementById("kanji-sections");
    document.getElementById("kanji-container").style.display = "block";
    document.getElementById("start-button").style.display = "inline-block";

    const existingId = `section-${selectedGrade}-${selectedTerm}`;

    const filtered = kanjiData.filter(k => k.grade === selectedGrade && k.term === selectedTerm);
    if (filtered.length === 0) {
        alert("データがありません");
        return;
    }

    const section = document.createElement("div");
    section.id = existingId;
    section.style.marginBottom = "20px";
    
    const heading = document.createElement("div");
    heading.style.fontWeight = "bold";
    heading.style.marginBottom = "5px";
    heading.style.fontSize = "16px";
    heading.style.textAlign = "left";
    heading.textContent = `＜ ${selectedGrade}年生 ${selectedTerm}学期 ＞`;
    
    const row = document.createElement("div");
    // 元のCSSデザインの邪魔をしないように、ボタンが綺麗に並ぶ最低限のスタイル
    row.style.display = "flex";
    row.style.flexWrap = "wrap";
    row.style.gap = "5px";

    filtered.forEach(k => {
        const btn = document.createElement("button");
        btn.className = "kanji-btn";
        btn.textContent = k.kanji;
        
        // 以前選んだ状態が残っていればオレンジにする
        if (selectedKanji.some(x => x.kanji === k.kanji)) {
            btn.classList.add("selected");
        }
        
        btn.onclick = () => {
            btn.classList.toggle("selected");
            const isAlreadySelected = selectedKanji.some(x => x.kanji === k.kanji);
            if (isAlreadySelected) {
                selectedKanji = selectedKanji.filter(x => x.kanji !== k.kanji);
            } else {
                selectedKanji.push(k);
            }
        };
        
        row.appendChild(btn);
    });

    section.appendChild(heading);
    section.appendChild(row);
    container.appendChild(section);
}

// 元からHTMLにある「リストをリセット」ボタンの処理
const clearAllBtn = document.getElementById("clear-all-btn");
if (clearAllBtn) {
    clearAllBtn.onclick = () => {
        selectedKanji = [];
        document.getElementById("kanji-sections").innerHTML = "";
        document.getElementById("kanji-container").style.display = "none";
        document.getElementById("start-button").style.display = "none";
        document.querySelectorAll(".term-btn").forEach(b => b.classList.remove("active"));
    };
}

// 分割数（マス）ボタン
document.querySelectorAll(".split-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".split-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gridSize = parseInt(btn.dataset.size);
    };
});

// 問題数ボタン
document.querySelectorAll(".count-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".count-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        questionCount = parseInt(btn.textContent);
    };
});

// パズルをはじめる（出題）ボタン
document.getElementById("start-button").onclick = () => {
    if (selectedKanji.length === 0) {
        return alert("漢字をえらんでね！");
    }
    
    let shuffled = [...selectedKanji].sort(() => Math.random() - 0.5);
    let actualCount = Math.min(questionCount, shuffled.length);
    questionList = shuffled.slice(0, actualCount);
    
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("puzzle-screen").style.display = "block";
    currentQuestion = 0;
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

function isEmptyCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < img.length; i += 4) {
        if (img[i] !== 0) return false;
    }
    return true;
}

function splitKanji(kanji) {
    const size = baseSize / gridSize;
    const pieces = [];
    const base = document.createElement("canvas");
    base.width = baseSize;
    base.height = baseSize;

    const ctx = base.getContext("2d");
    ctx.font = `${baseSize * 0.8}px 'Noto Sans JP'`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(kanji, baseSize / 2, baseSize / 2);

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const part = document.createElement("canvas");
            part.width = size;
            part.height = size;

            const pctx = part.getContext("2d");
            pctx.drawImage(base, x * size, y * size, size, size, 0, 0, size, size);

            const empty = isEmptyCanvas(part);

            if (empty) {
                pctx.fillStyle = "rgba(0,0,0,0.08)";
                pctx.fillRect(0, 0, size, size);
                pctx.strokeStyle = "rgba(0,0,0,0.25)";
                pctx.strokeRect(0, 0, size, size);
                part.dataset.empty = "true";
            }

            pieces.push({
                canvas: part,
                correctIndex: y * gridSize + x,
                isEmpty: empty
            });
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
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("pointerdown", e => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        el.style.position = "fixed";
        el.style.zIndex = 1000;
        el.style.left = (e.clientX - offsetX) + "px";
        el.style.top = (e.clientY - offsetY) + "px";
    });

    el.addEventListener("pointermove", e => {
        if (!dragging) return;
        el.style.left = (e.clientX - offsetX) + "px";
        el.style.top = (e.clientY - offsetY) + "px";
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
    const elCenter = {
        x: elRect.left + elRect.width / 2,
        y: elRect.top + elRect.height / 2
    };

    let bestIndex = -1;
    let minDistance = 80;

    gridCells.forEach((cell, i) => {
        const r = cell.getBoundingClientRect();
        const cCenter = {
            x: r.left + r.width / 2,
            y: r.top + r.height / 2
        };
        const d = Math.sqrt(
            (elCenter.x - cCenter.x) ** 2 +
            (elCenter.y - cCenter.y) ** 2
        );
        if (d < minDistance) {
            minDistance = d;
            bestIndex = i;
        }
    });

    const gridContainer = document.getElementById("grid-container");

    if (bestIndex !== -1) {
        const cellRect = gridCells[bestIndex].getBoundingClientRect();
        const containerRect = gridContainer.getBoundingClientRect();

        el.style.position = "absolute";
        el.style.left = (cellRect.left - containerRect.left) + "px";
        el.style.top = (cellRect.top - containerRect.top) + "px";
        el.style.width = cellRect.width + "px";
        el.style.height = cellRect.height + "px";

        el.dropIndex = bestIndex;
        gridContainer.appendChild(el);
    } else {
        el.style.position = "relative";
        el.style.left = "0";
        el.style.top = "0";
        el.style.width = "";
        el.style.height = "";

        el.dropIndex = undefined;
        document.getElementById("parts-area").appendChild(el);
    }

    checkAnswer();
}

function checkAnswer() {
    const pieces = document.querySelectorAll(".piece");
    const allCorrect = Array.from(pieces).every(p => {
        if (p.dropIndex === undefined) return false;
        if (p.puzzleData.isEmpty) return true;
        return p.dropIndex === p.puzzleData.correctIndex;
    });

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
        alert("全問クリアです！");
        location.reload();
    } else {
        loadQuestion();
    }
};
