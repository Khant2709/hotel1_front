'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

import HeaderLineBackground from "../../components/headerLineBackgrund/headerLineBackground";

import img404 from '../../public/404Image.svg';

import styles from '../styles/notFounde.module.css';
import stylesFontT from '../styles/fonts/timesNewRoman.module.css';

const ErrorPage = () => {
    const router = useRouter();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            count !== 0 && setCount(prevCount => prevCount - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
            if (count === 1) {
                router.push('/');
            }
        };
    }, [count, router]);

    return (
        <div className={styles.main}>
            <HeaderLineBackground display={true}/>
            <div className={`${stylesFontT.newRoman400} ${styles.mainContainer}`}>
                <h2>УПС...Страница не найдена</h2>
                <Image alt={'404'} src={img404}/>
                <p>Возвращаем на главную через {count} ...</p>
            </div>
        </div>
    );
};

export default ErrorPage;
