import React from "react";

import './style.scss';

const CustomTooltip = ({description, label}) => {
    return (
        <div className='customTooltip'>
            {label !== undefined && description[`${label[1] - 1}`]}
        </div>
    )
};
export default CustomTooltip;