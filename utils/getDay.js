export const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // добавляем 0 перед числами меньше 10
    const day = String(today.getDate()).padStart(2, '0'); // добавляем 0 перед числами меньше 10
    return `${year}-${month}-${day}`;
}

export const getNextDay = () => {
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 3); // Увеличиваем текущую дату на 3 дня
    const year = dayAfterTomorrow.getFullYear();
    const month = String(dayAfterTomorrow.getMonth() + 1).padStart(2, '0'); // добавляем 0 перед числами меньше 10
    const day = String(dayAfterTomorrow.getDate()).padStart(2, '0'); // добавляем 0 перед числами меньше 10
    return `${year}-${month}-${day}`;
}

export const getLastDay = ({currentDate, currentMonth}) => {
    // Создаем новый объект Date для первого дня следующего месяца
    const nextMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 1);

    // Перемещаемся на предыдущий день, чтобы получить последний день текущего месяца
    nextMonth.setDate(nextMonth.getDate() - 1);

    // Получаем день (количество дней в текущем месяце)
    const numberOfDays = nextMonth.getDate();

    return numberOfDays;
}