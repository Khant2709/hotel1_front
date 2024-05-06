'use client'

import React, {useMemo, useState} from 'react';

import {validateName, validatePhone} from "../../utils/validate/validateFields";
import formatPhoneNumber from "../../utils/validate/maskPhneNumber";
import {usePopUpWindow} from "../../utils/useWindowPopUp";
import {callBackQuery} from "../../utils/axios";

import Button from "../button/button";

import styles from './formCall.module.css';
import stylesFontsT from '../../src/styles/fonts/timesNewRoman.module.css';

const FormCall = ({text, numberHotel}) => {
    const {setResponseWindow, setDataCallBack} = usePopUpWindow();
    const [fields, setFields] = useState({name: '', phone: ''});
    const [fieldsTouch, setFieldsTouch] = useState({nameTouch: false, phoneTouch: false});
    const [checked, setChecked] = useState(false);

    const checkName = useMemo(() => validateName(fields.name), [fields.name]);
    const checkPhone = useMemo(() => validatePhone(fields.phone), [fields.phone]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        // Применение маски к значению, если поле ввода относится к номеру телефона
        const processedValue = name === 'phone' ? formatPhoneNumber(value) : value;

        setFields((prevFields) => ({...prevFields, [name]: processedValue}));
    };

    const handleCallBack = () => {
        //    Прописать логику на заявку на обратный звонок
        if (checkName.valid && checkPhone.valid && checked) {
            callBackQuery.callBackPhone(fields)
                .then(res => {
                    setDataCallBack({
                        status: 'OK',
                        text: res.data.message
                    })
                    setResponseWindow(false)
                })
                .catch(e => {
                    console.warn('e = ', e)
                    setDataCallBack({
                        status: 'ER',
                        text: e.response.data.message
                    })
                    setResponseWindow(false)
                })
        }
    }

    return (
        <section className={`${stylesFontsT.newRoman400} ${styles.containerMain}`}>
            <p className={styles.title}>Обратный звонок</p>

            <input className={stylesFontsT.newRoman400}
                   name={'name'}
                   placeholder={'Имя'}
                   value={fields.name}
                   onChange={handleInputChange}
                   onClick={() => setFieldsTouch({...fieldsTouch, nameTouch: true})}
            />
            {fieldsTouch.nameTouch && !checkName.valid && <p className={styles.errorText}>{checkName.message}</p>}

            <input className={stylesFontsT.newRoman400}
                   name={'phone'}
                   placeholder={'9892436080'}
                   value={fields.phone}
                   onChange={handleInputChange}
                   onClick={() => setFieldsTouch({...fieldsTouch, phoneTouch: true})}
            />
            {fieldsTouch.phoneTouch && !checkPhone.valid && <p className={styles.errorText}>{checkPhone.message}</p>}

            <div className={styles.containerCheckbox}>
                <input type={'checkbox'} value={checked} onChange={(e) => setChecked(!checked)}/>
                <p>Соглашаюсь с правилами <span>политики конфиденциальности</span></p>
            </div>

            <Button text={text}
                    hotel={numberHotel}
                    disabled={!checkName.valid || !checkPhone.valid || !checked}
                    handleClick={handleCallBack}
            />
        </section>
    );
}

export default FormCall;