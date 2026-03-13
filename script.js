// 漢字データ（将来的に外部JSやJSONにするのがおすすめ）
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
let gridCells = [];

const baseSize = 450; // グリッドの基準サイズを450pxに縮小

// 初期化などは前回と同様のため省略（ロジックの肝となる部分のみ更新）

function splitKanji(kanji) {
    const size = baseSize / gridSize;
    const pieces = [];
    const base = document.createElement("canvas");
    base.width = baseSize; base.height = baseSize;
    const ctx = base.getContext("2d");
    
    // 漢字のサイズも基準サイズに合わせて調整
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

function enableDrag(el) {
    let dragging = false;

    el.addEventListener("pointerdown", e => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.style.position = "fixed";
        el.style.zIndex = 1000;
        
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

function updatePosition(el, e) {
    const rect = el.getBoundingClientRect();
    // 指やマウスの真下に中心が来るように配置
    el.style.left = (e.clientX - rect.width / 2) + "px";
    el.style.top = (e.clientY - rect.height / 2) + "px";
}

function snap(el) {
    const elRect = el.getBoundingClientRect();
    const elCenter = { x: elRect.left + elRect.width / 2, y: elRect.top + elRect.height / 2 };
    
    let bestIndex = -1;
    let minDistance = 80; // サイズ縮小に合わせて吸着感度を調整

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

        el.style.position = "absolute";
        el.style.left = (cellRect.left - containerRect.left) + "px";
        el.style.top = (cellRect.top - containerRect.top) + "px";
        el.classList.remove("piece-small");
        el.classList.add("piece-large");
        el.dropIndex = bestIndex;
        document.getElementById("grid-container").appendChild(el);
    } else {
        el.style.position = "relative";
        el.style.left = "0"; el.style.top = "0";
        el.classList.add("piece-small");
        el.classList.remove("piece-large");
        el.dropIndex = undefined;
        document.getElementById("parts-area").appendChild(el);
    }
    checkAnswer();
}

// 読み込み・次への処理は前回と同様
