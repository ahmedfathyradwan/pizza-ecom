import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST: Create a new product
export async function POST(request) {
    try {
        const body = await request.json();
        const { title, description, price, categoryId, image } = body;
        // Note: 'price' in body might be a single number? 
        // Schema expects 'prices' as JSON string string like {"small": 80...}
        // For simplicity in this first version, we'll assume the specific JSON format is sent or we construct it.
        // Let's assume the admin form sends the full correct JSON object or string for now.

        const product = await prisma.product.create({
            data: {
                title,
                description,
                image: image || '/pizza/1.png',
                prices: typeof body.prices === 'object' ? JSON.stringify(body.prices) : body.prices,
                categoryId
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
