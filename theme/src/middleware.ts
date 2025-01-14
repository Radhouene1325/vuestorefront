import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";
import {serialize} from "cookie";

// Middleware function
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; // Get the pathname of the request

    const token = request.cookies.get('auth-token')?.value; // Retrieve the auth-token from cookies

    console.log(`Requestdddddddddddddddddddddddddddddddddddddddddddddddddd Path: ${pathname}`);

    console.log(`Auth hhhhhhhhhhhaaaaaaaaaaahouwa in middddddddddddddlwaaaaaaredToken: ${token}`);
    const decoded = jwt.decode(token, process.env.JWT_SECRET as string);
    console.log('decodecccccccccsssssssssssssssssssssssssssscccccccccccccccccd', decoded)
    // Serialize the cookie
    const currentTime = Math.floor(Date.now() / 1000)
    console.log('asssssssssssss', currentTime)
    const expirationTime = decoded?.exp as number; ///thes expire time for the token

    const expiresIn = expirationTime - currentTime
    const response =await  NextResponse.next()

    if (expiresIn<3) {

        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 0,
        });
        const loginUrl = new URL('/', request.url);
        NextResponse.redirect(loginUrl);
        return response;


        // return response;

        // return NextResponse.next();
    }

    // 2. Check if token is missing for protected routes
    if (
        pathname.startsWith('/user')||
        pathname.startsWith('/buildingAdress') ||
        pathname.startsWith('/shippingAdress')
    ) {

        if (token === undefined) {
            console.log('Auth token missing. Redirecting to login...');
            const loginUrl = new URL('/authentication/login/user', request.url);
            return NextResponse.redirect(loginUrl);
        }

        console.log('Auth token exists. Proceeding...');
    }





    // 3. Perform a general token check for all other routes
    // if (!token) {
    //     console.log('No auth-token found. Redirecting to login.');
    //     const loginUrl = new URL('/authentication/login/user', request.url);
    //     return NextResponse.redirect(loginUrl);
    // }

    // 4. Allow the request to proceed if no conditions are met
    return NextResponse.next();
}

// Configure middleware matcher
export const config = {
    matcher: [
         '/:path*',
        '/buildingAdress/:path*',
        '/shippingAdress/:path*',
        '/user/:path*', // Protect all subpaths under /user
    ],
};
