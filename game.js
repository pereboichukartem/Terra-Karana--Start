const $ = id => document.getElementById(id);

const gameContainer = document.querySelector(".game-container");
const menuContent = document.querySelector(".content");
const menuStage = document.querySelector(".stage");
const sceneFrame = $("sceneFrame");
const choicesBox = $("choices");
const dialogueBox = $("dialogueBox");
const dialogueText = $("dialogueText");
const nextBtn = $("nextBtn");
const modalName = $("modal-name");
const modalContinue = $("modal-continue");
const nameForm = $("nameForm");
const nameInput = $("nameInput");
const bgMusic = $("bg-music");
const npcContainer = $("npcContainer");
const npc1 = $("npc1");
const npc2 = $("npc2");
const npc3 = $("npc3");
const fade = $("fade");
const healthFill = $("healthFill");
const inventoryList = $("inventoryList");
const questBtn = $("questBtn");
const mapBtn = $("mapBtn");
const modalQuests = $("modal-quests");
const modalMap = $("modal-map");
const modalPause = $("modal-pause");
const modalAchievements = $("modal-achievements");
const modalSettings = $("modal-settings");
const mapWrap = $("mapWrap");
const mapPointsBox = $("mapPoints");
const mapInfo = $("mapInfo");
const mapExport = $("mapExport");
const toastEl = $("toast");
const menuBtn = document.getElementById('menuBtn');

const weaponNames = { katana: "Катана", hammer: "Молот", staff: "Посох" };
const SAVE_KEY = "terra-karana-save";

let playerName = "Майстер";
let playerWeapon = null;
let current = null;
let activeLines = [];
let lineIndex = 0;
let currentFile = "";
let waiting = false;
let showToken = 0;
let checkpoint = null;
let typing = null;
let saidEl = null;
let fullText = "";
let gamePaused = false;
let pendingAfterLines = false;
const state = { hp: 100, items: [], quests: {}, flags: {}, place: null, visited: [] };

const readSettings = () => {
    try { return JSON.parse(localStorage.getItem("terra-karana-settings") || "{}"); }
    catch { return {}; }
};

