import React, { useState } from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    SmartBiz Connect
                </div>

                <nav className={`nav-links ${menuOpen ? "hidden" : ""}`}>
                    <NavLink to='/'>Домой</NavLink>
                    <NavLink to='/hr'>Панел HR</NavLink>
                    <NavLink to='/chatbot'>Чат бот</NavLink>
                </nav>

                <div className={`contact ${menuOpen ? "hidden" : ""}`}>
                    <GoogleAuth/>
                </div>

                <button className={`menu-btn ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <NavLink to='/' onClick={toggleMenu}>Домой</NavLink>
                <NavLink to='/hr' onClick={toggleMenu}>Панел HR</NavLink>
                <NavLink to='/chatbot' onClick={toggleMenu}>Чат бот</NavLink>
                <GoogleAuth/>
            </div>
        </header>
    );
};

export default Header;
