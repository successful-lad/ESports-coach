import React from "react";
import { Form, Field } from 'react-final-form'
import { NavLink } from 'react-router-dom';
import BasicInput from "../../inputs/BasicInput";
import SubmitButton from "../../SubmitButton";
import routes from "../../../consts/routes";
import { history } from '../../../configureStore'
import { logIn } from '../../../api';

import './style.scss';
// {
//   email: "fake@example.com",
//     password: "password1"
// }
const AuthorizationForm = () => {

    const onSubmit = (userData) => {
        logIn(userData).then(data => {
          console.log(data)
          if (data.code === 401 || data.code === 400) {
            alert(data.message)
          } else {
            localStorage.setItem('accessToken', data?.tokens?.access?.token);
            history.push(routes.getMainScreen())
          }
        });
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
                      name='email'
                      component={BasicInput}
                      placeholder='enter email'
                      id='email'
                      {...input}
                      label=' Введите почту'
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
                      Еще нет аккаунта?
                    </NavLink>
                  </div>
                </div>
        )} />
    )
};

export default AuthorizationForm;
