import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button } from 'antd';
import { useGetCryptosWithConditionQuery } from '../services/cryptoApi';
import Loader from './Loader';


const Cryptocurrencies = ({ simplified }) => {
    const count = 10;
    const [pageCount, setPageCount] = useState(0);
    const [ searchTerm, setSearchTerm] = useState("");
    const [ searchTermTemp, setSearchTermTemp] = useState("");
    const { data : cryptosList, isFetching } = useGetCryptosWithConditionQuery({count, pageCount, searchTerm});
    const [ cryptos, setCryptos] = useState([]);

    useEffect(() => {
        if(cryptosList?.data?.coins){
            setCryptos(a => [...a, ...cryptosList.data.coins]);
        }
    }, [cryptosList]);

    return (
        <>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' onChange={(e) => { setSearchTermTemp(e.target.value)}}/>
                    <Button onClick={(e) => {setCryptos([]); setPageCount(0); setSearchTerm(searchTermTemp)}} disabled={isFetching}>Search</Button>
                </div>
            )}
            {isFetching && <Loader />}
            <Row gutter={[32,32]} className='crypto-card-container'>
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name}/>} hoverable>
                                <p>Price: {currency?.price ? millify(currency.price) : ""}</p>
                                <p>Market Cap: {currency?.marketCap ? millify(currency.marketCap) : ""}</p>
                                <p>Daily Change: {currency?.change ? millify(currency.change) : ""}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
                {cryptos.length === 0 && (
                    <Col span={24} style={{ marginBottom: 20, textAlign: 'center' }}>
                        No result found.
                    </Col>
                )}
                {!simplified && (
                    <Col span={24} style={{ marginBottom: 20, textAlign: 'center' }}>
                        <Button onClick={(e) => {setPageCount(pageCount + 1)}} disabled={isFetching}>Load More</Button>
                    </Col>
                )}
            </Row>
        </>
    )
}

export default Cryptocurrencies
