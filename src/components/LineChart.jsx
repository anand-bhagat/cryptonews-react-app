import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );


const { Title } = Typography;
const LineChart = ({ cryptoHistory, currentPrice, cryptoName}) => {
    const cryptoPrice = [];
    const cryptoTimestamp = [];


    for(let i = 0; i < cryptoHistory?.data?.history?.length; i++){
        cryptoPrice.push(cryptoHistory.data.history[i].price);
        cryptoTimestamp.push(moment.unix(cryptoHistory.data.history[i].timestamp).format('D MMM Y'));
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };
      
      
    const data = {
        labels: cryptoTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: cryptoPrice,
                borderColor: '#0071bd',
                backgroundColor: '#0071bd',
            }
        ],
    };

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{cryptoName} Price Chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{cryptoHistory?.data?.change}%</Title>
                    <Title level={5} className='current-price'>Current {cryptoName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </>
    )
}

export default LineChart
