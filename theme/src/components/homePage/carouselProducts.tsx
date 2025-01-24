import React from 'react'
import Slider from "react-slick";
import Image from 'next/image';
const CarouselProducts = () => {
    const logos = [
        { src: 'https://imgs.search.brave.com/lXTOvf8_XwcPk9Sr80gLERyNyaKG7qKXCd3OZ_7lGkI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9JdDIzdzlJMDl3/Mm53UENLWFRWTzVZ/UmwtcFU9LzY5N3gz/NjI6MTE5N3g4NjIv/Zml0LWluLzUwMHg1/MDAvOTlkZXNpZ25z/LWNvbnRlc3RzLWF0/dGFjaG1lbnRzLzY3/LzY3NDM3L2F0dGFj/aG1lbnRfNjc0Mzcw/NTc.jpeg', alt: 'Logo 1' },
        { src: 'https://imgs.search.brave.com/Dg6QnugbVj4XDKN65SKODnMZsWWa59Rn-K8F8iU9rrY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFEZXJ1aUsx/S2svMy8wLzQwMHct/b3h5VWlUdzk4bmMu/anBn', alt: 'Logo 2' },
        { src: 'https://imgs.search.brave.com/2GeqqLkLwc9JAWZ04RdHqTKrZuHBlpAg_fvFHqj0eXw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2Nkbi1j/Z2kvaW1hZ2UvZj1h/dXRvLHE9NzAvZjI1/NjdkMjgtZTk0Yi00/MjNhLWFhZTgtNzM4/YmVlOTY0YzIzL2hv/d3RvX2xvZ29zMi5q/cGc', alt: 'Logo 3' },
        { src: 'https://imgs.search.brave.com/lXTOvf8_XwcPk9Sr80gLERyNyaKG7qKXCd3OZ_7lGkI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9JdDIzdzlJMDl3/Mm53UENLWFRWTzVZ/UmwtcFU9LzY5N3gz/NjI6MTE5N3g4NjIv/Zml0LWluLzUwMHg1/MDAvOTlkZXNpZ25z/LWNvbnRlc3RzLWF0/dGFjaG1lbnRzLzY3/LzY3NDM3L2F0dGFj/aG1lbnRfNjc0Mzcw/NTc.jpeg', alt: 'Logo 1' },
        { src: 'https://imgs.search.brave.com/Dg6QnugbVj4XDKN65SKODnMZsWWa59Rn-K8F8iU9rrY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFEZXJ1aUsx/S2svMy8wLzQwMHct/b3h5VWlUdzk4bmMu/anBn', alt: 'Logo 2' },
        { src: 'https://imgs.search.brave.com/2GeqqLkLwc9JAWZ04RdHqTKrZuHBlpAg_fvFHqj0eXw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2Nkbi1j/Z2kvaW1hZ2UvZj1h/dXRvLHE9NzAvZjI1/NjdkMjgtZTk0Yi00/MjNhLWFhZTgtNzM4/YmVlOTY0YzIzL2hv/d3RvX2xvZ29zMi5q/cGc', alt: 'Logo 3' },
        { src: 'https://imgs.search.brave.com/lXTOvf8_XwcPk9Sr80gLERyNyaKG7qKXCd3OZ_7lGkI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9JdDIzdzlJMDl3/Mm53UENLWFRWTzVZ/UmwtcFU9LzY5N3gz/NjI6MTE5N3g4NjIv/Zml0LWluLzUwMHg1/MDAvOTlkZXNpZ25z/LWNvbnRlc3RzLWF0/dGFjaG1lbnRzLzY3/LzY3NDM3L2F0dGFj/aG1lbnRfNjc0Mzcw/NTc.jpeg', alt: 'Logo 1' },
        { src: 'https://imgs.search.brave.com/Dg6QnugbVj4XDKN65SKODnMZsWWa59Rn-K8F8iU9rrY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFEZXJ1aUsx/S2svMy8wLzQwMHct/b3h5VWlUdzk4bmMu/anBn', alt: 'Logo 2' },
        { src: 'https://imgs.search.brave.com/2GeqqLkLwc9JAWZ04RdHqTKrZuHBlpAg_fvFHqj0eXw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2Nkbi1j/Z2kvaW1hZ2UvZj1h/dXRvLHE9NzAvZjI1/NjdkMjgtZTk0Yi00/MjNhLWFhZTgtNzM4/YmVlOTY0YzIzL2hv/d3RvX2xvZ29zMi5q/cGc', alt: 'Logo 3' },
        { src: 'https://imgs.search.brave.com/lXTOvf8_XwcPk9Sr80gLERyNyaKG7qKXCd3OZ_7lGkI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9JdDIzdzlJMDl3/Mm53UENLWFRWTzVZ/UmwtcFU9LzY5N3gz/NjI6MTE5N3g4NjIv/Zml0LWluLzUwMHg1/MDAvOTlkZXNpZ25z/LWNvbnRlc3RzLWF0/dGFjaG1lbnRzLzY3/LzY3NDM3L2F0dGFj/aG1lbnRfNjc0Mzcw/NTc.jpeg', alt: 'Logo 1' },
        { src: 'https://imgs.search.brave.com/Dg6QnugbVj4XDKN65SKODnMZsWWa59Rn-K8F8iU9rrY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFEZXJ1aUsx/S2svMy8wLzQwMHct/b3h5VWlUdzk4bmMu/anBn', alt: 'Logo 2' },
        { src: 'https://imgs.search.brave.com/2GeqqLkLwc9JAWZ04RdHqTKrZuHBlpAg_fvFHqj0eXw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2Nkbi1j/Z2kvaW1hZ2UvZj1h/dXRvLHE9NzAvZjI1/NjdkMjgtZTk0Yi00/MjNhLWFhZTgtNzM4/YmVlOTY0YzIzL2hv/d3RvX2xvZ29zMi5q/cGc', alt: 'Logo 3' },
        { src: 'https://imgs.search.brave.com/lXTOvf8_XwcPk9Sr80gLERyNyaKG7qKXCd3OZ_7lGkI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9JdDIzdzlJMDl3/Mm53UENLWFRWTzVZ/UmwtcFU9LzY5N3gz/NjI6MTE5N3g4NjIv/Zml0LWluLzUwMHg1/MDAvOTlkZXNpZ25z/LWNvbnRlc3RzLWF0/dGFjaG1lbnRzLzY3/LzY3NDM3L2F0dGFj/aG1lbnRfNjc0Mzcw/NTc.jpeg', alt: 'Logo 1' },
        { src: 'https://imgs.search.brave.com/Dg6QnugbVj4XDKN65SKODnMZsWWa59Rn-K8F8iU9rrY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFEZXJ1aUsx/S2svMy8wLzQwMHct/b3h5VWlUdzk4bmMu/anBn', alt: 'Logo 2' },
        { src: 'https://imgs.search.brave.com/2GeqqLkLwc9JAWZ04RdHqTKrZuHBlpAg_fvFHqj0eXw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2Nkbi1j/Z2kvaW1hZ2UvZj1h/dXRvLHE9NzAvZjI1/NjdkMjgtZTk0Yi00/MjNhLWFhZTgtNzM4/YmVlOTY0YzIzL2hv/d3RvX2xvZ29zMi5q/cGc', alt: 'Logo 3' },

    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <div className="bg-gray-50 h-60 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center my-8">Our Partners</h1>
            <div className="carousel-container w-full max-w-4xl">
                <Slider {...settings}>
                    {logos.map((logo, index) => (
                        <div key={index} className="logo-card flex justify-center">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={150}
                                height={50}
                                layout="intrinsic"
                                objectFit="contain"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
export default CarouselProducts