const GameMusic = (() => {
    let ctx = null;
    let isPlaying = false;
    let currentMood = null;
    let step = 0;
    let timer = null;

    const N = {
        D2: 73.42, F2: 87.31, G2: 98.00, A2: 110.00, Bb2: 116.54, C3: 130.81,
        D3: 146.83, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, C4: 261.63,
        D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, C5: 523.25, D5: 587.33
    };

    const themes = {
        arcade: {
            tempo: 150,
            wave: "sawtooth",
            bass: [N.D2, N.D2, N.F2, N.G2, N.A2, N.A2, N.G2, N.F2],
            melody: [N.D4, 0, N.F4, N.G4, N.A4, 0, N.C5, N.A4, N.G4, N.F4, N.D4, 0, N.F4, N.E4, N.D4, 0],
            drums: true
        },
        // Табір Окіно, Поле Мечів, Тренування (Самурайський дзен)
        okino: {
            tempo: 240,
            wave: "triangle",
            bass: [N.D2, 0, N.A2, 0, N.Bb2, 0, N.A2, 0],
            melody: [N.A4, 0, N.F4, N.D4, 0, N.E4, N.F4, 0, N.G4, N.A4, 0, N.Bb4, N.A4, 0, N.F4, 0],
            drums: false
        },
        // Ліс Прикрощів, Печери, Безодня, Гори Істерії (Темний містичний чіптюн)
        forest: {
            tempo: 190,
            wave: "square",
            bass: [N.D2, N.A2, N.D2, N.Bb2, N.D2, N.A2, N.G2, N.F2],
            melody: [N.D4, 0, 0, N.F4, N.E4, 0, 0, N.Bb3, N.A3, 0, 0, N.G4, N.F4, 0, N.E4, 0],
            drums: true
        },
        // Лабіринт, Динозавр, Червоний Дракон (Епічний Бос-файт)
        boss: {
            tempo: 115,
            wave: "sawtooth",
            bass: [N.D2, N.D3, N.D2, N.D3, N.Bb2, N.Bb3, N.A2, N.A3],
            melody: [N.D5, N.A4, N.F4, N.D4, N.Bb4, N.A4, N.G4, N.F4, N.C5, N.A4, N.F4, N.E4, N.D5, 0, N.D5, 0],
            drums: true
        }
    };

    function getMusicVolume() {
        const s = readSettings();
        const m = s.music !== undefined ? s.music : 60;
        return (m / 100) * 0.18; // м'яка фонова гучність, щоб не глушити звуки
    }

    function playTone(freq, type, duration, volMult = 1) {
        if (!ctx || !freq || gamePaused) return;
        const vol = getMusicVolume() * volMult;
        if (vol <= 0.001) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }

    function playDrum(isKick) {
        if (!ctx || gamePaused) return;
        const vol = getMusicVolume() * (isKick ? 0.9 : 0.35);
        if (vol <= 0.001) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = isKick ? "sine" : "triangle";

        if (isKick) {
            osc.frequency.setValueAtTime(130, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);
        } else {
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
        }

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (isKick ? 0.12 : 0.05));

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (isKick ? 0.12 : 0.05));
    }

    function tick() {
        if (!isPlaying || !currentMood) return;
        const t = themes[currentMood] || themes.okino;

        if (!gamePaused && gameContainer.classList.contains("on")) {
            const bNote = t.bass[step % t.bass.length];
            const mNote = t.melody[step % t.melody.length];

            // Бас-лінія
            if (bNote) playTone(bNote, "triangle", (t.tempo / 1000) * 1.5, 0.85);
            // Головна мелодія
            if (mNote) playTone(mNote, t.wave, (t.tempo / 1000) * 1.2, 0.55);
            // Ритм-секція
            if (t.drums) {
                if (step % 4 === 0) playDrum(true);
                else if (step % 2 === 0) playDrum(false);
            }
            step++;
        }
        timer = setTimeout(tick, t.tempo);
    }

    function detectMood(sceneId) {
        if (!sceneId) return "okino";
        if (sceneId.includes("dragon") || sceneId.includes("dino") || sceneId.includes("labyrinth") || sceneId.includes("werewolves") || sceneId.includes("bounty")) return "boss";
        if (sceneId.includes("gaming") || sceneId.includes("town") || sceneId.includes("merchant") || sceneId.includes("blacksmith") || sceneId.includes("herbalist") || sceneId.includes("victory")) return "arcade";
        if (sceneId.includes("forest") || sceneId.includes("cave") || sceneId.includes("abyss") || sceneId.includes("wrong") || sceneId.includes("bridge") || sceneId.includes("troll") || sceneId.includes("illusion")) return "forest";
        return "okino";
    }

    return {
        setScene(sceneId) {
            if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (ctx.state === "suspended") ctx.resume();

            const nextMood = detectMood(sceneId);
            if (currentMood !== nextMood) {
                currentMood = nextMood;
                step = 0;
            }
            if (!isPlaying) {
                isPlaying = true;
                clearTimeout(timer);
                tick();
            }
        },
        stop() {
            isPlaying = false;
            currentMood = null;
            clearTimeout(timer);
        }
    };
})();
const autosaveOn = () => readSettings().autosave !== false;

