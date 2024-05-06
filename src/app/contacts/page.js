import React from 'react';

import {contacts, numberCurrentHotel} from "../../../informationData/contacts";
import FormCall from "../../../components/formCall/formCall";
import FormSearchDate from "../../../components/formSerchDate/formSerchDate";
import {WrapperMail, WrapperPhone} from "../../../components/wrapperPhone/wrapperLink";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import Title from "../../../components/title/title";
import YaMap from "../../../components/yaMap/yaMap";
import {getAllData} from "../../../utils/axios";
import allRequest from "../../../utils/allRequest";

import styles from "../../styles/contacts.module.css";
import stylesFontsT from "../../styles/fonts/timesNewRoman.module.css";
import {validateArray, validateObject} from "../../../utils/validate/validateGettingData";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";


export const metadata = {
    title: "Контакты || Шикарный вид",
    description: "Контакты отеля Шикарный вид в Кабардинке. Краснодарский край, Кабардинка, ул. Сухумское Шоссе , 1а,  +7-989-2430-60-80 для бронирования и обслуживания гостей.",
    keywords: [
        "Шикарный Вид",
        "Кабардинка",
        "Краснодарский край",
        "Черное море",
        "отель",
        "пляж",
        "жилье на море",
        "семейный отдых",
        "летний отдых",
        "комфортый отдых",
        "южное побережье России",
        "контакты",
        "номер телефона",
    ], // Ключевые слова, связанные с вашим отелем и местоположением

    openGraph: {
        title: 'Контакты || Шикарный вид',
        description: 'Контакты отеля Шикарный вид в Кабардинке. Краснодарский край, Кабардинка, ул. Сухумское Шоссе , 1а,  +7-989-2430-60-80 для бронирования и обслуживания гостей.',
        url: 'https://shikarnyivid.ru/contacts', // Абсолютный URL вашей страницы
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
    };

    const request = [
        () => getAllData.allHotels(),
        () => getAllData.currentHotels(numberCurrentHotel),
    ];

    return await allRequest(hotelData, request);
}


export default async function ContactsPage() {
    const {currentHotel, allHotel} = await getData();

    const jsonLd = {
        "url": "https://shikarnyivid.ru/contacts",
        "description": "Контакты отеля Шикарный вид в Кабардинке. Краснодарский край, Кабардинка, ул. Сухумское Шоссе , 1а,  +7-989-2430-60-80 для бронирования и обслуживания гостей.",
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
                    "name": "Контакты",
                    "item": "https://shikarnyivid.ru/contacts"
                }
            ]
        }
    };

    const validateCurrentHotel = validateObject(currentHotel);
    const validateAHotel = validateArray(allHotel);

    const phone = contacts[0];
    const email = contacts[1];

    //Повторяющиеся стили
    const containerStyles = styles.containerContacts;
    const subTitleStyles = styles.subTitle;

    return (
        <section>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <main className={styles.main}>
                <HeaderLineBackground hotelNumber={numberCurrentHotel}/>

                <div className={`${stylesFontsT.newRoman400} ${styles.mainContainer}`}>

                    <div className={styles.wrapperFormSearch}>
                        <FormSearchDate hotelNumber={numberCurrentHotel}/>
                    </div>

                    <Title Tag={'h1'} text={'Свяжитесь с нами'}/>

                    <div className={containerStyles}>
                        <p className={subTitleStyles}>Единый номер:</p>
                        <WrapperPhone phoneNumber={phone.phone} telegramNumber={phone.tg} whatsAppNumber={phone.wt}/>
                    </div>

                    <div className={containerStyles}>
                        <p className={subTitleStyles}>Наша почта:</p>
                        <WrapperMail email={email.mail}/>
                    </div>

                    <div className={`${stylesFontsT.newRoman400} ${styles.containerAddress}`}>
                        {!validateAHotel && !validateCurrentHotel
                            ? <>
                                <p className={subTitleStyles}>Все наши отели:</p>
                                <div className={styles.wrapperHotels}>
                                    {allHotel.map(hotel => {
                                        return <div className={`${styles.containerHotel} 
                            ${currentHotel && currentHotel.numberHotel === hotel.numberHotel && styles.activeHotel}`}
                                                    key={hotel.id}>
                                            <p className={styles.nameHotel}>{'"' + hotel.nameHotel + '"'}</p>
                                            <p className={styles.addressHotel}>{hotel.address}</p>
                                            <p className={styles.websiteHotel}>{hotel.website}</p>
                                        </div>
                                    })}
                                </div>
                            </>
                            : <ErrorLadingData page={'Contacts'}
                                               error={[currentHotel, allHotel]}
                                               text={'Произошла ошибка, не уалось загрузить информацию об отелях.'}
                            />}
                    </div>

                    <div className={styles.wrapperFormCall}>
                        <FormCall text={'Заказать звонок'} numberHotel={numberCurrentHotel}/>
                    </div>
                </div>

                <YaMap/>
            </main>
        </section>
    );
};