let selectedGrade = null;
let selectedTerm = null;
let selectedKanji = [];
let gridSize = 2;
let questionCount = 5;
let currentQuestion = 0;
let questionList = [];
let gridCells = [];
const baseSize = 450;

// 行の数字を日本語のラベルに変換するための辞書
const rowNames = {
    1: "あ行", 2: "か行", 3: "さ行", 4: "た行", 5: "な行",
    6: "は行", 7: "ま行", 8: "や行", 9: "ら行", 10: "わ行"
};

// ① 学年ボタン
document.querySelectorAll(".grade-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".grade-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedGrade = parseInt(btn.dataset.grade);
        
        // エリアの表示と選択状態をリセット
        document.getElementById("term-area").style.display = "none";
        document.getElementById("row-area").style.display = "none";
        document.querySelectorAll(".term-btn").forEach(b => b.classList.remove("active"));
        selectedTerm = null;

        // 中学(7)か小学校(1〜6)かで表示エリアを切り替え
        if (selectedGrade === 7) {
            document.getElementById("row-area").style.display = "block";
        } else {
            document.getElementById("term-area").style.display = "block";
        }
    };
});

// ② 学期 / 50音ボタン（共通のクラス名 .term-btn で処理）
document.querySelectorAll(".term-btn").forEach(btn => {
    btn.onclick = () => {
        // 同じエリア内のボタンだけアクティブ状態を切り替える
        btn.parentElement.querySelectorAll(".term-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedTerm = parseInt(btn.dataset.term);
        addKanjiSection();
    };
});

function addKanjiSection() {
    const container = document.getElementById("kanji-sections");
    document.getElementById("kanji-container").style.display = "block";
    document.getElementById("start-button").style.display = "inline-block";

    // 重複チェック用のID
    const existingId = `section-${selectedGrade}-${selectedTerm}`;
    if (document.getElementById(existingId)) {
        alert("そのグループはもう追加されているよ！");
        return;
    }

    // データの絞り込みとタイトル設定（プロパティはどちらも grade と term を使用）
    const filtered = kanjiData.filter(k => k.grade === selectedGrade && k.term === selectedTerm);
    
    let titleText = "";
    if (selectedGrade === 7) {
        titleText = `＜ 中学校 ${rowNames[selectedTerm]} ＞`;
    } else {
        titleText = `＜ ${selectedGrade}年生 ${selectedTerm}学期 ＞`;
    }

    if (filtered.length === 0) {
        alert("データがありません");
        return;
    }

    const section = document.createElement("div");
    section.id = existingId;
    
    const heading = document.createElement("div");
    heading.className = "term-heading";
    heading.innerHTML = `<span>${titleText}</span>`;
    
    const allBtn = document.createElement("button");
    allBtn.textContent = "このグループをぜんぶえらぶ";
    allBtn.style.fontSize = "12px";
    allBtn.style.padding = "5px 10px";
    allBtn.style.background = "#81D4FA";
    allBtn.style.marginLeft = "10px";
    
    const row = document.createElement("div");
    row.className = "kanji-list-row";

    const sectionButtons = [];

    filtered.forEach(k => {
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
        
        row.appendChild(btn);
        sectionButtons.push({ element: btn, data: k });
    });

    allBtn.onclick = () => {
        sectionButtons.forEach(item => {
            if (!item.element.classList.contains("selected")) {
                item.element.classList.add("selected");
                selectedKanji.push(item.data);
            }
        });
    };

    heading.appendChild(allBtn);
    section.appendChild(heading);
    section.appendChild(row);
    container.appendChild(section);
}

document.getElementById("clear-all-btn").onclick = () => {
    document.getElementById("kanji-sections").innerHTML = "";
    selectedKanji = [];
    document.getElementById("kanji-container").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.querySelectorAll(".term-btn").forEach(b => b.classList.remove("active"));
};

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

    const updatePos = (e) => {
        const rect = el.getBoundingClientRect();
        el.style.left = (e.clientX - rect.width / 2) + "px";
        el.style.top = (e.clientY - rect.height / 2) + "px";
    };

    el.addEventListener("pointerdown", e => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.style.position = "fixed";
        el.style.zIndex = 1000;
        updatePos(e);
    });

    el.addEventListener("pointermove", e => {
        if (dragging) updatePos(e);
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
        el.classList.replace("piece-small", "piece-large");

        el.dropIndex = bestIndex;
        gridContainer.appendChild(el);
    } else {
        el.style.position = "relative";
        el.style.left = "0";
        el.style.top = "0";
        el.classList.replace("piece-large", "piece-small");

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
