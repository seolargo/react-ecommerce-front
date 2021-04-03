import React from 'react';
import { Link } from "react-router-dom";

const AdminNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                    Admin Dashboard
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/product" className="nav-link">
                    Create Product
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/category" className="nav-link">
                    Create Category
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/sub" className="nav-link">
                    Create Sub-Category
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/user/password" className="nav-link">
                    Password Update
                </Link>
            </li>

        </ul>
    </nav>
)

export default AdminNav;