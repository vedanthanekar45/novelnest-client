const banners = [
    "/assets/gallery31.jpg",
    "/assets/gallery10.jpg",
    "/assets/gallery6.jpg",
    "assets/gallery11.jpg"
]

export default function bannerExporter () {
    var bannerPath = Math.floor(Math.random() * (banners.length - 1));
    return banners[bannerPath];
}