import React, { useEffect, useState } from 'react'
import { Col, Row, Select, Table } from 'antd';
import { useGetCryptoExchangesQuery, useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option} = Select;

const Exchanges = () => {

    const { data: currencies, isCurrencyFetching } = useGetCryptosQuery(100);
    const [coinId, setCoinId] = useState('Qwsogvtv82FCd');
    const { data, isFetching } = useGetCryptoExchangesQuery(coinId);
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
          title: 'Rank',
          dataIndex: 'rank',
          key: 'rank',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => <a href={record.coinrankingUrl} target="_blank" rel="noreferrer">{text}</a>,
        },
        {
          title: 'Number Of Markets',
          dataIndex: 'numberOfMarkets',
          key: 'numberOfMarkets',
        },
        {
            title: '24 hour Volume',
            dataIndex: 'twentfourhVolume',
            key: 'twentfourhVolume',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Recommended',
            dataIndex: 'recommended',
            key: 'recommended',
            render: (text, record) => record.recommended ? <CheckOutlined style={{ color: "#008000"}} /> : <CloseOutlined style={{ color: "#FF0000"}} />
        },
        {
            title: 'Verified',
            dataIndex: 'verified',
            key: 'verified',
            render: (text, record) => record.verified ? <CheckOutlined style={{ color: "#008000"}} /> : <CloseOutlined style={{ color: "#FF0000"}} /> 
        },
    ];

    useEffect(() => {
        let temp = [];
        for(let i = 0; i < data?.data?.exchanges.length; i++){
            temp.push(
                {
                    key : data.data.exchanges[i].uuid,
                    rank : data.data.exchanges[i].rank,
                    name : data.data.exchanges[i].name,
                    numberOfMarkets : data.data.exchanges[i].numberOfMarkets,
                    twentfourhVolume : millify(data.data.exchanges[i]['24hVolume']),
                    price : millify(data.data.exchanges[i].btcPrice) + ' ($' + millify(data.data.exchanges[i].price) + ')',
                    recommended : data.data.exchanges[i].recommended,
                    verified : data.data.exchanges[i].verified,
                    coinrankingUrl : data.data.exchanges[i].coinrankingUrl,
                }
            );
        }
        setDataSource(temp);
    }, [data]);

    if(isCurrencyFetching || isFetching) return 'Loading.....'; //

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Select 
                        showSearch 
                        className='select-news' 
                        placeholder="Select a Currency" 
                        optionFilterProp='children' 
                        onChange={(value) => setCoinId(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        defaultValue={coinId}
                    >
                        {currencies?.data?.coins.map((coin) => <Option value={coin.uuid} key={coin.uuid} >{coin.name}</Option>)}
                    </Select>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default Exchanges
