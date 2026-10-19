// ===== ФОНИ СЦЕН ЗА ПРАВИЛАМИ =====
// Підключається ПЕРЕД game.js:  <script src="scenes.js"></script>
// Кожне правило: [регулярка для id сцени, файл фону]. Береться ПЕРШЕ правило, що збіглося.
// Якщо потрібен інший фон для однієї сцени — додайте їй у story поле  keepScene: true  (лишиться її власний scene).
const sceneRules = [
    [/^dragon_/,                                                         "dragon-lair-animated.html"],
    [/^labyrinth_/,                                                      "labyrinth-animated.html"],
    [/^(illusion_|victory_portal$)/,                                     "illusion-gate-animated.html"],
    [/^dino_/,                                                           "dino-valley-animated.html"],
    [/^(wrong_way_start|shaky_bridge_|abyss_)/,                          "rope-bridge-animated.html"],
    [/^(merchant$|road_to_harpoon_town|harpoon_|mountain_troll_encounter|troll_exposed)/, "harpoon-market-animated.html"],
    [/^(fork_town|town_|blacksmith_reward|bounty_)/,                     "crossroads-town-animated.html"],
    [/^forest_fork_choice$/,                                             "forest-fork-animated.html"],
    [/^cave_/,                                                           "cave-animated.html"],
    [/^(forest_vines_|blacksmith_vines_task)/,                           "vine-gate-animated.html"],
    [/^(okino_gift_map|camp_)/,                                          "okino-camp-animated.html"]
];
