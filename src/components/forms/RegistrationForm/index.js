import React from "react";
import { Form, Field } from 'react-final-form'
import { NavLink } from 'react-router-dom';
import BasicInput from "../../inputs/BasicInput";
import SubmitButton from "../../SubmitButton";
import routes from "../../../consts/routes";
import { createNewUser } from '../../../api';
import {history} from "../../../configureStore";

import './style.scss';

const RegistrationForm = () => {

    const onSubmit = (userData) => {
      createNewUser(userData).then(data => {

        if (data.code === 400) {
          alert(data.message)
        } else {
          localStorage.setItem('accessToken', data?.tokens?.access?.token);
          history.push(routes.getSelectGameScreen())
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
                className='registrationForm'
              >
                <div className='registrationForm__title'>
                  Форма регистрации
                </div>
                <form
                  onSubmit={handleSubmit}>
                  <Field
                    name='name'
                    component={BasicInput}
                    id='login'
                    {...input}
                    label=' Введите логин'
                  />
                  <Field
                    name='email'
                    component={BasicInput}
                    id='email'
                    {...input}
                    label=' Введите почту'
                  />
                  <Field
                    name='password'
                    component={BasicInput}
                    {...input}
                    id='password'
                    label='Введите пароль'
                    type='password'
                  />
                  <SubmitButton
                    text='Войти'
                    isDisabled={submitting}
                  />
                </form>
                <div className='registrationForm__registrationBar'>
                  <NavLink
                    className='registrationForm__registrationBar__link'
                    to={routes.getAuthorization()
                    }>
                    Вы уже зарегестрированы?
                  </NavLink>
                </div>
              </div>
            )} />
    )
};

export default RegistrationForm;
