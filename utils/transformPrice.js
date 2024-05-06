const transformPrice = (number) => {
    // Преобразуем число в строку
    let str = number.toString();

    // Разбиваем строку на части с помощью регулярного выражения
    // (\d{1,3}) - захватывающая группа из 1 до 3 цифр
    // $ - конец строки
    const parts = str.match(/\d{1,3}(?=(\d{3})*$)/g);

    // Объединяем части через пробел
    return parts.join(' ');
}

export default transformPrice;