const validateBookingDate = ({filterBooking, startDate, endDate}) => {
    return filterBooking.some(booking => {
        const startDataBooking = new Date(booking.startDataReservation).getTime();
        const endDataBooking = new Date(booking.endDataReservation).getTime();

        // Проверяем, что начало выбранного периода не попадает внутрь уже забронированного интервала
        const startsInside = startDate >= startDataBooking && startDate < endDataBooking;
        // Проверяем, что конец выбранного периода не попадает внутрь уже забронированного интервала
        const endsInside = endDate > startDataBooking && endDate <= endDataBooking;
        // Проверяем, что начало и конец выбранного периода не находятся внутри уже забронированного интервала
        const isInside = startDate >= endDataBooking || endDate <= startDataBooking;

        // Проверяем, что выбранный период не пересекается с уже забронированным
        if (startsInside || endsInside || !isInside) {
            console.log('На выбранную дату место занято');
            return true;
        }
    });
};


export default validateBookingDate;