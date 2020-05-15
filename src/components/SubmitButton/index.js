import React from "react";

import './style.scss'

const SubmitButton = ({
    isDisabled,
    text
                      }) => {
    return (
        <div className='submitButton'>
            <button
                className='submitButton__button'
                disabled={isDisabled}
                type='submit'
            >
                {text}
            </button>
        </div>
    )
};

export default SubmitButton;
