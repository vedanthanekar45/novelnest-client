import Banner from "../homepage/Banner"
import Navbar from "../navigation/Navbar"
import Journals from "../homepage/Journals"
import JournalTitle from "./journalTitle"
import JournalAuthor from "./journalAuthor";
import JournalContent from "./journalContent";
import Footer from "../homepage/Footer";

export default function JournalPage() {
    return (
        <div className="flex flex-col items-center">
            <Banner source="/assets/gallery6.jpg" />
            <Navbar className="flex absolute" />
            <JournalTitle title="Leave Hogwarts Behind For These 9 Iconic Alternatives" />
            <JournalAuthor authorName="By: Howard Hamlin" />
            <JournalContent content="Still hung up on Harry Potter? In this article, writer Alex K. Masse explores the phenomenon of outgrowing the world of Harry Potter as readers age and gain new values. This list sheds light on some iconic literary titans and fresh new books, highlighting stories with profound, progressive views on our world — and the magical worlds beyond.

            It’s 2024, and J.K. Rowling is trending yet again for making transphobic comments on the Internet. Whether it’s her naming in a cyberbullying lawsuit against Olympian Imane Khelif, or her latest tirade against Paralympian Valentina Petrillo, or even one of her earlier controversies, it can sting for a piece of media that’s brought so much comfort and solace to have lost its magic. 

            A common piece of advice for recovering Potterheads is to read another book – but as much as people say that, it’s rare for them to actually offer any decent recommendations. As a professional reader of books that aren’t by J.K. Rowling and an amateur scholar of what makes fandoms tick, those days are over. Here are nine book recommendations, some old but most new, with queer and BIPOC artists at the forefront.
            


            1. The Last Binding Series by Freya Marske
            
            Did reading Harry Potter make you yearn for the streets of London, and the magic you hoped was hidden within them? Is a trip to England on your bucket list? Are you utterly enamored with the British accent? If so, The Last Binding series may be for you! 

            Through an administrative error, Robin Blyth has been employed as a government liaison for the secret magical society of Edwardian England. To make matters worse, his precursor disappeared under mysterious circumstances, leaving Robin to contend with curses, conspiracies, and a workplace crush, all while navigating the strange world of the magical families of Britain, where even the estates themselves are alive with power. 

            Despite its historical setting, The Last Binding feels undeniably fresh – its magic creates an urban fantasy world unlike any other, sparkling but still grounded in its thrilling and thorough magic system, and the characters’ relationships to that magic, and each other, are deeply enjoyable to watch unfold. " 
            className="text-justify"
            />
            <hr className="w-[1000px] mx-auto mt-20 border-green-400" />
            <div className="group relative inline-block mb-10">
                <a href="/journal"><h2 className="prata text-3xl text-white mt-32 mb-2">
                    EXPLORE OTHER JOURNALS
                </h2></a>
                <div className="absolute left-0 bottom-0 h-0.5 w-full bg-green-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
            </div>
            <Journals />
            <Footer />
        </div>
    )
}