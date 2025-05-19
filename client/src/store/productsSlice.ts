import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Импортируем необходимые функции и типы из библиотеки @reduxjs/toolkit

import { Product } from '../models/product';
// Импортируем интерфейс Product из файла моделей

import { fetchProducts } from '../services/productService';
// Импортируем функцию fetchProducts из сервиса для получения продуктов

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
// Определяем интерфейс состояния продуктов, включающий массив продуктов, статус загрузки и ошибку

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};
// Устанавливаем начальное состояние для продуктов, где массив продуктов пуст, загрузка не активна, и ошибки нет

// Асинхронный thunk для загрузки продуктов с сервера
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    try {
        return await fetchProducts();
    } catch (error: unknown ) {
      if (error instanceof Error){
        throw new Error(` Ошибка загрузки продуктов: ${  error.message}`);
      } else {
        throw new Error(' Ошибка загрузки продуктов: Неизвестная ошибка');
      }
    }
  },
);


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Обрабатываем состояние ожидания загрузки продуктов, устанавливая загрузку в true и сбрасывая ошибку

      .addCase(loadProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      // Обрабатываем успешную загрузку продуктов, обновляя массив продуктов и отключая загрузку

      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки продуктов';
      });
      // Обрабатываем ошибку загрузки продуктов, отключая загрузку и устанавливая сообщение об ошибке
  },
});

export default productsSlice.reducer;
// Экспортируем редьюсер среза продуктов по умолчанию
