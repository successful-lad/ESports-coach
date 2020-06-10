import React from "react";

import './style.scss';

const CustomTooltip = ({description, label, data}) => {
    return (
        <div className='customTooltip'>
            <div>{label !== undefined && description[`${label[1] - 1}`]}</div>
            <div className='customTooltip__elo'>{label !== undefined && data[0].elo && `ELO: ${data[`${label[1] - 1}`].elo}`}</div>
            <div className='customTooltip__score'>{label !== undefined && `${data[`${label[1] - 1}`].isScore ? 'Счет' : 'Время'}: ${
                data[`${label[1] - 1}`].isScore ? data[`${label[1] - 1}`].score * 10: data[`${label[1] - 1}`].score.toFixed(3) }`}</div>
        </div>
    )
};
export default CustomTooltip;