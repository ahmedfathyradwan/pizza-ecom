import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionId } from '@/lib/session';

/**
 * PATCH /api/cart/update
 * تحديث كمية عنصر في السلة
 */
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { itemId, quantity } = body;

        if (!itemId || !quantity || quantity < 1) {
            return NextResponse.json(
                { success: false, error: 'بيانات غير صحيحة' },
                { status: 400 }
            );
        }

        const sessionId = await getSessionId();

        // التحقق من أن العنصر يخص هذا الـ session
        const item = await prisma.cartItem.findFirst({
            where: {
                id: itemId,
                sessionId,
            },
        });

        if (!item) {
            return NextResponse.json(
                { success: false, error: 'العنصر غير موجود' },
                { status: 404 }
            );
        }

        // حساب السعر الجديد
        let parsedAddons = [];
        try {
            parsedAddons = JSON.parse(item.addons || "[]");
        } catch (error) {
            console.error('خطأ في تحليل addons:', error);
            parsedAddons = [];
        }
        const addonsPrice = parsedAddons.reduce((sum, addon) => sum + (addon.price || 0), 0);
        const newTotalPrice = (item.basePrice + addonsPrice) * quantity;

        // تحديث العنصر
        const updatedItem = await prisma.cartItem.update({
            where: { id: itemId },
            data: {
                quantity,
                totalPrice: newTotalPrice,
            },
        });

        let parsedUpdatedAddons = [];
        try {
            parsedUpdatedAddons = JSON.parse(updatedItem.addons || "[]");
        } catch (error) {
            console.error('خطأ في تحليل addons:', error);
            parsedUpdatedAddons = [];
        }

        return NextResponse.json({
            success: true,
            cartItem: {
                ...updatedItem,
                addons: parsedUpdatedAddons,
            },
        });
    } catch (error) {
        console.error('خطأ في تحديث العنصر:', error);
        return NextResponse.json(
            { success: false, error: 'حدث خطأ في الخادم' },
            { status: 500 }
        );
    }
}
