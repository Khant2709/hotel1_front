'use client'

import React, {useEffect} from 'react';
import {usePopUpWindowAdmin} from "../../utils/useWindowPopUpAdmin";

import styles from './windowPopUpAdmin.module.css';
import stylesFont from '../../src/styles/fonts/timesNewRoman.module.css';

const WindowPopUpAdmin = () => {
    const {popUpWindowAdmin, setPopUpWindowAdmin, dataResponse} = usePopUpWindowAdmin();
    const checkResponse = dataResponse.status === 'OK';

    useEffect(() => {
        setTimeout(() => {
            setPopUpWindowAdmin(false)
        }, 3000)
    }, [dataResponse, setPopUpWindowAdmin])

    if (!popUpWindowAdmin) {
        return <div className={styles.hidden}/>
    }

    return (
        <div className={`${stylesFont.newRoman400} ${styles.main} ${checkResponse ? styles.success : styles.error}`}>
            {dataResponse.response || 'Что-то пошло не так не возможно отобразить ошибку...'}
        </div>
    );
};

export default WindowPopUpAdmin;