export const validateName = (name) => {
    if (!name.trim()) {
        return { valid: false, message: 'Поле не должно быть пустым' };
    }

    if (name.length < 2 || name.length > 30) {
        return { valid: false, message: 'Имя должно быть от 2 до 30 символов' };
    }

    const nameRegex = /^[a-zA-Zа-яА-Я\s]+$/;
    if (!nameRegex.test(name.trim())) {
        return { valid: false, message: 'Можно ввоить только буквы' };
    }

    return { valid: true, message: '' };
};

export const validatePhone = (phone) => {
    const transformPhone = phone.replace(/\D/g, '');
    if (!transformPhone.trim()) {
        return { valid: false, message: 'Поле не должно быть пустым' };
    }

    if (transformPhone.length !== 11 ) {
        return { valid: false, message: 'Введите корректно номер +7(...)...-..-..' };
    }

    return { valid: true, message: '' };
};

export const validateEmail = (email) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    if (!email.trim()) {
        return { valid: false, message: 'Поле не должно быть пустым' };
    }

    if(!emailRegex.test(email)) {
        return { valid: false, message: 'Ввеите корректно email'}
    }

    return { valid: true, message: '' };
}