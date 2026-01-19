import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionId, setSessionCookie } from '@/lib/session';

/**
 * POST /api/cart/add
 * إضافة منتج للسلة
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { pizzaId, title, image, size, quantity, addons, basePrice } = body;

        // التحقق من البيانات
        if (!pizzaId || !title || !size || !quantity || basePrice === undefined) {
            return NextResponse.json(
                { success: false, error: 'بيانات غير مكتملة' },
                { status: 400 }
            );
        }

        // الحصول على sessionId
        const sessionId = await getSessionId();

        // حساب سعر الإضافات
        let addonsPrice = 0;
        if (addons && Array.isArray(addons)) {
            addonsPrice = addons.reduce((sum, addon) => sum + (addon.price || 0), 0);
        }

        // حساب السعر الإجمالي
        const totalPrice = (basePrice + addonsPrice) * quantity;

        // حفظ في قاعدة البيانات
        const cartItem = await prisma.cartItem.create({
            data: {
                sessionId,
                pizzaId,
                title,
                image,
                size,
                quantity,
                basePrice,
                addons: JSON.stringify(addons || []),
                totalPrice,
            },
        });

        // إنشاء response مع تعيين cookie
        const response = NextResponse.json({
            success: true,
            cartItem: {
                ...cartItem,
                addons: JSON.parse(cartItem.addons),
            },
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
        console.error('خطأ في إضافة المنتج للسلة:', error);
        return NextResponse.json(
            { success: false, error: 'حدث خطأ في الخادم' },
            { status: 500 }
        );
    }
}
