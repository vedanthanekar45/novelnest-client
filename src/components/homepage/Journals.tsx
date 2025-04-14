import pic1 from "/assets/gallery6.jpg"
import pic2 from "/assets/gallery2.jpg"
import pic3 from "/assets/gallery3.jpg"

export default function Journals () {
    return (
        <div>
            <div className="flex mt-8">
                <a href="/journal">
                    <div className="w-[400px] h-[400px] mx-8">
                        <div className="h-[200px] object-cover overflow-hidden">
                            <img src={pic1} />
                        </div>
                        <div>
                            <h2 className="prata text-3xl align-middle text-white hover:underline">
                                Leave Hogwarts Behind for these 9 iconic alternatives
                            </h2>
                            <div className="absolute left-0 bottom-0 h-0.5 w-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                        <p className="mt-4 text-white">Still hung up on Harry Potter? In this article, writer Alex K. Masse explores the phenomenon of outgrowing the world of Harry Potter as readers age and gain new values. This list sheds light on some iconic literary ... </p>
                    </div>
                </a>
                <a href="#">
                    <div className="w-[400px] h-[400px] mx-8">
                        <div className="h-[200px] object-cover">
                            <img src={pic2} />
                        </div>
                        <div>
                            <h2 className="prata text-3xl align-middle text-white hover:underline">
                            Mythology Comes Alive in This Soaring Tale of Gods and Monsters
                            </h2>
                            <div className="absolute left-0 bottom-0 h-0.5 w-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                        <p className="mt-4 text-white">Looking for an epic fantasy rich with original mythology? Then check out Rajub Bhowmik’s debut novel, Gods of the Hidden Realm. This enchanting tale filled with ... </p>
                    </div>
                </a>
                <a href="#">
                    <div className="w-[400px] h-[400px] mx-8">
                        <div className="h-[200px] object-cover">
                            <img src={pic3} />
                        </div>
                        <div>
                            <h2 className="prata text-3xl align-middle text-white hover:underline">
                            Plunge into Madness and Malice with Unmissable Thriller
                            </h2>
                            <div className="absolute left-0 bottom-0 h-0.5 w-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                        <p className="mt-4 text-white">In Deena Undone, Debra K. Every introduces us to Deena Bartlett, a middle-aged woman haunted by her past and tormented by a present that seems to unravel her senses ... </p>
                    </div>
                </a>
                
            </div>
        </div>
    )
}