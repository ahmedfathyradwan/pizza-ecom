import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionId, setSessionCookie } from '@/lib/session';

/**
 * GET /api/cart
 * جلب جميع عناصر السلة
 */
export async function GET(request) {
    try {
        const sessionId = await getSessionId();

        // جلب جميع العناصر من قاعدة البيانات
        const items = await prisma.cartItem.findMany({
            where: { sessionId },
            orderBy: { createdAt: 'desc' },
        });

        // تحويل addons من string إلى array مع معالجة الأخطاء
        const formattedItems = items.map((item) => {
            let parsedAddons = [];
            try {
                parsedAddons = JSON.parse(item.addons || "[]");
            } catch (error) {
                console.error('خطأ في تحليل addons:', error);
                parsedAddons = [];
            }
            return {
                ...item,
                addons: parsedAddons,
            };
        });

        // حساب الإجمالي
        const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

        // حساب عدد العناصر (مجموع الكميات)
        const count = items.reduce((sum, item) => sum + item.quantity, 0);

        // إنشاء response
        const response = NextResponse.json({
            success: true,
            items: formattedItems,
            total,
            count,
        });

        // تعيين sessionId في cookie
        const cookie = setSessionCookie(sessionId);
        response.cookies.set(cookie.name, cookie.value, {
            httpOnly: cookie.httpOnly,
            secure: cookie.secure,
            sameSite: cookie.sameSite,
            maxAge: cookie.maxAge,
            path: cookie.path,
        });

        return response;
    } catch (error) {
        console.error('خطأ في جلب السلة:', error);
        return NextResponse.json(
            { success: false, error: 'حدث خطأ في الخادم' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/cart
 * حذف جميع عناصر السلة (Clear cart)
 */
export async function DELETE(request) {
    try {
        const sessionId = await getSessionId();

        await prisma.cartItem.deleteMany({
            where: { sessionId },
        });

        return NextResponse.json({
            success: true,
            message: 'تم تفريغ السلة بنجاح',
        });
    } catch (error) {
        console.error('خطأ في تفريغ السلة:', error);
        return NextResponse.json(
            { success: false, error: 'حدث خطأ في الخادم' },
            { status: 500 }
        );
    }
}
