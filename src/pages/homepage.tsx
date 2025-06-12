// This where we'll start, where the magic will begin
import Save from "../components/body/Save";
import Navbar from "../components/navigation/Navbar";
import Banner from "../components/homepage/Banner";
import Welcome from "../components/homepage/Welcome";
// import Genres from "../components/homepage/Genres"
import Footer from "../components/homepage/Footer"
import Journals from "../components/homepage/Journals";
import bookcover11 from "/assets/tpodg.jpg"
import bookcover12 from "/assets/demons.jpg"
import bookcover21 from "/assets/ttbp.jpg"
import bookcover22 from "/assets/1984.jpg"
import { useAuth } from "../auth/useAuth.ts";

export default function Homepage() {

    const { loggedIn } = useAuth()

    return(
            <div className="flex flex-col items-center">
                <Banner />
                <Navbar className="flex absolute" /> 
                {loggedIn ? (<></>) : (<Welcome />)}
                <Save 
                    bookcover1={bookcover11}
                    bookcover2={bookcover12}
                    title="Browse your favourite literary works"
                    info="Dive into a vast collection of books, from timeless classics to modern masterpieces.
                    Whether you're looking for your next great read or revisiting old favorites, NovlNest makes 
                    it easy to explore, discover, and connect with the literary world that inspires you."
                    inverted={true}
                />
                <Save 
                    bookcover1={bookcover21}
                    bookcover2={bookcover22}
                    title="Keep track of what you're reading"
                    info="Effortlessly log and save every book, article, or paper you read. Whether you’re a 
                    casual reader or a bibliophile, keep track of your literary journey, share your thoughts, 
                    and revisit your favorites anytime."
                    inverted={false}
                />
                <div className="group relative inline-block mb-10">
                    <a href="/journal"><h2 className="prata text-3xl text-white mt-32 mb-2">
                        LATEST JOURNALS
                    </h2></a>
                    <div className="absolute left-0 bottom-0 h-0.5 w-full bg-green-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </div>
                <Journals />
                <Footer />
            </div>
            
    )
}