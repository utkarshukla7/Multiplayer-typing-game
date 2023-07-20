import React from 'react'
import Header from '../header/header.js'
import "./layout.css"
const Layout = (props) => {
    return (
        <div className='whole-page'>
            <Header />
            <main className='main-container'>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;