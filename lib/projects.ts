export interface ProjectData {
	id: number
	year: string
	title: string
	desc: string
	features?: string[]
	gallery?: { caption: string; image?: string }[]
	hook: string
	icon: string
	tech: string[]
	logo?: string
	github?: string
	category: string
	colorFrom: string
	colorTo: string
	hoverText: string
	badgeBg: string
	badgeText: string
	badgeHover: string
}

export const PROJECTS_DATA: Record<'ua' | 'en', ProjectData[]> = {
	ua: [
		{
			id: 1,
			year: '2026',
			title: 'UZ Ticket Hunter',
			desc: 'Квитки на потрібний потяг УЗ розкуповують за хвилини після появи, а сайт часто "падає" під навантаженням. Бот сам відкриває сторінку бронювання в реальному браузері, обходить перевірку Cloudflare, перебирає задані дати й миттєво шле знахідку в Telegram — керування повністю через inline-меню, без стороннього застосунку.',
			tech: [
				'Python',
				'SeleniumBase',
				'BeautifulSoup',
				'pyTelegramBotAPI',
				'SQLite',
			],
			category: 'Боти',
			colorFrom: 'from-blue-400',
			colorTo: 'to-blue-600',
			badgeBg: 'bg-blue-50',
			badgeText: 'text-blue-600',
			logo: '/projects/uz-ticket-hunter/logo.png',
			github: 'https://github.com/rroycce/UZ_tickets_hunter',
			hook: 'Слідкує за квитками, поки ви спите',
			icon: '🚆',
			hoverText: 'group-hover:text-cyan-500',
			badgeHover:
				'hover:bg-blue-100 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]',
			features: [
				'Повний "Термінал пошуку" — маршрут, дати, ціна, час прибуття та фільтри налаштовуються inline-кнопками прямо в Telegram',
				'Розумне групування місць: будь-які вільні, парами, 2+2, купе по 4 — окремо для звичайних і бокових місць у плацкарті',
				'Режим "Тривога" на обрані дати — до 15 повторних сповіщень поспіль, щоб точно не пропустити',
				'Детектор масового викиду квитків (10+ місць одночасно) з окремим алертом і логом у файл',
				'Сповіщення про розкуплені місця — бот "закреслює" зниклі квитки, а не просто мовчить',
				'SQLite-синхронізація між циклами: у чат летять лише справді нові знахідки, без повторного спаму',
				'Автообхід захисту сайту від ботів та адаптивна пауза при збоях (45-90с у нормі, 3 хв при помилці)',
				'Автоматичний перезапуск браузера, якщо той "завис" довше 5 хвилин',
			],
			gallery: [
				{
					caption:
						'Термінал пошуку — весь інтерфейс керування ботом одразу в Telegram, без стороннього застосунку. Тут задається маршрут, конкретні дати чи ковзний діапазон днів, режим "Тривога" для пріоритетних дат, типи вагонів (Купе/Плацкарт) і спосіб групування місць.',
					image: '/projects/uz-ticket-hunter/dashboard.png',
				},
				{
					caption:
						'Приклад сповіщення про нові місця. Бот показує номер потяга, час відправлення й прибуття, вагон, конкретні номери вільних місць та ціну — і одразу додає пряме посилання на сторінку бронювання УЗ.',
					image: '/projects/uz-ticket-hunter/notification.png',
				},
				{
					caption:
						'Детектор масового викиду квитків — окремий гучний алерт, коли на конкретний потяг і дату одразу відкривається 10 і більше місць.',
					image: '/projects/uz-ticket-hunter/mass-release.png',
				},
			],
		},
		{
			id: 2,
			year: '2025',
			title: 'AutoCRM — СТО "ApexMotors"',
			desc: "Клієнт-серверна система на Django (MVT-архітектура) з реляційною БД через Django ORM. Об'єднує публічний лендінг з розумною ідентифікацією авто за номерним знаком, Kanban-дошку менеджера з жорстким розмежуванням прав, мобільний кабінет механіка та фінансову аналітику складу — весь цикл СТО, від заявки клієнта до акту виконаних робіт, в одному застосунку.",
			tech: ['Django', 'SQLite', 'Bootstrap', 'JavaScript', 'FullCalendar.js'],
			category: 'CRM',
			colorFrom: 'from-red-400',
			colorTo: 'to-red-600',
			badgeBg: 'bg-red-50',
			badgeText: 'text-red-600',
			hook: 'Від заявки на сайті до зарплати механіка — кожен крок в одній системі',
			icon: '🔧',
			logo: '/projects/autocrm/logo.png',
			hoverText: 'group-hover:text-cyan-500',
			badgeHover:
				'hover:bg-emerald-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
			features: [
				'Розумна ідентифікація авто — клієнту достатньо ввести номерний знак: бекенд через requests і BeautifulSoup4 миттєво парсить відкриті бази (Baza-GAI, Hotline Finance) і витягує марку, модель, рік, колір, VIN та фото автомобіля',
				"Асинхронна відправка заявки JSON-пакетом — нове замовлення одразу з'являється на дошці менеджера без перезавантаження сторінки",
				'Kanban-дошка менеджера (Нові → В роботі → Готово → Видано) з жорстким розмежуванням прав — перевести авто "В роботі" чи "Готово" може лише механік, менеджер керує лише фінальним переміщенням',
				'Лайв-моніторинг боксів/підйомників — стан кожного посту (вільний/зайнятий) та історія останніх 10 заїздів, що виключає направлення двох авто на один пост',
				'Візуальний календар на FullCalendar.js з кольоровим кодуванням статусів і автоматичним розрахунком довжини блоку на основі норма-годин послуги',
				'Захист від колізій у розкладі — замовлення, взяті в роботу, програмно блокуються для перетягування, щоб зберегти достовірність історії',
				'Mobile-first кабінет механіка — ізольоване середовище лише з призначеними авто, кастомний 3-денний міні-календар на чистому JS з мініатюрними номерними знаками',
				'Безпаперовий процес ремонту — кнопка "Взяти авто" запускає облік часу боксу, після завершення механік сам обирає виконані послуги й запчастини',
				'Мотивація в реальному часі — баланс зароблених коштів механіка виводиться в шапці кабінету, при завершенні ремонту бекенд автоматично рахує % від суми послуг у SalaryLog',
				'Фінансова аналітика складу — 5 живих метрик (залишок, вкладені кошти, очікувана каса, потенційний і реалізований прибуток) з автосписанням запчастин при використанні',
				'Контроль дефіциту — деталі з залишком менше 5 шт підсвічуються окремо, поповнення через AJAX-діалог без переходу на іншу сторінку',
				'Генерація акту виконаних робіт (А4) прямо в браузері клієнта через html2pdf.js — без навантаження на сервер, з друком чи збереженням у PDF одним кліком',
			],
			gallery: [
				{
					caption:
						'Публічний лендінг СТО — каталог послуг (ремонт двигуна, ходова, автоелектрика, ТО) та форма швидкого запису. Клієнту достатньо вказати номер авто: система сама розпізнає марку, колір, рік випуску та фото машини з відкритих баз, а обраній послузі одразу показується орієнтовна ціна з прайсу.',
					image: '/projects/autocrm/landing.png',
				},
				{
					caption:
						'Kanban-дошка замовлень менеджера — усі заявки з сайту та вручну створені замовлення в чотирьох статусах (нове / в роботі / готово / видано). Тут же відбувається призначення механіка та боксу/підйомника, а переводити авто в роботу може лише сам механік.',
					image: '/projects/autocrm/order-board.png',
				},
				{
					caption:
						'Мобільний кабінет механіка — активне замовлення з номерним знаком, маркою авто та описом несправності. Кнопка "Взяти наступне авто" сама підбирає чергу за часом запису, а баланс зароблених коштів оновлюється в реальному часі.',
					image: '/projects/autocrm/mechanic-dashboard.png',
				},
				{
					caption:
						'Візуальний календар заїздів на FullCalendar.js — кольорове кодування статусів і довжина блоку, яка автоматично розраховується з норма-годин послуги. Система сама переводить замовлення в роботу рівно у призначений час, перевіривши вільність боксу.',
					image: '/projects/autocrm/calendar.png',
				},
				{
					caption:
						'Склад запчастин з категоріями та живими фінансовими метриками: залишок на складі, вкладені кошти в закупівлю, очікувана каса, потенційний і вже реалізований прибуток. Дефіцитні позиції підсвічуються окремо.',
					image: '/projects/autocrm/inventory.png',
				},
				{
					caption:
						'Акт виконаних робіт формату А4, згенерований прямо в браузері клієнта — перелік послуг і запчастин з підсумковою сумою, готовий до друку або збереження в PDF без навантаження на сервер.',
					image: '/projects/autocrm/receipt.png',
				},
			],
		},
		{
			id: 3,
			year: '2026',
			title: 'VideoSlicer — AI Shorts',
			desc: 'Автоматизований інструмент для перетворення довгих YouTube-відео у короткі вірусні ролики для TikTok та Shorts. Використовує локальний ШІ (Faster Whisper) для розпізнавання тексту та Gemini для пошуку найцікавіших моментів. FFmpeg виконує фоновий монтаж, додаючи динамічні субтитри та унікалізацію контенту.',
			hook: 'Від довгого подкасту до готових TikTok-роликів за лічені хвилини',
			icon: '✂️',
			logo: '/projects/video-slicer/logo.png',
			tech: ['Python', 'Streamlit', 'FFmpeg', 'Gemini API'],
			category: 'AI та інструменти',
			colorFrom: 'from-blue-600',
			colorTo: 'to-blue-800',
			hoverText: 'group-hover:text-blue-500',
			badgeBg: 'bg-blue-50',
			badgeText: 'text-blue-700',
			badgeHover:
				'hover:bg-blue-100 hover:shadow-[0_0_15px_rgba(29,78,216,0.2)]',
			features: [
				'Аналіз та виділення найцікавіших фрагментів відео (від 15 до 120 сек) за допомогою Gemini на базі точних словесних якорів.',
				'Генерація динамічних субтитрів у стилі CapCut завдяки таймкодам на рівні окремих слів (Faster Whisper).',
				'Жорстка унікалізація відео для обходу алгоритмів TikTok (мікро-зум на 3%, прискорення, колірний зсув, цифровий шум та видалення метаданих).',
				'Автоматичне кадрування у вертикальний формат 9:16 за допомогою фільтрів FFmpeg.',
				'Зручний веб-інтерфейс на базі Streamlit із детальним прогрес-баром та можливістю завантажити всі готові відео одним ZIP-архівом.',
			],
			gallery: [
				{
					caption:
						'Головний інтерфейс Streamlit з налаштуваннями тривалості, субтитрів та унікалізації.',
					image: '/projects/video-slicer/main-panel.png',
				},
			],
		},
		{
			id: 4,
			year: '2026',
			title: 'Film Downloader',
			desc: 'Автономний десктопний застосунок для Windows, створений для зручного завантаження потокового відео. Написаний на Python з інтерфейсом на Tkinter, він використовує FFmpeg для фонового злиття окремих відео- та аудіопотоків у єдиний файл найвищої якості. Зібраний у виконуваний файл через PyInstaller для роботи без встановлення додаткових бібліотек.',
			hook: 'Завантажує та склеює потокове відео в один клік',
			icon: '🎬',
			logo: '/projects/film-downloader/logo.png',
			tech: ['Python', 'Tkinter', 'FFmpeg', 'PyInstaller'],
			category: 'Desktop App',
			colorFrom: 'from-amber-400',
			colorTo: 'to-amber-600',
			hoverText: 'group-hover:text-amber-500',
			badgeBg: 'bg-amber-50',
			badgeText: 'text-amber-600',
			badgeHover:
				'hover:bg-amber-100 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)]',
			features: [
				'Зрозумілий графічний інтерфейс (GUI) на базі Tkinter для швидкого введення посилань',
				'Фонова інтеграція з FFmpeg для автоматичного склеювання (muxing) роздільних відео- та аудіодоріжок',
				'Підтримка складних потокових протоколів та перехоплення плейлистів формату .m3u8',
				'Упаковано в єдиний виконуваний .exe файл за допомогою PyInstaller — працює "з коробки"',
				'Запуск у режимі "Hidden Window" (без вікна термінала) для нативного досвіду користувача',
			],
			gallery: [
				{
					caption:
						'Головне вікно програми з полями для введення посилання та назви кінцевого файлу.',
					image: '/projects/film-downloader/main-menu.png',
				},
			],
		},
		{
			id: 5,
			year: '2026',
			title: 'Horizon',
			desc: 'Інтерактивна гра на вгадування місць на карті за панорамами Street View. Режими: світ, Європа, Україна, Львівщина та власна територія. Вбудований Quiz на знання прапорів, столиць і авто-мета.',
			tech: ['JavaScript', 'Google Maps API'],
			category: 'Інше',
			colorFrom: 'from-zinc-800',
			colorTo: 'to-amber-500',
			badgeBg: 'bg-amber-50',
			badgeText: 'text-amber-700',
			logo: '/projects/horizon/logo.png',
			hook: 'Вгадай місце на карті за панорамою',
			icon: '🌍',
			hoverText: 'group-hover:text-amber-400',
			badgeHover:
				'hover:bg-amber-100 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
			features: [
				'5 раундів із випадковими панорамами Street View у різних куточках світу',
				'Система балів на основі відстані від вгаданої точки до реального місця',
				'Режими: Весь Світ, Європа, Україна, Львівщина або власна зона на карті',
				'Інтерактивна міні-карта для розміщення маркера',
				'Вбудований Quiz на знання прапорів, столиць та авто-мета з життями та таймером',
			],
			gallery: [
				{
					caption: 'Головний екран вибору режимів (Classic Maps).',
					image: '/projects/horizon/dashboard.png',
				},
				{
					caption: 'Ігровий процес: панорама + міні-карта.',
					image: '/projects/horizon/gameplay.png',
				},
				{
					caption: 'Екран Quiz з питаннями на знання прапорів.',
					image: '/projects/horizon/quiz.png',
				},
			],
		},
		{
			id: 6,
			year: '2026',
			title: 'Personal Portfolio',
			desc: 'Сучасний інженерний сайт-портфоліо розробника. Перший практичний досвід створення повноцінного веб-додатку на React та Next.js із підтримкою багатомовності, інтерактивними формами та калькулятором вартості.',
			tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
			category: 'Лендінги',
			colorFrom: 'from-emerald-500',
			colorTo: 'to-cyan-500',
			badgeBg: 'bg-emerald-50',
			badgeText: 'text-emerald-700',
			logo: '/profile.jpg',
			hook: 'Архітектура, інтерактивність та інженерний підхід',
			icon: '⚡',
			hoverText: 'group-hover:text-cyan-400',
			badgeHover:
				'hover:bg-emerald-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
			features: [
				'Перший повноцінний проєкт на React / Next.js та Tailwind CSS',
				'Динамічне перемикання мов (UA / EN) за допомогою власних провайдерів',
				'Інтерактивний калькулятор вартості проєктів із вибором опцій та валют',
				'Форма зворотного зв’язку та динамічний блок статусу мережі (Ping / зріз швидкості)',
				'Інтерактивний таймлайн кар’єри та повна мобільна адаптивність',
			],
			gallery: [
				{
					caption: 'Головний екран (Hero section) з професійним описом.',
					image: '/profile.jpg',
				},
				{
					caption: 'Інтерактивний таймлайн академічного та практичного шляху.',
					image: '/profile.jpg',
				},
				{
					caption: 'Секція портфоліо з категоріями та картками проєктів.',
					image: '/profile.jpg',
				},
				{
					caption:
						"Форма зворотного зв’язку та футер із моніторингом з'єднання.",
					image: '/profile.jpg',
				},
				{
					caption: 'Інтерактивний калькулятор вартості розробки.',
					image: '/profile.jpg',
				},
			],
			github: 'https://github.com/rroycce/portfolio',
		},
		{
			id: 7,
			year: '2026',
			title: 'Wheel Lifter',
			desc: 'Віртуальний примірювач дисків для авто. Завантажуєш фото машини збоку і фото диска — редактор на Fabric.js дозволяє точно вписати колесо в кадр (позиція, масштаб, кут), а вбудоване видалення фону прибирає задній план з фото диска в кілька кліків.',
			tech: ['JavaScript', 'Fabric.js'],
			category: 'AI та інструменти',
			colorFrom: 'from-zinc-700',
			colorTo: 'to-amber-500',
			badgeBg: 'bg-amber-50',
			badgeText: 'text-amber-700',
			logo: '/projects/wheel-lifter/logo.png',
			github: 'https://github.com/rroycce/whell_lifter',
			hook: 'Приміряй нові диски на своє авто ще до покупки',
			icon: '🛞',
			hoverText: 'group-hover:text-amber-400',
			badgeHover:
				'hover:bg-amber-100 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)]',
			features: [
				'Точне позиціювання диска на фото авто — перетягування, масштабування та обертання прямо на canvas (Fabric.js)',
				'Видалення фону з фото диска в кілька кліків: масштабоване коло, "чарівна паличка" по кольору та ручна гумка для точних правок',
				'Модалка кропу з живим прев’ю перед накладанням диска на авто',
				'Порівняння "до/після" повзунком прямо на головному екрані',
				'Кілька дисків одночасно та швидка заміна через drag&drop / URL / Ctrl+V',
				'Повністю адаптивний редактор з окремим пультом керування для мобільних пристроїв',
			],
			gallery: [
				{
					caption:
						'Головний екран — завантаження фото авто та диска, порівняння до/після повзунком.',
					image: '/projects/wheel-lifter/upload.png',
				},
				{
					caption:
						'Модалка обрізки — підганяєш коло під диск, зайвий фон прибираєш чарівною паличкою або гумкою.',
					image: '/projects/wheel-lifter/crop.png',
				},
				{
					caption:
						'Редактор — диск точно вписаний у фото авто, з можливістю рухати, масштабувати й додавати ще диски.',
					image: '/projects/wheel-lifter/editor.png',
				},
			],
		},
	],
	en: [
		{
			id: 1,
			year: '2026',
			title: 'UZ Ticket Hunter',
			desc: 'Tickets for Ukrainian Railways trains sell out within minutes, and the site often crashes under load. The bot opens the booking page in a real browser, bypasses Cloudflare protection, scans the selected dates, and instantly sends findings to Telegram — fully controlled via inline menus, no external app needed.',
			tech: [
				'Python',
				'SeleniumBase',
				'BeautifulSoup',
				'pyTelegramBotAPI',
				'SQLite',
			],
			category: 'Bots',
			colorFrom: 'from-blue-400',
			colorTo: 'to-blue-600',
			badgeBg: 'bg-blue-50',
			badgeText: 'text-blue-600',
			logo: '/projects/uz-ticket-hunter/logo.png',
			hook: 'Watches for tickets while you sleep',
			icon: '🚆',
			hoverText: 'group-hover:text-cyan-500',
			badgeHover:
				'hover:bg-blue-100 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]',
			features: [
				'A full "Search Terminal" — route, dates, price, arrival time and filters, all set via inline buttons right in Telegram',
				'Smart seat grouping: any free seats, pairs, 2+2, compartments of 4 — separately for regular and side seats in platzkart',
				'"Alarm" mode for chosen dates — up to 15 repeated notifications in a row so you never miss it',
				'Mass-release detector (10+ seats at once) with a dedicated alert and a log file',
				'Sold-ticket notifications — the bot marks disappeared tickets as sold instead of staying silent',
				'SQLite sync between cycles: only genuinely new finds reach the chat, no repeat spam',
				'Automatic anti-bot bypass and adaptive pause on failures (45-90s normally, 3 min on error)',
				'Automatic browser restart if it hangs for more than 5 minutes',
			],
			gallery: [
				{
					caption:
						'Search Terminal — the entire bot control interface, right inside Telegram. Set the route, exact dates or a rolling day range, "Alarm" mode for priority dates, wagon types, and the seat-grouping method.',
					image: '/projects/uz-ticket-hunter/dashboard.png',
				},
				{
					caption:
						'A sample new-seats notification. The bot shows the train number, departure and arrival time, wagon, exact seat numbers, and price — plus a direct link to the booking page.',
					image: '/projects/uz-ticket-hunter/notification.png',
				},
				{
					caption:
						'The mass-release detector — a dedicated loud alert that fires when 10 or more seats open up at once for a given train and date.',
					image: '/projects/uz-ticket-hunter/mass-release.png',
				},
			],
		},
		{
			id: 2,
			year: '2025',
			title: 'AutoCRM — "ApexMotors" Auto Service',
			desc: "A client-server system based on Django (MVT architecture) with a relational DB via Django ORM. It combines a public landing page with smart vehicle identification by license plate, a manager's Kanban board with strict access control, a mobile mechanic's dashboard, and financial inventory analytics — the entire auto service cycle, from client request to the certificate of completion, in a single application.",
			tech: ['Django', 'SQLite', 'Bootstrap', 'JavaScript', 'FullCalendar.js'],
			category: 'CRM',
			colorFrom: 'from-emerald-400',
			colorTo: 'to-emerald-600',
			badgeBg: 'bg-emerald-50',
			badgeText: 'text-emerald-600',
			hook: "From website request to mechanic's salary — every step in one system",
			icon: '🔧',
			logo: '/projects/autocrm/logo.png',
			hoverText: 'group-hover:text-cyan-500',
			badgeHover:
				'hover:bg-emerald-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
			features: [
				'Smart vehicle identification — the client simply enters the license plate number: the backend instantly parses public databases (Baza-GAI, Hotline Finance) via requests and BeautifulSoup4 to extract the make, model, year, color, VIN, and photo of the vehicle',
				"Asynchronous request submission via JSON payload — the new order instantly appears on the manager's board without reloading the page",
				'Manager\'s Kanban board (New → In Progress → Ready → Issued) with strict role-based access control — only the mechanic can move a car to "In Progress" or "Ready", while the manager only handles the final hand-off',
				'Live monitoring of service bays/lifts — real-time status of each post (free/busy) and a history of the last 10 visits, eliminating the risk of assigning two cars to one bay',
				"Visual calendar built with FullCalendar.js featuring color-coded statuses and automatic block length calculation based on the service's standard hours",
				'Schedule collision protection — orders taken into progress are programmatically locked from being dragged to preserve history accuracy',
				"Mobile-first mechanic's workspace — an isolated environment showing only assigned cars, featuring a custom 3-day mini-calendar written in pure JS with miniature license plates",
				'Paperless repair process — the "Take car" button triggers the bay timer, and upon completion, the mechanic selects the performed services and used parts themselves',
				"Real-time motivation — the mechanic's earned balance is displayed in the dashboard header; upon repair completion, the backend automatically calculates the % of the service total in the SalaryLog",
				'Financial inventory analytics — 5 live metrics (stock balance, invested funds, expected revenue, potential, and realized profit) with auto-deduction of parts upon use',
				'Deficit control — parts with a stock balance of less than 5 units are highlighted separately, and restocking is done via an AJAX dialog without leaving the page',
				"Generation of the certificate of completion (A4) directly in the client's browser via html2pdf.js — with zero server load, ready to print or save as PDF in one click",
			],
			gallery: [
				{
					caption:
						'Public auto service landing page — a catalog of services (engine repair, suspension, auto electrics, maintenance) and a quick booking form. The client just enters the license plate: the system automatically recognizes the make, color, year, and photo from public databases, while the selected service immediately shows an estimated price from the list.',
					image: '/projects/autocrm/landing.png',
				},
				{
					caption:
						"Manager's Kanban order board — all website requests and manually created orders in four statuses (new / in progress / ready / issued). This is where mechanics and bays/lifts are assigned, though only the mechanic can move a car into progress.",
					image: '/projects/autocrm/order-board.png',
				},
				{
					caption:
						'Mobile mechanic\'s dashboard — active order showing the license plate, car make, and fault description. The "Take next car" button automatically selects the next in the queue by appointment time, and the earned balance updates in real time.',
					image: '/projects/autocrm/mechanic-dashboard.png',
				},
				{
					caption:
						'Visual appointment calendar on FullCalendar.js — color-coded statuses and block lengths automatically calculated from standard service hours. The system automatically moves the order to "in progress" exactly at the scheduled time, after checking bay availability.',
					image: '/projects/autocrm/calendar.png',
				},
				{
					caption:
						'Parts inventory with categories and live financial metrics: stock balance, invested purchasing funds, expected revenue, potential, and realized profit. Deficient items are highlighted separately.',
					image: '/projects/autocrm/inventory.png',
				},
				{
					caption:
						"A4 format certificate of completion, generated directly in the client's browser — a list of services and parts with the total amount, ready to print or save as a PDF without loading the server.",
					image: '/projects/autocrm/receipt.png',
				},
			],
		},
		{
			id: 3,
			year: '2026',
			title: 'VideoSlicer — AI Shorts',
			desc: 'An automated tool for converting long YouTube videos into short, viral clips for TikTok and Shorts. It uses local AI (Faster Whisper) for transcription and Gemini to find the most engaging moments. FFmpeg handles background editing, adding dynamic subtitles and content uniqueization.',
			hook: 'From a long podcast to ready-made TikTok clips in minutes',
			icon: '✂️',
			logo: '/projects/video-slicer/logo.png',
			tech: ['Python', 'Streamlit', 'FFmpeg', 'Gemini API'],
			category: 'AI & Tools',
			colorFrom: 'from-blue-600',
			colorTo: 'to-blue-800',
			hoverText: 'group-hover:text-blue-500',
			badgeBg: 'bg-blue-50',
			badgeText: 'text-blue-700',
			badgeHover:
				'hover:bg-blue-100 hover:shadow-[0_0_15px_rgba(29,78,216,0.2)]',
			features: [
				'Analysis and extraction of the most interesting video fragments (15 to 120 sec) using Gemini based on exact word anchors.',
				'Generation of dynamic CapCut-style subtitles using word-level timestamps provided by Faster Whisper.',
				'Strict video uniqueization to bypass TikTok anti-spam algorithms (3% micro-zoom, speed adjustment, color shift, digital noise, and metadata stripping).',
				'Automatic cropping to a 9:16 vertical format utilizing FFmpeg filters.',
				'User-friendly web interface built with Streamlit, featuring a detailed progress bar and the ability to download all generated videos in a single ZIP archive.',
			],
			gallery: [
				{
					caption:
						'Main Streamlit interface featuring duration, subtitle, and uniqueization settings.',
				},
				{
					caption:
						'The process of analyzing the transcript and cutting the final Shorts.',
				},
			],
		},
		{
			id: 4,
			year: '2026',
			title: 'Film Downloader',
			desc: 'A standalone Windows desktop application designed for seamless streaming video downloads. Built with Python and Tkinter, it utilizes FFmpeg under the hood to merge separate high-quality video and audio streams into a single file. Packaged as an executable with PyInstaller, it requires no prior setup to run.',
			hook: 'Downloads and merges streaming video in one click',
			icon: '🎬',
			logo: '/projects/film-downloader/logo.png',
			tech: ['Python', 'Tkinter', 'FFmpeg', 'PyInstaller'],
			category: 'Desktop App',
			colorFrom: 'from-amber-400',
			colorTo: 'to-amber-600',
			hoverText: 'group-hover:text-amber-500',
			badgeBg: 'bg-amber-50',
			badgeText: 'text-amber-600',
			badgeHover:
				'hover:bg-amber-100 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)]',
			features: [
				'Clean graphical user interface (GUI) built with Tkinter for quick link input',
				'Under-the-hood integration with FFmpeg for automatic muxing of separate video and audio tracks',
				'Support for extracting media from complex streaming protocols and .m3u8 playlists',
				'Packaged into a single standalone .exe file via PyInstaller — works out of the box',
				'Hidden console window execution for a native, distraction-free desktop application feel',
			],
			gallery: [
				{
					caption:
						'Main application window with input fields for the stream URL and the desired file name.',
					image: '/projects/film-downloader/main-menu.png',
				},
			],
		},
		{
			id: 5,
			year: '2026',
			title: 'Horizon',
			desc: 'An interactive location-guessing game using Street View panoramas. Modes: World, Europe, Ukraine, Lviv, and custom area. Includes a built-in quiz on flags, capitals, and car trivia.',
			tech: ['JavaScript', 'Google Maps API'],
			category: 'Other',
			colorFrom: 'from-zinc-800',
			colorTo: 'to-amber-500',
			badgeBg: 'bg-amber-50',
			badgeText: 'text-amber-700',
			logo: '/projects/horizon/logo.png',
			hook: 'Guess the location from a panorama',
			icon: '🌍',
			hoverText: 'group-hover:text-amber-400',
			badgeHover:
				'hover:bg-amber-100 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
			features: [
				'5 rounds with random Street View panoramas from around the world',
				'Scoring based on distance between your guess and the real location',
				'Modes: Whole World, Europe, Ukraine, Lviv Region, or a custom map zone',
				'Interactive mini-map for placing your guess marker',
				'Built-in quiz on flags, capitals, and car brands with lives and a timer',
			],
			gallery: [
				{
					caption: 'Mode selection screen (Classic Maps).',
					image: '/projects/horizon/dashboard.png',
				},
				{
					caption: 'Gameplay: panorama + mini-map.',
					image: '/projects/horizon/gameplay.png',
				},
				{
					caption: 'Quiz mode with flag questions.',
					image: '/projects/horizon/quiz.png',
				},
			],
		},
		{
			id: 6,
			year: '2026',
			title: 'Personal Portfolio',
			desc: 'Modern developer portfolio website. First major hands-on project built with React and Next.js, featuring multi-language support, interactive contact forms, and a project cost calculator.',
			tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
			category: 'Landings',
			colorFrom: 'from-emerald-500',
			colorTo: 'to-cyan-500',
			badgeBg: 'bg-emerald-50',
			badgeText: 'text-emerald-700',
			logo: '/profile.jpg',
			hook: 'Architecture, interactivity, and engineering mindset',
			icon: '⚡',
			hoverText: 'group-hover:text-cyan-400',
			badgeHover:
				'hover:bg-emerald-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
			features: [
				'First comprehensive web app built using React / Next.js & Tailwind CSS',
				'Dynamic multi-language support (UA / EN) via custom context providers',
				'Interactive project cost calculator with custom options and currency switching',
				'Contact form and live network status monitor (Ping & connection speed)',
				'Interactive career timeline and full mobile responsiveness',
			],
			gallery: [
				{
					caption: 'Hero section with professional introduction.',
					image: '/profile.jpg',
				},
				{
					caption: 'Interactive career and academic timeline.',
					image: '/profile.jpg',
				},
				{
					caption: 'Portfolio section with category filtering.',
					image: '/profile.jpg',
				},
				{
					caption: 'Contact form and footer with live network diagnostics.',
					image: '/profile.jpg',
				},
				{
					caption: 'Interactive project cost estimation calculator.',
					image: '/profile.jpg',
				},
			],
			github: 'https://github.com/rroycce/portfolio',
		},
		{
			id: 7,
			year: '2026',
			title: 'Wheel Lifter',
			desc: 'A virtual wheel fitment tool for cars. Upload a side photo of the car and a photo of the wheel — a Fabric.js editor lets you precisely fit the wheel into the frame (position, scale, angle), while built-in background removal cleans up the wheel photo in a few clicks.',
			tech: ['JavaScript', 'Fabric.js'],
			category: 'AI & Tools',
			colorFrom: 'from-zinc-700',
			colorTo: 'to-amber-500',
			badgeBg: 'bg-amber-50',
			badgeText: 'text-amber-700',
			logo: '/projects/wheel-lifter/logo.png',
			github: 'https://github.com/rroycce/whell_lifter',
			hook: 'Try new wheels on your car before you buy them',
			icon: '🛞',
			hoverText: 'group-hover:text-amber-400',
			badgeHover:
				'hover:bg-amber-100 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)]',
			features: [
				'Precise wheel positioning on the car photo — drag, scale, and rotate right on the canvas (Fabric.js)',
				'Background removal from the wheel photo in a few clicks: scalable circle, color-based magic wand, and a manual eraser',
				'Crop modal with a live preview before compositing the wheel onto the car',
				'Before/after comparison slider on the main screen',
				'Add multiple wheels at once and quickly swap one via drag&drop / URL / Ctrl+V',
				'Fully responsive editor with a dedicated on-screen control pad for mobile',
			],
			gallery: [
				{
					caption:
						'Main screen — upload car and wheel photos, compare before/after with a slider.',
					image: '/projects/wheel-lifter/upload.png',
				},
				{
					caption:
						'Crop modal — fit the circle to the wheel, clean up the background with the magic wand or eraser.',
					image: '/projects/wheel-lifter/crop.png',
				},
				{
					caption:
						'Editor — the wheel precisely fitted onto the car photo, with options to move, scale, and add more wheels.',
					image: '/projects/wheel-lifter/editor.png',
				},
			],
		},
	],
}
