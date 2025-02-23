export interface categoryProp {
    image: string,
    title: string,
}

export function Category ({image, title}: categoryProp) {
    return (
            <div className="relative w-[250px] h-[300px] object-cover mt-4 group ml-12 mb-8">
            <img
            src={image}
            className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:brightness-50"
            alt={title}
            />
            <h2 className="absolute prata inset-0 flex items-center justify-center text-2xl text-white opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
            {title}
            </h2>
        </div>
    )
}