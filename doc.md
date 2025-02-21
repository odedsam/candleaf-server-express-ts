# Why Use /api Prefix?

✅ Best Practice – It separates frontend routes (/login) from API routes (/api/auth/login).
✅ Scalable – If later you build a mobile app, you can serve the API at /api without conflicts.
✅ Clear Structure – Clients instantly know API calls should be prefixed with /api.

# 📌 API Endpoints Documentation

## ** Authentication Routes**

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login`  | Login user          |

## ** 👤 User Routes**

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| `GET`  | `/api/users/profile` | Get user profile (JWT required)    |
| `PUT`  | `/api/users/profile` | Update user profile (JWT required) |

## ** 🛒 Cart Routes**

| Method   | Endpoint           | Description                          |
| -------- | ------------------ | ------------------------------------ |
| `GET`    | `/api/cart`        | Get user cart (JWT required)         |
| `POST`   | `/api/cart/add`    | Add item to cart (JWT required)      |
| `DELETE` | `/api/cart/remove` | Remove item from cart (JWT required) |

## ** 📦 Order Routes**

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| `GET`  | `/api/orders` | Get user orders (JWT required) |

## **🛍️ Product Routes**

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| `GET`  | `/api/products`     | Get all products             |
| `GET`  | `/api/products/:id` | Get a specific product by ID |

## ** 👍 Wishlist Routes **

| Method   | Endpoint               | Description                              |
| -------- | ---------------------- | ---------------------------------------- |
| `GET`    | `/api/wishlist`        | Get user wishlist (JWT required)         |
| `POST`   | `/api/wishlist/add`    | Add item to wishlist (JWT required)      |
| `DELETE` | `/api/wishlist/remove` | Remove item from wishlist (JWT required) |

---

# ** 🔐 Notes:**

- `JWT required` means you need to send an **Authorization** header with a valid token:
  ```
  Authorization: Bearer your_jwt_token
  ```
- Use **Postman** or **cURL** to test API calls.
- All request/response data should be in **JSON format**.

  **Your API is now fully documented!**
