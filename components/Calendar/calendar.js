'use client'
import React, {useState} from 'react';
import Image from "next/image";

import arrowLeft from "../../public/arrowLeftCalendar.svg";
import arrowRight from "../../public/arrowRightCalendar.svg";

import styles from './calendar.module.css';
import stylesFontsT from "../../src/styles/fonts/timesNewRoman.module.css";

const Calendar = ({filterBooking}) => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Устанавливаем начальное значение текущей даты
    const today = useState(new Date()); // Устанавливаем начальное значение текущей даты

    // Функция для отображения дней месяца
    const renderDays = () => {
        const days = []; // Создаем массив для хранения компонентов с днями месяца
        const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1); // Получаем начальную дату текущего месяца
        const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0); // Получаем конечную дату текущего месяца
        const startDayOfWeek = monthStart.getDay(); // Получаем день недели, с которого начинается месяц (0 - воскресенье, 1 - понедельник, и т.д.)
        const startDate = new Date(monthStart);
        // Устанавливаем начальную дату, соответствующую понедельнику, вычитая из начальной даты день недели и добавляя 1 день, если начало месяца не попадает на понедельник
        startDate.setDate(startDate.getDate() - startDayOfWeek + (startDayOfWeek === 0 ? -6 : 1));
        const endDate = new Date(monthEnd); // Получаем объект даты для последнего дня текущего месяца
        let currentDate = new Date(startDate); // Устанавливаем текущую дату в начало месяца

        // Пока текущая дата не превышает последний день месяца
        while (currentDate <= endDate) {
            // Создаем массив с днем месяца
            days.push({day: currentDate.toISOString()});
            currentDate.setDate(currentDate.getDate() + 1); // Увеличиваем текущую дату на 1 день
        }

        // Если последний день месяца - воскресенье, добавляем числа следующего месяца до субботы
        if (endDate.getDay() !== 0) {
            let nextMonthDate = new Date(endDate);
            nextMonthDate.setDate(nextMonthDate.getDate() + 1); // Первое число следующего месяца

            while (nextMonthDate.getDay() !== 1) {
                days.push({day: nextMonthDate.toISOString()});
                nextMonthDate.setDate(nextMonthDate.getDate() + 1); // Переходим к следующему дню
            }
        }
        return days; // Возвращаем массив с компонентами дней месяца
    };


    // Обработчик клика по дню
    const handleDayClick = (date) => {
        if (date.getMonth() < selectedDate.getMonth()) {
            changeMonth(-1);
        }
        if (date.getMonth() > selectedDate.getMonth()) {
            changeMonth(1);
        }
    };

    // Функция для переключения месяцев
    const changeMonth = (amount) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + amount);
        setSelectedDate(newDate);
    };

    return (
        <div className={styles.calendarContainer}>

            <div className={`${stylesFontsT.newRoman700} ${styles.header}`}>
                <Image alt={'left'} src={arrowLeft} onClick={() => changeMonth(-1)} className={styles.arrow}/>
                <h2>{selectedDate.toLocaleDateString('default', {month: 'long', year: 'numeric'})}</h2>
                <Image alt={'right'} src={arrowRight} onClick={() => changeMonth(1)} className={styles.arrow}/>
            </div>

            <div className={styles.daysHeader}>
                <div className={styles.dayName}>ПН</div>
                <div className={styles.dayName}>ВТ</div>
                <div className={styles.dayName}>СР</div>
                <div className={styles.dayName}>ЧТ</div>
                <div className={styles.dayName}>ПТ</div>
                <div className={styles.dayName}>СБ</div>
                <div className={styles.dayName}>ВС</div>
            </div>

            <div className={styles.days}>
                {renderDays().map(el => {
                    const currentDate = new Date(el.day);
                    const transfomDay = 86400000;
                    const checkReservVerification = filterBooking.some(element => {
                        if (new Date(element.startDataReservation).getTime() - transfomDay <= currentDate.getTime() &&
                            new Date(element.endDataReservation).getTime() - transfomDay > currentDate.getTime() &&
                            !!element.verification) {
                            return true
                        }
                    });
                    const checkReservNoVerification = filterBooking.some(element => {
                        if (new Date(element.startDataReservation).getTime() - transfomDay <= currentDate.getTime() &&
                            new Date(element.endDataReservation).getTime() - transfomDay > currentDate.getTime() &&
                            !element.verification) {
                            return true
                        }
                    });
                    return <div key={el.day}
                                onClick={() => handleDayClick(currentDate)}
                                className={`${styles.day} 
                                ${currentDate.getMonth() === selectedDate.getMonth() ? '' : styles.disabled}`}>
                        <p className={`${stylesFontsT.newRoman400}
                                        ${checkReservVerification && styles.verificationReserv}
                                        ${checkReservNoVerification && styles.verificationNoReserv}
                                       ${today[0].getDate() === currentDate.getDate() && today[0].getMonth() === currentDate.getMonth() && styles.today}
                        `}>
                            {currentDate.getDate()}
                        </p>
                    </div>
                })}
            </div>

            <div className={`${stylesFontsT.newRoman400} ${styles.descriptionBooking}`}>
                <div className={styles.wrapperRow}>
                    <div className={styles.circleRed}/>
                    <p> - забронированные даты</p>
                </div>

                <div className={styles.wrapperRow}>
                    <div className={styles.circleGreen}/>
                    <p> - ждут подтверждения</p>
                </div>
            </div>
        </div>
    );
};

export default Calendar;