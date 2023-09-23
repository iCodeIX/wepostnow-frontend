import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>


);

