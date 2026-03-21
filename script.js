document.addEventListener('DOMContentLoaded', () => {
    
    // --- ЕЛЕМЕНТИ ---
    const settingsBtn = document.getElementById('settings');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const langSelect = document.getElementById('langSelect');
    const currencySelect = document.getElementById('currencySelect');
    
    const bg1 = document.getElementById('bgColor1');
    const bg2 = document.getElementById('bgColor2');
    const colorHigh = document.getElementById('colorHigh');
    const colorMed = document.getElementById('colorMed');
    const colorLow = document.getElementById('colorLow');

    // Елементи акаунта
    const openAccountSettingsBtn = document.getElementById('openAccountSettings');
    const accountOverlay = document.getElementById('accountOverlay');
    const cancelAccountBtn = document.getElementById('cancelAccountBtn');
    const saveAccountBtn = document.getElementById('saveAccountBtn');
    
    const mainProfileImg = document.getElementById('mainProfileImg');
    const mainProfileName = document.getElementById('mainProfileName');
    
    const editProfileImg = document.getElementById('editProfileImg');
    const accNameInput = document.getElementById('accNameInput');
    const accPhotoInput = document.getElementById('accPhotoInput');

    // --- СЛОВНИК ---
    window.translations = {
        uk: {
            search: "Пошук", priority: "По пріоритету", high: "Високий", med: "Середній", low: "Низький",
            from: "Від", to: "До", lang: "Мова", currency: "Валюта", share: "Поділитись списком", 
            addAccount: "Створити другий профіль", colorBg: "Колір тла -", 
            colorHigh: "Колір вищого рівня -", colorMed: "Колір середнього рівня -", colorLow: "Колір низького рівня -",
            curr_uah: "Грн (₴)", curr_usd: "Долар ($)", curr_eur: "Євро (€)", curr_rub: "Руб (₽)",
            desc: "Опис", priceLabel: "Ціна",
            createTitle: "Створення запису", descInput: "Короткий опис - ", priceInput: "Ціна", priceFree: "Без ціни",
            linkInput: "Посилання", createSubmit: "Створити запис", 
            confirmExit: "Ви точно хочете припинити створення? Ваші записи зникнуть.",
            // Нові ключі
            accHint: "ⓘ - Для редагування натисніть на фото чи ім'я", accActive: "Кіл. Активних бажань",
            accDone: "Кіл. Виконаних бажань", accTotal: "Загальна кіл. Бажань",
            cancel: "Назад", save: "Зберегти зміни"
        },
        ru: {
            search: "Поиск", priority: "По приоритету", high: "Высокий", med: "Средний", low: "Низкий",
            from: "От", to: "До", lang: "Язык", currency: "Валюта", share: "Поделиться списком", 
            addAccount: "Создать второй профиль", colorBg: "Цвет фона -", 
            colorHigh: "Цвет высшего уровня -", colorMed: "Цвет среднего уровня -", colorLow: "Цвет низкого уровня -",
            curr_uah: "Грн (₴)", curr_usd: "Доллар ($)", curr_eur: "Евро (€)", curr_rub: "Руб (₽)",
            desc: "Описание", priceLabel: "Цена",
            createTitle: "Создание записи", descInput: "Краткое описание - ", priceInput: "Цена", priceFree: "Без цены",
            linkInput: "Ссылка", createSubmit: "Создать запись", 
            confirmExit: "Вы точно хотите прекратить создание? Ваши записи слетят.",
            // Нові ключі
            accHint: "ⓘ - Для редактирования нажмите на фото или имя", accActive: "Кол. Активных желаний",
            accDone: "Кол. Выполненных желаний", accTotal: "Общее кол. Желаний",
            cancel: "Назад", save: "Сохранить изменения"
        },
        en: {
            search: "Search", priority: "By priority", high: "High", med: "Medium", low: "Low",
            from: "From", to: "To", lang: "Language", currency: "Currency", share: "Share list", 
            addAccount: "Create second profile", colorBg: "Background color -", 
            colorHigh: "High priority color -", colorMed: "Medium priority color -", colorLow: "Low priority color -",
            curr_uah: "UAH (₴)", curr_usd: "Dollar ($)", curr_eur: "Euro (€)", curr_rub: "Rub (₽)",
            desc: "Description", priceLabel: "Price",
            createTitle: "Creating a record", descInput: "Short description - ", priceInput: "Price", priceFree: "Free",
            linkInput: "Link", createSubmit: "Create record", 
            confirmExit: "Are you sure you want to stop? Your data will be lost.",
            // Нові ключі
            accHint: "ⓘ - Click on the photo or name to edit.", accActive: "Active desires count",
            accDone: "Completed desires count", accTotal: "Total desires count",
            cancel: "Back", save: "Save changes"
        }
    };

    // --- ФУНКЦІЇ ---
    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    function updatePricePlaceholder() {
        const lang = localStorage.getItem('kow_lang') || 'uk';
        const t = translations[lang];
        const input = document.getElementById('createPrice');
        const checkbox = document.getElementById('hasPriceCheckbox');

        if (!input || !t || !checkbox) return;

        if (checkbox.checked) {
            input.setAttribute('data-i18n', 'priceInput');
            input.placeholder = t.priceInput;
        } else {
            input.setAttribute('data-i18n', 'priceFree');
            input.placeholder = t.priceFree;
        }
    }

    function updateCurrencySymbols() {
        const currencyMap = { 'UAH': '₴', 'USD': '$', 'EUR': '€', 'RUB': '₽' };
        const sym = currencyMap[currencySelect.value];
        document.querySelectorAll('.currency-symbol').forEach(el => el.textContent = sym);
    }

    function updateBackground() {
        document.body.style.background = `linear-gradient(180deg, ${bg1.value} 0%, ${bg2.value} 100%)`;
    }

    function updateBlockColors() {
        document.querySelectorAll('.priority-high').forEach(el => el.style.backgroundColor = colorHigh.value);
        document.querySelectorAll('.priority-med').forEach(el => el.style.backgroundColor = colorMed.value);
        document.querySelectorAll('.priority-low').forEach(el => el.style.backgroundColor = colorLow.value);
    }

    function loadProfileData() {
        const savedName = localStorage.getItem('kow_accName');
        const savedPhoto = localStorage.getItem('kow_accPhoto');

        if (savedName && mainProfileName) mainProfileName.textContent = savedName;
        if (savedPhoto && mainProfileImg) mainProfileImg.src = savedPhoto;
    }

    function loadSettings() {
        const savedLang = localStorage.getItem('kow_lang') || 'uk';
        langSelect.value = savedLang;
        applyLanguage(savedLang);

        const savedCurr = localStorage.getItem('kow_curr') || 'UAH';
        currencySelect.value = savedCurr;
        updateCurrencySymbols();

        if (localStorage.getItem('kow_bg1')) bg1.value = localStorage.getItem('kow_bg1');
        if (localStorage.getItem('kow_bg2')) bg2.value = localStorage.getItem('kow_bg2');
        updateBackground();

        if (localStorage.getItem('kow_colorHigh')) colorHigh.value = localStorage.getItem('kow_colorHigh');
        if (localStorage.getItem('kow_colorMed')) colorMed.value = localStorage.getItem('kow_colorMed');
        if (localStorage.getItem('kow_colorLow')) colorLow.value = localStorage.getItem('kow_colorLow');
        updateBlockColors();

        loadProfileData();
    }

    // --- ОБРОБНИКИ ---
    
    // Відкриття/закриття основних налаштувань
    settingsBtn.addEventListener('click', () => {
        const isHidden = window.getComputedStyle(settingsOverlay).display === 'none';
        if (isHidden) {
            settingsOverlay.style.display = 'flex';
            settingsBtn.src = './media/settings_on.svg';
        } else {
            settingsOverlay.style.display = 'none';
            settingsBtn.src = './media/settings_off.svg';
        }
    });

    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
            settingsOverlay.style.display = 'none';
            settingsBtn.src = './media/settings_off.svg';
        }
    });

    // Налаштування локалізації та візуалу
    langSelect.addEventListener('change', (e) => {
        applyLanguage(e.target.value);
        localStorage.setItem('kow_lang', e.target.value);
    });

    currencySelect.addEventListener('change', (e) => {
        updateCurrencySymbols();
        localStorage.setItem('kow_curr', e.target.value);
    });

    [bg1, bg2].forEach(input => {
        input.addEventListener('input', () => {
            updateBackground();
            localStorage.setItem('kow_bg1', bg1.value);
            localStorage.setItem('kow_bg2', bg2.value);
        });
    });

    [colorHigh, colorMed, colorLow].forEach(input => {
        input.addEventListener('input', () => {
            updateBlockColors();
            localStorage.setItem(`kow_${input.id}`, input.value);
        });
    });

    // --- ОБРОБНИКИ ПРОФІЛЮ ---
    if (openAccountSettingsBtn && accountOverlay) {
        openAccountSettingsBtn.addEventListener('click', () => {
            accNameInput.value = mainProfileName.textContent;
            editProfileImg.src = mainProfileImg.src;
            accountOverlay.style.display = 'flex';
        });
    }

    if (cancelAccountBtn) {
        cancelAccountBtn.addEventListener('click', () => {
            accountOverlay.style.display = 'none';
        });
    }

    if (saveAccountBtn) {
        saveAccountBtn.addEventListener('click', () => {
            const newName = accNameInput.value.trim() || 'User(7382)';
            const newPhoto = editProfileImg.src;

            mainProfileName.textContent = newName;
            mainProfileImg.src = newPhoto;

            localStorage.setItem('kow_accName', newName);
            localStorage.setItem('kow_accPhoto', newPhoto);

            accountOverlay.style.display = 'none';
        });
    }

    // Читання завантаженого фото у base64 для збереження
    if (accPhotoInput) {
        accPhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    editProfileImg.src = event.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    if (accountOverlay) {
        accountOverlay.addEventListener('click', (e) => {
            if (e.target === accountOverlay) {
                accountOverlay.style.display = 'none';
            }
        });
    }

    // Оверлей створення
    const createItemOverlay = document.getElementById('createItemOverlay');
    if (createItemOverlay) {
        createItemOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'createItemOverlay') {
                const desc = document.getElementById('createDesc').value.trim();
                const price = document.getElementById('createPrice').value.trim();
                const link = document.getElementById('createLink').value.trim();
                
                if (!desc && !price && !link) {
                    if (typeof closeCreateModal === 'function') closeCreateModal();
                } else {
                    if (typeof attemptCloseCreate === 'function') attemptCloseCreate(); 
                }
            }
        });
    }

    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => e.preventDefault());
    }

    // Чекбокс ціни
    const hasPriceCheckbox = document.getElementById('hasPriceCheckbox');
    if (hasPriceCheckbox) {
        hasPriceCheckbox.addEventListener('change', (e) => {
            const input = document.getElementById('createPrice');
            if (input) {
                input.disabled = !e.target.checked;
                input.style.opacity = e.target.checked ? '1' : '0.5';
                if (!e.target.checked) input.value = '';
                updatePricePlaceholder();
            }
        });
    }

    loadSettings();
});