import React from 'react';

import styles from '../../styles/reservationCurrentRoomSecondSection.module.css';
import stylesFontsT from "../../styles/fonts/timesNewRoman.module.css";

const SecondSection = ({borderBottom, currentRoom, currentHotel}) => (
        <>
            <div className={stylesFontsT.newRoman400} style={borderBottom}>
                <h1 className={styles.title}>{currentRoom.nameApartment}</h1>

                <div className={styles.containerList}>
                    <div className={styles.wrapperItem}>
                        <div className={styles.circle}/>
                        <p>{currentRoom.bedsCount} гостей</p>
                    </div>
                    <div className={styles.wrapperItem}>
                        <div className={styles.circle}/>
                        <p>{currentRoom.roomsCount} спальни</p>
                    </div>
                </div>

            </div>

            <div className={`${stylesFontsT.newRoman400} ${styles.containerDescriptionHotel}`} style={borderBottom}>
                <p className={styles.subTitle}>Описание Базы отдыха:</p>
                <p>{currentHotel.descriptionHotel}</p>
            </div>

            <div className={`${stylesFontsT.newRoman400} ${styles.containerDescriptionHotel}`} style={borderBottom}>
                <p className={styles.subTitle}>Описание Номера:</p>
                {currentRoom.roomsDescription.split('&').map((el, i) => {
                    return <p key={i}>{el}</p>
                })}
            </div>

            <div className={`${stylesFontsT.newRoman400} ${styles.containerDescriptionHotel}`} style={borderBottom}>
                <p className={styles.subTitle}>Удобства:</p>
                <ul className={styles.comfortList}>
                    {currentRoom.comfort.split('&').map((el, index) => {
                        return <li key={index}>{el}</li>
                    })}
                </ul>
            </div>
        </>
    );

export default SecondSection;