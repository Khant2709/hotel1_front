export const validateFormReservation = ({
                                            today,
                                            startDate,
                                            endDate,
                                            checkCountPeople,
                                            currentRoom,
                                            countPeopleReservation,
                                            setErrorReservation
                                        }) => {
    const oneDay = 86400000;

    if (today > startDate) {
        return setErrorReservation('Вы установили не корректную дату в заезде');
    }

    if (startDate > endDate) {
        return setErrorReservation('Дата заезда не может быть позже даты везда');
    }

    if (endDate < startDate) {
        return setErrorReservation('Дата везда не может быть раньше даты везда');
    }

    if (startDate + (oneDay * 3) > endDate) {
        return setErrorReservation('Минимальная бронь 3 ночи');
    }

    if (currentRoom && checkCountPeople) {
        if (countPeopleReservation > currentRoom?.bedsCount) {
            return setErrorReservation(`Максимальное число гостей ${currentRoom?.bedsCount}`);
        }

        if (countPeopleReservation <= currentRoom?.bedsCount) {
            return setErrorReservation(null);
        }
    }

    if (today <= startDate) {
        return setErrorReservation(null);
    }

    if (startDate < endDate) {
        return setErrorReservation(null);
    }
};