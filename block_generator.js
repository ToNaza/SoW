document.addEventListener('DOMContentLoaded', () => {
    const islandPlusBtn = document.getElementById('plus'); 
    const createItemOverlay = document.getElementById('createItemOverlay');
    const createAddPhotoBtn = document.getElementById('createAddPhotoBtn');
    const createPhotoInput = document.getElementById('createPhotoInput');
    const createPhotoGallery = document.getElementById('createPhotoGallery');
    const createDescInput = document.getElementById('createDesc');
    const createPriceInput = document.getElementById('createPrice');
    const hasPriceCheckbox = document.getElementById('hasPriceCheckbox');
    const submitCreateBtn = document.getElementById('submitCreateBtn');

    let uploadedImages = []; 

    function updatePricePlaceholder() {
        const lang = localStorage.getItem('kow_lang') || 'uk';
        const t = typeof translations !== 'undefined' ? translations[lang] : null;
        
        if (!t || !createPriceInput) return;

        if (hasPriceCheckbox && !hasPriceCheckbox.checked) {
            createPriceInput.placeholder = t.priceFree;
        } else {
            createPriceInput.placeholder = t.priceInput;
        }
    }

    function resetCreateForm() {
        uploadedImages = [];
        renderGallery();
        if (createDescInput) createDescInput.value = '';
        
        if (createPriceInput) {
            createPriceInput.value = '';
            createPriceInput.disabled = false;
            createPriceInput.style.opacity = '1';
        }
        
        if (hasPriceCheckbox) {
            hasPriceCheckbox.checked = true;
        }

        updatePricePlaceholder();

        document.getElementById('createLink').value = '';
        document.getElementById('createPriority').value = 'med';
    }

    function updateCreateItemLanguage() {
        const lang = localStorage.getItem('kow_lang') || 'uk';
        if (typeof translations === 'undefined') return;
        const t = translations[lang];
        if (!t) return;
        
        const title = document.querySelector('.create-item-modal h2');
        if (title) title.innerText = t.createTitle;
        if (createDescInput) createDescInput.placeholder = t.descInput;
        
        updatePricePlaceholder();
        
        document.getElementById('createLink').placeholder = t.linkInput;
        if (submitCreateBtn) submitCreateBtn.innerText = t.createSubmit;
        
        const options = document.getElementById('createPriority').options;
        if (options && options.length >= 3) {
            options[0].text = t.high;
            options[1].text = t.med;
            options[2].text = t.low;
        }
    }

    function attemptCloseCreate() {
        const lang = localStorage.getItem('kow_lang') || 'uk';
        const msg = (typeof translations !== 'undefined' && translations[lang]) 
                    ? translations[lang].confirmExit 
                    : "Вы точно хотите прекратить создание? Ваши записи слетят.";
        
        if (confirm(msg)) {
            createItemOverlay.style.display = 'none';
            if (islandPlusBtn) islandPlusBtn.src = './media/plus.svg';
            resetCreateForm();
        }
    }

    function renderGallery() {
        if (!createPhotoGallery) return;
        createPhotoGallery.innerHTML = ''; 
        
        uploadedImages.forEach((imgSrc, index) => {
            const div = document.createElement('div');
            div.className = 'create-photo-preview';
            div.innerHTML = `
                <img src="${imgSrc}" alt="photo">
                <button class="create-delete-photo" data-index="${index}">x</button>
            `;
            createPhotoGallery.appendChild(div);
        });

        if (createAddPhotoBtn) {
            createAddPhotoBtn.style.display = uploadedImages.length >= 3 ? 'none' : 'flex';
        }

        document.querySelectorAll('.create-delete-photo').forEach(btn => {
            btn.onclick = (e) => {
                const i = e.target.getAttribute('data-index');
                uploadedImages.splice(i, 1); 
                renderGallery(); 
            };
        });
    }

    if (islandPlusBtn && createItemOverlay) {
        islandPlusBtn.addEventListener('click', () => {
            const isHidden = window.getComputedStyle(createItemOverlay).display === 'none';
            
            if (isHidden) {
                createItemOverlay.style.display = 'flex';
                islandPlusBtn.src = './media/plus2.svg';
                updateCreateItemLanguage(); 
            } else {
                attemptCloseCreate();
            }
        });
    }

    if (createItemOverlay) {
        createItemOverlay.addEventListener('click', (e) => {
            if (e.target === createItemOverlay) {
                attemptCloseCreate();
            }
        });
    }

    if (createAddPhotoBtn && createPhotoInput) {
        createAddPhotoBtn.addEventListener('click', () => {
            if (uploadedImages.length < 3) createPhotoInput.click();
        });

        createPhotoInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                if (uploadedImages.length < 3) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        uploadedImages.push(event.target.result);
                        renderGallery();
                    };
                    reader.readAsDataURL(file);
                }
            });
            createPhotoInput.value = ''; 
        });
    }

    if (hasPriceCheckbox) {
        hasPriceCheckbox.addEventListener('change', (e) => {
            if (createPriceInput) {
                if (!e.target.checked) {
                    createPriceInput.value = '';
                    createPriceInput.disabled = true;
                    createPriceInput.style.opacity = '0.5'; 
                } else {
                    createPriceInput.disabled = false;
                    createPriceInput.style.opacity = '1';
                }
                updatePricePlaceholder();
            }
        });
    }

    if (submitCreateBtn) {
        submitCreateBtn.addEventListener('click', () => {
            createItemOverlay.style.display = 'none';
            if (islandPlusBtn) islandPlusBtn.src = './media/plus.svg';
            resetCreateForm();
        });
    }
});

