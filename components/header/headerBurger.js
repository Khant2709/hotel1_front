'use client'

import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {WrapperMail, WrapperPhone} from "../wrapperPhone/wrapperLink";
import {contacts, numberCurrentHotel} from "../../informationData/contacts";
import {hotelList} from "../../informationData/dataHotels";

import burger from "../../public/burger.png";
import call from "../../public/callMobile.svg";
import close from "../../public/close.png";

import styles from "./headerBurger.module.css";
import stylesFontsI from "../../src/styles/fonts/inter.module.css";
import stylesFontsT from "../../src/styles/fonts/timesNewRoman.module.css";


const HeaderBurger = ({navbar}) => {
    const pathname = usePathname();
    const currentPath = pathname.split('/').length > 2 ? `/${pathname.split('/')[1]}` : pathname;
    const phone = contacts[0];
    const email = contacts[1];
    const currentHotel = hotelList.find(hotel => hotel.numberHotel === numberCurrentHotel);

    const [changeBlock, setChangeBlock] = useState(true);
    const [changeStyle, setChangeStyle] = useState(true);

    const toggle = () => {
        setChangeStyle(!changeStyle);
        setTimeout(() => {
            setChangeBlock(!changeBlock);
        }, 500)
    }

    return (
        <>
            {
                changeBlock
                    ? <div className={styles.wrapperHeaderMobile}>
                        <div className={styles.containerHeaderMobile}>
                            <Image alt={'burger'} src={burger} className={styles.iconBurger} onClick={toggle}/>
                            <p className={styles.title}>Шикарный вид</p>
                            <a href={`tel:${phone.wt}`}>
                                <Image alt={'call'} src={call} className={styles.iconCall}/>
                            </a>
                        </div>
                    </div>
                    : <div className={`${styles.navbar} ${changeStyle ? '' : styles.showNavbar}`}>
                        <Image alt={'close'} src={close} onClick={toggle}
                               className={styles.iconClose}/>
                        <div className={styles.containerNavbar}>
                            {navbar.map(el => {
                                return <Link key={el.id}
                                             href={el.link}
                                             onClick={toggle}
                                             className={`${el.link === currentPath && stylesFontsI.Inter700}
                                                 ${el.link === currentPath && styles.activeLink} 
                                                 ${styles.link}`}>
                                    {el.textRu}
                                </Link>
                            })}
                        </div>

                        <div className={styles.containerContacts}>
                            <div className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}>
                                <p className={styles.subTitle}>Единый номер:</p>
                                <WrapperPhone phoneNumber={phone.phone} telegramNumber={phone.tg}
                                              whatsAppNumber={phone.wt}/>
                            </div>
                            <div className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}>
                                <p className={styles.subTitle}>Наша почта:</p>
                                <WrapperMail email={email.mail}/>
                            </div>
                            <div className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}>
                                <p className={styles.subTitle}>Наш адресс:</p>
                                <p>{currentHotel.address}</p>
                            </div>
                        </div>

                        <div className={`${stylesFontsT.newRoman400} ${styles.containerOtherHotels}`}>
                            <p className={styles.titleOtherHotels}>Другие наши отели:</p>
                            {currentHotel && hotelList.map(hotel => {
                                if (hotel.id !== currentHotel.id) {
                                    return <p className={`${stylesFontsI.Inter700} ${styles.hotelName}`} key={hotel.id}>
                                        {hotel.nameHotel}
                                    </p>
                                }
                            })}
                        </div>
                    </div>
            }

        </>
    );
};

export default HeaderBurger;