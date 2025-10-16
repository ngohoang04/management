// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../routes";
import "./Sidebar.css" ; 
function Sidebar({ userRole }) {
    return (
        <div style={{
            width: '220px',
            backgroundColor: '#1f2937',
            color: 'white',
            height: '100vh',
            padding: '20px'
        }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Admin Panel</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {routes
                    .filter(r => r.roles.includes(userRole))
                    .map((route, idx) => (
                        <li key={idx} style={{ marginBottom: '10px' }}>
                            <NavLink
                                to={route.path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none',
                                    color: isActive ? '#60a5fa' : 'white',
                                    padding: '8px 10px',
                                    borderRadius: '6px',
                                    backgroundColor: isActive ? '#374151' : 'transparent'
                                })}
                            >
                                <route.icon />
                                <span>{route.label}</span>
                            </NavLink>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Sidebar;