// ======================= СКЛАДНІСТЬ =======================
// dmg — множник шкоди, heal — множник лікування, chance — поправка до шансу (+0.10 = +10%),
// retries — скільки разів можна повертатись з точки збереження, odds — коли показувати відсотки на кнопках
const DIFFICULTY = {
    "Легка": { dmg: 0.6, heal: 1.3, chance: +0.10, retries: Infinity, odds: "always" },
    "Звичайна": { dmg: 1.4, heal: 1.0, chance: -0.03, retries: 5, odds: "hints" },
    "Важка": { dmg: 2.2, heal: 0.7, chance: -0.12, retries: 2, odds: "never" }
};
const difficulty = () => DIFFICULTY[readSettings().difficulty] || DIFFICULTY["Звичайна"];
const hintsOn = () => readSettings().hints !== false;
const showOdds = () => difficulty().odds === "always" || (difficulty().odds === "hints" && hintsOn());
const chanceOf = c => Math.max(0.03, Math.min(0.97, c.chance + difficulty().chance));
let retriesLeft = Infinity;
// числа шкоди й шансів у тексті більше не потрібні: гра показує справжні (залежать від складності)
const clean = s => s
    .replace(/\s*\(\s*шанс\s*\d+%\s*\)/gi, "")
    .replace(/\s*\(\s*[-+−]?\d+\s*HP\s*\)/g, "")
    .replace(/\(\s*[-+−]?\d+\s*HP\s*,\s*/g, "(");
const fill = s => clean(s)
    .replaceAll("{name}", playerName)
    .replaceAll("{weapon}", weaponNames[playerWeapon] || "—");

function playSfx(name) {
    const a = new Audio(name.startsWith("die") ? name + ".wav" : "sounds/" + name + ".mp3");
    a.volume = (readSettings().volume ?? 70) / 100;
    a.play().catch(() => { });
}

function renderUI() {
    healthFill.style.width = state.hp + "%";
    inventoryList.innerHTML = "";
    state.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        inventoryList.append(li);
    });
    questBtn.hidden = Object.keys(state.quests).length === 0;
    mapBtn.hidden = !(state.items.includes("Карта") || state.flags.map);
}
function addItem(item) {
    if (!state.items.includes(item)) { state.items.push(item); renderUI(); }
}
function removeItem(item) {
    state.items = state.items.filter(i => i !== item);
    renderUI();
}

const hasReq = r => state.items.includes(r) || !!state.flags[r];

function changeHp(delta) {
    const d = difficulty();
    const scaled = delta < 0 ? Math.min(-1, Math.round(delta * d.dmg)) : Math.round(delta * d.heal);
    const before = state.hp;
    state.hp = Math.max(0, Math.min(100, state.hp + scaled));
    const real = state.hp - before;
    if (real) toast((real > 0 ? "+" : "") + real + " ❤ здоров'я");
    renderUI();
}


const snapshot = id => ({ id, name: playerName, weapon: playerWeapon, hp: state.hp, items: [...state.items], quests: { ...state.quests }, flags: { ...state.flags }, place: state.place, visited: [...(state.visited || [])], retries: isFinite(retriesLeft) ? retriesLeft : -1 });

function restore(s) {
    playerName = s.name; playerWeapon = s.weapon;
    state.hp = s.hp; state.items = [...s.items];
    state.quests = { ...(s.quests || {}) }; state.flags = { ...(s.flags || {}) };
    state.place = s.place || null;
    state.visited = [...(s.visited || (s.place ? [s.place] : []))];
    renderUI();
    show(s.id);
}
function enterGame() {
    document.documentElement.requestFullscreen?.()?.catch(() => { });
    menuContent.style.display = "none";
    menuStage.style.display = "none";
    window.setMenuAnimation?.(false);
    bgMusic.pause();
    currentFile = "";
    gameContainer.classList.add("on");
}

function startGame() {
    gamePaused = false;
    pendingAfterLines = false;
    playerWeapon = null; checkpoint = null;
    retriesLeft = difficulty().retries;
    state.hp = 100; state.items = [];
    state.quests = {}; state.flags = {}; state.place = null; state.visited = [];
    renderUI();
    enterGame();
    show("gaming_machine1");
}

