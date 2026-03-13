document.addEventListener('DOMContentLoaded', () => {
    
    // --- ЭЛЕМЕНТЫ ---
    const settingsBtn = document.getElementById('settings');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const langSelect = document.getElementById('langSelect');
    const currencySelect = document.getElementById('currencySelect');
    
    const bg1 = document.getElementById('bgColor1');
    const bg2 = document.getElementById('bgColor2');
    const colorHigh = document.getElementById('colorHigh');
    const colorMed = document.getElementById('colorMed');
    const colorLow = document.getElementById('colorLow');

    // --- СЛОВАРЬ (Добавлены desc и priceLabel) ---
    const translations = {
        uk: {
            search: "Пошук", priority: "По пріоритету", high: "Високий", med: "Середній", low: "Низький",
            from: "Від", to: "До", lang: "Мова", currency: "Валюта", share: "Поділитись списком", 
            addAccount: "Створити другий профіль", colorBg: "Колір тла -", 
            colorHigh: "Колір вищого рівня -", colorMed: "Колір середнього рівня -", colorLow: "Колір низького рівня -",
            curr_uah: "Грн (₴)", curr_usd: "Долар ($)", curr_eur: "Євро (€)", curr_rub: "Руб (₽)",
            desc: "Опис", priceLabel: "Ціна",
            createTitle: "Створення товару", descInput: "Опис - ", priceInput: "Ціна", priceFree: "Без ціни",
            linkInput: "Посилання", createSubmit: "Створити запис", 
            confirmExit: "Ви точно хочете припинити створення? Ваші записи зникнуть."
        },
        ru: {
            search: "Поиск", priority: "По приоритету", high: "Высокий", med: "Средний", low: "Низкий",
            from: "От", to: "До", lang: "Язык", currency: "Валюта", share: "Поделиться списком", 
            addAccount: "Создать второй профиль", colorBg: "Цвет фона -", 
            colorHigh: "Цвет высшего уровня -", colorMed: "Цвет среднего уровня -", colorLow: "Цвет низкого уровня -",
            curr_uah: "Грн (₴)", curr_usd: "Доллар ($)", curr_eur: "Евро (€)", curr_rub: "Руб (₽)",
            desc: "Описание", priceLabel: "Цена",
            createTitle: "Создание товара", descInput: "Описание - ", priceInput: "Цена", priceFree: "Без цены",
            linkInput: "Ссылка", createSubmit: "Создать запись", 
            confirmExit: "Вы точно хотите прекратить создание? Ваши записи слетят."
        },
        en: {
            search: "Search", priority: "By priority", high: "High", med: "Medium", low: "Low",
            from: "From", to: "To", lang: "Language", currency: "Currency", share: "Share list", 
            addAccount: "Create second profile", colorBg: "Background color -", 
            colorHigh: "High priority color -", colorMed: "Medium priority color -", colorLow: "Low priority color -",
            curr_uah: "UAH (₴)", curr_usd: "Dollar ($)", curr_eur: "Euro (€)", curr_rub: "Rub (₽)",
            desc: "Description", priceLabel: "Price",
            createTitle: "Create item", descInput: "Description - ", priceInput: "Price", priceFree: "Free",
            linkInput: "Link", createSubmit: "Create record", 
            confirmExit: "Are you sure you want to stop? Your data will be lost."
        }
    };

    // --- ФУНКЦИИ ---

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

// В обработчике чекбокса
hasPriceCheckbox.addEventListener('change', (e) => {
    const input = document.getElementById('createPrice');
    if (input) {
        input.disabled = !e.target.checked;
        input.style.opacity = e.target.checked ? '1' : '0.5';
        if (!e.target.checked) input.value = '';
        updatePricePlaceholder();
    }
});

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
    }

    // --- ОБРАБОТЧИКИ ---

    // Исправленное открытие/закрытия
    settingsBtn.addEventListener('click', () => {
        // Проверяем реальное состояние через getComputedStyle
        const isHidden = window.getComputedStyle(settingsOverlay).display === 'none';
        
        if (isHidden) {
            settingsOverlay.style.display = 'flex';
            settingsBtn.src = './media/settings_on.svg';
        } else {
            settingsOverlay.style.display = 'none';
            settingsBtn.src = './media/settings_off.svg';
        }
    });

    // Закрытие при клике на фон
    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
            settingsOverlay.style.display = 'none';
            settingsBtn.src = './media/settings_off.svg';
        }
    });

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

    // Обработчик для оверлея создания
document.getElementById('createItemOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'createItemOverlay') {
        const desc = document.getElementById('createDesc').value.trim();
        const price = document.getElementById('createPrice').value.trim();
        const link = document.getElementById('createLink').value.trim();
        
        // Если везде пусто — закрываем молча
        if (!desc && !price && !link) {
            closeCreateModal(); // Твоя функция простого закрытия (без confirm)
        } else {
            // Если что-то введено — тогда уже спрашиваем
            attemptCloseCreate(); 
        }
    }
});

    // Заглушка поиска
    document.getElementById('searchForm').addEventListener('submit', (e) => e.preventDefault());

    loadSettings();
});

