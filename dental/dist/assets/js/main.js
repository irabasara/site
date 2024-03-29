window.addEventListener('DOMContentLoaded', function () {
    // modal
    const openModalBtns = document.querySelectorAll('.open-modal');
    const modalWindow = document.querySelectorAll('.modal');
    const submitBtns = document.querySelectorAll('form input[type="submit"]');

    function openModal(modal) {
        modal.style.display = 'flex';
        document.querySelector('.form-body-thanks').classList.remove('active');
        document.querySelector('.form-body').classList.add('active');
        submitBtns.forEach((btn) => (btn.value = 'Відправити'));
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function closeModal(event, modal) {
        if (
            event.target.classList.contains('close-btn') ||
            (event.target.classList.contains('modal') && modal.classList.contains('show'))
        ) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 350);
        }
    }

    openModalBtns.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modalWindow);
        });
    });

    document.addEventListener('click', (e) => {
        closeModal(e, modalWindow);
    });

    // Form validation ---------------------------------

    let countryData;

    let index = 0;

    const phoneInput = document.querySelectorAll('.phone');

    phoneInput.forEach((input, i) => {
        index = i;
        const phoneInput = window.intlTelInput(input, {
            preferredCountries: ['ua', 'pl'],
            initialCountry: 'ua',
            utilsScript:
                'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.21/js/utils.js',
        });

        countryData = phoneInput.getSelectedCountryData();
        input.value = `+${countryData.dialCode}`;
        input.addEventListener('countrychange', function () {
            countryData = phoneInput.getSelectedCountryData();
            input.value = `+${countryData.dialCode}`;
        });
    });

    [].forEach.call(document.querySelectorAll('.phone'), function (input) {
        var keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            var matrix = `+${countryData.dialCode}-___-___-___`,
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, ''),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = new_value.indexOf('_');
            var num = countryData.dialCode.length + 1;
            if (i != -1) {
                i < num && (i = 1);
                new_value = new_value.slice(0, i);
            }
            var reg = matrix
                .substr(0, this.value.length)
                .replace(/_+/g, function (a) {
                    return '\\d{1,' + a.length + '}';
                })
                .replace(/[+]/g, '\\$&');
            reg = new RegExp('^' + reg + '$');
            if (!reg.test(this.value) || this.value.length < num || (keyCode > 47 && keyCode < 58))
                this.value = new_value;
            if (event.type == 'blur' && this.value.length < num) this.value = '';
        }

        input.addEventListener('input', mask, false);
        input.addEventListener('focus', mask, false);
        input.addEventListener('blur', mask, false);
        input.addEventListener('keydown', mask, false);

        input.addEventListener('keydown', (e) => {
            input.setSelectionRange(input.value.length, input.value.length);
        });
    });

    function validateForm() {
        function validateUserName(input) {
            const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄ']{1,}( [a-zA-Zа-яА-ЯіІїЇєЄ']{1,})?$/; // Only letters and apostrophes, minimum length 1

            const small = input.nextElementSibling;
            if (regex.test(input.value.trim())) {
                small.textContent = '';
                return true;
            } else {
                small.textContent = 'Будь ласка, введіть коректне імʼя.';
                return false;
            }
        }

        // Validate phone input
        function validatePhone(input) {
            const regex = new RegExp(`^\\+?${countryData.dialCode}-\\d{3}-\\d{3}-\\d{3}$`);
            const small = input.parentElement.nextElementSibling;
            if (regex.test(input.value)) {
                small.textContent = '';
                return true;
            } else {
                small.textContent = 'Будь ласка, введіть коректний номер телефону.';
                return false;
            }
        }

        // Add validation listeners to all forms on the page
        const forms = document.querySelectorAll('form');
        forms.forEach((form, i) => {
            const userNameInput = form.querySelector('.username');
            const phoneInput = form.querySelector('.phone');

            userNameInput.addEventListener('blur', (event) => {
                validateUserName(event.target);
            });

            phoneInput.addEventListener('blur', (event) => {
                validatePhone(event.target);
            });

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const isUserNameValid = validateUserName(userNameInput);
                const isPhoneValid = validatePhone(phoneInput);
                if (!isUserNameValid || !isPhoneValid) {
                    event.preventDefault();
                } else {
                    submitBtns[i].value = 'Зачекайте...';
                    setTimeout(() => {
                        document.querySelector('.form-body-thanks').classList.add('active');
                        document.querySelector('.form-body').classList.remove('active');
                    }, 2000);
                }
            });
        });
    }

    validateForm();
});