
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDataAdmin } from './helpers/getDataFromToken';
import { adminStatus } from './helpers/adminStatus';

export async function middleware(request: NextRequest) {
    // const admin = await getDataAdmin(request);
    // const statusAdmin = await adminStatus(request)
    // console.log("statusAdmin:",statusAdmin)
    // console.log("adminMiddle:", admin)
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/signin' || path === '/signup';
    const token = request.cookies.get('token')?.value || '';
    const admin = request.cookies.get('admin')?.value || '';
    if(path === "/admin/dashboard"){
        if(!admin){
            return NextResponse.redirect(new URL('/profile', request.nextUrl))
        }
    }
    // if (isPublicPath && token) {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/signin',
        '/signup',
        '/admin/dashboard',
        '/cashout'
    ],
}