function backToMenu() {
    gamePaused = false;
    pendingAfterLines = false;
    GameMusic.stop();
    showToken++;
    clearInterval(typing); typing = null;
    sceneFrame.onload = null;
    if (document.fullscreenElement) document.exitFullscreen?.();
    gameContainer.classList.remove("on");
    modalQuests.style.display = modalMap.style.display = "none";
    modalPause.style.display = modalAchievements.style.display = modalSettings.style.display = "none";
    fade.classList.remove("on");
    sceneFrame.src = "about:blank"; currentFile = "";
    npcContainer.style.display = "none";
    choicesBox.innerHTML = "";
    menuContent.style.display = "";
    menuStage.style.display = "";
    window.setMenuAnimation?.(true);
    bgMusic.play().catch(() => { });
}

function loadScene(file, done) {
    if (!file || file === currentFile) return done();
    currentFile = file;
    fade.classList.add("on");
    setTimeout(() => {
        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            sceneFrame.onload = null;
            fade.classList.remove("on");
            done();
        };
        sceneFrame.onload = finish;
        setTimeout(finish, 2500);
        sceneFrame.src = file;
    }, 250);
}

function setNpc(src) {
    if (!src) { npcContainer.style.display = "none"; return; }
    npcContainer.style.display = "flex";
    npc1.style.display = "flex";
    npc2.style.display = "none";
    npc3.style.display = "none";
    npc1.src = src;
}

// фон сцени: спершу правила з scenes.js (sceneRules), інакше поле scene з історії
function sceneFile(scene) {
    if (!scene.keepScene && typeof sceneRules !== "undefined") {
        for (const [re, file] of sceneRules) if (re.test(scene.id)) return file;
    }
    return scene.scene;
}

function show(id) {
    const scene = story.find(s => s.id === id);
    if (!scene) { console.error("Немає сцени:", id); showEnd(); return; }

    const token = ++showToken;
    const later = (fn, ms) => setTimeout(() => { if (token === showToken) fn(); }, ms);

    if (scene.checkpoint) checkpoint = snapshot(id);
    if (autosaveOn() && !scene.lose && (scene.next || scene.choices || scene.interactive)) {
        try { localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot(id))); } catch { }
    }

    current = scene;
    activeLines = (scene.lines || []).filter(l => !l[2] || l[2](state));
    lineIndex = 0;
    GameMusic.setScene(id);
    waiting = false;
    clearInterval(typing); typing = null;
    choicesBox.innerHTML = "";
    sceneFrame.classList.remove("live");
    dialogueBox.style.display = "none";
    nextBtn.style.display = "none";

    if (scene.hp) changeHp(scene.hp);
    if (scene.give) addItem(scene.give);
    if (scene.place) {
        state.place = scene.place;
        if (!state.visited.includes(scene.place)) state.visited.push(scene.place);
    }
    if (scene.set) Object.assign(state.flags, scene.set);
    if (scene.startQuest) startQuest(scene.startQuest);
    if (scene.finishQuest) finishQuest(scene.finishQuest);
    renderUI();
    if (scene.sfx) playSfx(scene.sfx);
    if (scene.npc !== undefined) setNpc(typeof scene.npc === "function" ? scene.npc(state) : scene.npc);

    loadScene(sceneFile(scene), () => {
        if (token !== showToken) return;
        if (activeLines.length) {
            showLine();
            if (scene.delay) later(afterLines, scene.delay);
        } else {
            later(afterLines, scene.delay || 0);
        }
    });
}

function typeText(text) {
    clearInterval(typing);
    saidEl = document.createElement("span");
    dialogueText.append(saidEl);
    fullText = text;
    const chars = Array.from(text);
    let i = 0;
    typing = setInterval(() => {
        if (gamePaused) return;
        saidEl.textContent = chars.slice(0, ++i).join("");
        if (i >= chars.length) { clearInterval(typing); typing = null; }
    }, 22);
}
function skipTyping() {
    if (!typing) return false;
    clearInterval(typing); typing = null;
    saidEl.textContent = fullText;
    return true;
}

