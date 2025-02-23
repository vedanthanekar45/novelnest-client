export default function LoadingDots () {
    return(
        <div className="flex gap-1 justify-center items-center">
        <span className="dot bg-white w-2 h-2 rounded-full animate-pulse"></span>
        <span className="dot bg-white w-2 h-2 rounded-full animate-pulse delay-150"></span>
        <span className="dot bg-white w-2 h-2 rounded-full animate-pulse delay-300"></span>
    </div>
    )
}