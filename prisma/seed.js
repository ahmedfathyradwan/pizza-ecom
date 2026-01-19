const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const categories = [
    "الكل",
    "بيتزا",
    "مشويات",
    "شرقي",
    "فراخ",
    "لحوم",
    "بحريات",
    "سندوتشات",
    "معجنات",
    "سلطات",
    "حساء",
    "مقبلات",
    "حلو",
    "مشروبات",
];

const extrasData = [
    { id: 1, name: "موزاريلا زيادة", price: 15 },
    { id: 2, name: "تشيدر", price: 12 },
    { id: 3, name: "مكس جبن", price: 18 },
    { id: 4, name: "بيبروني", price: 20 },
    { id: 5, name: "سجق", price: 18 },
    { id: 6, name: "بسطرمة", price: 22 },
    { id: 7, name: "دجاج", price: 17 },
    { id: 8, name: "تونة", price: 16 },
];

const pizzas = [
    {
        title: "Margherita",
        category: "بيتزا",
        description: "Classic pizza with mozzarella cheese and fresh tomato sauce",
        image: "/pizza/1.png",
        prices: { small: 80, medium: 110, large: 140 },
    },
    {
        title: "Pepperoni",
        category: "بيتزا",
        description: "Pepperoni slices with melted cheese and rich sauce",
        image: "/pizza/2.png",
        prices: { small: 95, medium: 125, large: 155 },
    },
    {
        title: "Hawaiian",
        category: "بيتزا",
        description: "Ham, pineapple, and cheese on a classic tomato base",
        image: "/pizza/1.png",
        prices: { small: 90, medium: 120, large: 150 },
    },
    {
        title: "Veggie",
        category: "بيتزا",
        description: "Mixed vegetables with mozzarella and tomato sauce",
        image: "/pizza/1.png",
        prices: { small: 85, medium: 115, large: 145 },
    },
    {
        title: "Four Cheese",
        category: "بيتزا",
        description: "Mozzarella, cheddar, parmesan, and gorgonzola blend",
        image: "/pizza/1.png",
        prices: { small: 100, medium: 130, large: 160 },
    },
    {
        title: "BBQ Chicken",
        category: "بيتزا",
        description: "Grilled chicken, BBQ sauce, and cheese",
        image: "/pizza/1.png",
        prices: { small: 95, medium: 125, large: 155 },
    },
    {
        title: "Meat Lovers",
        category: "بيتزا",
        description: "Pepperoni, sausage, bacon, and beef with cheese",
        image: "/pizza/1.png",
        prices: { small: 105, medium: 135, large: 165 },
    },
    {
        title: "Mediterranean",
        category: "بيتزا",
        description: "Olives, feta, tomatoes, and red onions with mozzarella",
        image: "/pizza/1.png",
        prices: { small: 90, medium: 120, large: 150 },
    },
];

async function main() {
    console.log('Start seeding ...')

    // 1. Create Categories
    const categoryMap = {}; // name -> id
    for (const catName of categories) {
        const cat = await prisma.category.upsert({
            where: { name: catName },
            update: {},
            create: { name: catName },
        });
        categoryMap[catName] = cat.id;
        console.log(`Created category with id: ${cat.id}`);
    }

    // 2. Create Extras
    for (const extra of extrasData) {
        const e = await prisma.extra.create({
            data: {
                name: extra.name,
                price: extra.price,
            }
        });
        console.log(`Created extra with id: ${e.id}`);
    }

    // 3. Create Products (Pizzas)
    for (const pizza of pizzas) {
        const catId = categoryMap[pizza.category];
        if (catId) {
            const p = await prisma.product.create({
                data: {
                    title: pizza.title,
                    description: pizza.description,
                    image: pizza.image,
                    prices: JSON.stringify(pizza.prices),
                    categoryId: catId,
                }
            });
            console.log(`Created product with id: ${p.id}`);
        } else {
            console.warn(`Category ${pizza.category} not found for pizza ${pizza.title}`);
        }
    }

    // 4. Create default Admin User
    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: '0000',
            role: 'admin',
        },
    });
    console.log(`Created admin user`);

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
