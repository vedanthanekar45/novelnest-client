import axios from 'axios'
import { getCsrfToken } from './getCSRF';

export const fetchUserData = async () => {
    try {
        console.log("Fetching user data...");

        const csrfToken = localStorage.getItem("csrfToken") || await getCsrfToken();

        const response = await axios.get("http://127.0.0.1:8000/api/user/", {
            headers: {
                "X-CSRFToken": csrfToken,
            },
            withCredentials: true, 
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return;
    }
};