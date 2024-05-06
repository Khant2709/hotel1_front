import React from 'react';

import {contacts, linkYaMap} from "../../../../informationData/contacts";
import {WrapperMail, WrapperPhone} from "../../../../components/wrapperPhone/wrapperLink";
import YaMap from "../../../../components/yaMap/yaMap";

import styles from '../../../styles/sixSection.module.css';
import stylesFontsT from '../../../styles/fonts/timesNewRoman.module.css';


const SixSection = ({address}) => (
    <section className={styles.main}>
        <div className={styles.map}>
            <YaMap/>
        </div>
        <div className={styles.mainWrapper}>
            <div className={`${stylesFontsT.newRoman400} ${styles.containerInformation}`}>
                <h2 className={`${stylesFontsT.newRoman700} ${styles.title}`}>Контакты</h2>
                <div className={styles.row}>
                    <p className={styles.subTitle}>Адрес:</p>
                    <div className={styles.text}>
                        <a href={linkYaMap}
                           target={'_blank'}
                           rel="noopener noopener">
                            {address}
                        </a>
                    </div>
                </div>
                <div className={styles.row}>
                    <p className={styles.subTitle}>Телефон:</p>
                    <div className={styles.text}>
                        <WrapperPhone phoneNumber={contacts[0].phone}/>
                    </div>
                </div>
                <div className={styles.row}>
                    <p className={styles.subTitle}>Почта:</p>
                    <div className={styles.text}>
                        <WrapperMail email={contacts[1].mail}/>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default SixSection;