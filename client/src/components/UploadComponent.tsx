import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../store/store';
import { loadProducts } from '../store/productsSlice';
import { uploadProducts } from '../services/productService';

const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [upLoading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleUpload = async () => {
    if (!file) {
      setMessage("Выберете файл");
      return;
    }

    setIsUploading(true);
    setMessage("");
    
    try {
      await uploadProducts(file);
      setMessage("Товары успешно загружены!");
      dispatch(loadProducts());
    } catch (error) {
      setMessage("Ошибка при загрузке файла");
      console.error("Ошибка загрузки", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='upload-container'>
      <h2 className="upload-title">Загрузка товаров</h2>
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
      <button 
        onClick={handleUpload}
        disabled={upLoading}
        className={`upload-button ${upLoading ? 'loading' : ''}`}
      >
        {upLoading ? 'Загрузка...' : 'Загрузить товары'}
      </button>
      <p className={`upload-message ${message.includes('Ошибка') ? 'error' : 'success'}`}>
        {message}
      </p>
    </div>
  );
};

export default UploadComponent;