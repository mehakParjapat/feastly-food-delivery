const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

if (!process.env.DATABASE_URL) {
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const port = process.env.DB_PORT || process.env.MYSQL_PORT || 3306;
  const user = process.env.DB_USER || process.env.MYSQL_USER;
  const pass = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const name = process.env.DB_NAME || process.env.DB_DATABASE || process.env.MYSQL_DATABASE;
  if (host && user && name) {
    process.env.DATABASE_URL = `mysql://${user}:${encodeURIComponent(pass)}@${host}:${port}/${name}`;
  }
}


const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'demo@feastly.app' },
    update: {},
    create: {
      name: 'Demo Customer',
      email: 'demo@feastly.app',
      password,
      phone: '+1 555 0100',
      role: 'customer',
    },
  });

  const categories = [
    { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
    { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
    { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80' },
    { name: 'Salads', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
    { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' },
    { name: 'Drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80' },
  ];
  for (const c of categories) {
    await prisma.category.upsert({ where: { name: c.name }, update: { image: c.image }, create: c });
  }
  const cats = await prisma.category.findMany();
  const catId = (name) => cats.find((c) => c.name === name)?.id;

  const restaurants = [
    { name: 'Bella Napoli', description: 'Authentic wood-fired Neapolitan pizzas made with imported Italian ingredients.', cuisine: 'Italian', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', rating: 4.8, deliveryTime: '25-35 min', deliveryFee: 2.99, address: '12 Roma Street' },
    { name: 'Burger Republic', description: 'Juicy handcrafted burgers with premium beef and fresh toppings.', cuisine: 'American', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', rating: 4.6, deliveryTime: '20-30 min', deliveryFee: 1.99, address: '45 Liberty Ave' },
    { name: 'Sakura Sushi', description: 'Fresh sushi and sashimi prepared by master chefs.', cuisine: 'Japanese', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', rating: 4.9, deliveryTime: '30-40 min', deliveryFee: 3.49, address: '8 Cherry Blossom Rd' },
    { name: 'Green Garden', description: 'Healthy salads and bowls made with organic seasonal produce.', cuisine: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', rating: 4.5, deliveryTime: '15-25 min', deliveryFee: 2.49, address: '30 Garden Lane' },
    { name: 'Sweet Tooth', description: 'Decadent desserts, cakes and pastries baked fresh daily.', cuisine: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80', rating: 4.7, deliveryTime: '20-30 min', deliveryFee: 2.99, address: '5 Sugar Street' },
    { name: 'Taco Fiesta', description: 'Bold Mexican street food with authentic flavors and spices.', cuisine: 'Mexican', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', rating: 4.4, deliveryTime: '25-35 min', deliveryFee: 2.29, address: '77 Fiesta Blvd' },
  ];

  const restIds = {};
  for (const r of restaurants) {
    const existing = await prisma.restaurant.findFirst({ where: { name: r.name } });
    const rec = existing
      ? await prisma.restaurant.update({ where: { id: existing.id }, data: r })
      : await prisma.restaurant.create({ data: r });
    restIds[r.name] = rec.id;
  }

  const foods = [
    { name: 'Margherita Pizza', description: 'San Marzano tomatoes, fresh mozzarella, basil and olive oil.', price: 12.5, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', restaurant: 'Bella Napoli', category: 'Pizza' },
    { name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni and melted mozzarella.', price: 14.0, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80', restaurant: 'Bella Napoli', category: 'Pizza' },
    { name: 'Quattro Formaggi', description: 'Four-cheese pizza with mozzarella, gorgonzola, parmesan and fontina.', price: 15.5, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', restaurant: 'Bella Napoli', category: 'Pizza' },
    { name: 'Classic Cheeseburger', description: 'Beef patty, cheddar, lettuce, tomato and house sauce.', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', restaurant: 'Burger Republic', category: 'Burgers' },
    { name: 'Bacon Deluxe Burger', description: 'Double beef, crispy bacon, cheese and caramelized onions.', price: 12.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', restaurant: 'Burger Republic', category: 'Burgers' },
    { name: 'Crispy Chicken Burger', description: 'Buttermilk fried chicken, slaw and spicy mayo.', price: 10.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80', restaurant: 'Burger Republic', category: 'Burgers' },
    { name: 'Salmon Nigiri Set', description: 'Eight pieces of fresh salmon nigiri.', price: 16.0, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80', restaurant: 'Sakura Sushi', category: 'Sushi' },
    { name: 'California Roll', description: 'Crab, avocado and cucumber rolled in seasoned rice.', price: 11.5, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80', restaurant: 'Sakura Sushi', category: 'Sushi' },
    { name: 'Dragon Roll', description: 'Shrimp tempura topped with eel and avocado.', price: 18.0, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&q=80', restaurant: 'Sakura Sushi', category: 'Sushi' },
    { name: 'Caesar Salad', description: 'Crisp romaine, parmesan, croutons and creamy caesar dressing.', price: 8.5, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80', restaurant: 'Green Garden', category: 'Salads' },
    { name: 'Quinoa Power Bowl', description: 'Quinoa, avocado, chickpeas, greens and tahini dressing.', price: 11.0, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', restaurant: 'Green Garden', category: 'Salads' },
    { name: 'Greek Salad', description: 'Tomatoes, cucumber, olives, feta and red onion.', price: 9.0, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', restaurant: 'Green Garden', category: 'Salads' },
    { name: 'Chocolate Lava Cake', description: 'Warm molten chocolate cake with vanilla ice cream.', price: 7.5, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80', restaurant: 'Sweet Tooth', category: 'Desserts' },
    { name: 'New York Cheesecake', description: 'Rich creamy cheesecake with berry compote.', price: 6.99, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80', restaurant: 'Sweet Tooth', category: 'Desserts' },
    { name: 'Tiramisu', description: 'Classic Italian dessert with espresso and mascarpone.', price: 7.0, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', restaurant: 'Sweet Tooth', category: 'Desserts' },
    { name: 'Beef Tacos', description: 'Three soft tacos with seasoned beef, salsa and cheese.', price: 9.5, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', restaurant: 'Taco Fiesta', category: 'Drinks' },
    { name: 'Chicken Quesadilla', description: 'Grilled tortilla filled with chicken and melted cheese.', price: 10.0, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=600&q=80', restaurant: 'Taco Fiesta', category: 'Drinks' },
    { name: 'Loaded Nachos', description: 'Tortilla chips with cheese, jalapeños, guacamole and sour cream.', price: 8.99, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&q=80', restaurant: 'Taco Fiesta', category: 'Drinks' },
  ];

  for (const f of foods) {
    const restaurantId = restIds[f.restaurant];
    const categoryId = catId(f.category);
    const existing = await prisma.food.findFirst({ where: { name: f.name, restaurantId } });
    const data = {
      name: f.name,
      description: f.description,
      price: f.price,
      image: f.image,
      available: true,
      restaurantId,
      categoryId,
    };
    if (existing) {
      await prisma.food.update({ where: { id: existing.id }, data });
    } else {
      await prisma.food.create({ data });
    }
  }

  console.log('Seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
