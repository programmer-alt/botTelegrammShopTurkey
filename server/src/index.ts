import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import imagesProductsRouter from './routes/imagesRoutes';
import dotenv from 'dotenv';
import path from 'path';

const pathEnvPort = path.join(__dirname, '../.env.server');
dotenv.config({ path: pathEnvPort });
const app = express();


const {PORT} = process.env;
app.use(cors());
app.use(express.json());

// GET /api/products — получение списка продуктов для клиента
app.use('/api/products', productsRouter);
// Регистрация маршрута для статического сервиса изображений продуктов
// Позволяет доступу к файлам в директории src/imagesProducts
app.use('/imagesProducts', imagesProductsRouter);


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
