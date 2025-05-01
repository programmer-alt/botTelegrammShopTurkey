import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {AppDispatch} from '../store/store';
import { loadProducts } from '../store/productsSlice';

// Основной компонент

const UploadComponent = () => {
  // Состояние для управления выбранным файлом, загрузкой и сообщением
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Используем useDispatch для доступа к диспетчеру Redux
  const dispatch = useDispatch<AppDispatch>();
  // Функция для обработки загрузки
  const handleUpload = async () => {
    // Проверка, выбран ли файл
    if (!file) {
      setMessage(" Выберете файл");
      return;
    }
    // Установка состояния загрузки и очистка предыдущего сообщения
    setIsUploading(true);
    setMessage("");
    try {
      // Создание объекта FormData для отправки файлов
      const formData = new FormData();
      // Добавляем файл в объект FormData под именем 'file' для последующей отправки на сервер
      formData.append("file", file);

      // Отправка запроса на сервер
      const response = await axios.post("api/products/upload", formData, {
        // Устанавливаем заголовок 'Content-Type' как 'multipart/form-data', чтобы указать серверу, что данные отправляются в формате, подходящем для загрузки файлов
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Обработка успешной загрузки
      setMessage(response.data.message || "Товары успешно загружены!");
      dispatch(loadProducts()); // Обновление списка товаров в Redux с помощью dispatch
    } catch (error) {
      setMessage(" Ошибка при загрузке файла");
      console.error(" Ошибка загрузки", error);
    } finally {
      // Очистка состояния загрузки после завершения операции
      setIsUploading(false);
    }
  };
  return (
    <div className='upload-container'>
        <h2 className="upload-title" > Загрузка товаров</h2>
        {/* Контейнер для ввода файла */}
        <div className="upload-input-container">
            <input 
            type="file"
            placeholder="Выберите файл"
            accept=".xlsx, .csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={upLoading}
            className="upload-input"
            />
        </div>
        {/* Кнопка загрузки */}
        <button 
      onClick={handleUpload}
      disabled={upLoading}
      className={`upload-button ${upLoading ? 'loading' : ''}`}
    >
      {upLoading ? 'Загрузка...' : 'Загрузить товары'}
    </button>
    <p className= {`upload-message ${message.includes(' Ошибка ') ? 'error' : 'success'}`}>{message}</p>
    </div>
  );
};
export default UploadComponent;