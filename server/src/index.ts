import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/products — получение списка продуктов для клиента
app.use('/api/products', productsRouter);
// отдача статики из папки imagesProducts
app.use('/imagesProducts', express.static(path.join(__dirname, '../../src/imagesProducts')));


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});