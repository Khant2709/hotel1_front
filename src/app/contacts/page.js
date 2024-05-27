import React from 'react';
import Link from "next/link";

import FormCall from "../../../components/formCall/formCall";
import FormSearchDate from "../../../components/formSerchDate/formSerchDate";
import {WrapperMail, WrapperPhone} from "../../../components/wrapperPhone/wrapperLink";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import Title from "../../../components/title/title";
import YaMap from "../../../components/yaMap/yaMap";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";

import {getAllData} from "../../../utils/axios";
import allRequest from "../../../utils/allRequest";
import {validateArray, validateObject} from "../../../utils/validate/validateGettingData";

import {contacts, numberCurrentHotel} from "../../../informationData/contacts";
import {metaDataContactsPage} from "../../../metaSeo/metaData";
import {jsonLDContactsPage} from "../../../metaSeo/seoData";

import styles from "../../styles/contacts.module.css";
import stylesFontsT from "../../styles/fonts/timesNewRoman.module.css";


export const metadata = metaDataContactsPage;

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

    const validateCurrentHotel = validateObject(currentHotel);
    const validateAHotel = validateArray(allHotel);

    const phone = contacts[0];
    const email = contacts[1];

    //Повторяющиеся стили
    const containerStyles = styles.containerContacts;
    const subTitleStyles = styles.subTitle;

    return (
        <section>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDContactsPage)}}/>
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

                    <ContainerTrack/>

                    <ContainerInformation/>

                    <ContainerHotels validateAHotel={validateAHotel}
                                     validateCurrentHotel={validateCurrentHotel}
                                     allHotel={allHotel}
                                     currentHotel={currentHotel}
                                     subTitleStyles={subTitleStyles}/>

                    <p className={styles.finishText}>
                        Отель &quot;Шикарный вид&quot; - идеальное место для вашего отдыха на побережье Черного моря. Свяжитесь с
                        нами любым удобным для вас способом, и мы будем рады ответить на все ваши вопросы и помочь
                        организовать незабываемый отпуск.
                    </p>

                    <div className={styles.wrapperFormCall}>
                        <FormCall text={'Заказать звонок'} numberHotel={numberCurrentHotel}/>
                    </div>
                </div>

                <YaMap/>
            </main>
        </section>
    );
};


const ContainerTrack = () => (
    <div className={`${stylesFontsT.newRoman400} ${styles.containerInformation}`}>
        <p className={styles.titleInformation}>Путь до нас:</p>
        <div className={styles.wrapperRowInformation}>
            <p className={styles.subTitleInformation}>На автомобиле:</p>
            <ul className={styles.textInformation}>
                <li>Описание маршрута с разных направлений (например, из центра Анапы, из аэропорта и
                    т.д.)
                </li>
                <li>Описание маршрута с разных направлений (например, из центра Анапы, из аэропорта и
                    т.д.)
                </li>
            </ul>
        </div>
        <div className={styles.wrapperRowInformation}>
            <p className={styles.subTitleInformation}>На общественном транспорте:</p>
            <ul className={styles.textInformation}>
                <li>Описание маршрутов автобусов, электричек, ближайших
                    остановок.
                </li>
                <li>Описание маршрутов автобусов, электричек, ближайших
                    остановок.
                </li>
            </ul>
        </div>
    </div>
);

const ContainerInformation = () => (
    <div className={`${stylesFontsT.newRoman400} ${styles.containerInformation}`}>
        <p className={styles.titleInformation}>Полезная информация:</p>
        <div className={styles.wrapperRowInformation}>
            <p className={styles.subTitleInformation}>Достопримечательности:</p>
            <ul className={styles.textInformation}>
                <li>Описание и расстояние до ближайших туристических мест.</li>
                <li>Описание и расстояние до ближайших туристических мест.</li>
                <li>Описание и расстояние до ближайших туристических мест.</li>
            </ul>
        </div>
        <div className={styles.wrapperRowInformation}>
            <p className={styles.subTitleInformation}>Интересные места:</p>
            <ul className={styles.textInformation}>
                <li>Описание и расстояние до ближайших интересных мест (пляж, бары, рестораны).</li>
                <li>Описание и расстояние до ближайших интересных мест (пляж, бары, рестораны).</li>
                <li>Описание и расстояние до ближайших интересных мест (пляж, бары, рестораны).</li>
            </ul>
        </div>
    </div>
);

const ContainerHotels = ({validateAHotel, validateCurrentHotel, subTitleStyles, allHotel, currentHotel}) => (
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
                            <Link className={styles.websiteHotel} href={hotel.website}>
                                {hotel.website}
                            </Link>
                        </div>
                    })}
                </div>
            </>
            : <ErrorLadingData page={'Contacts'}
                               error={[currentHotel, allHotel]}
                               text={'Произошла ошибка, не уалось загрузить информацию об отелях.'}
            />}
    </div>
);