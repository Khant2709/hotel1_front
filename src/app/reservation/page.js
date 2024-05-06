import React from 'react';

import FormSearchDate from "../../../components/formSerchDate/formSerchDate";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import WrapperHotel from "../../../components/ContainerHotel/ContainerHotel";
import FirstSection from "../../particles/reservation/firstSection";
import allRequest from "../../../utils/allRequest";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";

import {getAllData} from "../../../utils/axios";
import {numberCurrentHotel} from "../../../informationData/contacts";
import {validateArray, validateObject} from "../../../utils/validate/validateGettingData";

import styles from '../../styles/reservation.module.css';

export const metadata = {
    title: "Бронирование || Шикарный вид",
    description: "Выбирайте и бронируйте номера на Черном море в Кабардинке в нашем отеле. Сравните цены, количество комнат и вместимость для идеального отдыха у моря.",
    keywords: [
        "Шикарный Вид",
        "Кабардинка",
        "Краснодарский край",
        "бронирование отеля",
        "забронировать номер",
        "кабардинка номера",
        "кабардинка отели",
        "отель кабардинка",
        "кабардинка отдых",
        "жилье в кабардинке",
        "кабардинка жилье недорого",
        "кабардинка гостевые дома",
        "гостевые дома кабардинки цены",
        "кабардинка снять жилье +у моря",
    ], // Ключевые слова, связанные с вашим отелем и местоположением

    openGraph: {
        title: 'Бронирование || Шикарный вид',
        description: 'Выбирайте и бронируйте номера на Черном море в Кабардинке в нашем отеле. Сравните цены, количество комнат и вместимость для идеального отдыха у моря.',
        url: 'https://shikarnyivid.ru/reservation', // Абсолютный URL вашей страницы
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
        allHotel: [],
        currentHotel: null,
        apartmentsFromHotel: null
    };

    const request = [
        () => getAllData.allHotels(),
        () => getAllData.currentHotels(numberCurrentHotel),
        () => getAllData.apartmentsFromHotel(numberCurrentHotel)
    ];

    return await allRequest(hotelData, request);
}


export default async function Reservation() {
    const {allHotel, currentHotel, apartmentsFromHotel} = await getData();

    const jsonLd = {
        "url": "https://shikarnyivid.ru/reservation",
        "description": "Выбирайте и бронируйте номера на Черном море в Кабардинке в нашем отеле. Сравните цены, количество комнат и вместимость для идеального отдыха у моря.",
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
                    "item": "https://shikarnyivid.ru/reservation"
                }
            ]
        }
    };

    const validateAllHotels = validateArray(allHotel);
    const validateApartmentsFromHotel = validateArray(apartmentsFromHotel);
    const validateCurrentHotel = validateObject(currentHotel);

    return (
        <section className={styles.main}>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <HeaderLineBackground hotelNumber={numberCurrentHotel}/>

            <div className={styles.wrapperFormSearch}>
                <FormSearchDate hotelNumber={numberCurrentHotel}/>
            </div>

            {(validateApartmentsFromHotel || validateCurrentHotel)
                ? <div style={{minHeight: '20vh'}}>
                    <ErrorLadingData text={'Ошибка! Не удалось загрузить данные номеров'}
                                     page={'reservation'} error={[currentHotel, apartmentsFromHotel]}
                    />
                </div>
                : <WrapperHotel hotel={currentHotel} arrayRooms={apartmentsFromHotel}/>

            }

            {(validateAllHotels || validateCurrentHotel)
                ? <div style={{minHeight: '20vh'}}>
                    <ErrorLadingData text={'Ошибка! Не удалось загрузить данные других отелей'}
                                     page={'reservation'} error={[currentHotel, allHotel]}
                    />
                </div>
                : <FirstSection currentHotel={currentHotel} allHotel={allHotel}/>
            }
        </section>
    );
};

