// The stuff you usually see below the Navbar. Yeah I call it Banner, any problem?

import { useRef } from "react"
import bannerExporter from "../../assets/randomizeBanner"

// interface BannerProps {
//     className: string
// };

export default function Banner() {

    const bannerPath = useRef(bannerExporter()).current;

    return (
        <>
            <div>
                <img src={bannerPath} className="w-[1500px]"/>
            </div>
        </>
    )
}