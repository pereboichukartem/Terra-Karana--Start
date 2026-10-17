const quests = {
    key:     { title: "Катана-ключ",       text: "Пройди Ліс Прикрощів, Гори Істерії та Лабіринт Червоного Дракона." },
    harpoon: { title: "Шлях у гори",       text: "Знайди спосіб піднятися на Гори Істерії: гарпун із міцним тросом або обхідний шлях.", reward: { hp: 10 } },
    bounty:  { title: "Тінь Роздоріжжя",   text: "Вистеж і здолай Лісового Тіньовика за контрактом із дошки оголошень.", reward: { hp: 15 } },
    memory:  { title: "Код Самурая",       text: "Розкрий таємницю минулого Окіно: знайди щоденник та меч його Першого майстра.", reward: { give: "Печатка Пробудження" } }
};

const mapPoints = [
    { id: "swords",       name: "Поле Мечів",         x: 19.5, y: 90.6, go: "terrakara1" },
    { id: "okino_camp",   name: "Табір Окіно",         x: 47.6, y: 49.7, go: "camp_explore" },
    { id: "fork",         name: "Роздоріж",            x: 54.9, y: 66.6, go: "fork_town" },
    { id: "harpoon_town", name: "Гарпунний Міст",      x: 17.5, y: 15.5, go: "merchant" },
    { id: "shaky_bridge", name: "Хиткий Міст",         x: 67.4, y: 78.3, go: "wrong_way_start" },
    { id: "abyss",        name: "Безодня",             x: 81.2, y: 67.0, go: "abyss_descent" },
    { id: "dino_valley",  name: "Динодол",             x: 73.2, y: 57.1, go: "dino_valley_scene" },
    { id: "gate",         name: "Брама Ілюзії",        x: 72.3, y: 32.4, go: "illusion_gate" },
    { id: "illusion",     name: "Ілюзія",              x: 85.2, y: 8.7,  go: "illusion_gate_trial" },
    { id: "labyrinth",    name: "Лабіринт Дракона",    x: 33.4, y: 13.7, go: "labyrinth_entrance" }
];