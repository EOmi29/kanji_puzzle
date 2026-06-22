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
        const termLabel = termArea.querySelector("label");
        
        termArea.style.display = "block";
        termSelect.innerHTML = ""; // 一度ボタンをクリア
        selectedTerm = null;

        if (selectedGrade === 7) {
            // 中学生の場合は「あ行〜わ行」を生成（term 1〜9）
            termLabel.textContent = "② 何行？（えらぶと下にかんじが出るよ）";
            const rowNames = ["あ・か行", "さ・た行", "な・は行", "ま・や行", "ら・わ行", "その他1", "その他2", "その他3", "その他4"];
            for (let i = 1; i <= 9; i++) {
                const tBtn = document.createElement("button");
                tBtn.className = "term-btn";
                tBtn.textContent = rowNames[i - 1];
                tBtn.dataset.term = i;
                tBtn.onclick = () => handleTermClick(tBtn, i);
                termSelect.appendChild(tBtn);
            }
        } else {
            // 小学生の場合は「学期」を生成
            termLabel.textContent = "② 何学期？（えらぶと下にかんじが出るよ）";
            let termsToShow = [1, 2, 3];
            if (selectedGrade === 1) {
                termsToShow = [2, 3]; // 1年生は2学期と3学期のみ
            }
            termsToShow.forEach(num => {
                const tBtn = document.createElement("button");
                tBtn.className = "term-btn";
                tBtn.textContent = `${num}学期`;
                tBtn.dataset.term = num;
                tBtn.onclick = () => handleTermClick(tBtn, num);
                termSelect.appendChild(tBtn);
            });
        }
        
        // リセット処理
        document.getElementById("kanji-sections").innerHTML = "";
        document.getElementById("kanji-container").style.display = "none";
        document.getElementById("start-button").style.display = "none";
        selectedKanji = [];
    };
});

// ② 学期・行ボタンがクリックされた時の処理
function handleTermClick(btn, termValue) {
    selectedTerm = termValue;
    const existingId = `section-${selectedGrade}-${selectedTerm}`;
    const targetSection = document.getElementById(existingId);

    if (targetSection) {
        // すでに選択されて表示中なら、もう一度押されたら消す
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
        // 新しく表示する
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
    section.className = "term-section";
    
    const heading = document.createElement("div");
    heading.className = "term-heading";
    if (selectedGrade === 7) {
        const rowNames = ["あ・か行", "さ・た行", "な・は行", "ま・や行", "ら・わ行", "その他1", "その他2", "その他3", "その他4"];
        heading.textContent = `＜ 中学生 ${rowNames[selectedTerm - 1]} ＞`;
    } else {
        heading.textContent = `＜ ${selectedGrade}年生 ${selectedTerm}学期 ＞`;
    }
    
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexWrap = "wrap";
    row.style.justifyContent = "center";
    row.style.gap = "5px";

    filtered.forEach(k => {
        const btn = document.createElement("button");
        btn.className = "kanji-btn";
        btn.textContent = k.kanji;
        
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

// リストをリセットボタン
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

// 分割数ボタン
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

// パズルをはじめる
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
                pctx.fillStyle = "rgba(0,0,0,0.04)";
                pctx.fillRect(0, 0, size, size);
                pctx.strokeStyle = "rgba(0,0,0,0.15)";
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
        const d = Math.sqrt((elCenter.x - cCenter.x) ** 2 + (elCenter.y - cCenter.y) ** 2);
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
