// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from "jsonwebtoken";
// import {serialize} from "cookie";
//
// // Middleware function
// export async function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl; // Get the pathname of the request
//
//     const token = request.cookies.get('auth-token')?.value; // Retrieve the auth-token from cookies
//     console.log('token', token)
// if (token===undefined) {
//         console.log('No auth-token found. Redirecting to login.');
//         const loginUrl = new URL('/authentication/login/user', request.url);
//         return NextResponse.redirect(loginUrl);
//     }
//     console.log(`Requestdddddddddddddddddddddddddddddddddddddddddddddddddd Path: ${pathname}`);
//
//     console.log(`Auth hhhhhhhhhhhaaaaaaaaaaahouwa in middddddddddddddlwaaaaaaredToken: ${token}`);
//     const decoded = jwt.decode(token, process.env.JWT_SECRET as string);
//     console.log('decodecccccccccsssssssssssssssssssssssssssscccccccccccccccccd', decoded)
//     // Serialize the cookie
//     const currentTime = Math.floor(Date.now() / 1000)
//     console.log('asssssssssssss', currentTime)
//     const expirationTime = decoded?.exp as number; ///thes expire time for the token
//
//     const expiresIn = expirationTime - currentTime
//     // const response =await  NextResponse.next()
//
//     if (expiresIn<3 ||decoded===null && token !== undefined) {
//         const response = NextResponse.redirect(new URL('/authentication/login/user', request.url));
//         response.cookies.set('auth-token', '', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             path: '/',
//             maxAge: 0,
//         });
//         const loginUrl = new URL('/', request.url);
//      // await   NextResponse.redirect(loginUrl);
//         return response;
//
//
//         // return response;
//
//         // return NextResponse.next();
//     }
//
//     // 2. Check if token is missing for protected routes
//     if (
//         pathname.startsWith('/user')||
//         pathname.startsWith('/buildingAdress') ||
//         pathname.startsWith('/shippingAdress')
//     ) {
//
//         if (token === undefined) {
//             console.log('Auth token missing. Redirecting to login...');
//             const loginUrl = new URL('/authentication/login/user', request.url);
//             return NextResponse.redirect(loginUrl);
//         }
//
//         console.log('Auth token exists. Proceeding...');
//     }
//
//
//
//
//
//     // 3. Perform a general token check for all other routes
//     // if (!token) {
//     //     console.log('No auth-token found. Redirecting to login.');
//     //     const loginUrl = new URL('/authentication/login/user', request.url);
//     //     return NextResponse.redirect(loginUrl);
//     // }
//
//     // 4. Allow the request to proceed if no conditions are met
//     return NextResponse.next();
// }
//
// // Configure middleware matcher
// export const config = {
//     matcher: [
//          '/:path*',
//         '/buildingAdress/:path*',
//         '/shippingAdress/:path*',
//         '/user/:path*', // Protect all subpaths under /user
//     ],
// };

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from "jsonwebtoken";
//
// export async function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl; // Get the pathname of the request
//     const token = request.cookies.get('auth-token')?.value; // Retrieve the token from cookies
//     console.log('Token:', token);
//
//     // Define public and protected routes
//     const protectedRoutes = ['/user', '/buildingAdress', '/shippingAdress'];
//     const publicPages = ['/','/about','/categorie','/panier']; // Define public pages like the home page
//
//     // If on a public page and the user has a valid token, redirect to dashboard
//     if (publicPages.includes(pathname) && token) {
//         console.log('User is authenticated, redirecting from home page to dashboard...');
//         try {
//             const decoded = jwt.decode(token, process.env.JWT_SECRET as string) as { exp: number };
//             const currentTime = Math.floor(Date.now() / 1000);
//
//             if (decoded.exp > currentTime) {
//                 console.log('User is authenticated, redirecting from home page to dashboard...');
//                 return NextResponse.redirect(new URL('/', request.url));
//             }
//         } catch (error) {
//             console.error('Invalid token, allowing access to the home page.');
//         }
//     }
//
//     // If the request is for a protected route, require authentication
//     if (protectedRoutes.some(route => pathname.startsWith(route))) {
//         if (!token) {
//             console.log('Auth token missing. Redirecting to login...');
//             return NextResponse.redirect(new URL('/authentication/login/user', request.url));
//         }
//
//         try {
//             // Verify the token
//             const decoded = jwt.decode(token, process.env.JWT_SECRET as string) as { exp: number };
//             const currentTime = Math.floor(Date.now() / 1000);
//
//             // If token is expired, clear cookie and redirect to login
//             if (decoded.exp < currentTime) {
//                 console.log('Token expired. Redirecting to login...');
//
//                 const response = NextResponse.redirect(new URL('/authentication/login/user', request.url));
//                 response.cookies.set('auth-token', '', {
//                     httpOnly: true,
//                     secure: process.env.NODE_ENV === 'production',
//                     sameSite: 'strict',
//                     path: '/',
//                     maxAge: 0,
//                 });
//
//                 return response;
//             }
//         } catch (error) {
//             console.error('Invalid token. Redirecting to login...');
//
//             const response = NextResponse.redirect(new URL('/authentication/login/user', request.url));
//             response.cookies.set('auth-token', '', {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'strict',
//                 path: '/',
//                 maxAge: 0,
//             });
//
//             return response;
//         }
//     }
//
//     // If the request is neither a protected nor a public page, allow it
//     return NextResponse.next();
// }
//
// // Middleware matcher
// export const config = {
//     matcher: [
//         '/', // Allow home page
//         '/about/:path*','/categorie/:path*','/panier/:path*',
//          // Allow public home page
//         '/dashboard', // Redirect authenticated users here
//         '/user/:path*', // Protect user pages
//         '/buildingAdress/:path*', // Protect address pages
//         '/shippingAdress/:path*', // Protect shipping pages
//     ],
// };


