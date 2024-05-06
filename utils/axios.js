import axios from "axios";

export const axiosMulti = axios.create({
    baseURL: "https://shikarnyivid.ru/api/",
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

export const axiosJSON = axios.create({
    baseURL: "https://shikarnyivid.ru/api/",
    headers: {
        'Content-Type': 'application/json',
    }
});


export const getAllData = {
    allHotels: async () => {
        return await axiosJSON.get('getAllHotels');
    },
    currentHotels: async (hotelNumber) => {
        return await axiosJSON.get(`getCurrentHotel?hotelNumber=${hotelNumber}`);
    },
    allApartments: async () => {
        return await axiosJSON.get('getAllApartments');
    },
    apartmentsFromHotel: async (hotelNumber) => {
        return await axiosJSON.get(`getApartmentsFromHotel?hotelNumber=${hotelNumber}`);
    },
    currentApartments: async (hotelNumber, apartmentId) => {
        return await axiosJSON.get(`getCurrentApartment?hotelNumber=${hotelNumber}&apartmentId=${apartmentId}`);
    },
    allBookings: async () => {
        return await axiosJSON.get('getAllBooking');
    },
    currentBooking: async (reservationId) => {
        return await axiosJSON.get(`getCurrentBooking?reservationId=${reservationId}`);
    },
    getFilterBooking: async (startReservation, endReservation, countPeopleReservation) => {
        return await axiosJSON.get(`getFilterBooking?startReservation=${startReservation}&endReservation=${endReservation}&countPeopleReservation=${countPeopleReservation}`);
    },
    getQuestion : async (numberHotel) => {
        return await axiosJSON.get(`getQuestion?numberHotel=${numberHotel}`);
    }
};

export const reservationQuery = {
    createReservation: async (data) => {
        return await axiosJSON.post('createReservation', data)
    },
    editReservation: async (data) => {
        return await axiosJSON.patch('editReservation', data)
    },
    archiveReservation: async (idReservation, token) => {
        return await axiosJSON.delete(`archiveReservation/${idReservation}`, {
            headers: {
                Authorization: `Bearer ${token}` // Отправляем токен в заголовке Authorization
            }
        })
    },
    deleteReservation: async (idReservation, token) => {
        return await axiosJSON.delete(`deleteReservation/${idReservation}`, {
            headers: {
                Authorization: `Bearer ${token}` // Отправляем токен в заголовке Authorization
            }
        })
    },
};

export const callBackQuery = {
    callBackPhone: async (data) => {
        return await axiosJSON.post('formCallBack', data)
    },
};

export const login = async(data) => {
    return await axiosJSON.post('login', data)
}