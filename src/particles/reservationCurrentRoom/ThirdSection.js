import React from 'react';

import ButtonSecondary from "../../../components/buttonSecondory/buttonSecondory";
import transformPrice from "../../../utils/transformPrice";
import calculateTotalAndAverage from "../../../utils/calculateTotalAndAverage";

import styles from "../../styles/reservationCurrentRoomThirdSection.module.css";
import stylesFontsT from "../../styles/fonts/timesNewRoman.module.css";

const ThirdSection = ({
                          hotelNumber,
                          currentHotel,
                          startReservation,
                          setStartReservation,
                          endReservation,
                          setEndReservation,
                          countPeopleReservation,
                          setCountPeopleReservation,
                          currentRoom,
                          countDays,
                          errorReservation,
                          setErrorReservation,
                          priceArray,
                          setPopUpWindow,
                          setData
                      }) => {


    const reservation = async () => {
        await setData({
            idHotel: currentHotel.id,
            nameHotel: `База отдыха "${currentHotel.nameHotel}"`,
            idApartment: currentRoom.id,
            nameApartment: currentRoom.nameApartment,
            startData: startReservation,
            endData: endReservation,
            countPeople: countPeopleReservation,
            priceOneNight: averageSumPerDay,
            finishPrice: totalSum,
            onePrice: false
        })

        await setPopUpWindow(false)
    }

    const {
        totalSum,
        averageSumPerDay,
        totalDays
    } = calculateTotalAndAverage(startReservation, endReservation, JSON.parse(priceArray), setErrorReservation);

    return (
        <div className={styles.wrapperForm}>
            <div className={`${stylesFontsT.newRoman400} ${styles.containerForm}`}>
                <div className={styles.containerColumn}>
                    <p>Дата заезда:</p>
                    <input type={'date'}
                           className={stylesFontsT.newRoman400}
                           value={startReservation}
                           onChange={e => setStartReservation(e.target.value)}/>
                </div>

                <div className={styles.containerColumn}>
                    <p>Дата выезда:</p>
                    <input type={'date'}
                           className={stylesFontsT.newRoman400}
                           value={endReservation}
                           onChange={e => setEndReservation(e.target.value)}/>
                </div>

                <div className={styles.containerColumn}>
                    <p>Количество гостей:</p>
                    <select className={stylesFontsT.newRoman400}
                            value={countPeopleReservation}
                            onChange={e => setCountPeopleReservation(e.target.value)}>
                        <option value={0}>Выбрать</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                        <option value={13}>13</option>
                        <option value={14}>14</option>
                        <option value={15}>15</option>
                        <option value={16}>16</option>
                    </select>
                </div>

                <div className={styles.containerColumn}>
                    <p>Цена за одну ночь:</p>
                    <div className={styles.containerPrice}>{transformPrice(averageSumPerDay)}</div>
                </div>

                <div className={styles.containerColumn}>
                    <p>Цена за {totalDays} ночи:</p>
                    <div
                        className={styles.containerPrice}>
                        {transformPrice(totalSum)}
                    </div>
                </div>

                <ButtonSecondary text={'Забронировать'} hotel={hotelNumber} disabled={errorReservation}
                                 handleClick={reservation}/>
            </div>
            <p className={`${stylesFontsT.newRoman400} ${styles.error}`}>
                {errorReservation}
            </p>
        </div>

    );
};

export default ThirdSection;