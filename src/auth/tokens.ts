import axios from 'axios';

export default async function refreshAccessToken() {
    try {
        const response = await axios.post("http://127.0.0.1:8000/token/refresh/");
        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken)
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh access token: ", error);
        return null;
    }
}   