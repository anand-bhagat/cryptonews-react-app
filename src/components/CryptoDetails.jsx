import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Card } from 'antd';
import { DollarCircleOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
// import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    
    const { data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const { data: cryptoHistory, isHistoryFetching} = useGetCryptoHistoryQuery({coinId, timePeriod});
    const cryptoDetails = data?.data?.coin;

    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails ? millify(cryptoDetails['24hVolume']) : ''}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price ? millify(cryptoDetails.allTimeHigh.price) : ''}`, icon: <TrophyOutlined /> },
    ];

    // const genericStats = [
    //     { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    //     { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    //     { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    //     { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    //     { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
    // ];

    return (
        <>
            {(isFetching || isHistoryFetching) && <Loader />}
            
            <div className='coin-heading-container' style={{ marginBottom: 20 }}>
                <Title level={2} className='coin-name'>
                    {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
                </Title>
                <p style={{ textAlign: 'center' }}>
                    {cryptoDetails?.name} live price in US dollars.
                    View value statistics, market cap and supply.
                </p>
            </div>
            <Row>
                <Col xs={24} style={{ textAlign: 'center' }}>
                    <Title level={2} className='chart-title'>{cryptoDetails?.name} Price Chart</Title>
                </Col>
                <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
                    <Title level={5} className='price-change'>Price Change: {cryptoHistory?.data?.change}%</Title>
                </Col>
                <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
                    <Title level={5} className='current-price'>Current {cryptoDetails?.name} Price: $ {cryptoDetails?.price && millify(cryptoDetails.price)}</Title>
                </Col>
                <Col xs={24} style={{ textAlign: 'center' }}>
                    <Select 
                        defaultValue="7d" 
                        className='select-timeperiod' 
                        placeholder="Select Time Period"
                        onChange={(value) => setTimePeriod(value)}
                    >
                        {time.map((date) => <Option key={date} value={date}>{date}</Option>)}
                    </Select>
                </Col>
            </Row>
            
            {cryptoHistory && (<LineChart cryptoHistory={cryptoHistory} />)}
            
            <Row style={{ marginTop: 20 }}>
                <Col xs={24} lg={15} style={{ textAlign : 'justify' }}>
                    <Title level={3} className='coin-details-heading'>
                            What is {cryptoDetails?.name}?
                    </Title>
                    {cryptoDetails?.description ? HTMLReactParser(cryptoDetails?.description) : ''}
                </Col>
                <Col xs={24} lg={9} >
                    <Card style={{ margin: 20 }}>
                        <Title level={3} className='coin-detailes-heading'>{cryptoDetails?.name} Value Statistics</Title>
                        <p>
                            An overview showing the stats of {cryptoDetails?.name}
                        </p>
                        {stats.map(({icon, title, value}, i) => (
                            <Col className='coin-stats' key={i}>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))}
                    </Card>

                    <Card style={{ margin: 20 }}>
                        <Title level={3} >
                            {cryptoDetails?.name} Links
                        </Title>
                        {cryptoDetails?.links.map((link) => (
                            <Row className='coin-link' key={link.name}>
                                <Title level={5} className='link-name'>{link.type}</Title>
                                <a href={link.url} target="_blank" rel='noreferrer'>
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                    </Card>
                   
                </Col>
            </Row>
            {/* 
                 <Row className='coin-desc'>
                    <Col>
                        <Title level={3} className='coin-detailes-heading'>Other Statistics</Title>
                        <p>
                            An overview showing the stats of all Cryptocurrencies
                        </p>
                    </Col>
                    {genericStats.map(({icon, title, value}, i) => (
                        <Col className='coin-stats' key={i}>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))} 
                </Row>
            */}
        </>
    )
}

export default CryptoDetails;



