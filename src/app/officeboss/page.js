'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import ButtonGradient from "../../../components/buttonGradient/buttonGradient";
import {login} from "../../../utils/axios";
import {usePopUpWindowAdmin} from "../../../utils/useWindowPopUpAdmin";

import styles from '../../styles/officeBoss.module.css';
import stylesFonts from '../../styles/fonts/timesNewRoman.module.css';

const PageOfficeBoss = () => {
    const router = useRouter();
    const {setPopUpWindowAdmin, setDataResponse} = usePopUpWindowAdmin();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [statusPassword, setStatusPassword] = useState(true);

    useEffect(() => {
        const token = window.sessionStorage.getItem('token');

        if (token) {
            router.push('/officeboss/admin');
        }
    }, [router])

    const checkAuth = () => {
        login({name, password})
            .then((res) => {
                window.sessionStorage.setItem('token', res.data.token);
                setPopUpWindowAdmin(true);
                setDataResponse({status: 'OK', response: 'Успешный вход!'});
                router.push('/officeboss/admin');
            })
            .catch(e => {
                setPopUpWindowAdmin(true);
                setDataResponse({status: 'ER', response: e.response.data.message});
                // router.push('/');
            })
    }

    return (
        <>
            <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
            <section className={styles.main}>
                <div className={`${stylesFonts.newRoman400} ${styles.container}`}>
                    <input type={'text'}
                           placeholder={'Имя'}
                           value={name}
                           className={stylesFonts.newRoman400}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <input type={statusPassword ? 'password' : 'text'}
                           placeholder={'Пароль'}
                           value={password}
                           className={stylesFonts.newRoman400}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className={styles.text} onClick={() => setStatusPassword(!statusPassword)}>
                        {statusPassword ? 'Показать пароль' : 'Скрыть пароль'}
                    </p>

                    <ButtonGradient text={'Войти'} handleClick={checkAuth}/>
                </div>
            </section>
            {/*<button onClick={() => router.push('/officeboss/admin')}>login</button>*/}
        </>

    );
};

export default PageOfficeBoss;