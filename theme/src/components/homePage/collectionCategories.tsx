import { useRef } from "react";
import Image from "next/image";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const industryCategories = [
    {
        id: 1,
        name: "Services commerciaux",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i3/O1CN01fm34sD1PrUwNSEFdk_!!6000000001894-2-tps-200-200.png",
        link: "https://www.alibaba.com/Business-Services_p28",
    },
    {
        id: 2,
        name: "Environnement",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i4/O1CN01WD8L611FtC7zB5hSv_!!6000000000544-2-tps-200-200.png",
        link: "https://www.alibaba.com/Environment_p11",
    },
    {
        id: 3,
        name: "Vêtements et accessoires",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01Si2Chv1URSNSZI3w2_!!6000000002514-2-tps-200-200.png",
        link: "https://www.alibaba.com/Apparel-Accessories_p3",
    },
    {
        id: 4,
        name: "Électronique grand public",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01lTlEA71idHDZyDnE1_!!6000000004435-2-tps-200-200.png",
        link: "https://www.alibaba.com/Consumer-Electronics_p44",
    },
    {
        id: 5,
        name: "Maison et jardin",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01FNDTXs1Js3bqyZjbx_!!6000000001083-2-tps-200-200.png",
        link: "https://www.alibaba.com/Home-Garden_p15",
    },
    {
        id: 6,
        name: "Sports et loisirs",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01pTq4g71X95KxEqsrz_!!6000000002880-2-tps-200-200.png",
        link: "https://www.alibaba.com/Sports-Entertainment_p18",
    },
    {
        id: 1,
        name: "Services commerciaux",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i3/O1CN01fm34sD1PrUwNSEFdk_!!6000000001894-2-tps-200-200.png",
        link: "https://www.alibaba.com/Business-Services_p28",
    },
    {
        id: 2,
        name: "Environnement",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i4/O1CN01WD8L611FtC7zB5hSv_!!6000000000544-2-tps-200-200.png",
        link: "https://www.alibaba.com/Environment_p11",
    },
    {
        id: 3,
        name: "Vêtements et accessoires",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01Si2Chv1URSNSZI3w2_!!6000000002514-2-tps-200-200.png",
        link: "https://www.alibaba.com/Apparel-Accessories_p3",
    },
    {
        id: 4,
        name: "Électronique grand public",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01lTlEA71idHDZyDnE1_!!6000000004435-2-tps-200-200.png",
        link: "https://www.alibaba.com/Consumer-Electronics_p44",
    },
    {
        id: 5,
        name: "Maison et jardin",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01FNDTXs1Js3bqyZjbx_!!6000000001083-2-tps-200-200.png",
        link: "https://www.alibaba.com/Home-Garden_p15",
    },
    {
        id: 6,
        name: "Sports et loisirs",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01pTq4g71X95KxEqsrz_!!6000000002880-2-tps-200-200.png",
        link: "https://www.alibaba.com/Sports-Entertainment_p18",
    },
    {
        id: 1,
        name: "Services commerciaux",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i3/O1CN01fm34sD1PrUwNSEFdk_!!6000000001894-2-tps-200-200.png",
        link: "https://www.alibaba.com/Business-Services_p28",
    },
    {
        id: 2,
        name: "Environnement",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i4/O1CN01WD8L611FtC7zB5hSv_!!6000000000544-2-tps-200-200.png",
        link: "https://www.alibaba.com/Environment_p11",
    },
    {
        id: 3,
        name: "Vêtements et accessoires",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01Si2Chv1URSNSZI3w2_!!6000000002514-2-tps-200-200.png",
        link: "https://www.alibaba.com/Apparel-Accessories_p3",
    },
    {
        id: 4,
        name: "Électronique grand public",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01lTlEA71idHDZyDnE1_!!6000000004435-2-tps-200-200.png",
        link: "https://www.alibaba.com/Consumer-Electronics_p44",
    },
    {
        id: 5,
        name: "Maison et jardin",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01FNDTXs1Js3bqyZjbx_!!6000000001083-2-tps-200-200.png",
        link: "https://www.alibaba.com/Home-Garden_p15",
    },
    {
        id: 6,
        name: "Sports et loisirs",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01pTq4g71X95KxEqsrz_!!6000000002880-2-tps-200-200.png",
        link: "https://www.alibaba.com/Sports-Entertainment_p18",
    },
    {
        id: 1,
        name: "Services commerciaux",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i3/O1CN01fm34sD1PrUwNSEFdk_!!6000000001894-2-tps-200-200.png",
        link: "https://www.alibaba.com/Business-Services_p28",
    },
    {
        id: 2,
        name: "Environnement",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i4/O1CN01WD8L611FtC7zB5hSv_!!6000000000544-2-tps-200-200.png",
        link: "https://www.alibaba.com/Environment_p11",
    },
    {
        id: 3,
        name: "Vêtements et accessoires",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01Si2Chv1URSNSZI3w2_!!6000000002514-2-tps-200-200.png",
        link: "https://www.alibaba.com/Apparel-Accessories_p3",
    },
    {
        id: 4,
        name: "Électronique grand public",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01lTlEA71idHDZyDnE1_!!6000000004435-2-tps-200-200.png",
        link: "https://www.alibaba.com/Consumer-Electronics_p44",
    },
    {
        id: 5,
        name: "Maison et jardin",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01FNDTXs1Js3bqyZjbx_!!6000000001083-2-tps-200-200.png",
        link: "https://www.alibaba.com/Home-Garden_p15",
    },
    {
        id: 6,
        name: "Sports et loisirs",
        imageUrl: "https://s.alicdn.com/@img/imgextra/i2/O1CN01pTq4g71X95KxEqsrz_!!6000000002880-2-tps-200-200.png",
        link: "https://www.alibaba.com/Sports-Entertainment_p18",
    },
];

