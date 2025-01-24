import { SfButton } from '@storefront-ui/react';
import classNames from 'classnames';
import { Carousel } from "@material-tailwind/react";

export default function DisplayHorizontalBlock() {
    return (
        <>

            {/*<Carousel transition={{ duration: 2 }} className="rounded-xl">*/}
            {/*    <img*/}
            {/*        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"*/}
            {/*        alt="image 1"*/}
            {/*        className="h-full w-full object-cover"*/}
            {/*    />*/}
            {/*    <img*/}
            {/*        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"*/}
            {/*        alt="image 2"*/}
            {/*        className="h-full w-full object-cover"*/}
            {/*    />*/}
            {/*    <img*/}
            {/*        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"*/}
            {/*        alt="image 3"*/}
            {/*        className="h-full w-full object-cover"*/}
            {/*    />*/}
            {/*</Carousel>*/}


         {/*<div className="relative overflow-hidden bg-white">*/}
         {/*    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">*/}
         {/*        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">*/}
         {/*            <div className="sm:max-w-lg">*/}
         {/*                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">*/}
         {/*                    Summer styles are finally here*/}
         {/*                </h1>*/}
         {/*                <p className="mt-4 text-xl text-gray-500">*/}
         {/*                    This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care*/}
         {/*                    if you live or die.*/}
         {/*                </p>*/}
         {/*            </div>*/}
         {/*            <div>*/}
         {/*                <div className="mt-10">*/}

         {/*                    <div*/}
         {/*                        aria-hidden="true"*/}
         {/*                        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"*/}
         {/*                    >*/}
         {/*                        <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">*/}
         {/*                            <div className="flex items-center space-x-6 lg:space-x-8">*/}
         {/*                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">*/}
         {/*                                    <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">*/}
         {/*                                        <img*/}
         {/*                                            alt=""*/}
         {/*                                            src="https:tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"*/}
         {/*                                            className="size-full object-cover"*/}
         {/*                                        />*/}
         {/*                                    </div>*/}
         {/*                                    <div className="h-64 w-44 overflow-hidden rounded-lg">*/}
         {/*                                        <img*/}
         {/*                                            alt=""*/}
         {/*                                            src="https:tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"*/}
         {/*                                            className="size-full object-cover"*/}
         {/*                                        />*/}
         {/*                                    </div>*/}
         {/*                                </div>*/}
         {/*                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">*/}
         {/*                                    <div className="h-64 w-44 overflow-hidden rounded-lg">*/}
         {/*                                        <img*/}
         {/*                                            alt=""*/}
         {/*                                            src="https:tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"*/}
         {/*                                            className="size-full object-cover"*/}
         {/*                                        />*/}
         {/*                                    </div>*/}
         {/*                                    <div className="h-64 w-44 overflow-hidden rounded-lg">*/}
         {/*                                        <img*/}
         {/*                                            alt=""*/}
         {/*                                            src="https:tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"*/}
         {/*                                            className="size-full object-cover"*/}
         {/*                                        />*/}
         {/*                                    </div>*/}
         {/*                                    <div className="h-64 w-44 overflow-hidden rounded-lg">*/}
         {/*                                        <img*/}
         {/*                                            alt=""*/}
         {/*                                            src="https:tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"*/}
         {/*                                            className="size-full object-cover"*/}
         {/*                                        />*/}
         {/*                                    </div>*/}
         {/*                                </div>*/}
         {/*                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">*/}
         {/*                                    <div className="h-64 w-44 overflow-hidden rounded-lg">*/}
         {/*                                        <img*/}
         {/*                                            alt=""*/}
         {/*                                            src="https:tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"*/}
         {/*                                            className="size-full object-cover"*/}
         {/*                                        />*/}
         {/*                                    </div>*/}
         {/*                                    <div className="h-64 w-44 overflow-hidden rounded-lg">*/}
         {/*                                        <img*/}
         {/*                                            alt=""*/}
         {/*                                            src="https:tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"*/}
         {/*                                            className="size-full object-cover"*/}
         {/*                                        />*/}
         {/*                                    </div>*/}
         {/*                                </div>*/}
         {/*                            </div>*/}
         {/*                        </div>*/}
         {/*                    </div>*/}

         {/*                    /!*<a*!/*/}
         {/*                    /!*    href="#"*!/*/}
         {/*                    /!*    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"*!/*/}
         {/*                    /!*>*!/*/}
         {/*                    /!*    Shop Collection*!/*/}
         {/*                    /!*</a>*!/*/}
         {/*                </div>*/}
         {/*            </div>*/}
         {/*        </div>*/}
         {/*    </div>*/}
         {/*</div>*/}


            <div className="relative overflow-hidden bg-white">
                {/* The parent container sets a position relative, so we can absolutely position the video */}
                <div className="relative h-[60vh] sm:h-[70vh] lg:h-[60vh]">
                    {/* Video Background */}
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        {/* Replace the src with your own video file or hosted link */}
                        <source src="/shop.mp4"
                                type="video/mp4" />
                        {/* Fallback for browsers that don't support the <video> tag */}
                        Your browser does not support HTML5 video.
                    </video>

                    {/* Overlay Content (text + optional button) */}
                    <div className="relative z-10 flex h-full flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow sm:text-6xl">
                                Summer styles are finally here
                            </h1>
                            <p className="mt-4 text-xl text-gray-100 drop-shadow">
                                This year, our new summer collection will shelter you from the
                                harsh elements of a world that doesn&apos;t care if you live or die.
                            </p>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center text-base font-medium text-white hover:bg-indigo-700"
                                >
                                    Shop Collection
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Optional gradient overlay to darken or lighten the video if needed */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-black bg-opacity-30 mix-blend-multiply"
                    />
                </div>
            </div>


        </>
    );
}


