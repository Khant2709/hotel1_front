import {Inter} from "next/font/google";
import "../styles/globals.css";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import {WindowWidthProvider} from "../../utils/UseWidth";
import {PopUpProvider} from "../../utils/useWindowPopUp";
import WindowPopUp from "../../components/windowPopUp/windowPopUp";
import {PopUpAdminProvider} from "../../utils/useWindowPopUpAdmin";
import WindowPopUpAdmin from "../../components/windowPopUpAdmin/windowPopUpAdmin";
import MyFooter from "../../components/myFooter/myFooter";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    site_name: 'Отель Шикарный Вид',
    generator: 'Next.js', // Информация о генераторе, указывает на то, что сайт создан с помощью Next.js
    applicationName: 'Отель Шикарный Вид', // Название вашего отеля
    referrer: 'origin-when-cross-origin', // Указывает на то, как браузер должен обрабатывать referrer при переходах на другие источники (cross-origin)
    authors: [
        {name: 'VladislavKh'}, // Имя автора (может быть вашим именем или именем администратора сайта)
    ],
    creator: 'VladislavKh', // Имя создателя сайта
    publisher: 'Отель "Шикарный Вид"', // Имя издателя (вашего отеля)
    formatDetection: {
        email: false, // Отключение автоматического форматирования электронных адресов
        address: false, // Отключение автоматического форматирования адресов
        telephone: false, // Отключение автоматического форматирования телефонных номеров
    },
    lang: 'ru',
    icons: {
        // Основная иконка сайта (favicon), отображается во вкладке браузера
        icon: {
            url: '/favicon.png', // URL основной иконки (обязательно абсолютный)
            type: 'image/png',   // Тип файла (PNG)
            width: 32,            // Ширина иконки (32 пикселя)
            height: 32,           // Высота иконки (32 пикселя)
        },
        // Ярлык для добавления на домашний экран устройства
        shortcut: {
            url: '/shortcut-icon.png', // URL ярлыка (обязательно абсолютный)
            type: 'image/png',         // Тип файла (PNG)
            width: 192,                 // Ширина ярлыка (192 пикселя)
            height: 192,                // Высота ярлыка (192 пикселя)
        },
        // Иконка для Safari на устройствах Apple
        apple: {
            url: '/apple-icon.png', // URL иконки для Safari (обязательно абсолютный)
            type: 'image/png',      // Тип файла (PNG)
            width: 180,              // Ширина иконки (180 пикселей)
            height: 180,             // Высота иконки (180 пикселей)
        },
        // Другие специфичные иконки или свойства
        other: {
            rel: 'apple-touch-icon-precomposed', // Тип иконки (для Safari)
            url: '/apple-touch-icon-precomposed.png', // URL другой иконки (обязательно абсолютный)
            type: 'image/png',     // Тип файла (PNG)
            width: 180,             // Ширина иконки (180 пикселей)
            height: 180,            // Высота иконки (180 пикселей)
        },
    },
    verification: {
        // Подтверждение владения сайтом в Google Search Console
        google: 'google-site-verification-code', // Замените 'google-site-verification-code' на ваш код подтверждения Google

        // Подтверждение владения сайтом в Яндекс.Вебмастере
        yandex: 'yandex-verification-code', // Замените 'yandex-verification-code' на ваш код подтверждения Яндекса

        // Дополнительные теги для других сервисов (необязательно)
        other: {
            // Тег 'me' для указания вашего электронного адреса и ссылки
            me: ['Khant2709@gmail.com'], // Замените 'your-email' на ваш электронный адрес и 'your-link' на вашу ссылку
        },
    },
    assets: [
        'https://shikarnyivid.ru/public', // Пример ссылки на хранение изображений
        'https://shikarnyivid.ru/sitemap.xml', // Ссылка на файл sitemap
        'https://shikarnyivid.ru/robots.txt', // Ссылка на файл robots.txt
    ],
    category: 'отель', // Укажите категорию вашего контента, например, "отель"
    viewport: {
        content: 'width=device-width, initial-scale=1.0',
    },
};

export default function RootLayout({children}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": "Отель Шикарный Вид",
        "logo": "",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+7-989-2430-60-80",
            "email": "Khant2709@gmail.com",
            "contactType": "бронирование номеров и обслуживание клиентов"
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "Россия",
            "addressRegion": "Краснодарский край",
            "addressLocality": "Кабардинка",
            "streetAddress": "ул. Сухумское Шоссе 1а"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "44.668097",
            "longitude": "37.915490"
        },
        "sameAs": [
            "ссылка на страницу в Facebook",
            "ссылка на страницу в Instagram",
            "ссылка на страницу в Twitter"
        ]
    };


    return (
        <html lang="ru">
        <body className={inter.className}>
        <script type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        <WindowWidthProvider>
            <PopUpAdminProvider>
                <PopUpProvider>
                        <WindowPopUpAdmin/>
                        <WindowPopUp/>
                        <Header/>
                        {children}
                        <Footer/>
                        <MyFooter/>
                </PopUpProvider>
            </PopUpAdminProvider>
        </WindowWidthProvider>
        </body>
        </html>
    );
}
