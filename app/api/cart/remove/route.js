import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionId } from '@/lib/session';

/**
 * DELETE /api/cart/remove
 * حذف عنصر محدد من السلة
 */
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get('id');

        if (!itemId) {
            return NextResponse.json(
                { success: false, error: 'معرف العنصر مطلوب' },
                { status: 400 }
            );
        }

        const sessionId = await getSessionId();

        // التحقق من أن العنصر يخص هذا الـ session
        const item = await prisma.cartItem.findFirst({
            where: {
                id: parseInt(itemId),
                sessionId,
            },
        });

        if (!item) {
            return NextResponse.json(
                { success: false, error: 'العنصر غير موجود' },
                { status: 404 }
            );
        }

        // حذف العنصر
        await prisma.cartItem.delete({
            where: { id: parseInt(itemId) },
        });

        return NextResponse.json({
            success: true,
            message: 'تم حذف العنصر بنجاح',
        });
    } catch (error) {
        console.error('خطأ في حذف العنصر:', error);
        return NextResponse.json(
            { success: false, error: 'حدث خطأ في الخادم' },
            { status: 500 }
        );
    }
}
