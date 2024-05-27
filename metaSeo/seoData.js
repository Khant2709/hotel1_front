export const jsonLDMainPage = {
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

export const jsonLDHotelsPage = {
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

export const jsonLDContactsPage = {
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

export const jsonLDQuestionPage = {
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
}

export const jsonLDReservationAllPage = {
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

export const jsonLDReservationPage = {
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

export const jsonLDCurrentRoom = ({id, roomsDescription, nameApartment}) => {
    return {
        "url": `https://shikarnyivid.ru/reservation/${id}`,
        "description": `${roomsDescription}`,
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
                    "name": `${nameApartment}`,
                    "item": `https://shikarnyivid.ru/reservation/${id}`
                },
            ]
        }
    }
}