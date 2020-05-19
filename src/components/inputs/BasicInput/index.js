import React from "react";

import './style.scss';

const BasicInput = ({
                        placeholder,
                        input,
                        id,
                        label,
                    }) => {
    return (
      /*Todo добавить валидацию на поля ввода форм*/
        <div
            className='basicInput'
        >
            <label
                className='basicInput__label'
                htmlFor={id}>
                {label}
            </label>
            <input
              placeholder={placeholder}
              type="text"
              id={id}
              className='basicInput__field'
              {...input}
            />
        </div>
    )
};

export default BasicInput;
