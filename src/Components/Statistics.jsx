import { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://67743f63922222414819014c.mockapi.io/api/v1/charts')
        .then((response) => response.json())
        .then((data) => setData(data));
    }, []);

    const barData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: 'Sales',
                data: data.map((item) => item.sales),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Revenue',
                data: data.map((item) => item.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const pieData = {
        labels: ['Sales', 'Revenue', 'Profit', 'Expenses'],
        datasets: [
            {
                data: [
                    data.reduce((acc, item) => acc + item.sales, 0),
                    data.reduce((acc, item) => acc + item.revenue, 0),
                    data.reduce((acc, item) => acc + item.profit, 0),
                    data.reduce((acc, item) => acc + item.expenses, 0),
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    };

    return (
        <div>
            <h2 className="text-2xl mb-6 font-semibold">Statistics</h2>
            <div className="mb-10">
                <Bar data={barData} />
            </div>
            <div className='h-[80vh]'>
                <Pie data={pieData}  />
            </div>
        </div>
    );
}

export default Statistics;
