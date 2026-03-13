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
    { kanji: "風", grade: 2, term: 1, reading: "かぜ・ふう", words: ["そよ風", "たい風"] },
    { kanji: "元", grade: 2, term: 1, reading: "げん・もと", words: ["元気", "元どおり"] },
    { kanji: "読", grade: 2, term: 1, reading: "よ(む)・どく", words: ["本を読む", "読書"] },
    { kanji: "言", grade: 2, term: 1, reading: "い(う)・げん", words: ["言いわけ", "はつ言する"] },
    { kanji: "光", grade: 2, term: 1, reading: "ひかり・こう", words: ["日光", "光るたま"] },
    { kanji: "話", grade: 2, term: 1, reading: "はなし・はな(す)・わ", words: ["お話", "かい話する"] },
    { kanji: "丸", grade: 2, term: 1, reading: "まる・がん", words: ["花丸", "せいろ丸"] },
    { kanji: "声", grade: 2, term: 1, reading: "こえ・せい", words: ["大声", "声りょう"] },
    { kanji: "行", grade: 2, term: 1, reading: "い(く)・こう", words: ["行き先", "しん行する"] },
    { kanji: "分", grade: 2, term: 1, reading: "わ（ける)・ぶん", words: ["はん分こ", "いみが分かる"] },
    { kanji: "記", grade: 2, term: 1, reading: "き", words: ["日記", ""] },
    { kanji: "書", grade: 2, term: 1, reading: "か(く)・しょ", words: ["書きかた", "書しゃ"] },
    { kanji: "方", grade: 2, term: 1, reading: "ほう・かた", words: ["手のなる方へ", "夕方"] },
    { kanji: "作", grade: 2, term: 1, reading: "つく(る)・さく", words: ["おもちゃ作り", "作文"] },
    { kanji: "点", grade: 2, term: 1, reading: "てん", words: ["百点", "十点"] },
    { kanji: "線", grade: 2, term: 1, reading: "せん", words: ["線を引く", "白線"] },
    { kanji: "画", grade: 2, term: 1, reading: "が", words: ["図画工作", "絵画"] },
    { kanji: "数", grade: 2, term: 1, reading: "かず・すう", words: ["算数", "数える"] },
    { kanji: "聞", grade: 2, term: 1, reading: "き(く)・ぶん", words: ["はなしを聞く", "しん聞を読む"] },
    { kanji: "何", grade: 2, term: 1, reading: "なに・なん", words: ["何かある", "何時ですか"] },
    { kanji: "考", grade: 2, term: 1, reading: "かんが(える)・こう", words: ["考える", "思考する"] },
    { kanji: "夜", grade: 2, term: 1, reading: "よる・や", words: ["くらい夜", "しん夜0時"] },
    { kanji: "間", grade: 2, term: 1, reading: "あいだ・かん", words: ["いすの間", "時間"] },
    { kanji: "多", grade: 2, term: 1, reading: "おお(い)・た", words: ["多め", "多分ちがう"] },
    { kanji: "少", grade: 2, term: 1, reading: "すく(ない)・しょう", words: ["少な目", "こしょう少々"] },
    { kanji: "毛", grade: 2, term: 1, reading: "け・もう", words: ["まつ毛", "体毛"] },
    { kanji: "当", grade: 2, term: 1, reading: "あ(たる)・とう", words: ["まと当て", "当せんする"] },
    { kanji: "時", grade: 2, term: 1, reading: "とき・じ", words: ["時どき", "3時のおやつ"] },
    { kanji: "活", grade: 2, term: 1, reading: "かつ", words: ["生活", "活力"] },
    { kanji: "科", grade: 2, term: 1, reading: "か", words: ["生活科", "理科室"] },
    { kanji: "来", grade: 2, term: 1, reading: "く(る)・らい", words: ["人が来る", "み来のこと"] },
    { kanji: "門", grade: 2, term: 1, reading: "もん", words: ["学校の正門", "門がまえ"] },
    { kanji: "回", grade: 2, term: 1, reading: "まわ(る)・かい", words: ["くるくる回る", "回てんずし"] },
    { kanji: "高", grade: 2, term: 1, reading: "たか(い)・こう", words: ["高い高い", "高校生"] },
    { kanji: "黄", grade: 2, term: 1, reading: "き", words: ["黄色", "黄みどり色"] },
    { kanji: "色", grade: 2, term: 1, reading: "いろ", words: ["色いろある", "茶色"] },
    { kanji: "外", grade: 2, term: 1, reading: "そと・がい", words: ["線より外", "外国"] },
    { kanji: "国", grade: 2, term: 1, reading: "くに・こく", words: ["国をしらべる", "中国"] },
    { kanji: "地", grade: 2, term: 1, reading: "ち・じ", words: ["地めん", "あれ地"] },
    { kanji: "前", grade: 2, term: 1, reading: "まえ・ぜん", words: ["前へならえ", "前回のあらすじ"] },
    { kanji: "野", grade: 2, term: 1, reading: "の・や", words: ["野原", "野きゅう"] },
    { kanji: "原", grade: 2, term: 1, reading: "はら", words: ["原っぱ", ""] },
    { kanji: "頭", grade: 2, term: 1, reading: "あたま・とう", words: ["頭をぶつける", "牛が1頭いる"] },
    { kanji: "答", grade: 2, term: 1, reading: "こた(える)・とう", words: ["答え合わせ", "かい答する"] },
    { kanji: "牛", grade: 2, term: 1, reading: "うし・ぎゅう", words: ["牛のもよう", "牛にゅう"] },
    { kanji: "場", grade: 2, term: 1, reading: "ば・じょう", words: ["場しょ", "うんどう場"] },
    { kanji: "会", grade: 2, term: 1, reading: "あ(う）・かい", words: ["あさの会", "人と会う"] },
    { kanji: "思", grade: 2, term: 1, reading: "おも(う)", words: ["わたしはこう思う", ""] },
    { kanji: "今", grade: 2, term: 1, reading: "いま・こん", words: ["今しかない", "今どあそぼう"] },
    { kanji: "社", grade: 2, term: 1, reading: "しゃ", words: ["会社ではたらく", ""] },
    { kanji: "親", grade: 2, term: 1, reading: "おや・しん", words: ["親子", "りょう親"] },
    { kanji: "友", grade: 2, term: 1, reading: "とも・ゆう", words: ["友だち", "友人"] },
    { kanji: "明", grade: 2, term: 1, reading: "あか(るい)・めい", words: ["明るい色", "しょう明する"] },
    { kanji: "計", grade: 2, term: 1, reading: "けい", words: ["計算", "計そくする"] },
    { kanji: "算", grade: 2, term: 1, reading: "さん", words: ["算数", "あん算で答える"] },
    { kanji: "組", grade: 2, term: 1, reading: "くみ・く(む)", words: ["8組", "組み立てる"] },
    { kanji: "家", grade: 2, term: 1, reading: "いえ・や", words: ["わたしの家", "大家さん"] },
    { kanji: "自", grade: 2, term: 1, reading: "じ", words: ["自分", "自こしょうかい"] },
    { kanji: "心", grade: 2, term: 1, reading: "こころ・しん", words: ["こころがいたい", "中心に立つ"] },
    { kanji: "教", grade: 2, term: 1, reading: "おし(える)・きょう", words: ["字を教える", "教しつ"] },
    { kanji: "園", grade: 2, term: 1, reading: "えん", words: ["ようち園", "ほいく園"] },
    { kanji: "知", grade: 2, term: 1, reading: "し(る)・ち", words: ["知り合い", "知しき"] },
    { kanji: "体", grade: 2, term: 1, reading: "からだ・たい", words: ["体がかたい", "体いく"] },
    { kanji: "長", grade: 2, term: 1, reading: "なが（い)・ちょう", words: ["長さ", "体長39㎝"] },
    { kanji: "太", grade: 2, term: 1, reading: "ふと(い)", words: ["太まき", "太る"] },
    { kanji: "肉", grade: 2, term: 1, reading: "にく", words: ["牛肉", "とり肉"] },
    { kanji: "同", grade: 2, term: 1, reading: "おな(じ)・どう", words: ["同い年", "同学年"] },

    
    // --- 2年 2学期 ---
     { kanji: "合", grade: 2, term: 2, reading: "あ(う）・ごう", words: ["リズムを合わせる", "合かくする"] },
    { kanji: "楽", grade: 2, term: 2, reading: "らく・がく", words: ["ごく楽", "楽きでえんそう"] },
    { kanji: "雪", grade: 2, term: 2, reading: "ゆき", words: ["雪合せん", ""] },
    { kanji: "顔", grade: 2, term: 2, reading: "かお・がん", words: ["え顔", "顔めん"] },
    { kanji: "食", grade: 2, term: 2, reading: "た(べる)・しょく", words: ["食べすぎ", "夕食"] },
    { kanji: "歩", grade: 2, term: 2, reading: "ある(く)・ほ", words: ["山歩き", "はじめの1歩"] },
    { kanji: "走", grade: 2, term: 2, reading: "はし(る)・そう", words: ["走りません", "50m走"] },
    { kanji: "止", grade: 2, term: 2, reading: "と(まる)・し", words: ["赤しんごうは止まれ", "中止する"] },
    { kanji: "弟", grade: 2, term: 2, reading: "おとうと", words: ["私の弟", ""] },
    { kanji: "妹", grade: 2, term: 2, reading: "いもうと", words: ["ぼくの妹", ""] },
    { kanji: "万", grade: 2, term: 2, reading: "まん", words: ["一万円", ""] },
    { kanji: "切", grade: 2, term: 2, reading: "き(る)・せつ", words: ["かみを切る", "切だんする"] },
    { kanji: "才", grade: 2, term: 2, reading: "さい", words: ["8才になる", "天才"] },
    { kanji: "語", grade: 2, term: 2, reading: "かた(る)・ご", words: ["国語", "物語"] },
    { kanji: "台", grade: 2, term: 2, reading: "だい", words: ["じっけん台", "すべり台"] },
    { kanji: "絵", grade: 2, term: 2, reading: "え・かい", words: ["絵をかく", "絵画"] },
    { kanji: "広", grade: 2, term: 2, reading: "ひろ(い)・こう", words: ["広場", "広大"] },
    { kanji: "図", grade: 2, term: 2, reading: "ず", words: ["図工", "地図"] },
    { kanji: "工", grade: 2, term: 2, reading: "こう", words: ["工作", "工場ではたらく"] },
    { kanji: "北", grade: 2, term: 2, reading: "きた・ほく", words: ["北風", "北きょく"] },
    { kanji: "近", grade: 2, term: 2, reading: "ちか(い)・きん", words: ["顔が近い", "近じょの人"] },
    { kanji: "引", grade: 2, term: 2, reading: "ひ(く)・いん", words: ["線を引く", "引力"] },
    { kanji: "後", grade: 2, term: 2, reading: "あと・ご", words: ["まつりの後", "前後する"] },
    { kanji: "形", grade: 2, term: 2, reading: "かたち・けい", words: ["まるい形", "四角形"] },
    { kanji: "内", grade: 2, term: 2, reading: "うち・ない", words: ["内がわ", "内よう"] },
    { kanji: "海", grade: 2, term: 2, reading: "うみ・かい", words: ["海びらき", "海水よく"] },
    { kanji: "新", grade: 2, term: 2, reading: "あたら(しい)・しん・あら(た)", words: ["新しい", "新学き"] },
    { kanji: "強", grade: 2, term: 2, reading: "つよ(い)・きょう", words: ["強い虫", "強力なのり"] },
    { kanji: "鳴", grade: 2, term: 2, reading: "な(る)・めい", words: ["とりが鳴く", "ひ鳴がきこえる"] },
    { kanji: "雲", grade: 2, term: 2, reading: "くも・うん", words: ["白い雲", "せきらん雲"] },
    { kanji: "晴", grade: 2, term: 2, reading: "は(れる)・せい", words: ["天気は晴れ", "晴天"] },
    { kanji: "船", grade: 2, term: 2, reading: "ふね・せん", words: ["大きな船", "ぎょ船"] },
    { kanji: "店", grade: 2, term: 2, reading: "みせ・てん", words: ["出店", "ほうせき店"] },
    { kanji: "冬", grade: 2, term: 2, reading: "ふゆ・とう", words: ["冬休み", ""] },
    { kanji: "朝", grade: 2, term: 2, reading: "あさ・ちょう", words: ["朝休み", "朝食"] },
    { kanji: "週", grade: 2, term: 2, reading: "しゅう", words: ["週よてい", "2週かん"] },
    { kanji: "市", grade: 2, term: 2, reading: "いち・し", words: ["市場", "東近江市"] },
    { kanji: "茶", grade: 2, term: 2, reading: "ちゃ", words: ["茶色", "お茶"] },
    { kanji: "春", grade: 2, term: 2, reading: "はる", words: ["春休み", ""] },
    { kanji: "角", grade: 2, term: 2, reading: "かど・つの", words: ["しかの角", "まち角"] },
    { kanji: "夏", grade: 2, term: 2, reading: "なつ", words: ["夏休み", ""] },
    { kanji: "秋", grade: 2, term: 2, reading: "あき", words: ["秋まつり", ""] },
    { kanji: "東", grade: 2, term: 2, reading: "ひがし・とう", words: ["東に歩く", "東京"] },
    { kanji: "南", grade: 2, term: 2, reading: "みなみ・なん", words: ["南はあたたかい", "南きょく"] },
    { kanji: "西", grade: 2, term: 2, reading: "にし・せい", words: ["西村さん", ""] },
    { kanji: "父", grade: 2, term: 2, reading: "ちち・とう(さん)", words: ["お父さん", "父親"] },
    { kanji: "母", grade: 2, term: 2, reading: "はは・かあ(さん)", words: ["お母さん", "母親"] },
    { kanji: "兄", grade: 2, term: 2, reading: "あに・にい(さん）", words: ["お兄ちゃん", "兄と遊ぶ"] },
    { kanji: "姉", grade: 2, term: 2, reading: "あね・ねえ(さん)", words: ["お姉ちゃん", "姉とつくる"] },
    { kanji: "昼", grade: 2, term: 2, reading: "ひる・ちゅう", words: ["昼休み", "昼食"] },
    { kanji: "紙", grade: 2, term: 2, reading: "かみ・し", words: ["紙しばい", "画よう紙"] },
    { kanji: "室", grade: 2, term: 2, reading: "しつ", words: ["教室", ""] },
    { kanji: "売", grade: 2, term: 2, reading: "う(る)・ばい", words: ["マッチ売り", "はん売する"] },
    { kanji: "買", grade: 2, term: 2, reading: "か(う)・ばい", words: ["お買いもの", "買しゅうする"] },
    { kanji: "道", grade: 2, term: 2, reading: "みち・どう", words: ["道ろ", "あぜ道"] },
    { kanji: "米", grade: 2, term: 2, reading: "こめ・まい", words: ["お米", "おうみ米"] },
    { kanji: "歌", grade: 2, term: 2, reading: "うた・か", words: ["歌合せん", "えん歌をきく"] },
    { kanji: "戸", grade: 2, term: 2, reading: "と", words: ["戸じまり", ""] },
    { kanji: "曜", grade: 2, term: 2, reading: "よう", words: ["日曜日", "木曜日"] },
    { kanji: "午", grade: 2, term: 2, reading: "ご", words: ["午前", "午後"] },
    { kanji: "谷", grade: 2, term: 2, reading: "たに", words: ["山と谷", ""] },
    { kanji: "岩", grade: 2, term: 2, reading: "いわ・がん", words: ["大きな岩", "岩石"] },
    { kanji: "池", grade: 2, term: 2, reading: "いけ", words: ["小さな池", ""] },
    { kanji: "鳥", grade: 2, term: 2, reading: "とり・ちょう", words: ["小鳥", "白鳥"] },
    { kanji: "馬", grade: 2, term: 2, reading: "うま・ば", words: ["お馬さん", "馬じゅつ"] },
    { kanji: "首", grade: 2, term: 2, reading: "くび", words: ["ろくろ首", ""] },
    { kanji: "番", grade: 2, term: 2, reading: "ばん", words: ["当番", "番号"] },

    
    // --- 2年 3学期 ---
      { kanji: "魚", grade: 2, term: 3, reading: "さかな・ぎょ", words: ["お魚", "金魚"] },
    { kanji: "電", grade: 2, term: 3, reading: "でん", words: ["電話", "電気"] },
    { kanji: "細", grade: 2, term: 3, reading: "ほそ(い)", words: ["細道", "線が細い"] },
    { kanji: "通", grade: 2, term: 3, reading: "とお(る)・つう", words: ["通りぬける", "通行する"] },
    { kanji: "汽", grade: 2, term: 3, reading: "き", words: ["汽車ぽっぽ", ""] },
    { kanji: "刀", grade: 2, term: 3, reading: "かたな・とう", words: ["刀をしまう", "日本刀"] },
    { kanji: "弓", grade: 2, term: 3, reading: "ゆみ", words: ["弓をもつ", ""] },
    { kanji: "矢", grade: 2, term: 3, reading: "や", words: ["矢をはなつ", ""] },
    { kanji: "直", grade: 2, term: 3, reading: "なお(す)・ちょく", words: ["字を直す", "日直さん"] },
    { kanji: "里", grade: 2, term: 3, reading: "さと・り", words: ["里がえり", "10里はなれた村"] },
    { kanji: "寺", grade: 2, term: 3, reading: "てら・じ", words: ["ふるい寺", "東大寺"] },
    { kanji: "黒", grade: 2, term: 3, reading: "くろ・こく", words: ["黒いふく", "黒ばんけし"] },
    { kanji: "弱", grade: 2, term: 3, reading: "よわ(い)・じゃく", words: ["弱虫", "弱点"] },
    { kanji: "遠", grade: 2, term: 3, reading: "とお(い)・えん", words: ["遠足", "遠回り"] },
    { kanji: "古", grade: 2, term: 3, reading: "ふる(い)・こ", words: ["古本", "古米"] },
    { kanji: "半", grade: 2, term: 3, reading: "はん", words: ["半分", ""] },
    { kanji: "公", grade: 2, term: 3, reading: "こう", words: ["公園", ""] },
    { kanji: "理", grade: 2, term: 3, reading: "り", words: ["りょう理する", ""] },
    { kanji: "用", grade: 2, term: 3, reading: "よう", words: ["用じがある", ""] },
    { kanji: "毎", grade: 2, term: 3, reading: "まい", words: ["毎日", "毎回"] },
    { kanji: "帰", grade: 2, term: 3, reading: "かえ(る)・き", words: ["家に帰る", "帰たくする"] },
    { kanji: "羽", grade: 2, term: 3, reading: "はね", words: ["鳥の羽", ""] },
    { kanji: "京", grade: 2, term: 3, reading: "きょう", words: ["京都", ""] },
    { kanji: "麦", grade: 2, term: 3, reading: "むぎ", words: ["小麦こ", ""] },
    { kanji: "交", grade: 2, term: 3, reading: "こう・ま(ざる)", words: ["交番", "あそびに交ざる"] },
    { kanji: "星", grade: 2, term: 3, reading: "ほし・せい", words: ["ながれ星", "火星人"] },


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
