import {getAllData} from "../../utils/axios";

import FirstSection from "../particles/mainPage/firstSection/firstSection";
import SecondSection from "../particles/mainPage/secondSection/secondSection";
import ThirdSection from "../particles/mainPage/thirdSection/thirdSection";
import FourthSection from "../particles/mainPage/fourthSection/fourthSection";
import FifthSection from "../particles/mainPage/fifthSection/fifthSection";
import SixSection from "../particles/mainPage/sixSection/sixSection";

import allRequest from "../../utils/allRequest";
import {validateArray, validateObject} from "../../utils/validate/validateGettingData";

import FormSearchDate from "../../components/formSerchDate/formSerchDate";
import ErrorLadingData from "../../components/errorLadingData/errorLadingData";
import HeaderLineBackground from "../../components/headerLineBackgrund/headerLineBackground";

import {numberCurrentHotel} from "../../informationData/contacts";
import {jsonLDMainPage} from "../../metaSeo/seoData";
import {metaDataMainPage} from "../../metaSeo/metaData";

import styles from "../styles/page.module.css";



export const metadata = metaDataMainPage;

async function getData() {
    const hotelData = {
        currentHotel: null,
        apartmentsFromHotel: [],
        questionList: []
    };

    const request = [
        () => getAllData.currentHotels(numberCurrentHotel),
        () => getAllData.apartmentsFromHotel(numberCurrentHotel),
        () => getAllData.getQuestion(numberCurrentHotel),
    ];

    return await allRequest(hotelData, request);
}


export default async function Home() {
    const {currentHotel, apartmentsFromHotel, questionList} = await getData();

    const validateCurrentHotel = validateObject(currentHotel);
    const validateApartmentsFromHotel = validateArray(apartmentsFromHotel);
    const validateQuestionList = validateArray(questionList);

    if (validateCurrentHotel) {
        return <main className={styles.main}>
            <HeaderLineBackground hotelNumber={numberCurrentHotel} display={true}/>
            <ErrorLadingData text={'Ошибка! Не удалось загрузить данные отеля.'}
                             page={'Страница Главная, Home => currentHotel'}
                             error={currentHotel}
            />
        </main>
    }

    return (
        <>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDMainPage)}}
            />
            <main className={styles.main}>
                <FirstSection hotelNumber={numberCurrentHotel} currentHotel={currentHotel}/>
                <div className={styles.wrapperForm}>
                    <FormSearchDate hotelNumber={numberCurrentHotel}/>
                </div>
                {!validateApartmentsFromHotel
                    ? <SecondSection numberHotel={numberCurrentHotel}
                                     apartments={apartmentsFromHotel}
                    />
                    : <div className={styles.wrapperErrorSecondSection}>
                        <ErrorLadingData text={'Ошибка! Не удалось загрузить данные номеров отеля.'}
                                         page={'mainPage => SecondSection'}
                                         error={apartmentsFromHotel}
                        />
                    </div>
                }
                <ThirdSection hotel={currentHotel}/>
                <FourthSection descriptionHotel={currentHotel.descriptionHotel}/>
                {!validateQuestionList
                    ? <FifthSection numberHotel={numberCurrentHotel} questionList={questionList} hasSlice={true}/>
                    : <div className={styles.wrapperErrorFifthSection}>
                        <ErrorLadingData text={'Ошибка! Не удалось загрузить блок вопрос-ответ.'}
                                         page={'mainPage => FifthSection'}
                                         error={questionList}
                        />
                    </div>
                }
                <SixSection address={currentHotel.address}/>
            </main>
        </>
    );
}
