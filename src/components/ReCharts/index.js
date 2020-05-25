import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";


import './style.scss';

const ReCharts = ({ gameData, title }) => (
    <div>
        <h2>{title}</h2>
        <LineChart
            width={600}
            height={300}
            data={gameData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    </div>
)

export default ReCharts;