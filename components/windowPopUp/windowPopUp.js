'use client'

import React, {useState} from 'react';
import Image from "next/image";

import {usePopUpWindow} from "../../utils/useWindowPopUp";
import ButtonSecondary from "../buttonSecondory/buttonSecondory";
import {reservationQuery} from "../../utils/axios";
import {validateEmail, validateName, validatePhone} from "../../utils/validate/validateFields";
import formatPhoneNumber from "../../utils/validate/maskPhneNumber";

import close from '../../public/close.png';
import error from '../../public/errorIcon.png';
import succes from '../../public/succesIcon.png';

import styles from './windowPopUp.module.css';
import stylesFontT from '../../src/styles/fonts/timesNewRoman.module.css';


const WindowPopUp = () => {
    const {
        popUpWindow,
        setPopUpWindow,
        responseWindow,
        setResponseWindow,
        data,
        dataCallBack,
        setDataCallBack
    } = usePopUpWindow();
    const [dataResponse, setDataResponse] = useState({status: null, text: null});
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('+7')
    const [email, setEmail] = useState('')
    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        setPhone(formattedValue);
    };

    const listInformation = [
        {label: 'Дата заезда:', text: data.startData || 'empty'},
        {label: 'Дата выезда:', text: data.endData || 'empty'},
        {label: 'Кол-во гостей:', text: data.countPeople || 'empty'},
        {label: 'Цена за ночь:', text: data.priceOneNight || 'empty'},
        {label: 'Итоговая сумма:', text: data.finishPrice || 'empty'}
    ];

    const checkName = validateName(name);
    const checkPhone = validatePhone(phone);
    const checkEmail = validateEmail(email);
    const checkFields = checkName.valid && checkPhone.valid && checkEmail.valid;
    const checkDataReservation = listInformation.every(el => {
        if (el.text !== 'empty' && el.text) {
            if (typeof el.text === 'string') {
                if (el.text.trim()) return true
            }
            if (typeof el.text === 'number') {
                if (el.text !== 0) return true
            }
        }
    })

    const sendReservation = () => {
        const info = {
            idHotel: data.idHotel,
            idApartment: data.idApartment,
            countPeople: data.countPeople,
            startData: data.startData,
            endData: data.endData,
            finishPrice: data.finishPrice,
            nameGuest: name,
            phoneGuest: phone,
            emailGuest: email,
        }

        if (checked && checkFields && checkDataReservation) {
            reservationQuery.createReservation(info)
                .then(res => {
                    console.log(res.data)
                    setPopUpWindow(true)
                    setResponseWindow(false)
                    setDataResponse({status: 'OK', text: res.data.message});
                })
                .catch(e => {
                    console.warn(e.response.data)
                    setPopUpWindow(true)
                    setResponseWindow(false)
                    setDataResponse({status: 'ER', text: e.response.data.message});
                })
        }
    };

    //Обнуление всех данных для окон
    const closeResponse = async () => {
        await setResponseWindow(true);
        await setDataResponse({status: null, text: null});
        await setDataCallBack({status: null, text: null});
        await location.reload();
    }

    //Закрытие всех окон поверхностных
    if (popUpWindow && responseWindow) {
        return <div className={styles.hidden}/>
    }

    // Форма ответа после отправки на обратный звонок
    if (dataCallBack.status && !responseWindow) {
        console.log(dataCallBack)
        return <div className={styles.mainWindow}>
            <div className={styles.containerResponse}>
                <Image alt={'close'} src={close} className={styles.closeIcon} onClick={closeResponse}/>
                {
                    dataCallBack.status === 'OK'
                        ? <Image alt={'GOOD'} src={succes} className={styles.succesIcon}/>
                        : <Image alt={'ERROR'} src={error} className={styles.errorIcon}/>
                }
                <p className={`${stylesFontT.newRoman400} ${styles.textResponse}`}>
                    {dataCallBack.text}
                </p>
            </div>
        </div>
    }

    // Форма ответа после отправки на бронирование
    if (!dataCallBack.status && !responseWindow) {
        return <div className={styles.mainWindow}>
            <div className={styles.containerResponse}>
                <Image alt={'close'} src={close} className={styles.closeIcon} onClick={closeResponse}/>
                {
                    dataResponse.status === 'OK'
                        ? <Image alt={'GOOD'} src={succes} className={styles.succesIcon}/>
                        : <Image alt={'ERROR'} src={error} className={styles.errorIcon}/>
                }
                <p className={`${stylesFontT.newRoman400} ${styles.textResponse}`}>
                    {dataResponse.text}
                </p>
            </div>
        </div>
    }

    return (
        <div className={styles.mainWindow}>
            <div className={`${stylesFontT.newRoman400} ${styles.mainContainer}`}>
                <Image alt={'close'} src={close} onClick={() => setPopUpWindow(true)}/>
                <h2 className={styles.title}>
                    Забронировать номер
                </h2>
                <div className={styles.nameHotel}>
                    {data.nameHotel ? data.nameHotel : 'Ошибка, попробуйте еще раз.'}
                </div>
                <div className={styles.nameApartment}>
                    {data.nameApartment ? data.nameApartment : `Ошибка, попробуйте еще раз.”`}
                </div>
                <input className={`${!checkName.valid && styles.error} ${styles.inpName}`}
                       type={'text'}
                       placeholder={'Введите имя'}
                       value={name}
                       onChange={e => setName(e.target.value)}
                       autoFocus={true}
                />
                {!checkName.valid && <p className={styles.errorText}>{checkName.message}</p>}

                <input className={`${!checkPhone.valid && styles.error} ${styles.inpPhone}`}
                       type={'tel'}
                       placeholder={'Введите номер'}
                       value={phone}
                       onChange={handleChange}
                />
                {!checkPhone.valid && <p className={styles.errorText}>{checkPhone.message}</p>}

                <input className={`${!checkEmail.valid && styles.error} ${styles.inpEmail}`}
                       type={'email'}
                       placeholder={'Введите email'}
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                />
                {!checkEmail.valid && <p className={styles.errorText}>{checkEmail.message}</p>}

                <div className={styles.containerInformation}>
                    {
                        listInformation.map((el, i) => {
                            return <div key={i} className={styles.column}>
                                <label>{el.label}</label>
                                <p>{el.text}</p>
                            </div>
                        })
                    }
                </div>

                <p className={styles.lastInformation}>
                    *После бронирования, с вами свяжется наш оператор, для
                    подтверждения брони. Необходимо осуществить оплату за сутки проживания (до 7 дней отдыха), за 2
                    суток проживания (до 14 дней отдыха) и прикрепить чек в переписку, указав ваше ФИО, даты и
                    количество людей.
                </p>

                <div className={styles.containerCheckbox}>
                    <input type={'checkbox'} value={checked} onChange={() => setChecked(!checked)}/>
                    <p>Соглашаюсь с правилами <span>политики конфиденциальности</span></p>
                </div>

                <ButtonSecondary hotel={'hotel1'} text={'Забронировать'} handleClick={sendReservation}
                                 disabled={!checkFields || !checkDataReservation || !checked}/>
            </div>
        </div>
    );
};

export default WindowPopUp;