function showLine() {
    const [who, text] = activeLines[lineIndex];
    dialogueBox.style.display = "flex";
    nextBtn.style.display = "block";
    dialogueText.innerHTML = "";
    if (who) {
        const w = document.createElement("strong");
        w.className = "who " + (who === you ? "you" : "npc");
        w.textContent = fill(who) + ": ";
        dialogueText.append(w);
    }
    typeText(fill(text));
}

nextBtn.addEventListener("click", () => {
    if (gamePaused) return;
    if (!current || !activeLines.length || nextBtn.style.display === "none") return;
    if (skipTyping()) return;
    lineIndex++;
    if (lineIndex < activeLines.length) showLine();
    else afterLines();
});

addEventListener("keydown", e => {
    if (e.key !== " " && e.key !== "Enter") return;
    if (gamePaused || !gameContainer.classList.contains("on") || modalName.style.display === "block") return;
    if (nextBtn.style.display === "block" && dialogueBox.style.display !== "none") { e.preventDefault(); nextBtn.click(); }
});

function afterLines() {
    if (gamePaused) { pendingAfterLines = true; return; }
    if (state.hp <= 0) return showLose("Здоров'я закінчилось.");
    if (current.interactive) waitForScene();
    else if (current.choices) showChoices();
    else if (current.next) show(current.next);
    else if (current.lose) showLose(current.lose);
    else showEnd();
}

function addButton(text, onClick) {
    const b = document.createElement("button");
    b.textContent = text;
    b.addEventListener("click", onClick);
    choicesBox.append(b);
    return b;
}

function showChoices() {
    nextBtn.style.display = "none";
    choicesBox.innerHTML = "";
    if (current.hint && hintsOn()) {                       // підказка сцени: hint: "..."
        const p = document.createElement("p");
        p.className = "hint";
        p.textContent = "💡 " + fill(current.hint);
        choicesBox.append(p);
    }
    current.choices.forEach(c => {
        const locked = c.requires && !hasReq(c.requires);
        let label = fill(c.text);
        if (c.chance !== undefined && showOdds()) label += ` (шанс ${Math.round(chanceOf(c) * 100)}%)`;
        if (locked) label = "🔒 " + label + " (потрібно: " + c.requires + ")";
        addButton(label, () => choose(c)).disabled = !!locked;
    });
}

function waitForScene() {
    nextBtn.style.display = "none";
    waiting = true;
    sceneFrame.classList.add("live");
    sceneFrame.contentWindow.focus();
}

window.addEventListener("message", e => {
    if (e.source !== sceneFrame.contentWindow) return;
    if (!waiting || !current || !current.interactive) return;
    const value = e.data && e.data.value;
    const next = current.interactive[value];
    if (!next) return;
    if (weaponNames[value]) {
        playerWeapon = value;
        addItem(weaponNames[value]);
    }
    show(next);
});

function showEnd() {
    dialogueBox.style.display = "flex";
    dialogueText.textContent = "Кінець Частини I. Твоя легенда у Верховній Імперії тільки починається...";
    nextBtn.style.display = "none";
    choicesBox.innerHTML = "";
    addButton("Грати знову", startGame);
    addButton("До меню", backToMenu);
}

function showLose(msg) {
    playSfx("die" + (1 + Math.floor(Math.random() * 3)));
    dialogueBox.style.display = "flex";
    nextBtn.style.display = "none";
    dialogueText.textContent = "Ти загинув. " + (typeof msg === "string" ? fill(msg) : "");
    choicesBox.innerHTML = "";
    if (checkpoint && retriesLeft > 0) {
        const left = isFinite(retriesLeft) ? ` (залишилось: ${retriesLeft})` : "";
        addButton("↺ З останньої точки" + left, () => { retriesLeft--; restore(checkpoint); });
    } else if (checkpoint) {
        dialogueText.textContent += " Спроби з точки збереження вичерпано.";
    }
    addButton("⟲ Спочатку", startGame);
    addButton("☰ До меню", backToMenu);
}

