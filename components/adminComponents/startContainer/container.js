'use client'

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";

import styles from './container.module.css';
import stylesFont from '../../../src/styles/fonts/timesNewRoman.module.css';

const Container = ({title, subtitle, text, redirect}) => {
    const router = useRouter();

    useEffect(() => {
        const token = window.sessionStorage.getItem('token');
        if (!token) {
            router.push('/officeboss');
        }
    }, [router])

    return (
        <div className={`${stylesFont.newRoman400} ${styles.container}`} onClick={() => router.push(redirect)}>
            <div>
                <p className={styles.title}>
                    {title}
                </p>
                {subtitle && <p className={styles.subtitle}>
                    {subtitle}
                </p>}
            </div>

            <div className={styles.text}>
                {text}
            </div>
        </div>
    );
};

export default Container;