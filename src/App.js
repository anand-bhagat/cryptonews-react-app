import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News} from './components';
import './App.css';
import 'antd/dist/antd.min.css';

const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>      
            <div className='main'>
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" element={<Homepage />} />
                            <Route exact path="/news" element={<News />} />
                            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
                            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
                            <Route exact path="/exchanges" element={<Exchanges />} />
                        </Routes>
                    </div>
                </Layout>
                <div className='footer'>
                    <Typography.Title level={5} style={{ color: 'white', 'textAlign': 'center' }}>
                        CryptoNews <br /> 
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/news">News</Link>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        <Link to="/exchanges">Exchanges</Link>
                    </Space>
                </div>      
            </div>    
        </div>
    )
}

export default App;
