// src/index.js (or src/main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from 'react-redux';
import "./index.css";
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import AdminPanel from './Components/Admin/Admin';
import { store ,persistor} from './Redux/Store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import SignIN from './Components/SignIN/SignIN';
import SignUP from './Components/SignUP/SignUP';
import UserProfile from './Components/UserProfile/userProfile';
import Restricted from './Components/Restricted/Restricted';
import Checkout from './Components/CheckOut/CheckOut';
import OrderStatus from './Components/OrderStatus/OrderStatus';
import OrderAdmin from './Components/Admin/OerderAdmin';
import AboutUs from './Components/AboutUs/Aboutus';
import GetOffers from './Components/GetOffers/GetOffers';
import Services from './Components/Service/Services';
import Contactus from './Components/ContactUs/Contactus';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'admin',
        element: <AdminPanel />
      },
      {
        path: 'sign-in',
        element: <SignIN />
      },
      {
        path: 'sign-up',
        element: <SignUP />
      },
      {
        path: 'userprofile',
        element: <UserProfile />
      },
      {
        path: 'restricted',
        element: <Restricted />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'orderstatus',
        element: <OrderStatus />
      },
      {
        path: 'adminorderpanel',
        element: <OrderAdmin />
      },
      {
        path: 'aboutus',
        element: <AboutUs />
      },
      {
        path: 'getoffers',
        element: <GetOffers />
      },
      {
        path: 'service',
        element: <Services />
      },
      {
        path: 'contactus',
        element: <Contactus />
      },
     
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
