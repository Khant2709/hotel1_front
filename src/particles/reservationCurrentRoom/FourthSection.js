import React from 'react';

import styles from '../../styles/reservationCurrentRoomFourthSection.module.css';
import stylesFonts from '../../styles/fonts/timesNewRoman.module.css';
import transformPrice from "../../../utils/transformPrice";

const FourthSection = ({priceArray}) => {
    const periods = [
        {startDate: '01.05.2024', endDate: '12.05.2024', priceIndex: 0},
        {startDate: '13.05.2024', endDate: '15.06.2024', priceIndex: 1},
        {startDate: '16.06.2024', endDate: '15.09.2024', priceIndex: 2},
        {startDate: '16.09.2024', endDate: '15.10.2024', priceIndex: 3}
    ];

    return (
        <div className={`${stylesFonts.newRoman400} ${styles.main}`}>
            <p>Если ваша бронь попадает на разные ценовые периоды, сайт автоматически высчитывает цену за ночь.</p>
            {periods.map((period, i) => {
                const price = (!!priceArray && priceArray.length !== 0) ? transformPrice(priceArray[period.priceIndex]) : '..Ошибка..'

                return <p key={i}>
                    * В период с <span>{period.startDate}</span> по <span>{period.endDate}</span>, цена за одну
                    ночь <span>{price}₽</span>
                </p>
            })}
            <p>* В период с <span>16.10.2024</span> по <span>30.04.2024</span>, проживание не возможно</p>
            <p>Ниже в календаре вы можете узнать о забронированных/свободных датах</p>
        </div>
    );
};

export default FourthSection;