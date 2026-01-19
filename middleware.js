import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check if the path starts with /dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Check for "admin_session" cookie
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // Redirect to login if cookie is missing
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
