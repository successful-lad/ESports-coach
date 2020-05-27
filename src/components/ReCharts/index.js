import React from "react";
import CustomTooltip from "../CustomTooltip";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

const ReCharts = ({ gameData, title }) => {

   const descArr = gameData[0]?.description && [...gameData].map(item => item?.description);

   return (
        <>
            {gameData.length > 0 &&
            <div>
                <h2>{title}</h2>
                <LineChart
                    width={600}
                    height={300}
                    data={gameData}
                    margin={{top: 5, right: 20, bottom: 5, left: 0}}
                >
                    <Line type="monotone" dataKey="score" stroke="#575969"/>
                    {gameData.filter( item => item.elo).length > 0 &&
                        <Line type="monotone" dataKey="elo" stroke="#d98a23"/>
                    }
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip content={CustomTooltip} description={descArr} data={gameData}/>
                    <Legend />
                </LineChart>
            </div>
            }
        </>
    )
}
export default ReCharts;