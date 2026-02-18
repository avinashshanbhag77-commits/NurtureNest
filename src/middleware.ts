import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production" || req.url.startsWith("https")
    });
    const { pathname } = req.nextUrl;

    // If user is authenticated and tries to access signin or signup, redirect to dashboard
    if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Protect these routes - If no token, redirect to signin
    const protectedRoutes = [
        "/tracker",
        "/nutrition",
        "/wellness",
        "/ai-support",
        "/community",
        "/dashboard",
        "/appointments",
        "/pricing",
        "/checkout"
    ];

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!token && isProtectedRoute) {
        const url = new URL('/auth/signin', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/tracker/:path*",
        "/nutrition/:path*",
        "/wellness/:path*",
        "/ai-support/:path*",
        "/community/:path*",
        "/dashboard/:path*",
        "/appointments/:path*",
        "/pricing/:path*",
        "/checkout/:path*",
        "/auth/signin",
        "/auth/signup"
    ],
};
