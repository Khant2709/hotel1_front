'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import {getNextDay, getToday} from "../../utils/getDay";
import {validateFormReservation} from "../../utils/validate/vaidateFormReservation";

import Button from "../button/button";

import styles from "./formSerchDate.module.css";
import stylesFontsT from "../../src/styles/fonts/timesNewRoman.module.css";


const FormSearchDate = ({color, searchParams,}) => {
    const router = useRouter();
    const colorLabel = color ? color : 'black';

    const searchStartReservation = searchParams && searchParams.get('startReservation');
    const searchEndReservation = searchParams && searchParams.get('endReservation');
    const searchCountPeopleReservation = searchParams && searchParams.get('countPeopleReservation');

    const [startReservation, setStartReservation] = useState(searchStartReservation ? searchStartReservation.trim() : getToday());                                               // Дата бронирования с
    const [endReservation, setEndReservation] = useState(searchEndReservation ? searchEndReservation.trim() : getNextDay());                                                   // Дата бронирования до
    const [countPeopleReservation, setCountPeopleReservation] = useState(searchCountPeopleReservation ? searchCountPeopleReservation : 1);                                   // Кол человек
    const [errorReservation, setErrorReservation] = useState(null);

    const today = new Date(getToday()).getTime();
    let dataStartReservation = new Date(startReservation);                                                              // Преобразовываем в дату
    let dataEndReservation = new Date(endReservation);

    useEffect(() => {
        const startDate = dataStartReservation.getTime();
        const endDate = dataEndReservation.getTime();
        //Проверка на корректность дат
        validateFormReservation({
            today,
            startDate,
            endDate,
            checkCountPeople: true,
            countPeopleReservation,
            setErrorReservation: setErrorReservation
        });
    }, [startReservation, endReservation, countPeopleReservation, today, dataStartReservation, dataEndReservation]);

    const reloadSearch = () => {
        router.push(`/reservationall?startReservation=${startReservation.trim()}&endReservation=${endReservation.trim()}&countPeopleReservation=${countPeopleReservation}`)
    }

    return (
        <div className={styles.containerReservation}>
            <div className={styles.wrapperFilter}>
                <div className={styles.wrapper}>
                    <label htmlFor="startDate" className={stylesFontsT.newRoman400} style={{color: `${colorLabel}`}}>
                        Дата заезда:
                    </label>
                    <input id={'startDate'}
                           type={'date'}
                           value={startReservation}
                           onChange={e => setStartReservation(e.target.value)}
                           className={`${stylesFontsT.newRoman400} ${styles.testInp}`}/>
                </div>

                <div className={styles.wrapper}>
                    <label htmlFor="finishDate" className={stylesFontsT.newRoman400} style={{color: `${colorLabel}`}}>
                        Дата выезда:
                    </label>
                    <input id={'finishDate'}
                           type={'date'}
                           value={endReservation}
                           onChange={e => setEndReservation(e.target.value)}
                           className={stylesFontsT.newRoman400}/>
                </div>

                <div className={styles.wrapper}>
                    <label htmlFor="countPeople" className={stylesFontsT.newRoman400} style={{color: `${colorLabel}`}}>
                        Кол. гостей:
                    </label>
                    <select id={'countPeople'}
                            value={countPeopleReservation}
                            onChange={e => setCountPeopleReservation(e.target.value)}
                            className={stylesFontsT.newRoman400}>
                        <option value={1} className={stylesFontsT.newRoman400}>1</option>
                        <option value={2} className={stylesFontsT.newRoman400}>2</option>
                        <option value={3} className={stylesFontsT.newRoman400}>3</option>
                        <option value={4} className={stylesFontsT.newRoman400}>4</option>
                        <option value={5} className={stylesFontsT.newRoman400}>5</option>
                        <option value={6} className={stylesFontsT.newRoman400}>6</option>
                        <option value={7} className={stylesFontsT.newRoman400}>7</option>
                        <option value={8} className={stylesFontsT.newRoman400}>8</option>
                        <option value={9} className={stylesFontsT.newRoman400}>9</option>
                        <option value={10} className={stylesFontsT.newRoman400}>10</option>
                        <option value={11} className={stylesFontsT.newRoman400}>11</option>
                        <option value={12} className={stylesFontsT.newRoman400}>12</option>
                        <option value={13} className={stylesFontsT.newRoman400}>13</option>
                        <option value={14} className={stylesFontsT.newRoman400}>14</option>
                        <option value={15} className={stylesFontsT.newRoman400}>15</option>
                        <option value={16} className={stylesFontsT.newRoman400}>16</option>
                    </select>
                </div>
                <Button text={'Поиск'}
                        hotel={'hotel1'}
                        handleClick={reloadSearch}
                        disabled={errorReservation}
                />
            </div>
            <p className={`${stylesFontsT.newRoman400} ${styles.error}`}>
                {errorReservation}
            </p>
        </div>
    );
};

export default FormSearchDate;