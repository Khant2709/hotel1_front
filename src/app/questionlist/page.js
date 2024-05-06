import React from 'react';
import {getAllData} from "../../../utils/axios";
import {numberCurrentHotel} from "../../../informationData/contacts";
import allRequest from "../../../utils/allRequest";
import FifthSection from "../../particles/mainPage/fifthSection/fifthSection";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import {validateArray} from "../../../utils/validate/validateGettingData";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";


export const metadata = {
    title: "Вопросы - ответы || Шикарный вид",
    description: "Вопросы - ответы отеля Шикарный вид в Кабардинке. Тут вы узнаете ответы на все часто заадаваемые вопросы.",
    keywords: [
        "Шикарный Вид",
        "Кабардинка",
        "Краснодарский край",
        "Черное море",
        "информация об отеле",
        "информация о пляже",
        "жилье на море",
        "семейный отдых",
        "летний отдых",
        "комфортый отдых",
        "южное побережье России",
        "контакты",
        "номер телефона",
        "вопрос-ответ"
    ], // Ключевые слова, связанные с вашим отелем и местоположением

    openGraph: {
        title: 'Вопрос-ответ || Шикарный вид',
        description: 'Вопросы - ответы отеля Шикарный вид в Кабардинке. Тут вы узнаете ответы на все часто заадаваемые вопросы.',
        url: 'https://shikarnyivid.ru/questionlist', // Абсолютный URL вашей страницы
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
        questionList: []
    };

    const request = [
        () => getAllData.getQuestion(numberCurrentHotel),
    ];

    return await allRequest(hotelData, request);
}

export default async function QuestionListPage() {
    const {questionList} = await getData();

    const jsonLd = {
        "url": "https://shikarnyivid.ru/questionlist",
        "description": "Вопросы - ответы отеля Шикарный вид в Кабардинке. Тут вы узнаете ответы на все часто заадаваемые вопросы.",
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
                    "item": "https://shikarnyivid.ru/questionlist"
                }
            ]
        }
    };

    const validateQuestionList = validateArray(questionList);

    return (
        <div>
            <HeaderLineBackground hotelNumber={numberCurrentHotel} display={true}/>
            {!validateQuestionList
                ? <FifthSection questionList={questionList} numberHotel={numberCurrentHotel}/>
                : <div style={{minHeight: '50vh'}}>
                    <ErrorLadingData page={'questionList'}
                                   error={questionList}
                                   text={'Произошла ошибка, не уалось загрузить информацию вопросов и ответов.'}
                />
                </div>
            }
        </div>
    );
};
