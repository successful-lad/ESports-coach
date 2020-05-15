import React from "react";
import { forms } from '../../components';

import './style.scss';

const AuthorizationScreen = () => {

    const { AuthorizationForm } = forms;

    return (
        <div className='authorizationScreen'>
            <AuthorizationForm />
        </div>
    )
};

export default AuthorizationScreen;
