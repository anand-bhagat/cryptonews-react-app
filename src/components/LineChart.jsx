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
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );


const LineChart = ({ cryptoHistory}) => {
    const cryptoPrice = [];
    const cryptoTimestamp = [];


    for(let i = 0; i < cryptoHistory?.data?.history?.length; i++){
        cryptoPrice.push(cryptoHistory.data.history[i].price);
        cryptoTimestamp.push(moment.unix(cryptoHistory.data.history[i].timestamp).format('D MMM Y'));
    }

    const options = {
        responsive: true,
        maintainAspectRatio : false,
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
        <div className='priceChangeChart'>
            <Line data={data} options={options} height="100%"/>
        </div>
    )
}

export default LineChart
