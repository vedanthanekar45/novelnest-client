// The stuff you usually see below the Navbar. Yeah I call it Banner, any problem?

interface BannerProps {
    source: string
};

export default function Banner({source}: BannerProps) {
    return (
        <>
            <div className="">
                <img src={source} className="w-[1500px]"/>
            </div>
        </>
    )
}