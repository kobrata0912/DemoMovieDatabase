import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MyRouter from './router';
import PageLayout from './components/page-layout'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <PageLayout>
          <MyRouter />
        </PageLayout>
      </App>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);