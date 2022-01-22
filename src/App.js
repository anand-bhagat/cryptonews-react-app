import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Typography, Menu, Avatar, Button, Drawer, Row, Col, Space } from 'antd';
import { Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News} from './components';
import './App.css';
import 'antd/dist/antd.min.css';
import icon from './images/cryptocurrency.png';
import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { Footer } from 'antd/lib/layout/layout';


const { Header, Content, Sider } = Layout;

const TopicMenu = () => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location]);
    
    return (
        <Menu mode="inline" selectedKeys={[selectedKey]} theme="dark">
            <Menu.Item icon={<HomeOutlined />} key="/" > 
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />} key="/news" >
                <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />} key="/cryptocurrencies" >
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />} key="/exchanges" >
                <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
        </Menu>
    );
  }

const App = () => {
    const [visible, setVisible] = useState(false);

    return (
        <Layout>
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Row justify="space-between">
                    <Col xs={18} md={12}>
                        <Row>
                            <Col xs={6} lg={3}>
                                <Avatar src={icon} size="large" />
                            </Col>
                            <Col span={18} style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography.Title level={2} style={{ margin: 0, color: "white" }}>
                                    <Link to="/" style={{ color: "white" }}>CryptoNews</Link>
                                </Typography.Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                        <Button
                            className="navigationTrigger"
                            type="primary"
                            icon={<MenuOutlined />}
                            onClick={() => setVisible(true)}
                        />
                        <Drawer
                            title={null}
                            closable={false}
                            placement="left"
                            onClick={() => setVisible(false)}
                            onClose={() => setVisible(false)}
                            visible={visible}
                            bodyStyle={{ padding: 0 }}
                            drawerStyle={{ backgroundColor: '#001529' }}
                            headerStyle={{ backgroundColor: '#001529', color:'#FFFFFF', border: 'none' }}
                            theme="dark"
                        > 
                            <TopicMenu />
                        </Drawer>
                    </Col>
                </Row>
            </Header>
            <Content style={{  marginTop: 64, minHeight: 'calc(100vh - 190px)' }}>
                <Layout hasSider>
                    <Sider width={200}  style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 64,
                        bottom: 0,
                    }} breakpoint="md" collapsedWidth="0" trigger={null}> 
                        <TopicMenu />
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <Routes>
                                <Route exact path="/" element={<Homepage />} />
                                <Route exact path="/news" element={<News />} />
                                <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
                                <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
                                <Route exact path="/exchanges" element={<Exchanges />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Content>
            <Footer className='footer' style={{ backgroundColor: '#001529', marginTop: 20}}>
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
            </Footer>
        </Layout> 
    )
}

export default App;
