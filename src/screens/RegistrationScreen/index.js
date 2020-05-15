import React from "react";
import { forms } from '../../components';

import './style.scss';

const RegistrationScreen = () => {

    const { RegistrationForm } = forms;

    return (
        <div className='registrationScreen'>
            <RegistrationForm />
        </div>
    )
};

export default RegistrationScreen;
