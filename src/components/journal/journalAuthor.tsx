interface JournalAuthorProps {
    authorName: string;
}

export default function JournalAuthor({authorName}: JournalAuthorProps) {
    return (
        <div>
            <a href=''>
                <h1 className="text-2xl mt-16 text-center text-white prata
                hover:text-green-500 hover:underline">
                    {authorName}
                </h1>
                <hr className="w-[1000px] mx-auto mt-16 border-green-400" />
            </a>
        </div>
    )
}