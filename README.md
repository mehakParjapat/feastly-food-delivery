# Feastly — Online Food Ordering Website

A complete customer-facing food ordering web app built with **Next.js 15 (App Router)**, **React**, **Tailwind CSS**, **MySQL**, **Prisma ORM**, and **JWT authentication**. Clean MVC architecture (controllers → services → repositories → validators → middlewares).

## Folder Structure

```
prisma/
  schema.prisma      Prisma models (User, Restaurant, Category, Food, Order, OrderItem)
  seed.js            Sample restaurants, categories, foods, demo user
src/
  app/               Next.js App Router pages + API routes
    api/             REST endpoints (auth, restaurants, foods, categories, orders)
  components/        Navbar, Footer, RestaurantCard, FoodCard, CartSummary, OrderTracker...
  context/           AuthContext (JWT), CartContext (localStorage cart)
  controllers/       Request handlers (thin)
  services/          Business logic
  repositories/      Prisma data access
  validators/        Zod DTO validation
  middlewares/       JWT auth guard
  lib/               prisma client, jwt, hash helpers
  utils/             apiResponse envelope, error handler
```

## Installation

```bash
npm install
npm run prisma:generate
npm run seed
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `NEXT_PUBLIC_API_URL` | API base path (default `api`) |

## Demo Account

- Email: `demo@feastly.app`
- Password: `password123`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `api/auth/register` | – | Register new customer |
| POST | `api/auth/login` | – | Login, returns JWT |
| GET | `api/auth/profile` | ✓ | Get current profile |
| PUT | `api/auth/profile` | ✓ | Update profile |
| POST | `api/auth/change-password` | ✓ | Change password |
| GET | `api/restaurants` | – | List (search/filter/pagination) |
| GET | `api/restaurants/:id` | – | Restaurant + menu |
| GET | `api/cuisines` | – | Distinct cuisines |
| GET | `api/foods/:id` | – | Food details |
| GET | `api/foods/popular` | – | Popular dishes |
| GET | `api/categories` | – | Categories |
| GET | `api/orders` | ✓ | Order history |
| POST | `api/orders` | ✓ | Place order |
| GET | `api/orders/:id` | ✓ | Order details + tracking |
```
