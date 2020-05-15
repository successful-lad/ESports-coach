import React from "react";
import { Form, Field } from 'react-final-form'
import { NavLink } from 'react-router-dom';
import BasicInput from "../../inputs/BasicInput";
import SubmitButton from "../../SubmitButton";
import routes from "../../../consts/routes";
import { history } from '../../../configureStore'

import './style.scss';

const AuthorizationForm = () => {

    const onSubmit = (value) => {
        console.log(value)
        history.push(routes.getMainScreen())
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={
              ({
                 handleSubmit,
                 input,
                 submitting
              }) => (
                <div
                  className='authorizationForm'
                >
                  <div className='authorizationForm__title'>
                    Авторизация пользователя
                  </div>
                  <form
                    onSubmit={handleSubmit}>
                    <Field
                      name='userName'
                      component={BasicInput}
                      placeholder='enter login'
                      id='login'
                      {...input}
                      label=' Введите логин'
                    />
                    <Field
                      name='password'
                      component={BasicInput}
                      {...input}
                      id='password'
                      placeholder='enter password'
                      label='Введите пароль'
                    />
                    <SubmitButton
                      text='Войти'
                      isDisabled={submitting}
                    />
                  </form>
                  <div className='authorizationForm__registrationBar'>
                    <NavLink
                      className='authorizationForm__registrationBar__link'
                      to={routes.getRegistration()
                      }>
                      Вы уже зарегестрированы?
                    </NavLink>
                  </div>
                </div>
        )} />
    )
};

export default AuthorizationForm;