$("startBtn").addEventListener("click", e => {
    e.preventDefault();
    nameInput.value = localStorage.getItem("playerName") || "";
    modalName.style.display = "block";
    nameInput.focus();
});

nameForm.addEventListener("submit", e => {
    e.preventDefault();
    playerName = nameInput.value.trim() || "Майстер";
    localStorage.setItem("playerName", playerName);
    modalName.style.display = "none";
    startGame();
});

function renderSaves() {
    const list = $("saveList");
    list.innerHTML = "";
    const li = document.createElement("li");
    let s = null;
    try { s = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { }
    if (!s) { li.textContent = "Збережень ще немає."; list.append(li); return; }
    const b = document.createElement("button");
    b.className = "settings-btn settings-btn--main";
    b.textContent = `${s.name} · ${weaponNames[s.weapon] || "без зброї"} · здоров'я ${s.hp}%`;
    b.addEventListener("click", () => {
        modalContinue.style.display = "none";
        retriesLeft = s.retries === undefined ? difficulty().retries : (s.retries < 0 ? Infinity : Math.min(s.retries, difficulty().retries));
        enterGame();
        restore(s);
    });
    li.append(b);
    list.append(li);
}
$("continueBtn").addEventListener("click", renderSaves);

menuBtn.addEventListener("click", () => {
    if (!gameContainer.classList.contains("on") || gamePaused) return;
    gamePaused = true;
    const info = modalPause.querySelector("p");
    if (info) info.textContent = "Складність: " + (readSettings().difficulty || "Звичайна") +
        (isFinite(retriesLeft) ? " · повернень з точки збереження: " + retriesLeft : "");
    modalPause.style.display = "block";
});

function resumeGame() {
    gamePaused = false;
    modalPause.style.display = "none";
    if (pendingAfterLines) {
        pendingAfterLines = false;
        afterLines();
    }
}

$("resumeGameBtn").addEventListener("click", resumeGame);
$("pauseMenuBtn").addEventListener("click", backToMenu);

$("pauseSettingsBtn").addEventListener("click", () => {
    modalPause.style.display = "none";
    modalSettings.style.display = "block";
});
$("close-settings-modal").addEventListener("click", () => {
    if (gamePaused) modalPause.style.display = "block";
});
modalSettings.addEventListener("click", e => {
    if (e.target === modalSettings && gamePaused) modalPause.style.display = "block";
});

const achievements = [
    { title: "Перші кроки", description: "Потрап у світ Теракарани.", unlocked: () => !!state.place },
    { title: "Майстер зброї", description: "Пройди тренування з Окіно бездоганно.", unlocked: () => !!(state.flags.katana_reflex || state.flags.hammer_power || state.flags.staff_wisdom) },
    { title: "Серце воїна", description: "Врятуй пораненого мандрівника в лісі.", unlocked: () => !!state.flags.saved_traveler },
    { title: "Друг Окіно", description: "Захисти Окіно від зграї перевертнів.", unlocked: () => !!state.flags.helped_okino_wolves },
    { title: "Пам'ять полеглих", description: "Знайди меч Першого майстра Окіно.", unlocked: () => state.items.includes("Меч Першого майстра") },
    { title: "Легенда Імперії", description: "Здобудь Катану-ключ і пройди випробування.", unlocked: () => state.quests.key === "done" },
    { title: "Погляд у майбутнє", description: "Знайди Розлом Коду в Ілюзії та відкрий таємницю 2-ї частини.", unlocked: () => !!state.flags.saw_unagami }
];
function renderAchievements() {
    const list = $("achievementList");
    const progress = $("achievementProgress");
    list.innerHTML = "";
    const unlockedCount = achievements.filter(achievement => achievement.unlocked()).length;
    progress.textContent = `Відкрито: ${unlockedCount} з ${achievements.length}`;
    achievements.forEach(achievement => {
        const unlocked = achievement.unlocked();
        const item = document.createElement("li");
        item.className = unlocked ? "unlocked" : "";
        item.textContent = `${unlocked ? "🏆" : "🔒"} ${achievement.title} — ${achievement.description}`;
        list.append(item);
    });
}

$("achievementsBtn").addEventListener("click", () => {
    renderAchievements();
    modalPause.style.display = "none";
    modalAchievements.style.display = "block";
});
const returnToPause = () => {
    modalAchievements.style.display = "none";
    if (gamePaused) modalPause.style.display = "block";
};
$("backToPauseBtn").addEventListener("click", returnToPause);
$("close-achievements").addEventListener("click", returnToPause);
modalAchievements.addEventListener("click", e => {
    if (e.target === modalAchievements) returnToPause();
});

function choose(c) {
    if (c.take) removeItem(c.take);
    if (c.give) addItem(c.give);
    if (c.hp) changeHp(c.hp);
    if (c.set) Object.assign(state.flags, c.set);
    if (c.startQuest) startQuest(c.startQuest);
    if (c.finishQuest) finishQuest(c.finishQuest);
    renderUI();
    if (c.chance !== undefined) show(Math.random() < chanceOf(c) ? c.win : c.lose);
    else show(c.next);
}

let toastTimer = null;
function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
}

