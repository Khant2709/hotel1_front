'use client'

import React, {useContext, useState} from "react";

const UsePopUpWindowContext = React.createContext();

const PopUpProvider = ({children}) => {
    const [popUpWindow, setPopUpWindow] = useState(true);
    const [responseWindow, setResponseWindow] = useState(true);
    const [data, setData] = useState({
        idHotel : null,
        nameHotel : null,
        idApartment : null,
        nameApartment : null,
        startData : null,
        endData : null,
        countPeople : null,
        priceOneNight : null,
        finishPrice : null,
        onePrice : null
    });
    const [dataCallBack, setDataCallBack] = useState({status: null, text: null});

    const popUpWindowValue = {
        popUpWindow,
        setPopUpWindow,
        responseWindow,
        setResponseWindow,
        data,
        setData,
        dataCallBack,
        setDataCallBack
    };

    return (
        <UsePopUpWindowContext.Provider value={popUpWindowValue}>
            {children}
        </UsePopUpWindowContext.Provider>
    );
};

function usePopUpWindow() {
    return useContext(UsePopUpWindowContext);
}

export {PopUpProvider, usePopUpWindow};
