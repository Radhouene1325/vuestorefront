import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; // Get the pathname of the request
    const token = request.cookies.get('auth-token')?.value; // Retrieve the auth-token from cookies

    console.log(`Request Path: ${pathname}`);
    console.log(`Auth Token: ${token}`);

    // 1. Bypass middleware for specific public routes
    if (pathname.startsWith('/about')) {
        return NextResponse.next();
    }

    // 2. Check if token is missing for protected routes
    if (
        pathname.startsWith('/user/myprofile')
        // ||
        // pathname.startsWith('/buildingAdress') ||
        // pathname.startsWith('/shippingAdress')
    ) {
        if (token===undefined) {
            console.log('Auth token missing. Redirecting to login...');
            const loginUrl = new URL('/authentication/login/user', request.url);
            return NextResponse.redirect(loginUrl);
        }

        console.log('Auth token exists. Proceeding...');
    }

    // 3. Perform a general token check for all other routes
    if (!token) {
        console.log('No auth-token found. Redirecting to login.');
        const loginUrl = new URL('/authentication/login/user', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // 4. Allow the request to proceed if no conditions are met
    return NextResponse.next();
}

// Configure middleware matcher
export const config = {
    matcher: [
        '/buildingAdress/:path*',
        '/shippingAdress/:path*',
        '/user/:path*', // Protect all subpaths under /user
    ],
};
