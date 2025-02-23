import { useNavigate } from "react-router-dom"

export default function Joinfree () {

    const Navigate = useNavigate();

    function goToSignup() {
        Navigate('/signup')
    }

    return (
        <>
            <button className="h-[50px] w-[140px] rounded-sm bg-[#1d6813] text-white 
            prata hover:bg-white hover:text-green-900 absolute mt-[385px] text-[18px]
            ease-linear trans" onClick={goToSignup}>
                Join Free
            </button>
        </>
    )
}