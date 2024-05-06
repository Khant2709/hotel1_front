import {getLastDay} from "../getDay";

const validateCountDaysReservation = ({today, startReservation, dataStartReservation, dataEndReservation}) => {

    if (today <= dataStartReservation.getTime() && dataStartReservation.getTime() < dataEndReservation.getTime()) {
        const countDays = dataEndReservation.getDate() - dataStartReservation.getDate() >= 0
            ? dataEndReservation.getDate() - dataStartReservation.getDate()
            : startReservation && getLastDay({
            currentMonth: dataStartReservation.getMonth(), currentDate: dataStartReservation
        }) - dataStartReservation.getDate() + dataEndReservation.getDate() + 1;

        return countDays;
    }
    return 1
};

export default validateCountDaysReservation;