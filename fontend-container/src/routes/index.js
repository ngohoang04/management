import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutDefault from '../Layout/LayoutDefaut';
import Client from '../pages/Client/Client';
import Introduction from '../pages/Introduction/Introduction';
import Service from '../pages/Service/Service';
import Login from '../pages/Login/Login';
import Error404 from '../pages/Error404/Error404';
import Home from '../pages/Home/Home'; 
import PrivateRoutes from '../components/PrivateRoutes';    


const routes = [
    {
        path: '/',
        element: <LayoutDefault/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/client',
                element: <Client />
            },
            {
                path: '/introduction',
                element: <Introduction />
            },
            {
                path: '/service',
                element: <Service/>
            },
            {
                path: '/login',
                element:  
                <div className="login-page-container">
                <Login />
                </div>
            },
            {
                path: '*',
                element: <Error404/>
            },
        ]
    }, 
    {
        element : <PrivateRoutes/>,
        children : [
            {
                
            }
        ]
    }
];

export default routes;