'use client'

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import PropTypes from 'prop-types';

import FirstSection from "../../particles/reservationCurrentRoom/FirstSection";
import SecondSection from "../../particles/reservationCurrentRoom/SecondSection";
import ThirdSection from "../../particles/reservationCurrentRoom/ThirdSection";
import FourthSection from "./FourthSection";

import {useWindowWidth} from "../../../utils/UseWidth";
import TitleMainPage from "../../../components/TitleMainPage/TitleMainPage";
import FormSearchDate from "../../../components/formSerchDate/formSerchDate";
import Calendar from "../../../components/Calendar/calendar";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import CardApartment from "../../../components/cardApartment/cardApartment";
import {getNextDay, getToday} from "../../../utils/getDay";
import {validateFormReservation} from "../../../utils/validate/vaidateFormReservation";
import validateCountDaysReservation from "../../../utils/validate/validateCountDaysReservation";
import validateBookingDate from "../../../utils/validate/validateBookingDate";
import {usePopUpWindow} from "../../../utils/useWindowPopUp";

import {testRoomsPhotos} from "../../../informationData/dataHotels";

import imgTestRoom from "../../../public/testroom.webp";

import {mainColorHotel} from "../../../informationData/styleHotels";
import styles from '../../styles/apartment.module.css';
import stylesFontsT from '../../styles/fonts/timesNewRoman.module.css';


