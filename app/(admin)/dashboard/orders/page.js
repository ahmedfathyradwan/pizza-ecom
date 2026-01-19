import { PrismaClient } from "@prisma/client";
import OrderList from "./OrderList";
import styles from "./OrdersPage.module.css";

// Prevent multiple instances in dev
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const revalidate = 0; // Disable cache for admin to see new orders

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { items: true }, // Include items if relation exists
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>إدارة الطلبات</h1>
            <OrderList initialOrders={orders} />
        </div>
    );
}