function startQuest(id) {
    if (!quests[id]) { console.error("Немає квесту:", id); return; }
    if (state.quests[id]) return;
    state.quests[id] = "active";
    toast("📜 Новий квест: " + quests[id].title);
}

function finishQuest(id) {
    if (!quests[id] || state.quests[id] !== "active") return;
    state.quests[id] = "done";
    const r = quests[id].reward || {};
    if (r.hp) changeHp(r.hp);
    if (r.give) addItem(r.give);
    toast("✔ Квест виконано: " + quests[id].title);
}

function renderQuests() {
    const list = $("questList");
    list.innerHTML = "";
    const ids = Object.keys(state.quests);
    if (!ids.length) { const li = document.createElement("li"); li.textContent = "Квестів ще немає."; list.append(li); return; }
    ids.forEach(id => {
        const li = document.createElement("li");
        li.className = state.quests[id];
        li.textContent = (state.quests[id] === "done" ? "✔ " : "🔶 ") + quests[id].title + " — " + quests[id].text;
        list.append(li);
    });
}

questBtn.addEventListener("click", () => { renderQuests(); modalQuests.style.display = "block"; });
$("close-quests").addEventListener("click", () => modalQuests.style.display = "none");
modalQuests.addEventListener("click", e => { if (e.target === modalQuests) modalQuests.style.display = "none"; });

const editMode = new URLSearchParams(location.search).has("edit");
mapExport.hidden = !editMode;
// Локація відкрита ТІЛЬКИ якщо гравець у ній вже побував (або якщо це поточна локація)
const pointUnlocked = p => state.visited.includes(p.id) || state.place === p.id;

