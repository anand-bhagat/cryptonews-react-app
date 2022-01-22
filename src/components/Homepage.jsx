import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '.';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    return (
        <>
            {isFetching && <Loader />}
            {!isFetching && <>
                <Title level={2} className='heading'>Global Crypto Stats</Title>
                <Row  gutter={[15,15]}>
                    <Col xs={12} sm={7} lg={5} style={{ margin: 'auto' }}>
                        <Card>
                            <Statistic title="Total Crypotocurrencies" value={globalStats?.total}/>
                        </Card>
                    </Col>
                    <Col xs={12} sm={7} lg={4} style={{ margin: 'auto' }}>
                        <Card>
                            <Statistic title="Total Exchanges" value={globalStats?.totalExchanges ? millify(globalStats.totalExchanges) : ''}/>
                        </Card>
                    </Col>
                    <Col xs={12} sm={7} lg={4} style={{ margin: 'auto' }}>
                        <Card>
                            <Statistic title="Total Market Cap" value={globalStats?.totalMarketCap ? millify(globalStats.totalMarketCap) : ''}/>
                        </Card>
                    </Col>
                    <Col xs={12} sm={7} lg={4} style={{ margin: 'auto' }}>
                        <Card>
                            <Statistic title="Total 24h Volume" value={globalStats?.total24hVolume ? millify(globalStats.total24hVolume) : ''}/>
                        </Card>
                    </Col>
                    <Col xs={12} sm={7} lg={4} style={{ margin: 'auto' }}>
                        <Card>
                            <Statistic title="Total Markets" value={globalStats?.totalMarkets ? millify(globalStats.totalMarkets) : ''}/>
                        </Card>
                    </Col>
                </Row>
            </>}
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Lastest Crypto News</Title>
                <Title level={3} className='show-more'><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified/>

            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            
        </>
    )
}

export default Homepage
