import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

/**
 * الحصول على sessionId من cookies أو إنشاء واحد جديد
 */
export async function getSessionId() {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
        sessionId = uuidv4();
        // سيتم تعيين الـ cookie في الـ response
    }

    return sessionId;
}

/**
 * تعيين sessionId في cookies
 */
export function setSessionCookie(sessionId) {
    return {
        name: 'sessionId',
        value: sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 يوم
        path: '/',
    };
}
