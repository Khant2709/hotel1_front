'use client'

import React from 'react';
import {useRouter} from "next/navigation";

import FormSearchDate from "../formSerchDate/formSerchDate";

import styles from './headerLineBackground.module.css';

const HeaderLineBackground = ({hotelNumber, currentUrl, searchParams, setAllHotels, setFreeRooms, display}) => {
    const router = useRouter();

    return (
        <div className={styles.backgroundLine} style={display && {height: '5.5rem'}}>
            <div className={styles.wrapperForm} style={display && {display: 'none'}}>
                <FormSearchDate color={'white'}
                                router={router}
                                hotelNumber={hotelNumber}
                                currentUrl={currentUrl}
                                searchParams={searchParams}
                                setAllHotels={setAllHotels}
                                setFreeRooms={setFreeRooms}
                />
            </div>
        </div>
    );
}

export default HeaderLineBackground;