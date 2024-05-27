import React from 'react';

import FirstSectionHotels from "../../particles/hotels/FirstSection";
import SecondSectionHotels from "../../particles/hotels/SecondSectionHotels";

import {getAllData} from "../../../utils/axios";
import allRequest from "../../../utils/allRequest";
import {validateArray} from "../../../utils/validate/validateGettingData";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";

import {numberCurrentHotel} from "../../../informationData/contacts";
import {mataDataHotelsPage} from "../../../metaSeo/metaData";
import {jsonLDHotelsPage} from "../../../metaSeo/seoData";

import styles from '../../styles/hotels.module.css';


export const metadata = mataDataHotelsPage;

async function getData() {
    const hotelData = {
        allHotels: [],
    };

    const request = [
        () => getAllData.allHotels(),
    ];

    return await allRequest(hotelData, request);
}


export default async function Hotels() {
    const {allHotels} = await getData();

    const validateAllHotels = validateArray(allHotels);

    return (
        <section>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDHotelsPage)}}
            />
            <main className={styles.main}>
                <FirstSectionHotels hotelNumber={numberCurrentHotel}/>
                {!validateAllHotels
                    ? <SecondSectionHotels allHotel={allHotels}/>
                    : <div className={styles.wrapperError}>
                        <ErrorLadingData page={'Hotels'}
                                         error={allHotels}
                                         text={'Произошла ошибка, не уалось загрузить информацию об отелях.'}
                        />
                    </div>
                }
            </main>
        </section>
    );
};
