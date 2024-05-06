async function allRequest(hotelData, requests, skip) {
    try {
        const responses = await Promise.all(requests.map(request => request()));

        responses.forEach((res, index) => {
            if (res.status === 200) {
                const key = Object.keys(hotelData)[skip ? index + 1 : index]; // +1 to skip hotelNumber
                hotelData[key] = res.data.data;
            }
        });

        return hotelData;

    } catch (error) {
        console.warn(error);
    }
}


export default allRequest;