import React from 'react';

import navbar from "../../informationData/navbar";
import HeaderBurger from "./headerBurger";
import HeaderMain from "./headerMain";

import styles from './header.module.css';


const Header = () => {

    return (
        <>
            <section className={styles.wrapperHeader}>
                <div className={styles.wrapperHeaderMain}>
                    <HeaderMain navbar={navbar}/>
                </div>
                <div className={styles.wrapperHeaderBurger}>
                    <HeaderBurger navbar={navbar}/>
                </div>
            </section>
        </>
    );
};

export default Header;