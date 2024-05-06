import {getAllData} from "../../utils/axios";

import FirstSection from "../particles/mainPage/firstSection/firstSection";
import SecondSection from "../particles/mainPage/secondSection/secondSection";
import ThirdSection from "../particles/mainPage/thirdSection/thirdSection";
import FourthSection from "../particles/mainPage/fourthSection/fourthSection";
import FifthSection from "../particles/mainPage/fifthSection/fifthSection";
import SixSection from "../particles/mainPage/sixSection/sixSection";

import FormSearchDate from "../../components/formSerchDate/formSerchDate";
import allRequest from "../../utils/allRequest";
import ErrorLadingData from "../../components/errorLadingData/errorLadingData";
import HeaderLineBackground from "../../components/headerLineBackgrund/headerLineBackground";
import {numberCurrentHotel} from "../../informationData/contacts";

import styles from "../styles/page.module.css";
import {validateArray, validateObject} from "../../utils/validate/validateGettingData";


export const metadata = {
    title: "Шикарный вид",
    description: "Отель Шикарный вид в Кабардинке, предназначен для шикарного отдыха и приятных воспоминаний. Краснодарский край, Кабардинка, ул. Сухумское Шоссе , 1а,  +7-989-2430-60-80 для бронирования и обслуживания гостей.",
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
    ], // Ключевые слова, связанные с вашим отелем и местоположением
    openGraph: {
        title: 'Шикарный вид',
        description: 'Отель Шикарный вид в Кабардинке, предназначен для шикарного отдыха и приятных воспоминаний. Краснодарский край, Кабардинка, ул. Сухумское Шоссе , 1а,  +7-989-2430-60-80 для бронирования и обслуживания гостей.',
        url: 'https://shikarnyivid.ru', // Абсолютный URL вашей страницы
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
        currentHotel: null,
        apartmentsFromHotel: [],
        questionList: []
    };

    const request = [
        () => getAllData.currentHotels(numberCurrentHotel),
        () => getAllData.apartmentsFromHotel(numberCurrentHotel),
        () => getAllData.getQuestion(numberCurrentHotel),
    ];

    return await allRequest(hotelData, request);
}


export default async function Home() {
    const {currentHotel, apartmentsFromHotel, questionList} = await getData();

    const jsonLd = {
        "url": "https://shikarnyivid.ru",
        "description": "Отель Шикарный вид в Кабардинке, предназначен для шикарного отдыха и приятных воспоминаний. Краснодарский край, Кабардинка, ул. Сухумское Шоссе , 1а,  +7-989-2430-60-80 для бронирования и обслуживания гостей.",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": "https://shikarnyivid.ru"
                }
            ]
        }
    };

    const validateCurrentHotel = validateObject(currentHotel);
    const validateApartmentsFromHotel = validateArray(apartmentsFromHotel);
    const validateQuestionList = validateArray(questionList);

    if (validateCurrentHotel) {
        return <main className={styles.main}>
            <HeaderLineBackground hotelNumber={numberCurrentHotel} display={true}/>
            <ErrorLadingData text={'Ошибка! Не удалось загрузить данные отеля.'}
                             page={'Страница Главная, Home => currentHotel'}
                             error={currentHotel}
            />
        </main>
    }

    return (
        <>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <main className={styles.main}>
                <FirstSection hotelNumber={numberCurrentHotel} currentHotel={currentHotel}/>
                <div className={styles.wrapperForm}>
                    <FormSearchDate hotelNumber={numberCurrentHotel}/>
                </div>
                {!validateApartmentsFromHotel
                    ? <SecondSection numberHotel={numberCurrentHotel}
                                     apartments={apartmentsFromHotel}
                    />
                    : <div className={styles.wrapperErrorSecondSection}>
                        <ErrorLadingData text={'Ошибка! Не удалось загрузить данные номеров отеля.'}
                                         page={'mainPage => SecondSection'}
                                         error={apartmentsFromHotel}
                        />
                    </div>
                }
                <ThirdSection hotel={currentHotel}/>
                <FourthSection descriptionHotel={currentHotel.descriptionHotel}/>
                {!validateQuestionList
                    ? <FifthSection numberHotel={numberCurrentHotel} questionList={questionList} hasSlice={true}/>
                    : <div className={styles.wrapperErrorFifthSection}>
                        <ErrorLadingData text={'Ошибка! Не удалось загрузить блок вопрос-ответ.'}
                                         page={'mainPage => FifthSection'}
                                         error={questionList}
                        />
                    </div>
                }
                <SixSection address={currentHotel.address}/>
            </main>
        </>
    );
}
