// data.js
const kanjiData = [
    // ==========================================
    // 1年生
    // ==========================================

    
    // --- 1年 2学期 ---
    { kanji: "一", grade: 1, term: 2, reading: "いち・ひと(つ)", words: ["一人", "一がつ"] },
    { kanji: "二", grade: 1, term: 2, reading: "に・ふた(つ)", words: ["二まい", "二つ"] },
    { kanji: "三", grade: 1, term: 2, reading: "さん・みっ(つ)", words: ["三ほん", "三つ"] },
    { kanji: "四", grade: 1, term: 2, reading: "よん・し・よっ(つ)", words: ["四ひき", "四つば"] },
    { kanji: "五", grade: 1, term: 2, reading: "ご・いつ(つ)", words: ["五円", "五つ"] },
    { kanji: "六", grade: 1, term: 2, reading: "ろく・むっ(つ)", words: ["六人", "六か"] },
    { kanji: "七", grade: 1, term: 2, reading: "しち・なな", words: ["七くさ", "七人"] },
    { kanji: "八", grade: 1, term: 2, reading: "はち・やっ(つ）", words: ["八ぽん", "八日"] },
    { kanji: "九", grade: 1, term: 2, reading: "きゅう・く・ここの(つ)", words: ["九人", "九日"] },
    { kanji: "十", grade: 1, term: 2, reading: "じゅう・じっ・とお", words: ["十円", "十日"] },
    { kanji: "山", grade: 1, term: 2, reading: "やま・さん", words: ["ふじ山", "山のぼり"] },
    { kanji: "木", grade: 1, term: 2, reading: "き", words: ["木のぼり", "さくらの木"] },
    { kanji: "川", grade: 1, term: 2, reading: "かわ", words: ["小川", "のと川"] },
    { kanji: "目", grade: 1, term: 2, reading: "め・もく", words: ["目げき", "目だま"] },
    { kanji: "月", grade: 1, term: 2, reading: "つき・がつ・げつ", words: ["お月さま", "10月"] },
    { kanji: "上", grade: 1, term: 2, reading: "うえ・じょう", words: ["上ぐつ", "上がくねん"] },
    { kanji: "下", grade: 1, term: 2, reading: "した・げ", words: ["下じき", "下すい"] },
    { kanji: "中", grade: 1, term: 2, reading: "なか・ちゅう", words: ["中やすみ", "中がっこう"] },
    { kanji: "大", grade: 1, term: 2, reading: "だい・おお(きい)", words: ["大なわとび", "大こん"] },
    { kanji: "入", grade: 1, term: 2, reading: "にゅう・はい(る)", words: ["入がく", "入りぐち"] },
    { kanji: "犬", grade: 1, term: 2, reading: "いぬ・けん", words: ["こ犬", "もうどう犬"] },
    { kanji: "小", grade: 1, term: 2, reading: "しょう・ちい(さい)", words: ["小さい", "小がっこう"] },
    { kanji: "白", grade: 1, term: 2, reading: "しろ・はく", words: ["白くま", "白さい"] },
    { kanji: "出", grade: 1, term: 2, reading: "しゅつ・で(る)", words: ["出ぱつ", "げんきが出る"] },
    { kanji: "力", grade: 1, term: 2, reading: "ちから・りき・りょく", words: ["力もち", "きょう力する"] },
    { kanji: "見", grade: 1, term: 2, reading: "み(る)・けん", words: ["見る", "見がくする"] },
    { kanji: "先", grade: 1, term: 2, reading: "さき・せん", words: ["先生", "先まわり"] },
    { kanji: "生", grade: 1, term: 2, reading: "い(きる)・せい・う(まれる）", words: ["生きもの", "3月生まれ"] },
    { kanji: "気", grade: 1, term: 2, reading: "き", words: ["気もち", "やる気"] },
    { kanji: "日", grade: 1, term: 2, reading: "にち・ひ・び", words: ["日よう日", "お日さま"] },
    { kanji: "火", grade: 1, term: 2, reading: "ひ・か", words: ["火おこし", "火よう日"] },
    { kanji: "水", grade: 1, term: 2, reading: "みず・すい", words: ["しお水", "こう水"] },
    { kanji: "金", grade: 1, term: 2, reading: "かね・きん", words: ["お金", "金いろ"] },
    { kanji: "土", grade: 1, term: 2, reading: "つち・ど", words: ["土あそび", "土よう日"] },
    { kanji: "花", grade: 1, term: 2, reading: "はな", words: ["お花", ""] },
    { kanji: "文", grade: 1, term: 2, reading: "ぶん", words: ["文しょう", "さく文"] },
    { kanji: "音", grade: 1, term: 2, reading: "おと・おん", words: ["音がく", "あし音"] },
    { kanji: "町", grade: 1, term: 2, reading: "まち・ちょう", words: ["町ないかい", "おおきな町"] },
    { kanji: "字", grade: 1, term: 2, reading: "じ", words: ["きれいな字", "しゅう字"] },
    { kanji: "人", grade: 1, term: 2, reading: "ひと・にん・じん", words: ["三人", "日本人"] },
    { kanji: "休", grade: 1, term: 2, reading: "やす(む)・きゅう", words: ["ひる休み", "休日"] },
    { kanji: "車", grade: 1, term: 2, reading: "くるま・しゃ", words: ["大きな車", "じどう車"] },
    { kanji: "本", grade: 1, term: 2, reading: "ほん", words: ["本やさん", "日本人"] },
    { kanji: "学", grade: 1, term: 2, reading: "まな(ぶ)・がく", words: ["学校", "学しゅう"] },
    { kanji: "校", grade: 1, term: 2, reading: "こう", words: ["学校", "校しゃ"] },
    { kanji: "手", grade: 1, term: 2, reading: "て・しゅ", words: ["手のひら", "あく手"] },
    { kanji: "赤", grade: 1, term: 2, reading: "あか", words: ["赤いふく", ""] },
    { kanji: "青", grade: 1, term: 2, reading: "あお", words: ["青いそら", ""] },
    { kanji: "名", grade: 1, term: 2, reading: "な", words: ["名まえ", "名ふだ"] },
    { kanji: "立", grade: 1, term: 2, reading: "た(つ)", words: ["立ち上がる", ""] },
    { kanji: "口", grade: 1, term: 2, reading: "くち", words: ["わる口", "ひと口"] },
    { kanji: "耳", grade: 1, term: 2, reading: "みみ", words: ["大きな耳", ""] },
    { kanji: "女", grade: 1, term: 2, reading: "おんな・じょ", words: ["女の子", "女子"] },
    { kanji: "子", grade: 1, term: 2, reading: "こ・し", words: ["子ども", ""] },
    { kanji: "男", grade: 1, term: 2, reading: "おとこ・だん", words: ["男の子", "男子"] },
    { kanji: "年", grade: 1, term: 2, reading: "ねん・とし", words: ["一年生", "よいお年を"] },

    
    // --- 1年 3学期 ---
    { kanji: "村", grade: 1, term: 3, reading: "むら・そん", words: ["小さな村", "のう村"] },
    { kanji: "早", grade: 1, term: 3, reading: "はや(い)・そう", words: ["早おき", "早たい"] },
    { kanji: "足", grade: 1, term: 3, reading: "あし", words: ["足あと", ""] },
    { kanji: "右", grade: 1, term: 3, reading: "みぎ・う", words: ["右手", "右せつ"] },
    { kanji: "左", grade: 1, term: 3, reading: "ひだり・さ", words: ["左足", "左せつ"] },
    { kanji: "田", grade: 1, term: 3, reading: "た・でん", words: ["田んぼ", "田がく"] },
    { kanji: "千", grade: 1, term: 3, reading: "せん", words: ["千円", "千人"] },
    { kanji: "百", grade: 1, term: 3, reading: "ひゃく", words: ["百円", "百こ"] },
    { kanji: "円", grade: 1, term: 3, reading: "えん", words: ["十円", "五円"] },
    { kanji: "貝", grade: 1, term: 3, reading: "かい", words: ["貝がら", ""] },
    { kanji: "糸", grade: 1, term: 3, reading: "いと", words: ["け糸", ""] },
    { kanji: "林", grade: 1, term: 3, reading: "はやし", words: ["小林さん", "林のおく"] },
    { kanji: "石", grade: 1, term: 3, reading: "いし", words: ["石ころ", "まるい石"] },
    { kanji: "玉", grade: 1, term: 3, reading: "たま", words: ["ビー玉", "大玉ころがし"] },
    { kanji: "王", grade: 1, term: 3, reading: "おう", words: ["王さま", "こく王"] },
    { kanji: "正", grade: 1, term: 3, reading: "ただ(しい)・せい", words: ["正しい", "正かい"] },
    { kanji: "雨", grade: 1, term: 3, reading: "あめ", words: ["雨ふり", ""] },
    { kanji: "草", grade: 1, term: 3, reading: "くさ・そう", words: ["草ひき", "ざっ草"] },
    { kanji: "森", grade: 1, term: 3, reading: "もり", words: ["ふかい森", "青森"] },
    { kanji: "天", grade: 1, term: 3, reading: "てん", words: ["天気", "天ぷら"] },
    { kanji: "竹", grade: 1, term: 3, reading: "たけ・ちく", words: ["竹の子", "竹わ"] },
    { kanji: "虫", grade: 1, term: 3, reading: "むし・ちゅう", words: ["青虫", "こん虫"] },
    { kanji: "夕", grade: 1, term: 3, reading: "ゆう", words: ["夕やけ", "夕がた"] },
    { kanji: "空", grade: 1, term: 3, reading: "そら・くう", words: ["大空", "上空"] },


    // ==========================================
    // 2年生
    // ==========================================
    // --- 2年 1学期 ---
    { kanji: "引", grade: 2, term: 1, reading: "ひく", words: ["引き出し", "引用"] },
    
    // --- 2年 2学期 ---
    { kanji: "羽", grade: 2, term: 2, reading: "はね", words: ["羽毛", "一羽"] },
    
    // --- 2年 3学期 ---
    { kanji: "画", grade: 2, term: 3, reading: "が", words: ["映画", "漫画"] },

    // ==========================================
    // 3年生
    // ==========================================
    // --- 3年 1学期 ---
    { kanji: "悪", grade: 3, term: 1, reading: "あく", words: ["悪人", "悪い"] },
    
    // --- 3年 2学期 ---
    { kanji: "安", grade: 3, term: 2, reading: "あん", words: ["安心", "安い"] },
    
    // --- 3年 3学期 ---
    { kanji: "飲", grade: 3, term: 3, reading: "いん", words: ["飲料", "飲む"] },

    // ==========================================
    // 4年生
    // ==========================================
    // --- 4年 1学期 ---
    { kanji: "愛", grade: 4, term: 1, reading: "あい", words: ["愛情", "愛読"] },
    
    // --- 4年 2学期 ---
    { kanji: "案", grade: 4, term: 2, reading: "あん", words: ["案内", "試案"] },
    
    // --- 4年 3学期 ---
    { kanji: "衣", grade: 4, term: 3, reading: "い", words: ["衣服", "衣食住"] },

    // ==========================================
    // 5年生
    // ==========================================
    // --- 5年 1学期 ---
    { kanji: "圧", grade: 5, term: 1, reading: "あつ", words: ["圧力", "気圧"] },
    
    // --- 5年 2学期 ---
    { kanji: "易", grade: 5, term: 2, reading: "い", words: ["貿易", "容易"] },
    
    // --- 5年 3学期 ---
    { kanji: "河", grade: 5, term: 3, reading: "か", words: ["河川", "銀河"] },

    // ==========================================
    // 6年生
    // ==========================================
    // --- 6年 1学期 ---
    { kanji: "遺", grade: 6, term: 1, reading: "い", words: ["遺跡", "遺言"] },
    
    // --- 6年 2学期 ---
    { kanji: "恩", grade: 6, term: 2, reading: "おん", words: ["恩人", "報恩"] },
    
    // --- 6年 3学期 ---
    { kanji: "閣", grade: 6, term: 3, reading: "かく", words: ["内閣", "閣議"] }
];
