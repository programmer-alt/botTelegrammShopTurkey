import React from 'react';
import UploadComponent from './components/UploadComponent';
import './css/uploadComponent.css';
import { Provider } from 'react-redux';
import store from './store/store';
import ProductList from './components/ProductList';



function App() {
  return (
    <Provider store={store}>
    <div className="app-container">
      <UploadComponent/>
      <ProductList /> 
    </div>
    </Provider>
  );
}

export default App;