export default function MainPage({
                                     hotelNumber,
                                     currentHotel,
                                     allApartments,
                                     currentApartments,
                                     allBookings
                                 }) {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const {setPopUpWindow, setData} = usePopUpWindow();

    const searchStartReservation = searchParams.get('startReservation');
    const searchEndReservation = searchParams.get('endReservation');
    const searchCountPeopleReservation = searchParams.get('countPeopleReservation');
    const width = useWindowWidth();

    const [mainImg, setMainImg] = useState(testRoomsPhotos[0]);                                                         // Картинки номера в будущем поменять на инфу с бэка
    const [countSlice, setCountSlice] = useState({start: 0, end: 1});                                          // Слайдер
    const [startReservation, setStartReservation] = useState(searchStartReservation ? searchStartReservation.trim() : getToday());                                               // Дата бронирования с
    const [endReservation, setEndReservation] = useState(searchEndReservation ? searchEndReservation.trim() : getNextDay());                                                   // Дата бронирования до
    const [countPeopleReservation, setCountPeopleReservation] = useState(searchCountPeopleReservation ? searchCountPeopleReservation : 1);                                   // Кол человек
    const [errorReservation, setErrorReservation] = useState(null);

    const currentUrl = pathname.split('/')[1];

    const today = new Date(getToday()).getTime();
    let dataStartReservation = new Date(startReservation);                                                              // Преобразовываем в дату
    let dataEndReservation = new Date(endReservation);                                                                  // Преобразовываем в дату
    const currentRoom = currentApartments;
    const analoguesRooms = allApartments.filter(apartment => apartment.hotel_id === currentRoom.hotel_id &&
        apartment.bedsCount >= currentRoom.bedsCount && apartment.id !== currentRoom.id);
    const borderBottom = {borderBottom: `2px solid ${mainColorHotel[hotelNumber]}`};

    // Фильтрация броней для текущего номера
    const filterBooking = allBookings.filter(booking => {
        if (booking.idHotel === currentRoom?.hotel_id) {
            if (booking.idApartment === currentRoom?.id) {
                return true
            }

            // Если можно ареновать весь дом
            if (currentRoom.rentAllHouse) {
                const spitNameCurrentApartment = currentRoom.numberApartment.split('_');
                const lastNameApartment = spitNameCurrentApartment[1] === 'all';
                //Находим все номера в этом доме
                const allApartmentsInHouse = allApartments.filter(apartment => {
                    if (apartment.hotel_id === currentRoom?.hotel_id) {
                        const spitNameApartment = apartment.numberApartment.split('_');
                        if (spitNameApartment[0] === spitNameCurrentApartment[0]) {
                            // Если текущий номер это дом, то находим 1 и 2 этаж
                            if (lastNameApartment && spitNameApartment[1] !== 'all') {
                                return true
                            }
                            // Если текущий номер это 1 или 2 этаж, то находим весь дом
                            if (!lastNameApartment && spitNameApartment[1] === 'all') {
                                return true
                            }
                        }
                    }
                })

                //Находим брони по дому
                const checkOtherRoom = allApartmentsInHouse.some(el => el.id === booking.idApartment);

                if (checkOtherRoom) {
                    return true
                }
            }
        }
    });

    //Получаем количество бронируемых дней
    let countDays = validateCountDaysReservation({
        today,
        startReservation,
        dataStartReservation,
        dataEndReservation
    });


    // Проверка полей
    useEffect(() => {
        const startDate = dataStartReservation.getTime();
        const endDate = dataEndReservation.getTime();

        //Проверка на корректность дат
        validateFormReservation({
            today,
            startDate,
            endDate,
            checkCountPeople: true,
            currentRoom,
            countPeopleReservation,
            setErrorReservation: setErrorReservation
        });

        //Проверка на забронированные даты
        const chekReservation = validateBookingDate({filterBooking, startDate, endDate});
        chekReservation && setErrorReservation('На выбранную дату место занято');

    }, [currentRoom, dataEndReservation, dataStartReservation, filterBooking, countPeopleReservation, today])


    return (
        <>
            <HeaderLineBackground hotelNumber={hotelNumber}
                                  currentUrl={currentUrl}
                                  searchParams={searchParams}
            />

            <div className={styles.wrapperFormSearch}>
                <FormSearchDate hotelNumber={hotelNumber}
                                currentUrl={currentUrl}
                                searchParams={searchParams}
                />
            </div>

            <div className={styles.wrapperMain}>
                <TitleMainPage text={currentHotel.nameHotel} hotel={hotelNumber}
                               hasTopLine={true}
                               hasNameHotel={true}/>

                <FirstSection width={width}
                              mainImg={mainImg}
                              setMainImg={setMainImg}
                              setCountSlice={setCountSlice}
                              countSlice={countSlice}
                />

                <SecondSection currentRoom={currentRoom}
                               currentHotel={currentHotel}
                               borderBottom={borderBottom}
                />

                <ThirdSection hotelNumber={hotelNumber}
                              currentHotel={currentHotel}
                              startReservation={startReservation}
                              setStartReservation={setStartReservation}
                              endReservation={endReservation}
                              setEndReservation={setEndReservation}
                              countPeopleReservation={countPeopleReservation}
                              setCountPeopleReservation={setCountPeopleReservation}
                              currentRoom={currentRoom}
                              countDays={countDays}
                              errorReservation={errorReservation}
                              setErrorReservation={setErrorReservation}
                              priceArray={currentRoom.priceArray}
                              setPopUpWindow={setPopUpWindow}
                              setData={setData}
                />

                <FourthSection priceArray={JSON.parse(currentRoom.priceArray)}/>

                <p className={`${stylesFontsT.newRoman400} ${styles.titleCalendar}`}>Забронированные даты:</p>
                <div className={styles.wrapperCalendar}>
                    <Calendar filterBooking={filterBooking}/>
                </div>

                <div className={styles.wrapperAnaloguesRooms}>
                    <h2 className={stylesFontsT.newRoman400}>Похожие преложения</h2>
                    <div className={styles.wrapperCards}>
                        {analoguesRooms.slice(0, 3).map((apartment, indexApartment) => {
                            return <CardApartment
                                image={apartment.mainImage === 'empty' ? imgTestRoom : apartment.mainImage}
                                title={apartment.nameApartment}
                                bedsCount={apartment.bedsCount}
                                roomsCount={apartment.roomsCount}
                                cost={apartment.priceArray ? Math.min(...JSON?.parse(apartment.priceArray)) : 0}
                                numberHotel={currentHotel.numberHotel}
                                transition={() => router.push(`/reservation/${currentHotel.numberHotel}_${apartment.id}`)}
                                key={indexApartment}/>
                        })}
                    </div>
                </div>

            </div>
        </>
    );
};

MainPage.propTypes = {
    currentHotel: PropTypes.object.isRequired,
    allApartments: PropTypes.array.isRequired,
    currentApartments: PropTypes.object.isRequired,
    allBookings: PropTypes.array.isRequired,
}