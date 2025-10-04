// src/routes/index.js
import React from "react";
import LayoutDefault from "../Layout/LayoutDefaut";
import LayoutPrivate from "../Layout/LayoutPrivate";

import Home from "../pages/Home/Home";
import Client from "../pages/Client/Client";
import Introduction from "../pages/Introduction/Introduction";
import Service from "../pages/Service/Service";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error404 from "../pages/Error404/Error404";
import Dashboard from "../pages/Dashboard/Dashboard"; // ví dụ thêm
import PrivateRoutes from "../components/PrivateRoutes";

const routes = [
  // --- Layout cho Public ---
  {
    element: <LayoutDefault />,
    children: [
      { path: "/", element: <Home /> },
      { path: "introduction", element: <Introduction /> },
      { path: "service", element: <Service /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Error404 /> },
    ],
  },

  // --- Layout cho Private ---
  {
    element: <PrivateRoutes />, // bảo vệ toàn bộ nhánh private
    children: [
      {
        element: <LayoutPrivate />, // layout riêng cho user đã đăng nhập
        children: [
          { path: "client", element: <Client /> },
          { path: "dashboard", element: <Dashboard /> },
          // thêm private pages ở đây
        ],
      },
    ],
  },
];

export default routes;
