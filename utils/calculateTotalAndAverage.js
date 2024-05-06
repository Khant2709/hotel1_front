const getDatesInRange = (startReservation, endReservation) => {
    const dates = [];
    const currentDate = new Date(startReservation);
    const endDate = new Date(endReservation);

    // Пока текущая дата меньше даты выезда (не включая дату выезда)
    while (currentDate < endDate) {
        // Преобразуем текущую дату в строку формата 'YYYY-MM-DD' и добавляем в массив
        dates.push(currentDate.toISOString().split('T')[0]);

        // Переходим к следующему дню
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

export default function calculateTotalAndAverage(startReservation, endReservation, priceArray, setErrorReservation) {
    const periods = [
        {startDate: '2024-05-01', endDate: '2024-05-12', priceIndex: 0},
        {startDate: '2024-05-13', endDate: '2024-06-15', priceIndex: 1},
        {startDate: '2024-06-16', endDate: '2024-09-15', priceIndex: 2},
        {startDate: '2024-09-16', endDate: '2024-10-15', priceIndex: 3}
    ];
    let errorPeriod = false;

    const datesArray = getDatesInRange(startReservation, endReservation);

    let totalSum = 0;
    let totalDays = datesArray.length;

    datesArray.forEach(date => {
        const transformDate = new Date(date);

        // Найти правильный период для даты
        const period = periods.find(period => transformDate >= new Date(period.startDate) && transformDate <= new Date(period.endDate));

        if (period) {
            // Добавляем цену за текущий день к общей сумме
            errorPeriod = false
            totalSum += priceArray[period.priceIndex];
        } else {
            errorPeriod = true
        }
    })


    // Вычисляем среднюю сумму за день и округляем до целого числа
    let averageSumPerDay = Math.round(totalSum / totalDays);

    if(errorPeriod) {
        totalSum = 0
        totalDays = 0
        averageSumPerDay = 0
        setErrorReservation('Вы выбрали не корректную дату')
    }

    if(!averageSumPerDay) averageSumPerDay = 0

    // Возвращаем общую сумму и среднюю сумму за день
    return {averageSumPerDay, totalSum, totalDays};
}