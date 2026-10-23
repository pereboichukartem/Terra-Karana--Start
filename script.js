const you = "{name}";
const okino = "Окіно";
const empire = "🎮 Верховна Імперія";

const story = [
    // ==================== ПРОЛОГ ====================
    {
        id: "gaming_machine1",
        scene: "arcade-city-animated.html",
        lines: [
            ["", "Нічне місто дихає неоном і дощем. Ти звертаєш у тихий провулок і помічаєш багряне сяйво крізь прочинені двері старого аркадного залу."],
            [you, "Дивно, зал мав би бути зачинений роки тому... Що там так яскраво світиться?"]
        ],
        next: "gaming_machine2"
    },
    {
        id: "gaming_machine2",
        scene: "arcade-fight-animated.html",
        lines: [
            ["", "Посеред порожньої зали гуде єдиний увімкнений автомат із написом «PRIME EMPIRE». Джойстик ніби сам проситься в руки."],
            [you, "Легендарна «Верховна Імперія»! Зіграю одну партію — перевірю, на що я здатен."]
        ],
        delay: 4500,
        next: "gaming_machine3"
    },
    {
        id: "gaming_machine3",
        scene: "arcade-empire-portal.html",
        lines: [
            ["", "Пальці літають по кнопках. Блоки, удари, комбо — ти проходиш рівень за рівнем на одному подиху!"],
            [you, "Є! Тринадцятий рівень пройдено!"],
            [empire, "ВІТАЄМО, ГРАВЦЮ {name}. ВИ ДОСЯГЛИ РІВНЯ 13. БАЖАЄТЕ УВІЙТИ ДО ВЕРХОВНОЇ ІМПЕРІЇ?"]
        ],
        interactive: { yes: "portal", no: "end" }
    },
    {
        id: "end",
        scene: "arcade-city-animated.html",
        lines: [
            [you, "Ні, дякую. Коли старі автомати починають розмовляти — час іти додому."]
        ]
    },
    {
        id: "portal",
        scene: "digital-tunnel.html",
        lines: [
            ["", "Екран автомата спалахує сліпучим сяйвом, і цифровий вихор розщеплює простір на пікселі, затягуючи тебе всередину!"]
        ],
        delay: 3000,
        next: "terrakara1"
    },

    // ==================== ПОЛЕ МЕЧІВ: ЗУСТРІЧ З ОКІНО ====================
    {
        id: "terrakara1",
        scene: "sword-field-animated.html",
        npc: "okino-front.png",
        place: "swords",
        hint: "Розпитай Окіно про цей світ — уважність до деталей відкриває приховані квести.",
        lines: [
            [okino, "Прокидайтесь, майстре {name}."],
            [you, "А?! Де я? Це що... всередині гри?!"],
            [okino, "Вітаю у Теракарані — прикордонній зоні Верховної Імперії. Тут загроза чатує на кожному кроці, і перемогу не здобути без досвідченого провідника."],
            [okino, "Цей провідник — я, самурай Окіно."]
        ],
        choices: [
            { text: "🗡️ Чому вся ця рівнина всіяна мечами?", next: "terrakara_swords_lore" },
            { text: "🤖 Ти жива людина чи частина коду цієї гри?", next: "terrakara_okino_lore" }
        ]
    },
    {
        id: "terrakara_swords_lore",
        scene: "sword-field-animated.html",
        npc: "okino-back.png",
        lines: [
            [okino, "😔 Усі мої попередні майстри загинули. Кожен меч на цьому полі — це один полеглий гравець, якого я не зміг провести до кінця."],
            ["", "Окіно опускає погляд. На секунду його силует ледь помітно тремтить від цифрових перешкод."]
        ],
        next: "terrakara3"
    },
    {
        id: "terrakara_okino_lore",
        scene: "sword-field-animated.html",
        npc: "okino-back.png",
        set: { asked_code: true },
        lines: [
            [okino, "Код? Дивне слово... Я створений, щоб служити. 😔 Але всі мої майстри загинули. Іноді у снах я бачу спалахи битв, яких не мало б бути в моїй пам'яті."],
            ["", "Очі самурая на мить спалахують синім кодом, але він швидко опановує себе."]
        ],
        next: "terrakara3"
    },
    {
        id: "terrakara3",
        scene: "sword-field-animated.html",
        npc: "okino-front.png",
        lines: [
            [okino, "Майстре {name}, щоб вибратися з Теракарани, вам потрібно здобути легендарну Катану-ключ🗝️."],
            [okino, "Вона схована за трьома рубежами: 🌳Лісом Прикрощів, 🏔️Горами Істерії та Лабіринтом 🟥Червоного 🐉Дракона."]
        ],
        choices: [
            { text: "🐉 Розкажи більше про Червоного Дракона", next: "terrakara_dragon_ask" },
            { text: "🌳 Чого варто остерігатися в Лісі Прикрощів?", next: "terrakara_forest_ask" }
        ]
    },
    {
        id: "terrakara_dragon_ask",
        scene: "sword-field-animated.html",
        npc: "okino-front.png",
        lines: [
            [okino, "Дракон — це незламний страж Імперії. Саме у його лігві залишився меч мого найпершого майстра..."],
            [okino, "Але спершу треба пройти 🌳Ліс Прикрощів. У ньому є розвилка: якщо звернути не туди, потрапиш не до Гір Істерії, а в Ілюзію."]
        ],
        next: "choose_weapon"
    },
    {
        id: "terrakara_forest_ask",
        scene: "sword-field-animated.html",
        npc: "okino-front.png",
        lines: [
            [okino, "У лісі є підступна розвилка. Якщо звернути не туди, потрапиш не до 🏔️Гір Істерії, а в Ілюзію — і там на тебе чекатиме дещо страшніше за дракона."],
            [you, "Я зрозумів, Окіно. Обіцяю: мій меч не стоятиме на цьому полі!"]
        ],
        next: "choose_weapon"
    },

    // ==================== ВИБІР ЗБРОЇ ТА ТРЕНУВАННЯ ====================
    {
        id: "choose_weapon",
        scene: "weapon-choice.html",
        npc: "okino-front.png",
        lines: [
            [okino, "Перед походом я маю передати вам бойову майстерність. Кожна зброя відкриває власні шляхи у Теракарані."],
            [okino, "Оберіть свою зброю, майстре {name}."]
        ],
        interactive: {
            katana: "weapon_katana",
            hammer: "weapon_hammer",
            staff: "weapon_staff"
        }
    },

    // --- Тренування: Катана ---
    {
        id: "weapon_katana",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        hint: "Для Катани головне — точність і таймінг, а не хаотичні помахи.",
        lines: [
            [okino, "Катана швидка й точна. Вона ідеальна для блискавичних атак, розсікання пут і швидкісних маневрів."],
            ["", "У тренувальному залі активуються механізми, і у твій бік зі свистом летять три сюрікени!"]
        ],
        choices: [
            { text: "🗡️ Відбити всі сюрікени круговим обертом леза", next: "katana_train_perfect" },
            { text: "💨 Різко пригнутися і перекотитися під лінією вогню", next: "katana_train_dodge" },
            { text: "⚔️ Намагатися розрубати їх на льоту наосліп", next: "katana_train_hit" }
        ]
    },
    {
        id: "katana_train_perfect",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        set: { katana_reflex: true },
        lines: [
            ["", "Дзень-дзень-дзень! Неонове лезо описує ідеальну дугу, і всі три сюрікени встромляються в підлогу біля твоїх ніг."],
            [okino, "Вражаюча реакція! Ти опанував «Рефлекс Блискавки»."]
        ],
        next: "training_sparring_okino"
    },
    {
        id: "katana_train_dodge",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        lines: [
            ["", "Ти пірнаєш під сюрікени, перекочуєшся вперед і розсікаєш солом'яний манекен навпіл."],
            [okino, "Добре! Ухилення рятує життя, коли ворог переважає числом."]
        ],
        next: "training_sparring_okino"
    },
    {
        id: "katana_train_hit",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        hp: -5,
        lines: [
            ["", "Два сюрікени ти відбиваєш, але третій черкає по плечу."],
            [okino, "Не поспішай, майстре. Холодний розум важливіший за швидкість руки."]
        ],
        next: "training_sparring_okino"
    },

    // --- Тренування: Молот ---
    {
        id: "weapon_hammer",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        hint: "Шукай слабку точку в камені та використовуй інерцію розвороту.",
        lines: [
            [okino, "Молот повільний, зате нищівний. Його енергетичне ядро здатне трощити скелі та броню."],
            ["", "Посеред залу підіймається масивна гранітна брила з тонкою тріщиною посередині."]
        ],
        choices: [
            { text: "🔨 Вдарити точно в центральну тріщину з розвороту", next: "hammer_train_perfect" },
            { text: "⚡ Вдарити об землю перед брилою, пустивши ударну хвилю", next: "hammer_train_wave" },
            { text: "💪 Замахнутися з усієї сили напролом", next: "hammer_train_hit" }
        ]
    },
    {
        id: "hammer_train_perfect",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        set: { hammer_power: true },
        lines: [
            ["", "Використовуючи інерцію важкого Молота, ти влучаєш у саме серце тріщини — брила розлітається на друзки!"],
            [okino, "Неймовірна міць! Ти опанував «Удар Титана»."]
        ],
        next: "training_sparring_okino"
    },
    {
        id: "hammer_train_wave",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        lines: [
            ["", "Від удару об підлогу біжить фіолетова хвиля енергії, яка перекидає кам'яну глибу."],
            [okino, "Розумний хід! Ударна хвиля допоможе тримати ворогів на відстані."]
        ],
        next: "training_sparring_okino"
    },
    {
        id: "hammer_train_hit",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        hp: -5,
        lines: [
            ["", "Молот розколює верхівку каменя, але сильна віддача боляче б'є по руках."],
            [okino, "Молот вимагає правильної стійки, майстре {name}. Бий вагою всього тіла."]
        ],
        next: "training_sparring_okino"
    },

    // --- Тренування: Посох ---
    {
        id: "weapon_staff",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        hint: "Посох дозволяє відчути справжній енергетичний слід серед ілюзій.",
        lines: [
            [okino, "Посох дає владу над енергією кристалів. Він освітлює темряву і руйнує ілюзії."],
            ["", "У повітрі з'являються три голографічні мішені: дві з них — фальшивки, і лише одна справжня."]
        ],
        choices: [
            { text: "🔮 Відчути пульсацію коду й вразити справжню мішень променем", next: "staff_train_perfect" },
            { text: "✨ Створити спалах світла, щоб розвіяти голограми", next: "staff_train_light" },
            { text: "☄️ Випустити залп по всіх трьох мішенях одразу", next: "staff_train_hit" }
        ]
    },
    {
        id: "staff_train_perfect",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        set: { staff_wisdom: true },
        lines: [
            ["", "Кристал Посоха резонує з істинною ціллю, і точний промінь розбиває справжню мішень!"],
            [okino, "Бездоганно! Ти відкрив у собі «Зір Мудреця»."]
        ],
        next: "training_sparring_okino"
    },
    {
        id: "staff_train_light",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        lines: [
            ["", "Хвиля чистого сяйва змиває фальшиві мішені, залишаючи справжню відкритою для удару."],
            [okino, "Чудовий контроль! Це світло проведе тебе крізь найтемніші печери."]
        ],
        next: "training_sparring_okino"
    },
    {
        id: "staff_train_hit",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        hp: -5,
        lines: [
            ["", "Мішені знищено, але перевантаження кристала обпікає пальці розрядом."],
            [okino, "Магія потребує концентрації, майстре. Не витрачай усю силу наосліп."]
        ],
        next: "training_sparring_okino"
    },

    // --- Фінальний спаринг ---
    {
        id: "training_sparring_okino",
        scene: "training-hall-animated.html",
        npc: "okino-sword.png",
        hint: "Якщо ти ідеально виконав першу вправу, застосуй вивчену техніку!",
        lines: [
            [okino, "А тепер — фінальний спаринг. Покажи, як ти тримаєш удар у справжньому бою! Захищайся!"]
        ],
        choices: [
            { text: "⚡ Застосувати «Рефлекс Блискавки» Катани!", requires: "katana_reflex", next: "sparring_win" },
            { text: "⚡ Зустріти випад «Ударом Титана» Молота!", requires: "hammer_power", next: "sparring_win" },
            { text: "⚡ Передбачити рух Окіно «Зором Мудреця»!", requires: "staff_wisdom", next: "sparring_win" },
            { text: "⚔️ Парирувати удар своєю зброєю ({weapon}) на інстинктах", chance: 0.7, win: "sparring_win", lose: "sparring_defend" },
            { text: "🛡️ Піти в глухий захист і зберегти сили", next: "sparring_defend" }
        ]
    },
    {
        id: "sparring_win",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        give: "Талісман Самурая",
        set: { master_training: true },
        lines: [
            ["", "Іскри сиплються від зіткнення клинків! Ти перехоплюєш ініціативу і зупиняєш {weapon} за сантиметр від плеча Окіно."],
            [okino, "Ха-ха! Браво! Прийми цей 🎴Талісман Самурая. У критичну мить він зцілить твої рани або відведе смертельний вогонь."]
        ],
        next: "okino_gift_map"
    },
    {
        id: "sparring_defend",
        scene: "training-hall-animated.html",
        npc: "okino-front.png",
        hp: 5,
        lines: [
            ["", "Ти холоднокровно блокуєш серію ударів Окіно і розриваєш дистанцію."],
            [okino, "Надійна оборона, майстре. Тепер ти готовий до справжнього походу."]
        ],
        next: "okino_gift_map"
    },

    // ==================== ТАБІР ОКІНО ТА ОТРИМАННЯ КАРТИ ====================
    {
        id: "okino_gift_map",
        scene: "okino-camp-animated.html",
        npc: "okino-front.png",
        place: "okino_camp",
        checkpoint: true,
        give: "Карта",
        set: { map: true },
        startQuest: "key",
        hint: "Обов'язково оглянь табір перед виходом — там сховані важливі предмети та таємниця Окіно.",
        lines: [
            [okino, "Візьми цю Карту, майстре {name}. У міру нашого просування туман над новими землями Теракарани розсіюватиметься."],
            [okino, "Наш шлях лежить через 🌳Ліс Прикрощів до містечка Роздоріж, а звідти — до Гарпунного Мосту біля підніжжя гір."],
            [okino, "Перед виходом можеш оглянути мій табір або вирушати в дорогу просто зараз."]
        ],
        choices: [
            { text: "🔍 Оглянути табір Окіно (пошук реліквій та припасів)", next: "camp_explore" },
            { text: "🧙🏼 Вирушити в Ліс Прикрощів разом з Окіно", next: "forest_with_okino_start", startQuest: "harpoon" },
            { text: "🥷🏼 Піти через Ліс Прикрощів самотужки", next: "forest_alone_start", startQuest: "harpoon" }
        ]
    },
    {
        id: "camp_explore",
        scene: "okino-camp-animated.html",
        npc: "",
        place: "okino_camp",
        lines: [
            ["", "У кутку табору біля старого вівтаря лежать речі попередніх мандрівників та похідна скриня."]
        ],
        choices: [
            { text: "📜 Прочитати напівспалений щоденник Першого майстра", next: "camp_scroll" },
            { text: "🧪 Взяти Цілюще зілля з похідної скрині", next: "camp_potion" },
            { text: "↩ Повернутися до Окіно", next: "camp_return_okino" }
        ]
    },
    {
        id: "camp_scroll",
        scene: "okino-camp-animated.html",
        set: { dragon_secret: true },
        startQuest: "memory",
        lines: [
            ["", "У щоденнику написано: «Щоразу, коли ми гинемо, Верховна Імперія перезапускає пам'ять Окіно, залишаючи йому лише біль провини...»"],
            ["", "Нижче дописано: «Мій меч залишився біля лігва Дракона. До речі, вразливе місце Червоного Дракона — під третьою лускою на хребті!»"],
            [you, "То ось чому Окіно бачить дивні сни! Якщо я знайду меч Першого майстра в Лабіринті, я зможу повернути Окіно справжню пам'ять!"]
        ],
        next: "camp_explore"
    },
    {
        id: "camp_potion",
        scene: "okino-camp-animated.html",
        give: "Цілюще зілля",
        lines: [
            ["", "Ти кладеш у сумку склянку з яскраво-блакитним цілющим відваром."]
        ],
        next: "camp_explore"
    },
    {
        id: "camp_return_okino",
        scene: "okino-camp-animated.html",
        npc: "okino-front.png",
        lines: [
            [okino, "Ви знайшли щось цікаве біля вівтаря, майстре? Готові вирушати в 🌳Ліс Прикрощів?"],
            [you, "Так, Окіно. І цього разу ми дійдемо до самого кінця.", s => s.flags.dragon_secret]
        ],
        choices: [
            { text: "🧙🏼 Вирушити в ліс разом з Окіно", next: "forest_with_okino_start", startQuest: "harpoon" },
            { text: "🥷🏼 Пройти ліс самотужки (зустрітися біля гір)", next: "forest_alone_start", startQuest: "harpoon" }
        ]
    },

    // ==================== ГІЛКА 1: ЛІС ПРИКРОЩІВ РАЗОМ З ОКІНО ====================
    {
        id: "forest_with_okino_start",
        scene: "vine-gate-animated.html",
        npc: ["okino-front.png", "enemy-strangler-vines.png"],
        set: { with_okino: true },
        hint: "Ліани-душителі дають «Міцну ліану» для гарпуна, а в печері можна здобути рідкісний трофей для коваля.",
        lines: [
            [empire, "ЛОКАЦІЯ: ЛІС ПРИКРОЩІВ. ШАНС ВИЖИВАННЯ ГРУПИ: 34%."],
            [okino, "Не зважай на голос Імперії, майстре {name}. Тримай {weapon} напоготові — у цьому лісі навіть рослини полюють на гравців."],
            [okino, "Стій! Попереду 🌿ліани-душителі переплели всю стежку! Можемо прорубатися крізь них або обійти темною печерою."]
        ],
        choices: [
            { text: "🗡️ Блискавично розсікти ліани Катаною", requires: "Катана", next: "forest_vines_katana" },
            { text: "⚔️ Прорубатися крізь ліани з боєм (здобути Міцну ліану)", next: "forest_vines_fight" },
            { text: "🕳️ Обійти зарості через темну печеру", next: "cave_with_okino" }
        ]
    },
    {
        id: "forest_vines_katana",
        scene: "vine-gate-animated.html",
        npc: "okino-front.png",
        give: "Міцна ліана",
        lines: [
            ["", "Твоя Катана спалахує неоновою дугою і за секунду розтинає хижі пагони!"],
            [okino, "Бездоганний удар! Візьми цю 🌿Міцну ліану — з неї вийде ідеальний трос для гарпуна в горах."]
        ],
        next: "forest_shrine"
    },
    {
        id: "forest_vines_fight",
        scene: "vine-gate-animated.html",
        npc: "okino-front.png",
        hp: -15,
        give: "Міцна ліана",
        lines: [
            ["", "Колючі лози боляче хльоснули по руках, але разом з Окіно ви порубали чудовисько й здобули 🌿Міцну ліану."],
            [you, "Фух, ну й гидота! Зате тепер маємо міцний трос для гір."]
        ],
        next: "forest_shrine"
    },
    {
        id: "cave_with_okino",
        scene: "cave-animated.html",
        npc: ["okino-front.png", "enemy-spider-snake.png"],
        lines: [
            ["", "Ви заходите під склепіння печери, освітленої неоновими кристалами. Раптом зі стелі лунає шипіння."],
            [you, "Окіно, поглянь угору! На нас сунуть 🕷️павуко-змії🐍!"]
        ],
        choices: [
            { text: "✨ Осліпити зграю спалахом Посоха", requires: "Посох", next: "cave_okino_staff" },
            { text: "⚔️ Прийняти бій спина до спини з Окіно", chance: 0.75, win: "cave_okino_win", lose: "cave_okino_lose" }
        ]
    },
    {
        id: "cave_okino_staff",
        scene: "cave-animated.html",
        npc: "okino-front.png",
        give: "Отруйне ікло",
        lines: [
            ["", "Сліпучий розряд Посоха розганяє павуко-змій по тріщинах, а на камені залишається трофейне Отруйне ікло."],
            [okino, "Мудре рішення! Коваль у Роздоріжжі щедро заплатить за такий трофей."]
        ],
        next: "forest_shrine"
    },
    {
        id: "cave_okino_win",
        scene: "cave-animated.html",
        npc: "okino-front.png",
        hp: -20,
        give: "Отруйне ікло",
        lines: [
            ["", "Кілька потвор встигають зачепити тебе, але ви з Окіно пробиваєтеся до виходу, забравши Отруйне ікло."],
            [you, "😮‍💨 Нарешті свіже повітря!"]
        ],
        next: "forest_shrine"
    },
    {
        id: "cave_okino_lose",
        scene: "cave-animated.html",
        lose: "У вузькій печері було надто багато отруйних павуко-змій."
    },

    // ==================== ПОБІЧНА ПОДІЯ У ЛІСІ: ПОРАНЕНИЙ МАНДРІВНИК ====================
    {
        id: "forest_shrine",
        scene: "jungle-world-animated.html",
        npc: ["okino-front.png", "npc-traveler.png"],
        hint: "Допомога іншим гравцям у Теракарані винагороджується унікальними артефактами.",
        lines: [
            ["", "Біля старого вівтаря посеред джунглів сидить поранений мандрівник. Лічильник його життів блимає червоним."],
            ["Мандрівник", "Благаю, допоможіть... Тіньові вовки поцупили мій Медальйон біля скелі. Якщо моє здоров'я впаде до нуля, Імперія перетворить мене на куб даних..."]
        ],
        choices: [
            { text: "🧪 Віддати мандрівнику Цілюще зілля з табору", requires: "Цілюще зілля", take: "Цілюще зілля", next: "side_give_potion" },
            { text: "🐺 Відбити Медальйон у вовчій зграї", next: "side_wolf_den" },
            { text: "🚶🏼 Пройти повз — кожен сам за себе", next: "forest_werewolves_okino" }
        ]
    },
    {
        id: "side_wolf_den",
        scene: "jungle-world-animated.html",
        npc: "okino-front.png",
        hp: -15,
        give: "Амулет Істини",
        set: { saved_traveler: true },
        lines: [
            ["", "Ти сміливо вриваєшся до вовчого лігва і повертаєш реліквію мандрівнику, хоча вовки встигають подряпати тебе."],
            ["Мандрівник", "Ти врятував мені життя! Візьми цей 🧿Амулет Істини — він викриває будь-яку брехню та голограму у Теракарані!"]
        ],
        next: "forest_werewolves_okino"
    },
    {
        id: "side_give_potion",
        scene: "jungle-world-animated.html",
        npc: ["okino-front.png", "npc-traveler.png"],
        give: "Амулет Істини",
        set: { saved_traveler: true },
        lines: [
            ["Мандрівник", "Мої життєві сили відновилися! Візьми на знак вдячності цей 🧿Амулет Істини — з ним жодна ілюзія чи підступний троль тебе не проведе!"]
        ],
        next: "forest_werewolves_okino"
    },

    // ==================== ЗАСІДКА ПЕРЕВЕРТНІВ БІЛЯ РОЗВИЛКИ (З ОКІНО) ====================
    {
        id: "forest_werewolves_okino",
        scene: "forest-fork-animated.html",
        npc: ["okino-front.png", "enemy-werewolf.png"],
        lines: [
            [okino, "Попереду вже видно розвилку та високі вітряки поселення Роздоріж!"],
            ["", "Раптом із хащів вистрибують люті 🐺перевертні, відрізаючи шлях!"],
            [okino, "Майстре {name}, біжіть направо до воріт міста! Я прикрию ваш відступ і затримаю зграю!"]
        ],
        choices: [
            { text: "🔨 Оглушити вожака перевертнів Молотом!", requires: "Молот", next: "werewolves_hammer_win" },
            { text: "⚔️ Залишитися і битися пліч-о-пліч з Окіно!", chance: 0.85, win: "werewolves_help_win", lose: "werewolves_help_lose" },
            { text: "🏃🏼 Послухати Окіно і побігти направо до Роздоріжжя", next: "werewolves_run_right" }
        ]
    },
    {
        id: "werewolves_hammer_win",
        scene: "forest-fork-animated.html",
        npc: "okino-front.png",
        give: "Ікло перевертня",
        set: { helped_okino_wolves: true },
        lines: [
            ["", "Ти з розмаху вдаряєш Молотом об землю — ударна хвиля збиває вожака з ніг! Зграя тікає у хащі, залишивши Ікло перевертня."],
            [okino, "Ви залишилися прикрити мою спину, майстре {name}... Давно я не відчував справжнього братерства зброї. Ходімо в Роздоріж!"]
        ],
        next: "fork_town"
    },
    {
        id: "werewolves_help_win",
        scene: "forest-fork-animated.html",
        npc: "okino-front.png",
        hp: -15,
        give: "Ікло перевертня",
        set: { helped_okino_wolves: true },
        lines: [
            ["", "Ви б'єтеся спина до спини! Перевертні відступають під натиском вашої зброї, залишивши трофейне Ікло перевертня."],
            [okino, "Дякую, майстре! Справжній воїн не кидає товариша. Ворота Роздоріжжя прямо перед нами."]
        ],
        next: "fork_town"
    },
    {
        id: "werewolves_help_lose",
        scene: "forest-fork-animated.html",
        lose: "Зграя перевертнів зімкнула кільце. Їх виявилося надто багато."
    },
    {
        id: "werewolves_run_right",
        scene: "forest-fork-animated.html",
        npc: "okino-front.png",
        lines: [
            ["", "Ти прориваєшся направо до воріт поселення, з тривогою озираючись на ліс..."],
            ["", "За хвилину Окіно виходить із заростей, витираючи лезо катани."],
            [okino, "Усе гаразд, майстре. Головне, що ви в безпеці. Заходьмо в місто."]
        ],
        next: "fork_town"
    },

    // ==================== ГІЛКА 2: ЛІС ПРИКРОЩІВ САМОТУЖКИ ====================
    {
        id: "forest_alone_start",
        scene: "vine-gate-animated.html",
        npc: "okino-front.png",
        set: { with_okino: false },
        lines: [
            [okino, "Я поважаю вашу сміливість, майстре {name}. Зустрінемося біля підніжжя 🏔️Гір Істерії на Гарпунному Мості."],
            [okino, "Пам'ятайте: на лісовій розвилці повертайте НАПРАВО до міста Роздоріж! Ліва стежка заведе вас у пастку Ілюзії."]
        ],
        next: "forest_alone_deep"
    },
    {
        id: "forest_alone_deep",
        scene: "jungle-world-animated.html",
        npc: "enemy-werewolf.png",
        lines: [
            [empire, "УВАГА: ГРАВЕЦЬ {name} РУХАЄТЬСЯ БЕЗ ПРОВІДНИКА. АКТИВОВАНО ПОСИЛЕНИЙ ПАТРУЛЬ."],
            ["", "Попереду на стежці гарчать 🐺перевертні, а трохи лівіше видно печеру, вхід до якої обплетений міцними ліанами."]
        ],
        choices: [
            { text: "⚔️ Прорватися крізь перевертнів із боєм", chance: 0.75, win: "alone_wolves_win", lose: "alone_wolves_lose" },
            { text: "🌿 Зрізати ліану і пірнути у темну печеру", next: "cave_alone" }
        ]
    },
    {
        id: "alone_wolves_win",
        scene: "jungle-world-animated.html",
        npc: "",
        hp: -25,
        give: "Ікло перевертня",
        lines: [
            ["", "Бій наодинці був жорстоким, але твоя зброя ({weapon}) змусила зграю тікати! На землі залишилося Ікло перевертня."],
            [you, "😮‍💨 Ледве відбився... А ось і та сама розвилка!"]
        ],
        next: "forest_fork_choice"
    },
    {
        id: "alone_wolves_lose",
        scene: "jungle-world-animated.html",
        lose: "Самотужки відбитися від зграї перевертнів у густому лісі не вдалося."
    },
    {
        id: "cave_alone",
        scene: "cave-animated.html",
        npc: "enemy-cave-troll.png",
        give: "Міцна ліана",
        lines: [
            ["", "Ти зрізаєш 🌿Міцну ліану біля входу і заходиш у печеру. Попереду у напівтемряві бовваніє силует величезного 🧌троля!"],
            [you, "Якщо він мене помітить — буде непереливки. Треба діяти обережно."]
        ],
        choices: [
            { text: "🔨 Обвалити каміння Молотом, заблокувавши троля", requires: "Молот", next: "cave_alone_hammer" },
            { text: "🤫 Прокрастися у тіні за спиною троля", chance: 0.8, win: "cave_alone_win", lose: "cave_alone_lose" }
        ]
    },
    {
        id: "cave_alone_hammer",
        scene: "cave-animated.html",
        npc: "",
        give: "Гірський кристал",
        lines: [
            ["", "Удар Молота струшує склепіння, і кам'яна завіса відрізає троля! Серед уламків ти знаходиш сяючий Гірський кристал і виходиш до розвилки."]
        ],
        next: "forest_fork_choice"
    },
    {
        id: "cave_alone_win",
        scene: "cave-animated.html",
        npc: "",
        lines: [
            ["", "Ступаючи абсолютно безшумно, ти проходиш за спиною сонного велетня і вибираєшся з печери просто до розвилки."]
        ],
        next: "forest_fork_choice"
    },
    {
        id: "cave_alone_lose",
        scene: "cave-animated.html",
        lose: "Під ногою хруснув камінь. У тісній печері від розлюченого троля не втекти!"
    },

    // ==================== РОЗВИЛКА У ЛІСІ ====================
    {
        id: "forest_fork_choice",
        scene: "forest-fork-animated.html",
        npc: "",
        place: "fork",
        checkpoint: true,
        hint: "Окіно попереджав: права стежка веде до міста Роздоріж і Гір, а ліва — в небезпечну Ілюзію.",
        lines: [
            ["", "Ти стоїш перед стародавнім дороговказом на розвилці. Праворуч видніються вогні та вітряки укріпленого містечка Роздоріж."],
            ["", "Ліворуч стежка поринає у багряно-фіолетовий туман, звідки лунає таємничий гул."]
        ],
        choices: [
            { text: "➡️ Піти направо (до поселення Роздоріж та Гір Істерії)", next: "fork_town" },
            { text: "⬅️ Звернути наліво (випробувати долю на забороненій стежці)", next: "wrong_way_start" }
        ]
    },

    // ==================== МІСТО РОЗДОРІЖ ТА ПОБІЧНІ КВЕСТИ ====================
    {
        id: "fork_town",
        scene: "crossroads-town-animated.html",
        npc: s => s.flags.with_okino ? "okino-front.png" : "",
        place: "fork",
        checkpoint: true,
        hint: "У Роздоріжжі можна вилікуватися, покращити зброю у коваля та виконати полювання за головами.",
        lines: [
            ["", "Ти на головній площі поселення Роздоріж. Навколо шумлять крила вітряків, працюють ремісники й готуються до походів гравці."],
            [okino, "Раджу завітати до травниці — ти втратив чимало здоров'я у лісі, майстре.", s => s.flags.with_okino && s.hp < 70],
            [okino, "Тут ми можемо добре підготуватися перед підйомом на Гори Істерії.", s => s.flags.with_okino && s.hp >= 70],
            [you, "Варто підлікуватися й перевірити спорядження перед зустріччю з Окіно в горах.", s => !s.flags.with_okino]
        ],
        choices: [
            { text: "⚒️ Зайти до кузні Такеші (загартування зброї та карабін)", next: "town_blacksmith" },
            { text: "🌿 Відвідати травницю Мію біля вітряка (лікування та чутки)", next: "town_herbalist" },
            { text: "📜 Дошка оголошень: квест «Тінь Роздоріжжя»", next: "town_bounty", startQuest: "bounty" },
            { text: "🎴 Використати Талісман Самурая (+25 HP)", requires: "Талісман Самурая", take: "Талісман Самурая", hp: 25, next: "fork_town" },
            { text: "🏔️ Вирушати гірським трактом до Гарпунного Мосту", next: "road_to_harpoon_town" }
        ]
    },
    {
        id: "town_blacksmith",
        scene: "crossroads-town-animated.html",
        npc: "npc-takeshi.png",
        lines: [
            ["Коваль Такеші", "Ого, бачу у твоїх руках {weapon}! Якщо маєш рідкісні трофеї з лісу, я загартую твою зброю в плазмовому горні та дам Сталевий карабін для гірського гарпуна."],
            ["Коваль Такеші", "Також можеш сходити за частокіл міста і нарубати мені диких ліан для розпалу печі."]
        ],
        choices: [
            { text: "🐺 Віддати Ікло перевертня за карабін і покращення зброї", requires: "Ікло перевертня", take: "Ікло перевертня", give: "Сталевий карабін", next: "blacksmith_reward" },
            { text: "🐍 Віддати Отруйне ікло за карабін і покращення зброї", requires: "Отруйне ікло", take: "Отруйне ікло", give: "Сталевий карабін", next: "blacksmith_reward" },
            { text: "💎 Віддати Гірський кристал за карабін і покращення зброї", requires: "Гірський кристал", take: "Гірський кристал", give: "Сталевий карабін", next: "blacksmith_reward" },
            { text: "🌿 Нарубати ліан за мурами міста для коваля", next: "blacksmith_vines_task" },
            { text: "↩ Повернутися на площу Роздоріжжя", next: "fork_town" }
        ]
    },
    {
        id: "blacksmith_reward",
        scene: "crossroads-town-animated.html",
        npc: "npc-takeshi.png",
        hp: 15,
        set: { weapon_upgraded: true },
        lines: [
            ["Коваль Такеші", "Розкішний трофей! Тримай 🔗Сталевий карабін, а твоя зброя ({weapon}) тепер заряджена плазмою! Жоден Тіньовик чи Дракон не встоїть!"]
        ],
        next: "fork_town"
    },
    {
        id: "blacksmith_vines_task",
        scene: "vine-gate-animated.html",
        npc: "",
        hp: -10,
        give: "Міцна ліана",
        lines: [
            ["", "На узліссі біля воріт ти нарубав оберемок лози для кузні, а найміцнішу 🌿Міцну ліану залишив собі для гарпуна."]
        ],
        next: "fork_town"
    },
    {
        id: "town_herbalist",
        scene: "crossroads-town-animated.html",
        npc: "npc-mia.png",
        hp: 30,
        lines: [
            ["Травниця Мія", "Випий цього гарячого настою з вогнецвіту — рани загояться як на очах."],
            ["Травниця Мія", "До речі, кажуть, що в Лабіринті Дракона стоїть стародавній Кодовий Страж, який пропускає лише тих, хто знає головне число Верховної Імперії..."],
            [you, "Головне число Імперії? Здається, саме на 13-му рівні відкрився портал у цей світ! Дякую за підказку."]
        ],
        next: "fork_town"
    },
    {
        id: "town_bounty",
        scene: "forest-fork-animated.html",
        npc: "boss-shadow-stalker.png",
        lines: [
            ["", "Ти берешся за контракт «Тінь Роздоріжжя»: у сутінках на лісовій розвилці за містом чатує Лісовий Тіньовик, який викрадає енергію мандрівників."],
            ["", "Вже виконано! Старійшина дякує тобі за безпеку доріг.", s => s.quests.bounty === "done"]
        ],
        choices: [
            { text: "⚡ Знищити Тіньовика загартованою у коваля зброєю!", requires: "weapon_upgraded", next: "bounty_win_clean" },
            { text: "⚔️ Вистежити і вступити в бій із Лісовим Тіньовиком", chance: 0.75, win: "bounty_win", lose: "bounty_lose" },
            { text: "↩ Повернутися на площу", next: "fork_town" }
        ]
    },
    {
        id: "bounty_win_clean",
        scene: "crossroads-town-animated.html",
        npc: "npc-elder.png",
        give: "Еліксир Драконоборця",
        finishQuest: "bounty",
        lines: [
            ["", "Плазмовий заряд твоєї оновленої зброї ({weapon}) розтинає тіньовий панцир монстра з одного удару!"],
            ["", "Старійшина Роздоріжжя урочисто вручає тобі 🏆Еліксир Драконоборця."]
        ],
        next: "fork_town"
    },
    {
        id: "bounty_win",
        scene: "crossroads-town-animated.html",
        npc: "npc-elder.png",
        hp: -20,
        give: "Еліксир Драконоборця",
        finishQuest: "bounty",
        lines: [
            ["", "У важкому нічному поєдинку ти перемагаєш Лісового Тіньовика і здобуваєш головну нагороду від Старійшини — 🏆Еліксир Драконоборця!"]
        ],
        next: "fork_town"
    },
    {
        id: "bounty_lose",
        scene: "forest-fork-animated.html",
        lose: "Лісовий Тіньовик виявився надто стрімким у нічному тумані."
    },

    // ==================== НОВА ДОРОГА МІЖ РОЗДОРІЖЖЯМ ТА ГАРПУННИМ МОСТОМ (ЧЕРЕЗ 2 НОВИХ ФОНИ) ====================
    {
        id: "road_to_harpoon_town",
        scene: "crystal-road-animated.html",
        npc: "okino-front.png",
        hint: "Кам'янистий гірський тракт небезпечний через обвали, але веде прямісінько до мети.",
        lines: [
            [empire, "ЛОКАЦІЯ: ГІРСЬКИЙ ТРАКТ ТЕРАКАРАНИ. РИЗИК КАМЕНЕПАДУ."],
            [okino, "Ми залишаємо міські мури позаду, майстре {name}. Попереду кам'янистий тракт, що веде до Гарпунного Мосту.", s => s.flags.with_okino],
            [okino, "Ти дійшов сюди сам, майстре {name}! Але попереду найскладніша ділянка дороги біля урвища.", s => !s.flags.with_okino],
            ["", "Стежка різко звужується. Над головою нависають гострі скали, що загрожують обвалом."]
        ],
        choices: [
            { text: "🪨 Швидко пробігти небезпечну ділянку під час обвалу (шанс 70%)", chance: 0.7, win: "tract_pass_win", lose: "tract_pass_lose" },
            { text: "🌉 Звернути на безпечний обхідний місток у скелях", next: "tract_old_bridge" }
        ]
    },
    {
        id: "tract_pass_win",
        scene: "crystal-road-animated.html",
        npc: "okino-front.png",
        lines: [
            ["", "Ти робиш стрімкий ривок уперед якраз тоді, коли тонни каміння з гуркотом обрушуються позаду тебе!"],
            [okino, "Блискавична реакція, майстре! Ще секунда — і нас би засипало. Попереду вже видно ворота Гарпунного Мосту."]
        ],
        next: "merchant"
    },
    {
        id: "tract_pass_lose",
        scene: "mountain-track-animated.html",
        lose: "Каменепад на вузькому гірському тракті виявився надто потужним."
    },
    {
        id: "tract_old_bridge",
        scene: "mountain-gate-animated.html",
        npc: "",
        checkpoint: true,
        lines: [
            ["", "Ти обираєш стародавню гірську браму та навісний місток в обхід небезпечної ділянки."],
            [you, "Вітер тут шалений, але принаймні каміння на голову не падає. Ще трохи — і ми дістанемося торговця."]
        ],
        next: "merchant"
    },

    // ==================== ГАРПУННИЙ МІСТ ТА ГОРИ ІСТЕРІЇ ====================
    {
        id: "merchant",
        scene: "harpoon-market-animated.html",
        npc: ["okino-front.png", "npc-merchant.png"],
        place: "harpoon_town",
        checkpoint: true,
        hint: "Не купуй гарпун зі старим тросом без страховки — використай Міцну ліану або Сталевий карабін.",
        lines: [
            [okino, "Щоб піднятися на стрімкі 🏔️Гори Істерії, нам потрібен надійний гарпун або безпечний обхідний шлях."],
            ["Торговець", "Вітаю у Гарпунному Мості! Гарпунний механізм у мене справний, а от мотузка до нього лишилася тільки стара й перетерта..."],
            [okino, "На старій мотузці підійматися смертельно небезпечно! Але якщо ми маємо 🌿Міцну ліану або 🔗Сталевий карабін — ми скріпимо трос намертво."]
        ],
        choices: [
            { text: "🪝 Зібрати надійний гарпун із Міцною ліаною", requires: "Міцна ліана", take: "Міцна ліана", give: "Надійний гарпун", finishQuest: "harpoon", next: "harpoon_safe_climb" },
            { text: "🔗 Зібрати посилений гарпун зі Сталевим карабіном", requires: "Сталевий карабін", take: "Сталевий карабін", give: "Надійний гарпун", finishQuest: "harpoon", next: "harpoon_safe_climb" },
            { text: "🎲 Ризикнути й піднятися на старому потертому тросі торговця", chance: 0.35, win: "harpoon_lucky_climb", lose: "harpoon_snap_lose" },
            { text: "🧌 Відмовитися від гарпуна і шукати обхідну стежку в скелях", next: "mountain_troll_encounter" },
            { text: "🔙 Повернутися в Роздоріж за спорядженням", next: "fork_town" }
        ]
    },
    {
        id: "harpoon_safe_climb",
        scene: "harpoon-market-animated.html",
        npc: "okino-front.png",
        lines: [
            ["", "Гарпун зі свистом вгризається у скелю на вершині, і посилений трос легко підіймає вас над хмарами!"],
            [okino, "Погляньте, майстре {name}! Ось він — Лабіринт 🟥Червоного 🐉Дракона! Ви лише другий, хто дістався сюди живим!"]
        ],
        next: "labyrinth_entrance"
    },
    {
        id: "harpoon_lucky_climb",
        scene: "harpoon-market-animated.html",
        npc: "okino-front.png",
        hp: -20,
        finishQuest: "harpoon",
        lines: [
            ["", "За метр від вершини стара мотузка лускає! Ти в останню секунду чіпляєшся за виступ скелі, обдираючи руки до крові."],
            [okino, "Неймовірне везіння, майстре! Ми на вершині біля Лабіринту 🟥Червоного 🐉Дракона!"]
        ],
        next: "labyrinth_entrance"
    },
    {
        id: "harpoon_snap_lose",
        scene: "harpoon-market-animated.html",
        lose: "Старий потертий трос обірвався посеред підйому над гірською прірвою."
    },
    {
        id: "mountain_troll_encounter",
        scene: "harpoon-market-animated.html",
        npc: ["okino-front.png", "npc-mountain-troll.png"],
        hint: "Пам'ятай попередження травниці Мії про гірських тролів!",
        lines: [
            ["", "На вузькому карнизі вам заступає дорогу хитрий гірський 🧌Троль."],
            ["🧌Троль", "Гей, воїни! Навіщо мучитися на скелях? Ось за тією аркою є безкоштовний телепорт просто до вершини гори!"],
            [okino, "Щось мені не подобається його посмішка, майстре {name}."]
        ],
        choices: [
            { text: "🧿 Викрити брехню троля Амулетом Істини", requires: "Амулет Істини", next: "troll_exposed" },
            { text: "🔮 Просканувати арку «Зором Мудреця» Посоха", requires: "staff_wisdom", next: "troll_exposed" },
            { text: "🔨 Пригрозити тролю Молотом, щоб показав справжню стежку", requires: "hammer_power", next: "troll_exposed" },
            { text: "🌀 Довіритися тролю і ступити в телепорт", next: "troll_teleport_death" },
            { text: "↩ Повернутися до Гарпунного Мосту", next: "merchant" }
        ]
    },
    {
        id: "troll_exposed",
        scene: "harpoon-market-animated.html",
        npc: "okino-front.png",
        finishQuest: "harpoon",
        lines: [
            [you, "Ніякий це не телепорт, а магічна пастка над прірвою! Показуй справжній прохід, інакше матимеш справу зі мною!"],
            ["🧌Троль", "Ой-ой, тільки не бийте! Справжні кам'яні сходи сховані он за тим водоспадом!"],
            ["", "Таємними сходами ви з Окіно безпечно підіймаєтеся на саму вершину Гір Істерії."]
        ],
        next: "labyrinth_entrance"
    },
    {
        id: "troll_teleport_death",
        scene: "digital-tunnel.html",
        lose: "Ніколи не довіряй підозрілим незнайомцям у Горах Істерії! Телепорт вів у прірву."
    },

    // ==================== ГІЛКА 3: НЕПРАВИЛЬНИЙ ШЛЯХ (ХИТКИЙ МІСТ, БЕЗОДНЯ, ДИНОДОЛ, ІЛЮЗІЯ) ====================
    {
        id: "wrong_way_start",
        scene: "rope-bridge-animated.html",
        npc: "",
        place: "shaky_bridge",
        lines: [
            [empire, "ПОПЕРЕДЖЕННЯ: ВИ УВІЙШЛИ ДО СЕКТОРУ ПОШКОДЖЕНОГО КОДУ «ІЛЮЗІЯ»."],
            [you, "Окіно тут немає... Чорт, я звернув наліво! Саме про це він казав: «Там буде дещо страшніше за дракона»!"],
            ["", "Шлях назад заблоковано стіною червоних пікселів. Попереду над прірвою висить гнилий Хиткий Міст, а поруч веде крутий спуск у темну Безодню."]
        ],
        choices: [
            { text: "🌉 Перелетіти через Хиткий Міст завдяки «Рефлексу Блискавки»", requires: "katana_reflex", next: "shaky_bridge_win" },
            { text: "🏃🏼 Ризикнути й перебігти через трухлявий Хиткий Міст", chance: 0.6, win: "shaky_bridge_win", lose: "shaky_bridge_lose" },
            { text: "🕳️ Спуститися обхідним шляхом у темну Безодню", next: "abyss_descent" }
        ]
    },
    {
        id: "shaky_bridge_win",
        scene: "rope-bridge-animated.html",
        npc: "",
        lines: [
            ["", "Дошки падають у прірву просто з-під твоїх ніг, але ти встигаєш перестрибнути на протилежний виступ!"]
        ],
        next: "dino_valley_scene"
    },
    {
        id: "shaky_bridge_lose",
        scene: "rope-bridge-animated.html",
        lose: "Трухлявий міст обірвався над прірвою."
    },
    {
        id: "abyss_descent",
        scene: "rope-bridge-animated.html",
        npc: "enemy-abyss-wraith.png",
        place: "abyss",
        lines: [
            ["", "На дні Безодні під мостом панує крижана імла, в якій блукають голографічні фантоми переможених гравців 😨."]
        ],
        choices: [
            { text: "✨ Освітити Безодню кристалом Посоха", requires: "Посох", next: "abyss_staff_pass" },
            { text: "🧿 Прокласти шлях сяйвом Амулета Істини", requires: "Амулет Істини", next: "abyss_staff_pass" },
            { text: "🌑 Пробиратися крізь темряву навпомацки", chance: 0.7, win: "abyss_blind_win", lose: "abyss_blind_lose" }
        ]
    },
    {
        id: "abyss_staff_pass",
        scene: "rope-bridge-animated.html",
        npc: "",
        lines: [
            ["", "Яскраве світло розсіює фантомів Безодні, відкриваючи стародавній підйом до Динодолу."]
        ],
        next: "dino_valley_scene"
    },
    {
        id: "abyss_blind_win",
        scene: "rope-bridge-animated.html",
        npc: "",
        hp: -20,
        lines: [
            ["", "Крижані тіні витягують частину твоїх сил у темряві, але ти вперто видираєшся по скелях наверх!"]
        ],
        next: "dino_valley_scene"
    },
    {
        id: "abyss_blind_lose",
        scene: "rope-bridge-animated.html",
        lose: "Темрява Безодні поглинула твій аватар."
    },

    // ==================== ДИНОДОЛ ТА БРАМА ІЛЮЗІЇ ====================
    {
        id: "dino_valley_scene",
        scene: "dino-valley-animated.html",
        npc: "boss-dino-rex.png",
        place: "dino_valley",
        checkpoint: true,
        lines: [
            ["", "Земля двигтить від важкої ходи. Крізь гігантські папороті виходить 🦖кібер-тиранозавр із червоними очима!"],
            [you, "То ось що страшніше за дракона! А позаду нього височіє Брама Ілюзії, де сяє Катана-ключ🗝️!"]
        ],
        choices: [
            { text: "🥩 Кинути Ікло перевертня в хащі, щоб відволікти тиранозавра", requires: "Ікло перевертня", next: "dino_distract_win" },
            { text: "🤫 Спробувати безшумно проповзти у високій папороті", chance: 0.45, win: "dino_stealth_win", lose: "dino_spotted" },
            { text: "⚔️ Піти на прорив повз Динозавра!", next: "dino_spotted" }
        ]
    },
    {
        id: "dino_distract_win",
        scene: "dino-valley-animated.html",
        npc: "okino-front.png",
        place: "gate",
        lines: [
            ["", "Хижак чує здобич і з ревом кидається у протилежний бік долини! Біля самої Брами Ілюзії тебе раптом наздоганяє захеканий Окіно."],
            [okino, "Майстре {name}! Коли ви не з'явилися біля гір, я вирушив вашим слідом крізь Безодню. Добре, що ви цілі!"]
        ],
        next: "illusion_gate"
    },
    {
        id: "dino_stealth_win",
        scene: "dino-valley-animated.html",
        npc: "okino-front.png",
        place: "gate",
        lines: [
            ["", "Затамувавши подих, ти прослизаєш у тіні величезних папоротей просто до Брами Ілюзії, куди зі скель спускається Окіно!"],
            [okino, "Майстре {name}! Я пішов вашим слідом, щойно зрозумів, що ви звернули на лівий шлях!"]
        ],
        next: "illusion_gate"
    },
    {
        id: "dino_spotted",
        scene: "dino-valley-animated.html",
        npc: "okino-sword.png",
        hp: -25,
        lines: [
            ["", "Тиранозавр помічає тебе й ударом хвоста збиває з ніг! Та в останню мить із верхівки скелі стрибає Окіно!"],
            [okino, "Тримайтесь, майстре {name}! Я прикрию вас!"],
            ["", "Серією блискавичних ударів самурай засліплює гіганта й змушує його відступити."],
            [you, "Окіно! Ти прийшов мені на допомогу навіть тут?!"],
            [okino, "Коли вас не виявилося на Гарпунному Мості, я зрозумів, що ви потрапили в Ілюзію, і кинувся слідом. Швидше до Брами!"]
        ],
        next: "illusion_gate"
    },
    {
        id: "illusion_gate",
        scene: "illusion-gate-animated.html",
        npc: "okino-front.png",
        place: "gate",
        hint: "В Ілюзії код світу нестабільний — оглянь glitch-розлом у стіні, щоб дізнатися головну таємницю Імперії!",
        lines: [
            ["", "Перед вами здіймається мерехтлива Брама Ілюзії. Але ліворуч від неї повітря тріщить: крізь діру в текстурах видно гігантське неонове місто з літаючими болідами!"],
            [okino, "Дивно... Раніше цього розлому тут не було. Схоже, сама Верховна Імперія тремтить від твоєї присутності, майстре {name}."]
        ],
        choices: [
            { text: "👁️ Зазирнути у Розлом Коду (Секрет Ілюзії)", next: "illusion_secret_vision" },
            { text: "🚪 Увійти до залу Ілюзії", next: "illusion_gate_trial" },
            { text: "↩ Повернутися до Динодолу", next: "dino_valley_scene" }
        ]
    },
    {
        id: "illusion_secret_vision",
        scene: "arcade-empire-portal.html",
        keepScene: true,
        npc: "",
        give: "Фрагмент Ядра",
        set: { saw_unagami: true },
        lines: [
            ["", "Ти підходиш до розлому, і крізь потік червоних цифр бачиш величний тронний зал у центрі мегаполіса Тератехніка."],
            ["❓ Імператор Унагамі", "Теракарана — це лише фільтр для слабких. Нехай цей гравець забирає Катану-ключ... У Тератехніці на нього чекають мої Червоні Візори та Спідвей П'яти Мільярдів!"],
            [you, "То ось хто керує грою — Унагамі! І з розлому щойно випав ⚡Фрагмент Ядра!"],
            ["", "Розлом із тріском затягується. Тепер ти знаєш, що вихід із Теракарани — це лише початок великої війни."]
        ],
        next: "illusion_gate_trial"
    },
    {
        id: "illusion_gate_trial",
        scene: "illusion-gate-animated.html",
        npc: "okino-front.png",
        place: "illusion",
        hint: "Справжній код Теракарани має холодне неоново-блакитне світіння.",
        lines: [
            ["", "У залі Ілюзії на двох постаментах ширяють ДВІ Катани-ключі: одна сліпучо-золота, а інша — неоново-блакитна."],
            [okino, "Це остання пастка Ілюзії, майстре! Лише один клинок справжній, а інший — вибухова голограма."]
        ],
        choices: [
            { text: "🧿 Подивитися крізь Амулет Істини", requires: "Амулет Істини", next: "illusion_true_choice" },
            { text: "🔮 Визначити справжній меч «Зором Мудреця»", requires: "staff_wisdom", next: "illusion_true_choice" },
            { text: "🗡️ Взяти неоново-блакитну Катану-ключ", next: "illusion_true_choice" },
            { text: "✨ Схопити сліпучо-золоту Катану-ключ", next: "illusion_trap_lose" }
        ]
    },
    {
        id: "illusion_trap_lose",
        scene: "illusion-gate-animated.html",
        npc: "",
        lose: "Золота катана виявилася вибуховою голограмою Ілюзії!"
    },
    {
        id: "illusion_true_choice",
        scene: "illusion-gate-animated.html",
        npc: "okino-front.png",
        give: "Катана-ключ",
        finishQuest: "key",
        lines: [
            ["", "Твої пальці стискають руків'я неоново-блакитної Катани-ключа! Стіни Ілюзії розсипаються, відкриваючи портал виходу."],
            [okino, "Ти пройшов крізь Ілюзію і вижив, майстре! Але я відчуваю, що ця перемога привернула увагу самого творця Імперії...", s => s.flags.saw_unagami]
        ],
        next: "victory_portal"
    },

    // ==================== ЛАБІРИНТ ЧЕРВОНОГО ДРАКОНА (ОСНОВНИЙ ШЛЯХ) ====================
    {
        id: "labyrinth_entrance",
        scene: "labyrinth-animated.html",
        npc: "okino-front.png",
        place: "labyrinth",
        checkpoint: true,
        hint: "Підніми меч Першого майстра — це ключ до розкриття таємниці Окіно.",
        lines: [
            [empire, "СЕКТОР БОСА: ЛАБІРИНТ ЧЕРВОНОГО ДРАКОНА."],
            [okino, "У цьому лабіринті безліч пасток, майстре. Стривайте... погляньте на підлогу біля колони."],
            ["", "Серед обпаленого каміння лежить тріснутий самурайський клинок зі знайомим гербом."]
        ],
        choices: [
            { text: "🗡️ Підняти Меч Першого майстра і передати Окіно", give: "Меч Першого майстра", finishQuest: "memory", next: "labyrinth_memory_awakened" },
            { text: "🏃🏼 Не затримуватися і йти далі коридором", next: "labyrinth_riddle" }
        ]
    },
    {
        id: "labyrinth_memory_awakened",
        scene: "labyrinth-animated.html",
        npc: "okino-sword.png",
        set: { okino_awakened: true },
        lines: [
            ["", "Щойно Окіно торкається старого клинка, його очі спалахують яскравим бірюзовим світлом!"],
            [okino, "Я... я згадав усе! Верховна Імперія стирала мені пам'ять щоразу, коли дракон перемагав моїх друзів, змушуючи мене вічно карати себе!"],
            [okino, "Дякую, {name}! Ти звільнив мій розум від ланцюгів коду. Тепер я битимуся на повну силу!"]
        ],
        next: "labyrinth_riddle"
    },
    {
        id: "labyrinth_riddle",
        scene: "labyrinth-animated.html",
        npc: "okino-front.png",
        hint: "Пригадай, після якого рівня в ігровому автоматі відкрився портал у Верховну Імперію.",
        lines: [
            ["", "Шлях до лігва Дракона перегороджують масивні лазерні ворота з кодовою панеллю."],
            [empire, "ВВЕДІТЬ НОМЕР РІВНЯ, ЩО ВІДКРИВАЄ БРАМУ ВЕРХОВНОЇ ІМПЕРІЇ. ПОМИЛКА АКТИВУЄ ЗАХИСНІ ТУРЕЛІ."]
        ],
        choices: [
            { text: "🔢 Ввести число «13»", next: "labyrinth_riddle_right" },
            { text: "🔢 Ввести число «7»", next: "labyrinth_riddle_wrong" },
            { text: "🔢 Ввести число «99»", next: "labyrinth_riddle_wrong" }
        ]
    },
    {
        id: "labyrinth_riddle_right",
        scene: "labyrinth-animated.html",
        npc: "okino-front.png",
        lines: [
            [empire, "КОД ПРИЙНЯТО. ДОСТУП ДО ТРОННОГО ЗАЛУ ДРАКОНА ДОЗВОЛЕНО."],
            [okino, "Блискуча пам'ять, майстре {name}! Ворота відчинилися без жодного пострілу."]
        ],
        next: "dragon_lair"
    },
    {
        id: "labyrinth_riddle_wrong",
        scene: "labyrinth-animated.html",
        npc: "okino-sword.png",
        hp: -15,
        lines: [
            [empire, "ПОМИЛКА КОДУ! АКТИВОВАНО ЛАЗЕРНИЙ ЗАЛП!"],
            ["", "Лазерні турелі обпікають тебе, перш ніж Окіно розрубує панель керування і силоміць підіймає решітку."]
        ],
        next: "dragon_lair"
    },
    {
        id: "dragon_lair",
        scene: "dragon-lair-animated.html",
        npc: ["okino-front.png", "boss-red-dragon.png"],
        place: "labyrinth",
        checkpoint: true,
        hint: "Ти можеш спробувати вкрасти ключ тихо або використати знання зі щоденника Першого майстра в бою.",
        lines: [
            ["", "Посеред величезного залу на кам'яному троні 💤спить колосальний 🟥Червоний 🐉Дракон. Прямо перед ним у п'єдесталі сяє Катана-ключ🗝️."],
            [okino, "Якщо пощастить, ти витягнеш Катану-ключ безшумно. А якщо почнеться бій — пам'ятай про слабке місце на його спині!"]
        ],
        choices: [
            { text: "🏆 Випити Еліксир Драконоборця і завдати нищівного удару!", requires: "Еліксир Драконоборця", take: "Еліксир Драконоборця", next: "dragon_epic_slay" },
            { text: "⚔️ Атакувати разом із пробудженим Окіно подвійним ударом!", requires: "Печатка Пробудження", next: "dragon_epic_slay" },
            { text: "🤫 Спробувати викрасти Катану-ключ безшумно", chance: 0.5, win: "dragon_stealth_win", lose: "dragon_awakes" },
            { text: "🔥 Кинути виклик Дракону у відкритому бою!", next: "dragon_awakes" }
        ]
    },
    {
        id: "dragon_stealth_win",
        scene: "dragon-lair-animated.html",
        npc: "okino-front.png",
        give: "Катана-ключ",
        finishQuest: "key",
        lines: [
            ["", "Рухаючись немов тінь, ти підходиш до самого п'єдесталу і нечутно витягуєш 🗝️Катану-ключ! Дракон навіть не ворухнувся."],
            [okino, "Неймовірна витримка, майстре {name}! Катана-ключ у наших руках!"]
        ],
        next: "victory_portal"
    },
    {
        id: "dragon_epic_slay",
        scene: "dragon-lair-animated.html",
        npc: "okino-sword.png",
        give: "Катана-ключ",
        finishQuest: "key",
        lines: [
            ["", "Ти злітаєш на спину Червоного Дракона і встромляєш {weapon} точно у вразливе ядро під третьою лускою! Страж Імперії розсипається на мільйони червоних кубів коду!"],
            [okino, "Він упав! Ви помстилися за всіх полеглих майстрів, {name}! Беріть 🗝️Катану-ключ!"]
        ],
        next: "victory_portal"
    },
    {
        id: "dragon_awakes",
        scene: "dragon-lair-animated.html",
        npc: ["okino-sword.png", "boss-red-dragon.png"],
        lines: [
            ["", "🟥Червоний 🐉Дракон розплющує палаючі очі й здіймається під склепіння залу, набираючи в груди полум'я!"],
            [okino, "Він готує вогняний шторм! Цілься у слабке місце на хребті, а я відверну його удар на себе!"]
        ],
        choices: [
            { text: "🎯 Вдарити точно під третю луску на спині (знання зі щоденника)", requires: "dragon_secret", next: "dragon_epic_slay" },
            { text: "🎴 Прикритися Талісманом Самурая від полум'я і контратакувати!", requires: "Талісман Самурая", take: "Талісман Самурая", next: "dragon_epic_slay" },
            { text: "⚡ Пробити луску на грудях загартованою зброєю коваля!", requires: "weapon_upgraded", next: "dragon_epic_slay" },
            { text: "1️⃣ Перекотитися під лапою і стрибнути на спину", chance: 0.7, win: "dragon_epic_slay", lose: "dragon_burn_lose" },
            { text: "2️⃣ Спробувати відбити вогняний потік зброєю ({weapon})", chance: 0.45, win: "dragon_epic_slay", lose: "dragon_burn_lose" }
        ]
    },
    {
        id: "dragon_burn_lose",
        scene: "dragon-lair-animated.html",
        lose: "Вогняний шторм Червоного Дракона спопелив арену."
    },

    // ==================== ФІНАЛ ЧАСТИНИ 1 ТА МІСТОК ДО ЧАСТИНИ 2 ====================
    {
        id: "victory_portal",
        scene: "illusion-gate-animated.html",
        npc: "okino-front.png",
        lines: [
            [empire, "КРИТИЧНА ПОМИЛКА СИСТЕМИ: КАТАНУ-КЛЮЧ АКТИВОВАНО. БРАМА ВИХОДУ ВІДЧИНЯЄТЬСЯ."],
            [okino, "Ти зробив те, чого не зміг жоден мій попередній учень, {name}. Прокляття Поля Мечів назавжди знято."],
            [okino, "Ця Катана-ключ може повернути тебе додому в реальний світ... або відчинити Браму до серця Верховної Імперії — неонового міста Тератехніка."],
            [okino, "А якщо використати Печатку Пробудження або Фрагмент Ядра з Ілюзії — ми взагалі можемо зламати сервер Теракарани просто зараз!", s => s.flags.okino_awakened || s.flags.saw_unagami]
        ],
        choices: [
            { text: "⚡ Встромити Катану-ключ і Фрагмент Ядра в Браму — кинути виклик Унагамі!", requires: "Фрагмент Ядра", next: "victory_illusion_overload" },
            { text: "🔓 Звільнити душі всіх гравців Поля Мечів разом із пробудженим Окіно!", requires: "Печатка Пробудження", next: "victory_secret_hack" },
            { text: "🏠 Повернутися через портал додому в реальний світ", next: "victory_real_world" },
            { text: "⚔️ Піти з Окіно далі — у мегаполіс Тератехніка!", next: "victory_stay_okino" }
        ]
    },

    // --- Фінал 1 ---
    {
        id: "victory_illusion_overload",
        scene: "arcade-empire-portal.html",
        keepScene: true,
        npc: "okino-sword.png",
        set: { part2_unlocked: true, ending_overload: true },
        lines: [
            ["", "Ти з'єднуєш 🗝️Катану-ключ із ⚡Фрагментом Ядра, який здобув у Розломі Ілюзії! Браму пронизує золотий стовп енергії!"],
            [empire, "ТРИВОГА! ГРАВЕЦЬ {name} ЗЛАМАВ ЗАХИСНИЙ ПЕРИМЕТР ІМПЕРІЇ!"],
            ["❓ Імператор Унагамі", "Отже, ти бачив мій світ крізь Ілюзію і не злякався? Що ж, майстре {name}... Чекаю на тебе в Тератехніці. Подивимось, чи виживеш ти у перегонах «Спідвей П'яти Мільярдів»!"],
            [okino, "Сам володар Імперії кинув нам виклик! Готуйся, друже — наша головна битва попереду!"],
            ["", "🏆 ФІНАЛ 1 ІЗ 4: «ВИКЛИК ІМПЕРАТОРУ». ДАЛІ БУДЕ У «TERRA KARANA II: ТЕРАТЕХНІКА»!"]
        ]
    },

    // --- Фінал 2 ---
    {
        id: "victory_secret_hack",
        scene: "sword-field-animated.html",
        keepScene: true,
        npc: ["okino-sword.png", "npc-traveler.png", "npc-elder.png"],
        set: { part2_unlocked: true, ending_liberator: true },
        lines: [
            ["", "Ти і Окіно одночасно встромляєте Катану-ключ та Меч Першого майстра у центр Поля Мечів!"],
            ["", "Сотні мечів навколо вас перетворюються на сяючих воїнів — усі полонені гравці оживають і підіймають зброю на вашу честь!"],
            [empire, "УВАГА ВСІМ ЗАГОНАМ ЧЕРВОНИХ ВІЗОРІВ! У СЕКТОРІ ТЕРАКАРАНА СПАЛАХНУЛО ПОВСТАННЯ НА ЧОЛІ З ГРАВЦЕМ {name}!"],
            [okino, "Тепер у нас є ціла армія вільних майстрів, {name}! Час рушати на столицю Верховної Імперії — Тератехніку!"],
            ["", "🏆 ФІНАЛ 2 ІЗ 4: «ВИЗВОЛИТЕЛЬ ДУШ». ДАЛІ БУДЕ У «TERRA KARANA II: ТЕРАТЕХНІКА»!"]
        ]
    },

    // --- Фінал 3 ---
    {
        id: "victory_real_world",
        scene: "arcade-city-animated.html",
        keepScene: true,
        npc: "",
        set: { part2_unlocked: true, ending_returned: true },
        lines: [
            ["", "Спалах цифрового тунелю виносить тебе назад у нічний зал ігрових автоматів. На екрані сяє напис: «ВИ ПЕРЕМОГЛИ!»."],
            [you, "Фух... Я вдома! Оце так прогулявся!"],
            ["", "Ти вже розвертаєшся до виходу, аж раптом усі ліхтарі на вулиці гаснуть, а екран автомата позаду тебе спалахує криваво-червоним кодом!"],
            [empire, "СИНХРОНІЗАЦІЮ ЗАВЕРШЕНО. ПОРТАЛ ДО ТЕРАТЕХНІКИ ВІДКРИТО..."],
            ["", "З екрана простягається напівпрозора рука Окіно: «Майстре {name}! Унагамі готує вторгнення зі своєї столиці! Нам знову потрібна твоя допомога!»"],
            ["", "🏆 ФІНАЛ 3 ІЗ 4: «ПРОРИВ РЕАЛЬНОСТІ». ДАЛІ БУДЕ У «TERRA KARANA II: ТЕРАТЕХНІКА»!"]
        ]
    },

    // --- Фінал 4 ---
    {
        id: "victory_stay_okino",
        scene: "arcade-city-animated.html",
        keepScene: true,
        npc: "okino-front.png",
        set: { part2_unlocked: true, ending_companion: true },
        lines: [
            [you, "Я не залишу тебе самого, Окіно. Ми підемо далі й разом повалимо Верховну Імперію!"],
            ["", "Ви проходите крізь Браму Теракарани й опиняєтеся на високому карнизі над безмежним кібер-мегаполісом, де серед хмарочосів мчать реактивні спідвери."],
            [okino, "Ласкаво просимо до Тератехніки, майстре {name}. Тут правлять Червоні Візори, а щоб дістатися палацу Унагамі, нам доведеться виграти найнебезпечнішу гонку у світі!"],
            ["", "🏆 ФІНАЛ 4 ІЗ 4: «ШЛЯХ САМУРАЯ». ДАЛІ БУДЕ У «TERRA KARANA II: ТЕРАТЕХНІКА»!"]
        ]
    }
];
const W = 1672, H = 941, st = document.getElementById('st'), cv = document.getElementById('cv');
// [x,y,size,color,period,delay,alpha]
const L = [[430, 315, 520, '#ffb23c', 6, 0, .5], [430, 315, 200, '#fff0a0', 4.5, .4, .55],
[1110, 120, 560, '#7fb0ff', 9, 0, .28], [983, 57, 120, '#dfe8ff', 5, .5, .4],
[65, 300, 260, '#19e0ff', 2.8, 0, .7], [305, 420, 230, '#c04aff', 3.4, .5, .7], [110, 600, 380, '#4a6bff', 3.1, .2, .75], [190, 770, 230, '#19e0ff', 2.6, .9, .65],
[620, 795, 170, '#b04aff', 3.0, .3, .7], [1620, 420, 400, '#4a8bff', 3.3, .7, .7], [1470, 510, 170, '#19e0ff', 2.7, .1, .6], [1590, 500, 150, '#6aa8ff', 3.6, 1, .5],
[430, 700, 300, '#ff4a1c', 2.8, 0, .55], [750, 690, 200, '#ff5a1c', 3.2, .8, .55], [905, 700, 110, '#ff4a1c', 2.5, .4, .5], [1470, 700, 300, '#ff3a1c', 3.0, .6, .55], [1205, 730, 200, '#ff4a1c', 3.4, .2, .55],
[1225, 160, 90, '#ffa02c', 2.9, .3, .7], [1290, 300, 90, '#ffa02c', 3.5, .9, .6], [1255, 250, 80, '#ffa02c', 3.1, .6, .5],
[1020, 690, 200, '#6ae0ff', 4, 0, .35]];
L.forEach(([x, y, s, c, d, dl, a]) => {
    const e = document.createElement('div'); e.className = 'g';
    e.style.cssText = `left:${x / W * 100}%;top:${y / H * 100}%;width:${s / W * 100}%;--c:${c};--d:${d}s;--dl:${dl}s;--a:${a}`;
    st.insertBefore(e, cv)
});
const x = cv.getContext('2d'), k = .5, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
// spores: [x,y,colors]
const src = [[65, 300, ['#19e0ff', '#aef6ff']], [305, 420, ['#c04aff', '#f0b0ff']], [110, 600, ['#4a6bff', '#19e0ff', '#d0b0ff']], [190, 770, ['#19e0ff']],
[620, 795, ['#b04aff']], [1620, 420, ['#4a8bff', '#19e0ff']], [1470, 510, ['#19e0ff']], [430, 700, ['#ffb04a', '#ff5a1c']], [1470, 700, ['#ffb04a', '#ff5a1c']], [750, 690, ['#ffb04a']], [1205, 730, ['#ffb04a']]];
const mk = i => {
    const s = src[i % src.length], c = s[2]; return {
        x: s[0] * k + (Math.random() - .5) * 40, y: s[1] * k + (Math.random() - .5) * 20, vy: .12 + Math.random() * .3, ph: Math.random() * 6,
        life: 0, max: 140 + Math.random() * 180, c: c[Math.random() * c.length | 0], z: Math.random() < .2 ? 3 : 2
    }
};
const P = Array.from({ length: 90 }, (_, i) => { const p = mk(i); p.life = Math.random() * p.max; return p });
// pixel flyers
const A = ["1.......1", ".1.....1.", ".11...11.", "..11111..", "....1...."], B = ["....1....", "..11111..", ".11...11.", "11.....11", "1.......1"];
const F = [{ y: 110, a: 30, s: .5, x: -20, sc: 3 }, { y: 150, a: 20, s: .33, x: 300, sc: 2 }, { y: 95, a: 14, s: .25, x: 600, sc: 2 }];
function fly(t) {
    F.forEach((b, i) => {
        b.x += b.s; if (b.x > cv.width + 20) b.x = -30;
        const yy = b.y + Math.sin(t / 900 + i * 2) * b.a, fr = ((t / (260 + i * 40)) | 0) % 2 ? A : B;
        x.globalAlpha = .9; x.fillStyle = '#10163a';
        fr.forEach((r, j) => [...r].forEach((c, m) => { if (c === '1') x.fillRect((b.x + m * b.sc) | 0, (yy + j * b.sc) | 0, b.sc, b.sc) }))
    })
}
let menuOn = true;
window.setMenuAnimation = on => { menuOn = on; if (on && !still) requestAnimationFrame(f); };
function f(t) {
    x.clearRect(0, 0, cv.width, cv.height);
    P.forEach((p, i) => {
        p.life++; p.y -= p.vy; p.x += Math.sin(p.life / 25 + p.ph) * .3; if (p.life > p.max) Object.assign(p, mk(i));
        const u = p.life / p.max; x.globalAlpha = Math.sin(Math.PI * u) * .9; x.fillStyle = p.c; x.fillRect(p.x | 0, p.y | 0, p.z, p.z)
    });
    fly(t || 0); x.globalAlpha = 1; if (!still && menuOn) requestAnimationFrame(f)
}
requestAnimationFrame(f);


