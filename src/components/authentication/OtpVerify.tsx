import React from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import LoadingDots from "../animations/LoadingDots";
import { useAuth } from "../../auth/useAuth";
import { toast } from "react-hot-toast";

export default function Otpverify() {

    const navigate = useNavigate();
    const { setLoggedIn } = useAuth();

    // Lets highlight this.. This is how you send data between pages
    const location = useLocation()
    const [otp, setOtp] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const email = location.state?.email

    const handleOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verify-otp/', {email, otp}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                console.log("OTP verified successfully");
                toast.success("OTP Verified Successfully! Redirecting to homepage..")
                setLoggedIn(true);
                navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data || error.message);
                alert("Invalid OTP or verification failed.");
            } else {
                console.log(error);
                alert("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const sendOtp = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/send-otp/', {email}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.messsage);
            alert("OTP Sent")
        } catch (error) {
            console.error(error.response?.data?.error || 'Error sending OTP');
        }
    }

    return (
        <div className="bg-[#1d1d1d]">
            <div className="h-screen flex items-center justify-center">
                <div className="login-box h-[460px] text-xl flex-col items-center relative bg-[#1d1d1d] z-0 justify-center">
                    <div className="prata flex justify-center z-2 text-green-700 text-5xl mt-10">
                        <h1>Verify Your Email</h1>
                    </div>
                    <div className="prata text-white flex justify-center z-2 text-2xl mt-6">
                        <h1>A 6 digit one time password is sent to you</h1>
                    </div>
                    <form onSubmit={handleOtp} className="w-80 ml-[90px] mt-12">
                        <input onChange={(e) => setOtp(e.target.value)}
                        autoComplete='off' name="username" type="text"
                        className="block rounded-xl bg-[#1d1d1d] text-white h-16 mb-6 p-4 w-full border-white border"/>
                        <button className="bg-green-700 h-12 rounded-xl mt-2 w-full text-white disabled={isLoading}">
                            {isLoading ? <LoadingDots />: "Proceed"}
                        </button>
                        <div className="flex items-center justify-center mt-4" onClick={sendOtp}>
                            <a><h2 className="text-green-600 hover:underline">
                                Resend OTP
                            </h2></a>
                        </div>
                    </form>
                    <div className="prata text-white flex justify-center z-2 text-2xl mt-6">
                        <h1>Not a user yet? Register <a href='/signup' className="text-green-700">here!</a></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}