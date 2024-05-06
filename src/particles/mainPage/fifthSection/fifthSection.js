'use client'

import React, {useState} from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";

import ButtonSecondary from "../../../../components/buttonSecondory/buttonSecondory";

import vectorShow from '../../../../public/vektorShow.png';

import styles from '../../../styles/fifthSection.module.css';
import stylesFontsI from '../../../styles/fonts/inter.module.css';
import stylesFontsT from '../../../styles/fonts/timesNewRoman.module.css';
import {mainColorHotel, seconderyColorHotel} from "../../../../informationData/styleHotels";

const FifthSection = ({numberHotel, questionList, hasSlice}) => {
    const router = useRouter();
    const [activeLines, setActiveLines] = useState([]);

    const showQ = (id) => {
        setActiveLines([...activeLines, id])
    }

    const hiddenQ = (id) => {
        const filterQ = activeLines.filter(el => el !== id);
        setActiveLines(filterQ)
    }

    const list = hasSlice ? questionList.slice(0, 7) : questionList

    return (
        <section className={styles.main}>
            <div className={styles.containerQuestions}
                 style={{backgroundColor: `${seconderyColorHotel[numberHotel]}`}}>
                <h2 className={`${stylesFontsT.newRoman400} ${styles.title}`}>Вопрос-ответ</h2>
                {list.map(question => {
                    const show = activeLines.some(el => el === question.id);
                    return <div className={styles.wrapperQuestion}
                                style={{borderBottom: `2px solid ${mainColorHotel[[numberHotel]]}`}}
                                key={question.id}>
                        <div className={styles.containerLine}>
                            <p className={stylesFontsI.Inter700}>{question.question}</p>
                            <Image alt={'icon'} src={vectorShow} className={styles.vectorShow}
                                   style={{transform: show ? 'rotate(90deg)' : 'rotate(0deg)'}}
                                   onClick={() => show ? hiddenQ(question.id) : showQ(question.id)}/>
                        </div>
                        {show && <p className={`${stylesFontsI.Inter300} ${styles.hiddenText}`}>
                            {question.answer}
                        </p>}
                    </div>
                })}

                {hasSlice && <ButtonSecondary text={'Все вопросы'}
                                              hotel={numberHotel}
                                              handleClick={() => router.push('/questionlist')}/>}
            </div>
        </section>
    );
};

export default FifthSection;