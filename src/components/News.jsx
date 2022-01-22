import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Button, Tooltip } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Option} = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const [pageCount, setPageCount] = useState(0);
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 6 : 12, pageCount});
    const { data: currencies } = useGetCryptosQuery(100);

    const [allNews, setAllNews] = useState([]);

    useEffect(() => {
        if(cryptoNews?.value){
            setAllNews(old => [...old, ...cryptoNews.value]);
        }
    }, [cryptoNews]);



    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Select 
                        showSearch 
                        className='select-news' 
                        placeholder="Select a Crypto" 
                        optionFilterProp='children' 
                        onChange={(value) => {setAllNews([]); setPageCount(0); setNewsCategory(value)}}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency" key="default">Cryptocurrency</Option>
                        {currencies?.data?.coins.map((coin) => <Option value={coin.name} key={coin.uuid}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {allNews.map((news, i) => (
                <Col xs={24} lg={8} key={i}>
                    <Card hoverable className='news-card' title={(<Tooltip title={news.name}>{news.name}</Tooltip>)} >
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <Row justify='space-between' gutter={[10,0]}>
                                <Col span={18}>
                                    <Text style={{ textAlign: 'justify' }}>
                                        {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                    </Text>
                                </Col>
                                <Col span={6}>
                                    <img style={{ width: '100%'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 15 }}>
                                <Col span={18}>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news provider"/>
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </Col>
                                <Col span={6} style={{ textAlign: "right" }}>
                                    <small><Text>{moment(news.datePublished).fromNow()}</Text></small>
                                </Col>
                            </Row>
                        </a>
                    </Card>
                </Col>
            ))}
            {isFetching && <Loader />}
            {!simplified && (
                <Col span={24} style={{ marginBottom: 20, textAlign: 'center' }}>
                    <Button onClick={(e) => {setPageCount(pageCount + 1)}} disabled={isFetching}>Load More</Button>
                </Col>
            )}
        </Row>
    )
}

export default News
