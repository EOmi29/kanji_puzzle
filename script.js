let selectedGrade = null;
let selectedTerm = null;
let selectedKanji = [];
let gridSize = 2;
let questionCount = 5;
let currentQuestion = 0;
let questionList = [];
let gridCells = [];
const baseSize = 430; // パズル台の内寸(450 - padding20)に最適化

// ③ 中学生用の正しい10行見出し定義
const chungakuRows = [
    "あ行", "か行", "さ行", "た行", "な行",
    "は行", "ま行", "や行", "ら行", "わ行"
];

// ① 学年ボタンのクリック処理
document.querySelectorAll(".grade-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".grade-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedGrade = parseInt(btn.dataset.grade);
        
        const termArea = document.getElementById("term-area");
        const termSelect = document.getElementById("term-select");
        const termLabel = document.getElementById("term-label");
        
        termArea.style.display = "block";
        termSelect.innerHTML = ""; 
        selectedTerm = null;

        if (selectedGrade === 7) {
            // 中学生は10個の行ボタンを生成
            termLabel.textContent = "② 何行？（えらぶと下にかんじが出るよ）";
            chungakuRows.forEach((rowName, idx) => {
                const tBtn = document.createElement("button");
                tBtn.className = "term-btn";
                tBtn.textContent = rowName;
                tBtn.dataset.term = idx + 1;
                tBtn.onclick = () => handleTermClick(tBtn, idx + 1);
                termSelect.appendChild(tBtn);
            });
        } else {
            // 小学生は学期ボタンを生成
            termLabel.textContent = "② 何学期？（えらぶと下にかんじが出るよ）";
            let termsToShow = [1, 2, 3];
            if (selectedGrade === 1) {
                termsToShow = [2, 3]; // 1年生は2, 3学期のみ
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
        
        // クリア処理
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
    section.style.marginBottom = "30px";
    
    // ヘッダー（見出し ＋ まとめて選択ボタン）
    const heading = document.createElement("div");
    heading.className = "term-heading";
    
    const titleSpan = document.createElement("span");
    if (selectedGrade === 7) {
        titleSpan.textContent = `＜ 中学生 ${chungakuRows[selectedTerm - 1]} ＞`;
    } else {
        titleSpan.textContent = `＜ ${selectedGrade}年生 ${selectedTerm}学期 ＞`;
    }
    heading.appendChild(titleSpan);

    // ① まとめて選択/解除ボタンの復活
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "select-toggle-btn";
    toggleBtn.textContent = "すべてえらぶ";
    toggleBtn.onclick = () => {
        const rowButtons = row.querySelectorAll(".kanji-btn");
        const allSelected = Array.from(rowButtons).every(b => b.classList.contains("selected"));
        
        if (allSelected) {
            // すべて解除
            rowButtons.forEach(b => b.classList.remove("selected"));
            filtered.forEach(k => {
                selectedKanji = selectedKanji.filter(x => x.kanji !== k.kanji);
            });
            toggleBtn.textContent = "すべてえらぶ";
        } else {
            // すべて選択
            rowButtons.forEach(b => b.classList.add("selected"));
            filtered.forEach(k => {
                if (!selectedKanji.some(x => x.kanji === k.kanji)) {
                    selectedKanji.push(k);
                }
            });
            toggleBtn.textContent = "はずす";
        }
    };
    heading.appendChild(toggleBtn);
    
    // ② 漢字を並べるグリッド行（CSS側で最大8列制限）
    const row = document.createElement("div");
    row.className = "kanji-row";

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
            
            // まとめて選択ボタンのテキスト更新
            const currentRows = row.querySelectorAll(".kanji-btn");
            const isAll = Array.from(currentRows).every(b => b.classList.contains("selected"));
            toggleBtn.textContent = isAll ? "はずす" : "すべてえらぶ";
        };
        row.appendChild(btn);
    });

    // 初期状態に応じたテキスト調整
    const isAllInit = filtered.every(k => selectedKanji.some(x => x.kanji === k.kanji));
    if (isAllInit && filtered.length > 0) toggleBtn.textContent = "はずす";

    section.appendChild(heading);
    section.appendChild(row);
    container.appendChild(section);
}

// リストをリセット
document.getElementById("clear-all-btn").onclick = () => {
    selectedKanji = [];
    document.getElementById("kanji-sections").innerHTML = "";
    document.getElementById("kanji-container").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.querySelectorAll(".term-btn").forEach(b => b.classList.remove("active"));
};

// 分割数・問題数ボタン
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

// パズルをはじめる
document.getElementById("start-button").onclick = () => {
    if (selectedKanji.length === 0) return alert("漢字をえらんでね！");
    let shuffled = [...selectedKanji].sort(() => Math.random() - 0.5);
    questionList = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("puzzle-screen").style.display = "block";
    currentQuestion = 0;
    loadQuestion();
};

// ⑤ 「えらびなおす」ボタン（トップページに戻る）の動作実装
document.getElementById("back-to-home-btn").onclick = () => {
    document.getElementById("puzzle-screen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
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

// ④ ピースが縮小して出来損ないになるバグの解消ロジック
function splitKanji(kanji) {
    const size = baseSize / gridSize;
    const pieces = [];
    const base = document.createElement("canvas");
    base.width = baseSize;
    base.height = baseSize;

    const ctx = base.getContext("2d");
    ctx.font = `${baseSize * 0.82}px 'Noto Sans JP'`;
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
                pctx.fillStyle = "rgba(0,0,0,0.03)";
                pctx.fillRect(0, 0, size, size);
                pctx.strokeStyle = "rgba(0,0,0,0.1)";
                pctx.strokeRect(0, 0, size, size);
                part.dataset.empty = "true";
            }

            pieces.push({ canvas: part, correctIndex: y * gridSize + x, isEmpty: empty });
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
    const cellSize = baseSize / gridSize;

    pieces.sort(() => Math.random() - 0.5).forEach(p => {
        const cvs = p.canvas;
        cvs.className = "piece";
        // 最初（パーツ置き場）の大きさを指定
        cvs.style.width = `${cellSize}px`;
        cvs.style.height = `${cellSize}px`;
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
    const elCenter = { x: elRect.left + elRect.width / 2, y: elRect.top + elRect.height / 2 };

    let bestIndex = -1;
    let minDistance = 80;

    gridCells.forEach((cell, i) => {
        const r = cell.getBoundingClientRect();
        const cCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
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
        const cellSize = baseSize / gridSize;
        el.style.position = "relative";
        el.style.left = "0";
        el.style.top = "0";
        el.style.width = `${cellSize}px`;
        el.style.height = `${cellSize}px`;

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
        document.getElementById("puzzle-screen").style.display = "none";
        document.getElementById("home-screen").style.display = "block";
    } else {
        loadQuestion();
    }
};
