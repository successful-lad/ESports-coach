import React from "react";

import './style.scss';

const CustomTooltip = ({description, label, data}) => {
    console.log(data);
    return (
        <div className='customTooltip'>
            <div>{label !== undefined && description[`${label[1] - 1}`]}</div>
            <div className='customTooltip__elo'>{label !== undefined && data[0].elo && `elo: ${data[`${label[1] - 1}`].elo}`}</div>
            <div className='customTooltip__score'>{label !== undefined && `${data[`${label[1] - 1}`].isScore ? 'счет' : 'время'}: ${data[`${label[1] - 1}`].score}`}</div>
        </div>
    )
};
export default CustomTooltip;