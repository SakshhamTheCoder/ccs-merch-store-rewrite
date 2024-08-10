import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": "application/json",
    },
});

const api = {
    get: (url, addAuthorization = true) => {
        const finalConfig = {};
        if (addAuthorization) {
            const token = localStorage.getItem('token');
            if (token) {
                finalConfig.headers = {
                    'Authorization': `Token ${token}`,
                };
            }
        }
        return axiosClient.get(url, finalConfig)
            .then(response => response.data)
            .catch(error => {
                console.error('GET Error:', error);
                throw error;
            });
    },

    post: (url, data, addAuthorization = true) => {
        const finalConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (addAuthorization) {
            const token = localStorage.getItem('token');
            if (token) {
                finalConfig.headers['Authorization'] = `Token ${token}`;
            }
        }
        return axiosClient.post(url, data, finalConfig)
            .then(response => response.data)
            .catch(error => {
                console.error('POST Error:', error);
                throw error;
            });
    },
};

export default api;