document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const continueBtn = document.getElementById('continueBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const modalAbout = document.getElementById('modal-about');
    const modalSettings = document.getElementById('modal-settings');
    const closeAboutModal = document.getElementById('close-about-modal');
    const closeSettingsModal = document.getElementById('close-settings-modal');
    const menu = document.getElementById('menu');
    const volume = document.getElementById('volume');
    const volumetxt = document.getElementById('volumetxt');
    const music = document.getElementById('music');
    const musictxt = document.getElementById('musictxt');
    const difficultySelect = document.getElementById('difficulty');
    const hintsToggle = document.getElementById('hintsToggle');
    const autosaveToggle = document.getElementById('autosaveToggle');
    const applySettingsBtn = document.getElementById('applySettingsBtn');
    const resetSettingsBtn = document.getElementById('resetSettingsBtn');
    const storageKey = 'terra-karana-settings';
    const modalContinue = document.getElementById('modal-continue');
    const closeContinueModal = document.getElementById('close-continue-modal');
    const bgMusic = document.getElementById('bg-music');
    const dieSound1 = document.getElementById('die-sound1');
    const dieSound2 = document.getElementById('die-sound2');
    const dieSound3 = document.getElementById('die-sound3');
    const menuBtn = document.getElementById('menuBtn');

    const defaultSettings = { volume: 70, music: 60, difficulty: 'Звичайна', hints: true, autosave: true };

    const readSettings = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
            return { ...defaultSettings, ...saved };
        } catch {
            return { ...defaultSettings };
        }
    };

    const saveSettings = (settings = getCurrentSettings()) => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(settings));
        } catch {
            console.warn('Не вдалося зберегти налаштування');
        }
    };

    const getCurrentSettings = () => ({
        volume: Number(volume.value),
        music: Number(music.value),
        difficulty: difficultySelect.value,
        hints: hintsToggle.checked,
        autosave: autosaveToggle.checked
    });

    const applySettingsToForm = (settings) => {
        volume.value = settings.volume;
        volumetxt.textContent = `${settings.volume}%`;

        music.value = settings.music;
        musictxt.textContent = `${settings.music}%`;

        difficultySelect.value = settings.difficulty;
        hintsToggle.checked = Boolean(settings.hints);
        autosaveToggle.checked = Boolean(settings.autosave);
    };

    const closeAllModals = () => {
        modalAbout.style.display = 'none';
        modalSettings.style.display = 'none';
        modalContinue.style.display = 'none';
        menu.style.display = 'flex';
    };

    applySettingsToForm(readSettings());

    dieSound1.volume = readSettings().volume / 100;
    dieSound2.volume = readSettings().volume / 100;
    dieSound3.volume = readSettings().volume / 100;
    bgMusic.volume = readSettings().music / 100;
    bgMusic.muted = false;

    const startBackgroundMusic = () => {
        bgMusic.volume = readSettings().music / 100;
        bgMusic.play().catch(() => { /* autoplay blocked until user interaction */ });
    };

    startBackgroundMusic();

    document.addEventListener('pointerdown', startBackgroundMusic, { once: true });

    function syncSettingValue(input, label) {
        label.textContent = `${input.value}%`;
        if (autosaveToggle.checked) {
            saveSettings(getCurrentSettings());

            dieSound1.volume = readSettings().volume / 100;
            dieSound2.volume = readSettings().volume / 100;
            dieSound3.volume = readSettings().volume / 100;
            bgMusic.volume = readSettings().music / 100;
        }
    }

    volume.addEventListener('input', () => syncSettingValue(volume, volumetxt));
    music.addEventListener('input', () => syncSettingValue(music, musictxt));

    difficultySelect.addEventListener('change', () => {
        if (autosaveToggle.checked) {
            saveSettings(getCurrentSettings());
        }
    });

    hintsToggle.addEventListener('change', () => {
        if (autosaveToggle.checked) {
            saveSettings(getCurrentSettings());
        }
    });

    autosaveToggle.addEventListener('change', () => {
        saveSettings(getCurrentSettings());
    });

    applySettingsBtn.addEventListener('click', () => {
        saveSettings(getCurrentSettings());
    });

    resetSettingsBtn.addEventListener('click', () => {
        applySettingsToForm(defaultSettings);
        saveSettings(defaultSettings);
    });

    aboutBtn.addEventListener('click', () => {
        closeAllModals();
        modalAbout.style.display = 'block';
        menu.style.display = 'none';
    });

    settingsBtn.addEventListener('click', () => {
        closeAllModals();
        modalSettings.style.display = 'block';
        menu.style.display = 'none';
    });

    continueBtn.addEventListener('click', () => {
        closeAllModals();
        modalContinue.style.display = 'block';
        menu.style.display = 'none';
    });

    closeAboutModal.addEventListener('click', closeAllModals);
    closeSettingsModal.addEventListener('click', closeAllModals);
    closeContinueModal.addEventListener('click', closeAllModals);

    modalAbout.addEventListener('click', (event) => {
        if (event.target === modalAbout) closeAllModals();
    });

    modalSettings.addEventListener('click', (event) => {
        if (event.target === modalSettings) closeAllModals();
    });

    modalContinue.addEventListener('click', (event) => {
        if (event.target === modalContinue) closeAllModals();
    });

});