let fogCanvas = null;
function renderFog() {
    if (!fogCanvas) {
        fogCanvas = document.createElement("canvas");
        fogCanvas.id = "mapFog";
        fogCanvas.width = 600;
        fogCanvas.height = 600;
        mapWrap.insertBefore(fogCanvas, mapPointsBox);
    }
    const ctx = fogCanvas.getContext("2d");
    const W = fogCanvas.width, H = fogCanvas.height;
    ctx.clearRect(0, 0, W, H);

    if (editMode) return; // У режимі редагування туман вимкнено

    // 1. Заливаємо всю карту густим темним туманом
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(8, 12, 24, 0.92)";
    ctx.fillRect(0, 0, W, H);

    // 2. Малюємо текстуру хмар поверх туману
    for (let i = 0; i < 45; i++) {
        const cx = ((i * 137) % 100) / 100 * W;
        const cy = ((i * 293) % 100) / 100 * H;
        const r = 45 + (i % 4) * 20;
        const g = ctx.createRadialGradient(cx, cy, 5, cx, cy, r);
        g.addColorStop(0, "rgba(47, 75, 115, 0.35)");
        g.addColorStop(1, "rgba(8, 12, 24, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // 3. Розсіюємо туман ("прорізаємо вікна") навколо відвіданих локацій
    ctx.globalCompositeOperation = "destination-out";
    mapPoints.forEach(p => {
        if (!pointUnlocked(p)) return;
        const px = (p.x / 100) * W;
        const py = (p.y / 100) * H;
        const radius = 85; // Радіус відкритої зони навколо точки
        const grad = ctx.createRadialGradient(px, py, radius * 0.35, px, py, radius);
        grad.addColorStop(0, "rgba(0, 0, 0, 1)");
        grad.addColorStop(0.7, "rgba(0, 0, 0, 0.85)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";
}

function renderMap() {
    renderFog();
    mapPointsBox.innerHTML = "";
    mapPoints.forEach((p, i) => {
        const open = pointUnlocked(p);
        const b = document.createElement("button");
        b.className = "mp" + (open ? "" : " locked") + (state.place === p.id ? " here" : "");
        b.style.left = p.x + "%";
        b.style.top = p.y + "%";
        const label = document.createElement("span");
        label.textContent = open ? ((state.place === p.id ? "📍 " : "") + p.name) : "☁️ Невідомо";
        b.append(label);
        b.addEventListener("click", e => { e.stopPropagation(); selectPoint(p); });
        b.addEventListener("contextmenu", e => {
            if (!editMode) return;
            e.preventDefault();
            if (confirm("Видалити точку «" + p.name + "»?")) { mapPoints.splice(i, 1); renderMap(); }
        });
        mapPointsBox.append(b);
    });
    if (editMode) {
        mapExport.value = JSON.stringify(mapPoints, null, 2);
        console.log(mapExport.value);
    }
}

function selectPoint(p) {
    mapInfo.innerHTML = "";
    if (editMode) return;
    const t = document.createElement("p");
    const open = pointUnlocked(p);
    if (!open) {
        t.textContent = "☁️ Ця частина Теракарани ще прихована туманом. Дістанься сюди за сюжетом!";
        mapInfo.append(t);
        return;
    }
    if (state.place === p.id) {
        t.textContent = "📍 Ви зараз тут: " + p.name;
        mapInfo.append(t);
        return;
    }
    t.textContent = p.name;
    mapInfo.append(t);
    if (!p.go) return;
    const b = document.createElement("button");
    b.className = "settings-btn settings-btn--main";
    b.textContent = "Піти: " + p.name;
    b.addEventListener("click", () => { modalMap.style.display = "none"; show(p.go); });
    mapInfo.append(b);
}

mapWrap.addEventListener("click", e => {
    if (!editMode || e.target.closest(".mp")) return;
    const r = mapWrap.getBoundingClientRect();
    const x = +((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = +((e.clientY - r.top) / r.height * 100).toFixed(1);
    const name = prompt("Назва точки:");
    if (!name) return;
    const go = prompt("Id сцени з story, куди веде точка (можна лишити порожнім):") || "";
    mapPoints.push({ id: "p" + Date.now(), name, x, y, go });
    renderMap();
});

mapBtn.addEventListener("click", () => {
    renderMap();
    mapInfo.innerHTML = "";
    modalMap.style.display = "block";
});
$("close-map").addEventListener("click", () => { modalMap.style.display = "none"; });
modalMap.addEventListener("click", e => {
    if (e.target === modalMap) modalMap.style.display = "none";
});