import axios from 'axios'

export const getCsrfToken = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/get-csrf-token/', { withCredentials: true });
        console.log(response.data.csrfToken)

        const csrfToken = response.data.csrfToken;
        localStorage.setItem("csrfToken", csrfToken);
        return csrfToken;
    } catch (error) {
        console.error("Error fetching CSRF token:", error);
        return null;
    }
};