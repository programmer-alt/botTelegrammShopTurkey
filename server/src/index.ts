import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/products — получение списка продуктов для клиента
app.use('/api/products', productsRouter);


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});