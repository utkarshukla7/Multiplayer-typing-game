import React from 'react'
import Header from '../header/header.js'

const Layout = (props) => {
    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                {props.children}
            </main>
        </>
    );
};

export default Layout;