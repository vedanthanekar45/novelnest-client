interface JournalTitleProps {
    title: string;
}

export default function JournalTitle ({title}: JournalTitleProps) {
    return (
        <div>
            <h1 className="text-5xl ml-[20px] italic text-center text-white prata">
                {title}
            </h1>
        </div>
    )
}