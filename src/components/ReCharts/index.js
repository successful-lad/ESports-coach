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
    console.log(gameData.filter(item => item.isScore).length > 0)
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
                    <Line
                      type="monotone"
                      dataKey='score'
                      name={
                      gameData.filter( item => item.isScore).length > 0 ? 'Счет' : 'Время'
                      }
                      stroke="#575969"/>
                    {gameData.filter( item => item.elo).length > 0 &&
                        <Line type="monotone" dataKey='elo' name="ELO" stroke="#d98a23"/>
                    }
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="name" />
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