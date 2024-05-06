'use client'

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {getAllData} from "../../../utils/axios";

import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";
import FormSearchDate from "../../../components/formSerchDate/formSerchDate";
import Title from "../../../components/title/title";
import Preloader from "../../../components/preloader/preloader";
import WrapperHotel from "../../../components/ContainerHotel/ContainerHotel";

import styles from "../../styles/reservation.module.css";
import {numberCurrentHotel} from "../../../informationData/contacts";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";
import {error} from "next/dist/build/output/log";


const fetchData = async ({
                             searchStartReservation,
                             searchEndReservation,
                             searchCountPeopleReservation,
                             setFreeRooms,
                             setHasErrorRes
                         }) => {
    await getAllData.getFilterBooking(searchStartReservation, searchEndReservation, searchCountPeopleReservation)
        .then((res) => {
            setFreeRooms(res.data.data);
        })
        .catch((res) => {
            setHasErrorRes(true)
        })

}

const ReservationAll = ({hotelNumber, allHotels, currentHotel}) => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();

    const [freeRooms, setFreeRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasErrorRes, setHasErrorRes] = useState(false);

    const freeRoomsCurrentHotel = freeRooms.filter(apartment => apartment.hotel_id === currentHotel.id) || [];
    const otherHotels = allHotels.filter(hotel => hotel.numberHotel !== hotelNumber) || [];

    const searchStartReservation = searchParams.get('startReservation');
    const searchEndReservation = searchParams.get('endReservation');
    const searchCountPeopleReservation = searchParams.get('countPeopleReservation');
    const currentUrl = pathname.split('/')[1];

    useEffect(() => {
        setIsLoading(true);
        fetchData({
            searchStartReservation,
            searchEndReservation,
            searchCountPeopleReservation,
            setFreeRooms,
            setHasErrorRes
        })
            .then(() => {
                setIsLoading(false)
            })
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchData({
            searchStartReservation,
            searchEndReservation,
            searchCountPeopleReservation,
            setFreeRooms,
            setHasErrorRes
        })
            .then(() => {
                setIsLoading(false)
            })
    }, [searchStartReservation, searchEndReservation, searchCountPeopleReservation]);

    return (
        <>
            <HeaderLineBackground router={router}
                                  hotelNumber={hotelNumber}
                                  currentUrl={currentUrl}
                                  searchParams={searchParams}
                                  setFreeRooms={setFreeRooms}
            />
            <div className={styles.wrapperFormSearch}>
                <FormSearchDate router={router}
                                hotelNumber={hotelNumber}
                                currentUrl={currentUrl}
                                searchParams={searchParams}
                                setFreeRooms={setFreeRooms}
                />
            </div>
            {isLoading
                ? <Preloader/>
                : <>
                    <WrapperHotel hotel={currentHotel}
                                  arrayRooms={freeRoomsCurrentHotel}
                                  hasQuery={true}
                                  searchParams={searchParams}
                                  hasErrorRes={hasErrorRes}
                    />

                    <div className={styles.wrapperSubTitle}>
                        <Title Tag={'h3'} text={'Предложения с других наших отелей'}/>
                    </div>

                    {
                        otherHotels && otherHotels.map(hotel => {
                            const checkHasRooms = freeRooms.filter(room => room.hotel_id === hotel.id) || [];
                            if (checkHasRooms.length !== 0) {
                                return <div className={styles.wrapperOtherHotelsList} key={hotel.id}>
                                    <WrapperHotel hotel={hotel}
                                                  arrayRooms={checkHasRooms}
                                                  hasQuery={true}
                                                  searchParams={searchParams}
                                                  hasErrorRes={hasErrorRes}
                                    />
                                </div>
                            }
                        })
                    }
                </>
            }
        </>
    );
};

export default ReservationAll;