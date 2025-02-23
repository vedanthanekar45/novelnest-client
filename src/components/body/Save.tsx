import infoProps from "../props/infoProp"

export default function Save ({bookcover1, bookcover2, title, info, inverted}: infoProps) {

    const renderInfo = () => {
        return info.split('\n').map((line, index) => (
            <span key={index}>
                {line} <br />
            </span>
        ));
    };
    
    return (
        <div className="flex mt-36">
            {inverted ? 
            ( 
            <>
                <img src={bookcover1} className="h-[250px]"/>
                <img src={bookcover2} className="h-[250px] ml-10"/>
                <div>
                    <h3 className="prata text-2xl text-white ml-48">
                        {title}
                    </h3>
                    <div>
                        <p className="text-white prata text-xl ml-48 mt-12">
                            {renderInfo()}
                        </p>
                    </div>
                </div>
            </> ) : (
                <>
                    <div>
                        <h3 className="prata text-2xl text-white mr-48">
                            {title}
                        </h3>
                        <div>
                        <p className="text-white prata text-xl mr-48 mt-12">
                            {renderInfo()}
                        </p>
                        </div>
                    </div>
                    <img src={bookcover1} className="h-[250px]"/>
                    <img src={bookcover2} className="h-[250px] ml-10"/>
                </>
            )}
        </div>
    )
}