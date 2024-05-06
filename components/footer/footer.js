'use client'

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

import navbar from "../../informationData/navbar";
import {contacts, linkYaMap, numberCurrentHotel} from "../../informationData/contacts";
import {hotelList} from "../../informationData/dataHotels";
import {WrapperMail, WrapperPhone} from "../wrapperPhone/wrapperLink";

import iconTg from '../../public/iconTgFooter.svg';
import iconWt from '../../public/iconWtFooter.svg';
import iconInst from '../../public/iconInstFooter.svg';

import styles from './footer.module.css';
import stylesFontsI from '../../src/styles/fonts/inter.module.css';


const Footer = () => {
    const pathname = usePathname();
    const currentPath = pathname.split('/').length > 2 ? `/${pathname.split('/')[1]}` : pathname;
    const currentHotel = hotelList.find(hotel => hotel.numberHotel === numberCurrentHotel);
    const phone = contacts[0];
    const email = contacts[1];

    return (
        <section className={styles.main}>

            <div className={styles.firstContainer}>
                <div className={styles.column}>
                    <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Каталог</p>
                    {navbar.map(el => {
                        return <Link key={el.id}
                                     href={el.link}
                                     className={`${el.link === currentPath ? stylesFontsI.Inter700 : stylesFontsI.Inter300} ${styles.text}`}>
                            {el.textRu}
                        </Link>
                    })}
                </div>

                <div className={styles.column}>
                    <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Базы отдыха</p>
                    {hotelList.map(hotel => {
                        return <Link key={hotel.id}
                                     href={hotel.website}
                                     className={`${hotel.numberHotel === numberCurrentHotel ? stylesFontsI.Inter700 : stylesFontsI.Inter300}`}>
                            {hotel.nameHotel}
                        </Link>
                    })}
                </div>

                <div className={styles.column}>
                    <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Контакты</p>
                    <div className={styles.columnsContacts}>
                        <p className={styles.subTitleContacts}>Телефон:</p>
                        <WrapperPhone phoneNumber={phone.phone} whatsAppNumber={phone.wt}
                                      telegramNumber={phone.tg}/>
                    </div>
                    <div className={styles.columnsContacts}>
                        <p className={styles.subTitleContacts}>Почта:</p>
                        <WrapperMail email={email.mail}/>
                    </div>
                    <div className={styles.columnsContacts}>
                        <p className={styles.subTitleContacts}>Адрес:</p>
                        <a className={styles.address}
                           href={linkYaMap}
                           target={'_blank'}
                           rel="noopener noopener"
                        >
                            {currentHotel && currentHotel.address}
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.wrapperSecondContainer}>
                <div className={styles.secondContainer}>
                    <div className={styles.columnsSecondContainer}>
                        <p>ОГРН: 315231200002780</p>
                        <p>ИНН: 231200791910</p>
                    </div>

                    <div className={styles.columnsSecondContainer}>
                        <Image alt={'tg'} src={iconTg}/>
                        <Image alt={'wt'} src={iconWt}/>
                        <Image alt={'inst'} src={iconInst}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;