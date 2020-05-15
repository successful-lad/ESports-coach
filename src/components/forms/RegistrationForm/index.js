import React from "react";
import { Form, Field } from 'react-final-form'
import { NavLink } from 'react-router-dom';
import BasicInput from "../../inputs/BasicInput";
import SubmitButton from "../../SubmitButton";
import routes from "../../../consts/routes";

import './style.scss';

const RegistrationForm = () => {

    const onSubmit = (value) => {
        console.log(value)
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
                  <div className='registrationForm__registrationBar'>
                      <NavLink
                        className='registrationForm__registrationBar__link'
                        to={routes.getAuthorization()
                        }>
                          Еще нет аккаунта?
                      </NavLink>
                  </div>
              </div>
            )} />
    )
};

export default RegistrationForm;
