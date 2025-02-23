type Navbuttonprops = {
    text: string,
    className: string,
};

export default function NavButtons({text, className}: Navbuttonprops) {
    return (
        <>
            <h4 className={className}>{text}</h4>
        </>
    )
}