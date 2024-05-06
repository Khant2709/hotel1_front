import React from 'react';

import FirstSectionHotels from "../../particles/hotels/FirstSection";
import SecondSectionHotels from "../../particles/hotels/SecondSectionHotels";

import {getAllData} from "../../../utils/axios";
import allRequest from "../../../utils/allRequest";
import {numberCurrentHotel} from "../../../informationData/contacts";
import {validateArray} from "../../../utils/validate/validateGettingData";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";

import styles from '../../styles/hotels.module.css';

export const metadata = {
    title: "Все наши отели || Шикарный вид",
    description: "Выбирайте любой наш отель на Черном море в Кабардинке, Геленджике, Сочи. Забронируйте прямо сейчас! Телефон: +7-989-2430-60-80.",
    keywords: [
        "Шикарный Вид",
        "Кабардинка",
        "Геленджик",
        "Сочи",
        "Краснодарский край",
        "отель",
        "гостиница",
        "гостиницы сочи",
        "отели на черном море",
        "жилье на море",
        "жилье на черном море",
        "отдых на черном море",
        "кабардинка отдых",
        "геленджик отели",
        "южное побережье России",
    ], // Ключевые слова, связанные с вашим отелем и местоположением

    openGraph: {
        title: 'Все наши отели || Шикарный вид',
        description: 'Выбирайте любой наш отель на Черном море в Кабардинке, Геленджике, Сочи. Забронируйте прямо сейчас! Телефон: +7-989-2430-60-80.',
        url: 'https://shikarnyivid.ru/hotels', // Абсолютный URL вашей страницы
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
    };

    const request = [
        () => getAllData.allHotels(),
    ];

    return await allRequest(hotelData, request);
}


export default async function Hotels() {
    const {allHotels} = await getData();

    const jsonLd = {
        "url": "https://shikarnyivid.ru/hotels",
        "description": "Выбирайте любой наш отель на Черном море в Кабардинке, Геленджике, Сочи. Забронируйте прямо сейчас! Телефон: +7-989-2430-60-80.",
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
                    "name": "Отели",
                    "item": "https://shikarnyivid.ru/hotels"
                }
            ]
        }
    };

    const validateAllHotels = validateArray(allHotels);

    return (
        <section>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <main className={styles.main}>
                <FirstSectionHotels hotelNumber={numberCurrentHotel}/>
                {!validateAllHotels
                    ? <SecondSectionHotels allHotel={allHotels}/>
                    : <div className={styles.wrapperError}>
                        <ErrorLadingData page={'Hotels'}
                                         error={allHotels}
                                         text={'Произошла ошибка, не уалось загрузить информацию об отелях.'}
                        />
                    </div>
                }
            </main>
        </section>
    );
};
