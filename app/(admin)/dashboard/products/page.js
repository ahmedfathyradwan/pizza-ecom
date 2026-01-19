import { PrismaClient } from "@prisma/client";
import ProductList from "./ProductList";

// Prevent multiple instances in dev
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const revalidate = 0; // Disable cache for admin

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div style={{ fontFamily: "var(--ar)", direction: "rtl" }}>
            <h1 style={{ marginBottom: "20px" }}>إدارة المنتجات</h1>
            <ProductList initialProducts={products} />
        </div>
    );
}
