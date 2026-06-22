let selectedGrade = null;
let selectedTerm = null;
let selectedKanji = [];
let gridSize = 2;
let questionCount = 5;
let currentQuestion = 0;
let questionList = [];
let gridCells = [];
const baseSize = 450;

// ① 学年ボタン
document.querySelectorAll(".grade-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".grade-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedGrade = parseInt(btn.dataset.grade);
        document.getElementById("term-area").style.display = "block";
        document.querySelectorAll(".term-btn").forEach(b => b.classList.remove("active"));
        selectedTerm = null;
    };
});

// ② 学期ボタン
document.querySelectorAll(".term-btn").forEach(btn => {
    btn.onclick = () => {
        btn.classList.add("active");
        selectedTerm = parseInt(btn.dataset.term);
        addKanjiSection();
    };
});

function addKanjiSection() {
    const container = document.getElementById("kanji-sections");
    document.getElementById("kanji-container").style.display = "block";
    document.getElementById("start-button").style.display = "inline-block";

    const existingId = `section-${selectedGrade}-${selectedTerm}`;
    if (document.getElementById(existingId)) {
        alert("その学年・学期はもう追加されているよ！");
        return;
    }

    const filtered = kanjiData.filter(k => k.grade === selectedGrade && k.term === selectedTerm);
    if (filtered.length === 0) {
        alert("データがありません");
        return;
    }

    const section = document.createElement("div");
    section.id = existingId;
    
    const heading = document.createElement("div");
    heading.className = "term-heading";
    
    // 【修正ポイント】左側に配置する個別の「リストをリセット」ボタンを作成
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "リストをリセット";
    clearBtn.style.fontSize = "12px";
    clearBtn.style.padding = "5px 10px";
    clearBtn.style.background = "#ef5350"; // 元のスタイルに合わせた赤色
    clearBtn.style.color = "white";
    clearBtn.style.margin = "0";
    
    // 中央のテキスト（何年生 何学期）
    const titleSpan = document.createElement("span");
    titleSpan.innerHTML = `＜ ${selectedGrade}年生 ${selectedTerm}学期 ＞`;
    
    // 右側に配置する「この学期をぜんぶえらぶ」ボタン
    const allBtn = document.createElement("button");
    allBtn.textContent = "この学期をぜんぶえらぶ";
    allBtn.style.fontSize = "12px";
    allBtn.style.padding = "5px 10px";
    allBtn.style.background = "#81D4FA";
    allBtn.style.margin = "0";
    
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

    // 「ぜんぶえらぶ」ボタンの動作設定
    allBtn.onclick = () => {
        sectionButtons.forEach(item => {
            if (!item.element.classList.contains("selected")) {
                item.element.classList.add("selected");
                selectedKanji.push(item.data);
            }
        });
    };

    // 【修正ポイント】左側のリセットボタンを押したときの動作（その学期エリアごと消去）
    clearBtn.onclick = () => {
        // この学期の選択されていた漢字データを配列から取り除く
        filtered.forEach(k => {
            selectedKanji = selectedKanji.filter(x => x !== k);
        });
        // この学年のセクション自体を画面から削除
        section.remove();
        
        // もし追加されているセクションが一つもなくなったら、エリア全体を非表示にする
        if (container.children.length === 0) {
            document.getElementById("kanji-container").style.display = "none";
            document.getElementById("start-button").style.display = "none";
        }
    };

    // 見出しの中に【左：リセット、中央：タイトル、右：ぜんぶえらぶ】の順番で並べる
    heading.appendChild(clearBtn);
    heading.appendChild(titleSpan);
    heading.appendChild(allBtn);
    
    section.appendChild(heading);
    section.appendChild(row);
    container.appendChild(section);
}

// 画面下部に残っている元の全体リセットボタンの動作設定（念のため残しています）
if (document.getElementById("clear-all-btn")) {
    document.getElementById("clear-all-btn").onclick = () => {
        document.getElementById("kanji-sections").innerHTML = "";
        selectedKanji = [];
        document.getElementById("kanji-container").style.display = "none";
        document.getElementById("start-button").style.display = "none";
    };
}

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
