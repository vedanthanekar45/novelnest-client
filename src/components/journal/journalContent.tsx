interface JournalContentProps {
    content: string;
    className?: string;
}

export default function JournalContent({content, className}: JournalContentProps) {

    const renderInfo = () => {
        return content.split('\n').map((line, index) => (
            <span key={index}>
                {line} <br />
            </span>
        ));
    }

    return (
        <div className={className}>
            <p className="justify-center mx-[600px] text-white text-2xl mt-24 prata text-left">
                {renderInfo()}
            </p>
        </div>
    )
}