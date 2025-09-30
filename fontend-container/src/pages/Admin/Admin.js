import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom'; // CORRECTED: Imported Outlet instead of Router, Routes, Route
import './Admin.css';

// Components
import Header from './Feature/Header';
import Sidebar from './Feature/Sidebar';
import Toast from './Feature/Toast';
import Dashboard from './Feature/Dashboard';
import ContainerInbound from './Feature/ContainerInbound';
import ContainerOutbound from './Feature/ContainerOutbound';
import QualityControl from './Feature/QualityControl';
import Transport from './Feature/Transport';
import Warehouse from './Feature/Warehouse';
import Customers from './Feature/Customers';
import Suppliers from './Feature/Suppliers';
import Reports from './Feature/Report';
import Settings from './Feature/Setting';

function Admin() {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Nguyễn Văn Admin',
    email: 'admin@warehouse.com',
    role: 'admin', 
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    department: 'Quản lý kho'
  });

  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleLogout = () => {
    addToast('Đăng xuất thành công', 'success');
    console.log('Logging out...');
  };

  return (
    <div className="app">
      <Header 
        currentUser={currentUser}n
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
       
      />
      
      <div className="app-body">
        <Sidebar 
          currentUser={currentUser}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        
          <Outlet /> 
        </main>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default Admin;

