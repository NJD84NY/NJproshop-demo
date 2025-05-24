import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
// import Stripe from 'stripe';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

connectDB();

const app = express();

// const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET);

// user Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// app.post('/checkout', async (req, res) => {
//   const { orderItems, itemsPrice } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: { itemsPrice },
//           quantity: orderItems.quantity,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/canceled',
//     });

//     return res.json(session);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get('/success', (req, res) => {
//   return res.send('Success');
// });

// app.get('/canceled', (req, res) => {
//   return res.send('Canceled');
// });

const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any route that is not contain api will be redirected to index.html
  app.get(/'*'/, (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
