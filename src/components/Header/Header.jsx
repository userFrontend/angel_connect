import React, { useState } from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    KS
                </div>

                <nav className={`nav-links ${menuOpen ? "hidden" : ""}`}>
                    <NavLink to='/'>О холдинге</NavLink>
                    <NavLink to='/'>Продукция</NavLink>
                    <NavLink to='/'>Контакты</NavLink>
                </nav>

                <div className={`contact ${menuOpen ? "hidden" : ""}`}>
                    <span className="search-icon">📞</span>
                    <Link to='tel:+998333332800' className="phone">33 333 28 00</Link>
                </div>

                <button className={`menu-btn ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <NavLink to='/' onClick={toggleMenu}>О холдинге</NavLink>
                <NavLink to='/' onClick={toggleMenu}>Продукция</NavLink>
                <NavLink to='/' onClick={toggleMenu}>Контакты</NavLink>
                <Link to='tel:+998333332800' className="phone">33 333 28 00</Link>
            </div>
        </header>
    );
};

export default Header;
