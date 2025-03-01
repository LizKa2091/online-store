const inputs = document.querySelectorAll('.main__form__input, .main__form__textarea');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});