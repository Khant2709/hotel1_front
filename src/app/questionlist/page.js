import React from 'react';

import {getAllData} from "../../../utils/axios";
import allRequest from "../../../utils/allRequest";
import {validateArray} from "../../../utils/validate/validateGettingData";

import FifthSection from "../../particles/mainPage/fifthSection/fifthSection";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";

import {numberCurrentHotel} from "../../../informationData/contacts";
import {metaDataQuestionPage} from "../../../metaSeo/metaData";
import {jsonLDQuestionPage} from "../../../metaSeo/seoData";


export const metadata = metaDataQuestionPage;

async function getData() {
    const hotelData = {
        questionList: []
    };

    const request = [
        () => getAllData.getQuestion(numberCurrentHotel),
    ];

    return await allRequest(hotelData, request);
}

export default async function QuestionListPage() {
    const {questionList} = await getData();

    const validateQuestionList = validateArray(questionList);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDQuestionPage)}}/>
            <div>
                <HeaderLineBackground hotelNumber={numberCurrentHotel} display={true}/>
                {!validateQuestionList
                    ? <FifthSection questionList={questionList} numberHotel={numberCurrentHotel}/>
                    : <div style={{minHeight: '50vh'}}>
                        <ErrorLadingData page={'questionList'}
                                         error={questionList}
                                         text={'Произошла ошибка, не уалось загрузить информацию вопросов и ответов.'}
                        />
                    </div>
                }
            </div>
        </>
    );
};
