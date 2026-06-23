let selectedGrade = null;
let selectedTerm = null;
let selectedKanji = []; // 選んだすべての漢字を保持
let gridSize = 2;
let questionCount = 5;
let currentQuestion = 0;
let questionList = [];
let gridCells = [];
const baseSize = 430; // パズル台の内寸(450 - padding20)に最適化

// 中学生用の正しい10行見出し定義
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
                
                // すでにこの行のリストが画面（kanji-sections）に存在していればボタンをオレンジにする
                const existingId = `section-${selectedGrade}-${idx + 1}`;
                if (document.getElementById(existingId)) {
                    tBtn.classList.add("active");
                }

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
                
                // すでにこの学期のリストが画面（kanji-sections）に存在していればボタンをオレンジにする
                const existingId = `section-${selectedGrade}-${num}`;
                if (document.getElementById(existingId)) {
                    tBtn.classList.add("active");
                }

                tBtn.onclick = () => handleTermClick(tBtn, num);
                termSelect.appendChild(tBtn);
            });
        }
    };
});

// ② 学期・行ボタンがクリックされた時の処理
function handleTermClick(btn, termValue) {
    selectedTerm = termValue;
    const existingId = `section-${selectedGrade}-${selectedTerm}`;
    const targetSection = document.getElementById(existingId);

    if (targetSection) {
        // すでに画面にリストがある状態で、もう一度ボタンが押されたらそのグループを削除
        removeSectionData(selectedGrade, selectedTerm);
        targetSection.remove();
        btn.classList.remove("active");
        checkContainerVisibility();
    } else {
        // 新しい学期・行が押されたら追加
        btn.classList.add("active");
        addKanjiSection();
    }
}

// 特定の学年・学期の漢字データを一括して選択解除する共通処理
function removeSectionData(grade, term) {
    const filtered = kanjiData.filter(k => k.grade === grade && k.term === term);
    filtered.forEach(k => {
        selectedKanji = selectedKanji.filter(x => x.kanji !== k.kanji);
    });
}

// リストがすべて空になったかチェックして表示を切り替える処理
function checkContainerVisibility() {
    const container = document.getElementById("kanji-sections");
    if (container.children.length === 0) {
        document.getElementById("kanji-container").style.display = "none";
        document.getElementById("start-button").style.display = "none";
    }
}

// 漢字リストを画面に追加・生成する処理
function addKanjiSection() {
    const container = document.getElementById("kanji-sections");
    document.getElementById("kanji-container").style.display = "block";
    document.getElementById("start-button").style.display = "inline-block";

    const existingId = `section-${selectedGrade}-${selectedTerm}`;
    
    if (document.getElementById(existingId)) return;

    const filtered = kanjiData.filter(k => k.grade === selectedGrade && k.term === selectedTerm);
    
    if (filtered.length === 0) {
        alert("データがありません");
        return;
    }

    const section = document.createElement("div");
    section.id = existingId;
    section.style.marginBottom = "30px";
    
    // スコープを固定するために現在の学年・学期を内側に記憶させておく
    const sectionGrade = selectedGrade;
    const sectionTerm = selectedTerm;

    // ヘッダー（左ボタン ＋ 見出し ＋ 右ボタン）
    const heading = document.createElement("div");
    heading.className = "term-heading";
    
    // 【新規実装】左側：このリストを個別に消去するボタン
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-section-btn";
    deleteBtn.textContent = "× リストをけす";
    deleteBtn.onclick = () => {
        // 1. データからこのグループの選択を解除
        removeSectionData(sectionGrade, sectionTerm);
        // 2. 画面からこのリストの塊をごそっと消去
        section.remove();
        // 3. もし現在同じ学年の画面を開いていたら、上の該当学期ボタンのオレンジ（active）も連動して消す
        if (selectedGrade === sectionGrade) {
            const termButtons = document.querySelectorAll(".term-btn");
            termButtons.forEach(b => {
                if (parseInt(b.dataset.term) === sectionTerm) {
                    b.classList.remove("active");
                }
            });
        }
        // 4. 全部消えたかチェック
        checkContainerVisibility();
    };
    heading.appendChild(deleteBtn);
    
    // 中央：見出しタイトル
    const titleSpan = document.createElement("span");
    if (sectionGrade === 7) {
        titleSpan.textContent = `中学生 ${chungakuRows[sectionTerm - 1]}`;
    } else {
        titleSpan.textContent = `${sectionGrade}年生 ${sectionTerm}学期`;
    }
    heading.appendChild(titleSpan);

    // 右側：まとめて選択/解除ボタン
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "select-toggle-btn";
    toggleBtn.textContent = "すべてえらぶ";

    toggleBtn.onclick = () => {
        const rowButtons = row.querySelectorAll(".kanji-btn");
        const allSelected = Array.from(rowButtons).every(b => b.classList.contains("selected"));
        
        if (allSelected) {
            rowButtons.forEach(b => b.classList.remove("selected"));
            filtered.forEach(k => {
                selectedKanji = selectedKanji.filter(x => x.kanji !== k.kanji);
            });
            toggleBtn.textContent = "すべてえらぶ";
        } else {
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
    
    // 漢字を並べるグリッド行
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
            
            const currentRows = row.querySelectorAll(".kanji-btn");
            const isAll = Array.from(currentRows).every(b => b.classList.contains("selected"));
            toggleBtn.textContent = isAll ? "はずす" : "すべてえらぶ";
        };
        row.appendChild(btn);
    });

    const isAllInit = filtered.every(k => selectedKanji.some(x => x.kanji === k.kanji));
    if (isAllInit && filtered.length > 0) toggleBtn.textContent = "はずす";

    section.appendChild(heading);
    section.appendChild(row);
    container.appendChild(section);
}

// リストをリセット（すべての選択と表示をクリア）
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

// 「えらびなおす」ボタン（トップページに戻る）
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
    document
