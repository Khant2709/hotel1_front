import React from 'react';
import PropTypes from 'prop-types';

import MainPage from "../../../particles/reservationCurrentRoom/MainPage";

import allRequest from "../../../../utils/allRequest";
import {getAllData} from "../../../../utils/axios";
import {validateArray, validateObject} from "../../../../utils/validate/validateGettingData";
import ErrorLadingData from "../../../../components/errorLadingData/errorLadingData";

import styles from '../../../styles/apartment.module.css';
import HeaderLineBackground from "../../../../components/headerLineBackgrund/headerLineBackground";


export async function generateMetadata({params: {id}}, parent) {
    const hotelNumber = id.split('_')[0];
    const idRoom = id.split('_')[1];

    const getData = await allRequest({
        currentHotel: null,
        currentApartments: null,
    }, [
        () => getAllData.currentHotels(hotelNumber),
        () => getAllData.currentApartments(hotelNumber, idRoom),
    ]);

    return {
        title: `${getData.currentApartments.nameApartment} || ${getData.currentHotel.nameHotel}`,
        description: `${getData.currentApartments.roomsDescription}`,
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
            "кабардинка номера",
            "жилье в кабардинке",
            "кабардинка жилье недорого",
            "кабардинка гостевые дома",
            "гостевые дома кабардинки цены",
            "кабардинка снять жилье +у моря",
            "отель номер удобства",
            "удобства +в номере",
        ], // Ключевые слова, связанные с вашим отелем и местоположением
        openGraph: {
            title: `${getData.currentApartments.nameApartment} || ${getData.currentHotel.nameHotel}`,
            description: `${getData.currentApartments.roomsDescription}`,
            url: `https://shikarnyivid.ru/${id}`, // Абсолютный URL вашей страницы
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
    }
}

async function getData(id) {
    const hotelNumber = id.split('_')[0];
    const currantRoomId = id.split('_')[1];

    const hotelData = {
        currentHotel: null,
        allApartments: [],
        currentApartments: null,
        allBookings: []

    };

    const request = [
        () => getAllData.currentHotels(hotelNumber),
        () => getAllData.allApartments(),
        () => getAllData.currentApartments(hotelNumber, currantRoomId),
        () => getAllData.allBookings()
    ];

    return await allRequest(hotelData, request);
}


export default async function Page({params: {id}}) {
    const {currentHotel, allApartments, currentApartments, allBookings} = await getData(id);

    const jsonLd = {
        "url": `https://shikarnyivid.ru/reservation/${id}`,
        "description": `${currentApartments.roomsDescription}`,
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
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": `${currentApartments.nameApartment}`,
                    "item": `https://shikarnyivid.ru/reservation/${id}`
                },
            ]
        }
    };

    const validationAllApartments = validateArray(allApartments);
    // const validationAllBookings = validateArray(allBookings);
    const validationCurrentHotel = validateObject(currentHotel);
    const validationCurrentApartments = validateObject(currentApartments);

    return (
        <section className={styles.main}>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            {(!validationAllApartments  && !validationCurrentHotel && !validationCurrentApartments)
                ? <MainPage hotelNumber={currentHotel.numberHotel}
                            currentHotel={currentHotel}
                            allApartments={allApartments}
                            currentApartments={currentApartments}
                            allBookings={allBookings}
                />
                : <>
                    <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
                    <div className={styles.containerError}>
                        <ErrorLadingData text={'Ошибка! Не удалось загрузить данные текущего номера.'}
                                         error={[currentHotel, allApartments, currentApartments, allBookings]}
                                         page={'reservation/[id]'}
                        />
                    </div>
                </>
            }
        </section>
    );
};

Page.propTypes = {
    currentHotel: PropTypes.object.isRequired,
    allApartments: PropTypes.array.isRequired,
    currentApartments: PropTypes.object.isRequired,
    allBookings: PropTypes.array.isRequired,
}