//
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from "jsonwebtoken";
//
// export async function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl; // Get request pathname
//     const token = request.cookies.get('auth-token')?.value; // Retrieve token from cookies
//
//     // If the token is missing, redirect to login
//     if (!token) {
//         console.log('Auth token missing. Redirecting to login...');
//         return NextResponse.redirect(new URL('/', request.url));
//     }
//
//     try {
//         // Verify and decode the token
//         const decoded = jwt.decode(token, process.env.JWT_SECRET as string) as { exp: number };
//         const currentTime = Math.floor(Date.now() / 1000); // Current timestamp
//
//         // If token is expired, clear the cookie and redirect to login
//         if (decoded.exp < currentTime) {
//             console.log('Token expired. Redirecting to login...');
//
//             const response = NextResponse.redirect(new URL('/authentication/login/user', request.url));
//             response.cookies.set('auth-token', '', {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'strict',
//                 path: '/',
//                 maxAge: 0, // Expire the cookie immediately
//             });
//
//             return response;
//         }
//     } catch (error) {
//         console.error('Invalid token. Redirecting to login...', error);
//
//         // If token verification fails, clear the cookie and redirect
//         const response = NextResponse.redirect(new URL('/authentication/login/user', request.url));
//         response.cookies.set('auth-token', '', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             path: '/',
//             maxAge: 0, // Expire the cookie immediately
//         });
//
//         return response;
//     }
//
//     // Allow access if the token is valid
//     return NextResponse.next();
// }
//
// // Middleware configuration: Protect specific routes
// export const config = {
//     matcher: [
//         '/:path*',
//         '/buildingAdress/:path*',
//         '/shippingAdress/:path*',
//         '/user/:path*', // Protect all subpaths under /user
//     ],
// };





import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth-token')?.value;
    console.log('Token:', token);

    // Define public and protected routes
    const protectedRoutes = ['/user', '/buildingAdress', '/shippingAdress'];
    const publicPages = ['/', '/about', '/categorie', '/panier'];

    // If the user is on a public page and has a valid token, redirect them to the dashboard
    console.log('pathname',publicPages.includes(pathname))
    if (publicPages.some(route => pathname.startsWith(route)) && token) {
        console.log('User is authenticated, redirecting from home page to dashboard...');
        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET as string) as { exp: number };
            const currentTime = Math.floor(Date.now() / 1000);
          let  expiresIn=decoded.exp-currentTime;
            if (expiresIn<3 ||decoded===null && token !== undefined) {
                console.log('User is authenticated, redirecting from home page to dashboard...');
                const response =await  NextResponse.next()
                response.cookies.set('auth-token', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 0,
                });

                return response;
            }
        } catch (error) {
            console.error('Invalid token, allowing access to the home page.');
        }
    }

    // If the request is for a protected route, require authentication
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!token) {
            console.log('Auth token missing. Redirecting to login...');
            return NextResponse.redirect(new URL('/authentication/login/user', request.url));
        }

        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET as string) as { exp: number };
            const currentTime = Math.floor(Date.now() / 1000);

            // If token is expired, clear cookie and redirect to login
            if (decoded.exp < currentTime) {
                console.log('Token expired. Redirecting to login...');

                const response = NextResponse.redirect(new URL('/authentication/login/user', request.url));
                response.cookies.set('auth-token', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 0,
                });

                return response;
            }
        } catch (error) {
            console.error('Invalid token. Redirecting to login...');

            const response = NextResponse.redirect(new URL('/authentication/login/user', request.url));
            response.cookies.set('auth-token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 0,
            });

            return response;
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Middleware matcher
export const config = {
    matcher: [
        '/', // Allow home page
        '/about/:path*',
        '/categorie/:path*',
        '/panier/:path*',
        '/dashboard', // Redirect authenticated users here
        '/user/:path*', // Protect user pages
        '/buildingAdress/:path*', // Protect address pages
        '/shippingAdress/:path*', // Protect shipping pages
    ],
};
