import React from 'react';
import PropTypes from 'prop-types';

import ReservationAll from "../../particles/reservationall/mainPage";
import {getAllData} from "../../../utils/axios";
import allRequest from "../../../utils/allRequest";
import {numberCurrentHotel} from "../../../informationData/contacts";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import {validateArray, validateObject} from "../../../utils/validate/validateGettingData";

import styles from "../../styles/reservation.module.css";


export const metadata = {
    title: "Бронирование || Шикарный вид",
    description: "Выбирайте и бронируйте номера на Черном море в наших отелях в Кабардинке, Сочи, Геленджике. Сравните цены, количество комнат и вместимость для идеального отдыха у моря.",
    keywords: [
        "Шикарный Вид",
        "Кабардинка",
        "Геленджик",
        "Сочи",
        "Краснодарский край",
        "бронирование отеля",
        "забронировать номер",
        "кабардинка номера",
        "Сочи номера",
        "Геленджик номера",
        "кабардинка отели",
        "Сочи отели",
        "Геленджик отели",
        "кабардинка отдых",
        "Сочи отдых",
        "Геленджик отдых",
        "отель кабардинка",
        "жилье в кабардинке",
        "кабардинка жилье недорого",
        "кабардинка гостевые дома",
        "гостевые дома кабардинки цены",
        "кабардинка снять жилье +у моря",
    ], // Ключевые слова, связанные с вашим отелем и местоположением

    openGraph: {
        title: 'Бронирование || Шикарный вид',
        description: "Выбирайте и бронируйте номера на Черном море в наших отелях в Кабардинке, Сочи, Геленджике. Сравните цены, количество комнат и вместимость для идеального отдыха у моря.",
        url: 'https://shikarnyivid.ru/reservationall', // Абсолютный URL вашей страницы
        images: [   //изображений, которые могут быть использованы для представления вашей страницы при ее публикации в социальных сетях или других сервисах
            {
                url: 'https://shikarnyivid.ru/og-image.jpg', // Абсолютный URL изображения
                width: 1200,
                height: 630,
                alt: 'Отель "Шикарный Вид" в Кабардинке', // Альтернативный текст для изображения
            },
        ],
        locale: 'ru_RU', // Языковая локаль (русский, Россия)
        type: 'website', // Тип страницы (веб-сайт)
    },
    robots: {
        index: true, // Не индексировать страницу
        follow: true, // Следовать по ссылкам на странице
        googleBot: {
            index: true, // Индексировать содержимое страницы GoogleBot
            follow: true, // Не следовать по ссылкам GoogleBot
        },
        yandexBot: {
            index: true, // Индексировать содержимое страницы YandexBot
            follow: true, // Следовать по ссылкам YandexBot
        },
    },
};

async function getData() {
    const hotelData = {
        allHotels: [],
        currentHotel: null,
    };

    const request = [
        () => getAllData.allHotels(),
        () => getAllData.currentHotels(numberCurrentHotel),
    ];

    return await allRequest(hotelData, request);
}


export default async function WrapperReservationAll() {
    const {allHotels, currentHotel} = await getData();

    const jsonLd = {
        "url": "https://shikarnyivid.ru/reservationall",
        "description": "Выбирайте и бронируйте номера на Черном море в наших отелях в Кабардинке, Сочи, Геленджике. Сравните цены, количество комнат и вместимость для идеального отдыха у моря.",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": "https://shikarnyivid.ru"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Бронирование",
                    "item": "https://shikarnyivid.ru/reservationall"
                }
            ]
        }
    };

    const validateAllHotels = validateArray(allHotels);
    const validateCurrentHotel = validateObject(currentHotel);

    return (
        <section className={styles.main}>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            {(validateAllHotels || validateCurrentHotel)
                ? <>
                    <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
                    <div className={styles.wrapperError}>
                        <ErrorLadingData text={'Ошибка! Не удалось загрузить данные отелей и номеров'}
                                         page={'reservationall'} error={[currentHotel, allHotels]}
                        />
                    </div>
                </>
                : <ReservationAll hotelNumber={numberCurrentHotel} allHotels={allHotels} currentHotel={currentHotel}/>
            }

        </section>
    );
};

WrapperReservationAll.propTypes = {
    currentHotel: PropTypes.object.isRequired,
    allHotels: PropTypes.array.isRequired,
}