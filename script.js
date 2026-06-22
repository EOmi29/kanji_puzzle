let selectedGrade = null;
let selectedTerm = null;
let selectedKanji = [];
let gridSize = 2;
let questionCount = 5;
let currentQuestion = 0;
let questionList = [];
let gridCells = [];
const baseSize = 450;

// 中学校用の「行」の定義（データベースのtermの数値1〜10と、画面のラベルの対応表）
const chugakuTerms = [
    { value: 1, label: "あ行" },
    { value: 2, label: "か行" },
    { value: 3, label: "さ行" },
    { value: 4, label: "た行" },
    { value: 5, label: "な行" },
    { value: 6, label: "は行" },
    { value: 7, label: "ま行" },
    { value: 8, label: "や行" },
    { value: 9, label: "ら行" },
    { value: 10, label: "わ行" }
];

// ① 学年ボタン
document.querySelectorAll(".grade-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".grade-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedGrade = parseInt(btn.dataset.grade);
        
        const termArea = document.getElementById("term-area");
        const termLabel = document.getElementById("term-label");
        const termSelect = document.getElementById("term-select");
        
        termArea.style.display = "block";
        termSelect.innerHTML = ""; // 学年が変わるときはステップ②のボタンをリセット
        selectedTerm = null;

        // 小学校（1~6）と中学校（7）でステップ②のボタンを切り替える
        if (selectedGrade === 7) {
            termLabel.textContent = "② どの行？（えらぶと下にかんじが出るよ）";
            chugakuTerms.forEach(t => {
                const tBtn = document.createElement("button");
                tBtn.className = "term-btn";
                tBtn.textContent = t.label;
                tBtn.dataset.term = t.value;
                tBtn.onclick = () => handleTermClick(tBtn, t.value);
                termSelect.appendChild(tBtn);
            });
        } else {
            termLabel.textContent = "② 何学期？（えらぶと下にかんじが出るよ）";
            [1, 2, 3].forEach(num => {
                const tBtn = document.createElement("button");
                tBtn.className = "term-btn";
                tBtn.textContent = `${num}学期`;
                tBtn.dataset.term = num;
                tBtn.onclick = () => handleTermClick(tBtn, num);
                termSelect.appendChild(tBtn);
            });
        }
        
        // 【重要】別の学年ボタンを押した時は、完全に最初から選び直すために下の漢字リストと選択データをリセットする
        document.getElementById("kanji-sections").innerHTML = "";
        document.getElementById("kanji-container").style.display = "none";
        document.getElementById("start-button").style.display = "none";
        selectedKanji = [];
    };
});

// ② 学期・行ボタンがクリックされた時の共通処理
function handleTermClick(btn, termValue) {
    selectedTerm = termValue;
    
    const existingId = `section-${selectedGrade}-${selectedTerm}`;
    const targetSection = document.getElementById(existingId);

    if (targetSection) {
        // 【またぎ選択対応】すでに画面に出ているグループのボタンをもう一度押した場合は、そのグループを消す（トグル動作）
        btn.classList.remove("active");
        
        // 選択中データ（selectedKanji）から、このグループの漢字をすべて削除
        const filtered = kanjiData.filter(k => k.grade === selectedGrade && k.term === selectedTerm);
        filtered.forEach(k => {
            selectedKanji = selectedKanji.filter(x => x !== k);
        });
        
        targetSection.remove();
        
        // もし画面に漢字リストが一つもなくなったら、エリアごと非表示にする
        const container = document.getElementById("kanji-sections");
        if (container.children.length === 0) {
            document.getElementById("kanji-container").style.display = "none";
            document.getElementById("start-button").style.display = "none";
        }
    } else {
        // まだ画面に出ていないグループなら、ボタンをオレンジにしてリストを追加する
        btn.classList.add("active");
        addKanjiSection();
    }
}

function addKanjiSection() {
    const container = document.getElementById("kanji-sections");
    document.getElementById("kanji-container").style.display = "block";
    document.getElementById("start-button").style.display = "inline-block";

    const existingId = `section-${selectedGrade}-${selectedTerm}`;

    // データベース（kanjiData）から、選択された「学年」と「term」に完全一致するものを探す
    const filtered = kanjiData.filter(k => k.grade === selectedGrade && k.term === selectedTerm);
    if (filtered.length === 0) {
        alert("データがありません");
        return;
    }

    const section = document.createElement("div");
    section.id = existingId;
    section.style.marginBottom = "30px"; // グループごとの隙間を作って見やすくする
    
    const heading = document.createElement("div");
    heading.className = "term-heading";
    
    // 左側に配置する個別の「リストをリセット」ボタン
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "リストをリセット";
    clearBtn.style.fontSize = "12px";
    clearBtn.style.padding = "5px 10px";
    clearBtn.style.background = "#ef5350";
    clearBtn.style.color = "white";
    clearBtn.style.margin = "0";
    
    // 中央のテキスト表示の切り替え
    const titleSpan = document.createElement("span");
    if (selectedGrade === 7) {
        const found = chugakuTerms.find(t => t.value === selectedTerm);
        titleSpan.innerHTML = `＜ 中学校 ${found ? found.label : ""} ＞`;
    } else {
        titleSpan.innerHTML = `＜ ${selectedGrade}年生 ${selectedTerm}学期 ＞`;
    }
    
    // 右側に配置する「ぜんぶえらぶ」ボタン
    const allBtn = document.createElement("button");
    allBtn.textContent = selectedGrade === 7 ? "この行をぜんぶえらぶ" : "この学期をぜんぶえらぶ";
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

    // 「ぜんぶえらぶ」を押したときの処理
    allBtn.onclick = () => {
        sectionButtons.forEach(item => {
            if (!item.element.classList.contains("selected")) {
                item.element.classList.add("selected");
                selectedKanji.push(item.data);
            }
        });
    };

    // 個別の「リストをリセット」を押したときの処理
    clearBtn.onclick = () => {
        filtered.forEach(k => {
            selectedKanji = selectedKanji.filter(x => x !== k);
        });
        section.remove();
        
        // 対応するステップ②のボタンのオレンジ色（active）を消す
        const parent = document.getElementById("term-select");
        const termBtn = parent.querySelector(`.term-btn[data-term="${selectedTerm}"]`);
        if (termBtn) termBtn.classList.remove("active");
        
        if (container.children.length === 0) {
            document.getElementById("kanji-container").style.display = "none";
            document.getElementById("start-button").style.display = "none";
        }
    };

    heading.appendChild(clearBtn);
    heading.appendChild(titleSpan);
    heading.appendChild(allBtn);
    
    section.appendChild(heading);
    section.appendChild(row);
    container.appendChild(section);
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
