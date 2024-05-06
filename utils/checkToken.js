const checkToken = (router) => {
    const token = window.sessionStorage.getItem('token');

    if (!token) {
        router.push('/officeboss');
    }
};

export default checkToken;