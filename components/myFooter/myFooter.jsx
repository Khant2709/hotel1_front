import React from 'react';
import Link from "next/link";

import styles from "./myFooter.module.css";
import stylesFonts from "../../src/styles/fonts/timesNewRoman.module.css";

const MyFooter = () => {
    return (
        <section className={`${stylesFonts.newRoman400} ${styles.main}`}>
            <p>&#169; 2023 Профессиональная веб-разработка от:
                <a href={'mailto:Khant2709@gmail.com'}
                   target={'_blank'}
                   rel="noopener noreferrer"
                > @Vladislav
                </a>
            </p>
            <Link href={'/privacy'}>
                политика конфиденциальности
            </Link>
        </section>
    );
};

export default MyFooter;