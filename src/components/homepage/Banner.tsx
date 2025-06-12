// The stuff you usually see below the Navbar. Yeah I call it Banner, any problem?

import bannerExporter from "../../assets/randomizeBanner"

// interface BannerProps {
//     source: string
// };

export default function Banner() {
    return (
        <>
            <div className="">
                <img src={bannerExporter()} className="w-[1500px]"/>
            </div>
        </>
    )
}