export default function IndustryCategories() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        // <div className="w-full max-w-6xl mx-auto px-4 py-8">
        //     {/* Title */}
        //     <h2 className="text-2xl font-semibold text-gray-900 mb-4">Explorez les Industries</h2>
        //
        //     {/* Carousel Wrapper */}
        //     <div className="relative">
        //         {/* Left Arrow */}
        //         <button
        //             onClick={scrollLeft}
        //             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-gray-800 hover:bg-gray-200 z-10"
        //         >
        //             {/*<BsChevronLeft size={24} />*/}next
        //         </button>
        //
        //         {/* Scrollable Categories List */}
        //         <div
        //             ref={scrollRef}
        //             className="flex space-x-4 overflow-x-scroll scroll-smooth scrollbar-hide snap-x snap-mandatory"
        //         >
        //             {industryCategories.map((category) => (
        //                 <a
        //                     key={category.id}
        //                     href={category.link}
        //                     target="_blank"
        //                     rel="noopener noreferrer"
        //                     className="flex-shrink-0 w-40 snap-center border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden transform hover:scale-105 transition"
        //                 >
        //                     {/* Category Image */}
        //                     <img
        //                         src={category.imageUrl}
        //                         alt={category.name}
        //                         width={150}
        //                         height={150}
        //                         className="w-full h-32 object-cover"
        //                     />
        //                     <div className="p-3 text-center">
        //                         {/* Category Name */}
        //                         <h3 className="text-sm font-semibold text-gray-800">{category.name}</h3>
        //                     </div>
        //                 </a>
        //             ))}
        //         </div>
        //
        //         {/* Right Arrow */}
        //         <button
        //             onClick={scrollRight}
        //             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-gray-800 hover:bg-gray-200 z-10"
        //         >
        //             {/*<BsChevronRight size={24} />*/} next
        //         </button>
        //     </div>
        // </div>

        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg/8 font-semibold text-gray-900">
                    Trusted by the world’s most innovative teams
                </h2>
                <div
                    className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img
                        alt="Transistor"
                        src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />
                    <img
                        alt="Reform"
                        src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />
                    <img
                        alt="Tuple"
                        src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />
                    <img
                        alt="SavvyCal"
                        src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                    />
                    <img
                        alt="Statamic"
                        src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
                        width={158}
                        height={48}
                        className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                    />
                </div>
            </div>
        </div>


    );
}
