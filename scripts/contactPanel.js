const contactPanelButton = document.querySelector('.contact-panel__button');


const contactPanelProccess = (e) => {
    e.preventDefault();

    const contactInputs = document.querySelectorAll('.contact-panel__input');
    const areInputsFilled = [...contactInputs].every(input => input.value !== '');

    [...contactInputs].filter(input => input.value === '').forEach(el => {
        el.style.border = '1px solid red';
    });

    [...contactInputs].filter(input => input.value !== '').forEach(el => {
        el.style.border = '0';
    });

    if (areInputsFilled) {
        const contactPanel = document.querySelector('.contact-panel');
        const contactPanelButton = document.querySelector('.contact-panel__button');
        
        contactPanel.classList.add('success');
        e.target.style.cursor = 'not-allowed';

        setTimeout(() => {
            contactPanel.classList.toggle('success');
            contactPanelButton.classList.add('hidden');
            contactPanel.innerHTML += `<p class='success-p'>Форма успешно отправлена!</p>`;
        }, 3000);
    }
    else {
        [...contactInputs].filter(input => input.value === '').forEach(el => {
            el.style.border = '1px solid red';
        });
    }
};

contactPanelButton.addEventListener('click', contactPanelProccess);