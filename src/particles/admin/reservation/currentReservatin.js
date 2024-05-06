'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import PropTypes from 'prop-types';

import Title from '../../../../components/title/title';
import ButtonSecondary from '../../../../components/buttonSecondory/buttonSecondory';
import formatPhoneNumber from '../../../../utils/validate/maskPhneNumber';
import {reservationQuery} from '../../../../utils/axios';
import checkToken from "../../../../utils/checkToken";

import styles from '../../../styles/adminStyles/reservation/currentReservation.module.css';
import stylesFonts from '../../../styles/fonts/timesNewRoman.module.css';
import {usePopUpWindowAdmin} from "../../../../utils/useWindowPopUpAdmin";

const MainCurrentReservation = ({currentHotel, currentApartment, currentReservation}) => {
    const router = useRouter();
    const {setPopUpWindowAdmin, setDataResponse} = usePopUpWindowAdmin();

    const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('token') : null;

    const [editInfo, setEditInfo] = useState(false);
    const [dataGuest, setDataGuest] = useState({name: '', phone: '', email: ''});
    const [prepayment, setPrepayment] = useState(currentReservation.prepayment === 0 ? '' : currentReservation.prepayment);
    const [warning, setWarning] = useState({verification: false, action: ''});

    useEffect(() => checkToken(router), [router]);

    const toggleEditData = () => {
        setEditInfo((prevEditInfo) => !prevEditInfo);
        setDataGuest({name: '', phone: '', email: ''});
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        // Применение маски к значению, если поле ввода относится к номеру телефона
        const processedValue = name === 'phone' ? formatPhoneNumber(value) : value;

        setDataGuest((prevDataGuest) => ({
            ...prevDataGuest,
            [name]: processedValue,
        }));
    };

    // Подтверждение/изменение данных брони
    const verificationReservation = () => {
        if (!!prepayment && prepayment !== 0) {
            const data = {
                token,
                idReservation: currentReservation.id,
                name: dataGuest.name,
                phone: dataGuest.phone,
                email: dataGuest.email,
                prepayment: prepayment,
                verification: true
            };

            reservationQuery.editReservation(data)
                .then((res) => {
                    // console.log(res.data)
                    setPopUpWindowAdmin(true);
                    setDataResponse({status: 'OK', response: res.data.message});
                    location.reload();
                })
                .catch((e) => {
                    // console.warn(e.response.data)
                    setPopUpWindowAdmin(true);
                    setDataResponse({status: 'ER', response: e.response.data.message});
                });
        }
    };

    //Удаление брони
    const deleteReservation = () => {
        if (warning.verification && warning.action === 'delete') {
            reservationQuery.deleteReservation(currentReservation.id, token)
                .then((res) => {
                    // console.log(res.data);
                    setPopUpWindowAdmin(true);
                    setDataResponse({status: 'OK', response: res.data.message});
                    router.back();
                })
                .catch((e) => {
                    // console.warn(e.response.data)
                    setPopUpWindowAdmin(true);
                    setDataResponse({status: 'ER', response: e.response.data.message});
                });
        }
    };

    //Архивация брони
    const archiveReservation = () => {
        if (warning.verification && warning.action === 'archive') {
            reservationQuery.archiveReservation(currentReservation.id, token)
                .then((res) => {
                    // console.log(res.data);
                    setPopUpWindowAdmin(true);
                    setDataResponse({status: 'OK', response: res.data.message});
                    router.back();
                })
                .catch((e) => {
                    // console.warn(e.response.data)
                    setPopUpWindowAdmin(true);
                    setDataResponse({status: 'ER', response: e.response.data.message});
                });
        }
    };

    //Для оптимизацие и сокращения кода вынес поля и значения в масивы
    const guestInfoFields = [
        {label: "Имя гостя:", value: currentReservation.nameGuest},
        {label: "Номер гостя:", value: currentReservation.phoneNumberGuest},
        {label: "Почта гостя:", value: currentReservation.emailGuest}
    ];

    const inputFields = [
        {label: "Введите имя:", name: "name", value: dataGuest.name, placeholder: "Введите имя гостя"},
        {label: "Введите номер:", name: "phone", value: dataGuest.phone, placeholder: "9892436080"},
        {label: "Введите почту:", name: "email", value: dataGuest.email, placeholder: "Введите адрес электронной почты"}
    ];

    const reservationDetails = [
        {label: "Отель:", value: currentHotel?.nameHotel || 'Не найдено'},
        {label: "Апартаменты:", value: currentApartment?.nameApartment || 'Не найдено'},
        {label: "Кол. человек:", value: currentReservation.countPeople},
        {label: "Дата заезда:", value: currentReservation.startDataReservation},
        {label: "Дата выезда:", value: currentReservation.endDataReservation}
    ];

    const buttonConfig = [
        {
            text: 'подтвердить',
            onClick: verificationReservation,
            styleClass: styles.btnSuccses
        },
        {
            text: 'архивировать',
            onClick: () => setWarning({verification: true, action: 'archive'}),
            styleClass: styles.btnArchive
        },
        {
            text: 'удалить',
            onClick: () => setWarning({verification: true, action: 'delete'}),
            styleClass: styles.btnDelete
        }
    ];

    return (
        <div className={`${stylesFonts.newRoman400} ${styles.main}`}>
            <Title Tag="h2" text={`Бронь № ${currentReservation.id}`}/>
            <div className={styles.wrapperContainer}>

                <div className={styles.container}>
                    <h2>Данные гостя</h2>
                    {guestInfoFields.map((field, index) => (
                        <div className={styles.row} key={index}>
                            <p>{field.label}</p>
                            <p>{field.value}</p>
                        </div>
                    ))}
                    <div className={styles.editInfo}>
                        <ButtonSecondary text={editInfo ? 'скрыть' : 'редактировать'}
                                         hotel={'hotel1'}
                                         handleClick={toggleEditData}/>
                    </div>
                    {editInfo && (
                        <>
                            {inputFields.map((input, index) => (
                                <div className={styles.row} key={index}>
                                    <p>{input.label}</p>
                                    <input
                                        name={input.name}
                                        value={input.value}
                                        className={`${stylesFonts.newRoman400} ${styles.inp}`}
                                        onChange={handleInputChange}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className={styles.container}>
                    <h2>Данные по брони</h2>
                    {reservationDetails.map((detail, index) => (
                        <div className={styles.row} key={index}>
                            <p>{detail.label}</p>
                            <p>{detail.value}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.container}>
                    <h2>Подтверждение брони:</h2>
                    <div className={styles.row}>
                        <p>Предоплата: </p>
                        <p>{currentReservation.prepayment}p</p>
                    </div>
                    <div className={styles.row}>
                        <p>Внесите предоплату: </p>
                        <input
                            type="number"
                            className={`${stylesFonts.newRoman400} ${styles.inp}`}
                            value={prepayment}
                            placeholder="0"
                            onChange={(e) => setPrepayment(e.target.value)}
                        />
                    </div>
                    <div className={styles.row}>
                        <p>Подтверждение брони: </p>
                        <p>{currentReservation.verification === 0 ? 'Не подтверждена' : 'Подтверждена'}</p>
                    </div>
                </div>

                {warning.verification ? (
                    <div className={styles.containerBtns}>
                        <button
                            className={`${stylesFonts.newRoman400} ${styles.btnDelete} ${styles.btnArchive2}`}
                            onClick={warning.action === 'delete' ? deleteReservation : archiveReservation}
                        >
                            {warning.action === 'delete' ? 'удалить' : 'архивировать'}
                        </button>
                        <button className={`${stylesFonts.newRoman400}`}
                                onClick={() => setWarning({verification: false, action: ''})}>
                            отмена
                        </button>
                    </div>
                ) : (
                    <div className={styles.containerBtns}>
                        {buttonConfig.map((button, index) => (
                            <button key={index} onClick={button.onClick}
                                    className={`${stylesFonts.newRoman400} ${button.styleClass}`}>
                                {button.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

MainCurrentReservation.propTypes = {
    currentHotel: PropTypes.object.isRequired,
    currentApartment: PropTypes.object.isRequired,
    currentReservation: PropTypes.object.isRequired,
};

export default MainCurrentReservation;
