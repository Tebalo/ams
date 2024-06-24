import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value;
    
    // If there's no session cookie and the path is not /welcome, redirect to /welcome
    if (!sessionCookie && !request.nextUrl.pathname.startsWith('/welcome')) {
        return NextResponse.redirect(new URL('/welcome', request.url));
    }
    
    // If there is a session cookie and the path is /, redirect to /trls/home
    if (sessionCookie && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/ams/home', request.url));
    }
    
    // For all other cases, continue to the next middleware or to the page
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|public|favicon.ico|Code-of-Arms-colour.png|sw.js).*)',
    ],
}