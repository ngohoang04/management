import React from 'react';
// React Router DOM
import { 
    createBrowserRouter, 
    RouterProvider, 
    Navigate 
} from 'react-router-dom';

// Layouts
import LayoutDefault from '../Layout/LayoutDefaut';
import AdminLayout from '../pages/Admin/Admin'; // Assuming Admin component acts as a layout/shell

// Public Pages
import Home from '../pages/Home/Home';
import Introduction from '../pages/Introduction/Introduction';
import Service from '../pages/Service/Service';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Error404 from '../pages/Error404/Error404';

// Components
import PrivateRoutes from '../components/PrivateRoutes';

// Admin Feature Components (Import based on your file structure)
import Dashboard from '../pages/Admin/Feature/Dashboard';
import Containers from '../pages/Admin/Feature/Containers';
import CreateContainer from '../pages/Admin/Feature/CreateContainer';
import ContainerDetail from '../pages/Admin/Feature/ContainerDetail';
import Images from '../pages/Admin/Feature/Image'; // Assuming Image.js is the main Images page
import Users from '../pages/Admin/Feature/User';
import QualityControl from '../pages/Admin/Feature/QualityControl';
import Report from '../pages/Admin/Feature/Report';
import Settings from '../pages/Admin/Feature/Setting';
import Suppliers from '../pages/Admin/Feature/Suppliers';
import Transport from '../pages/Admin/Feature/Transport';
import Warehouse from '../pages/Admin/Feature/Warehouse';
import ContainerInbound from '../pages/Admin/Feature/ContainerInbound';
import ContainerOutbound from '../pages/Admin/Feature/ContainerOutbound';
import { Outlet } from 'react-router-dom';
import Customers from '../pages/Admin/Feature/Customers';

const routes = [
    // 1. Public Routes (Sử dụng LayoutDefault)
    {
        element: <LayoutDefault />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'introduction', element: <Introduction /> },
            { path: 'service', element: <Service /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '*', element: <Error404 /> }
        ]
    },

    // 2. Private Admin Routes (Sử dụng PrivateRoutes và AdminLayout)
    {
        path: 'admin',
        
        element: <PrivateRoutes><AdminLayout /></PrivateRoutes>,
        children: [
           
            { index: true, element: <Navigate to="dashboard" replace /> }, 
            
            // Core Features
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'containers', element: <Containers /> },
            { path: 'containers/new', element: <CreateContainer /> },
            { path: 'containers/:id', element: <ContainerDetail /> },
            { path: 'images', element: <Images /> },
            { path: 'users', element: <Users /> },
            { path: 'customers', element: <Customers /> },
            { path: 'quality-control', element: <QualityControl /> },
            { path: 'reports', element: <Report /> },
            { path: 'settings', element: <Settings /> },
            { path: 'suppliers', element: <Suppliers /> },
            { path: 'transport', element: <Transport /> },
            { path: 'warehouse', element: <Warehouse /> },
            { path: 'inbound', element: <ContainerInbound /> },
            { path: 'outbound', element: <ContainerOutbound /> },
            // 404 trong Admin
            { path: '*', element: <Error404 /> }
        ]
    }
];

export default routes;
