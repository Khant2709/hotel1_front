'use client'

import React, {useContext, useState} from "react";

const UsePopUpWindowAdminContext = React.createContext();

const PopUpAdminProvider = ({children}) => {
    const [popUpWindowAdmin, setPopUpWindowAdmin] = useState(false);
    const [dataResponse, setDataResponse] = useState({status: null, response: null});


    const popUpWindowValue = {
        popUpWindowAdmin,
        setPopUpWindowAdmin,
        dataResponse,
        setDataResponse
    }

    return (
        <UsePopUpWindowAdminContext.Provider value={popUpWindowValue}>
            {children}
        </UsePopUpWindowAdminContext.Provider>
    );
}

function usePopUpWindowAdmin() {
    return useContext(UsePopUpWindowAdminContext);
}

export {PopUpAdminProvider, usePopUpWindowAdmin};