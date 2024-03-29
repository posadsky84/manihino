import React from 'react';
import ModalScreen from '../../../helpers/modalScreen';
import { connect } from 'react-redux';

import {
  Formik,
  Form,
  Field,
} from 'formik';
import { loginThunk } from '../../../redux/ui-reducer';


const initialValues = {
  login: null,
  pass: null,
};


const AuthForm = ({loginThunk, closeCallback, reloadFunc}) => {

  const onSubmit = (values) => {
    loginThunk(values.login, values.pass, closeCallback, reloadFunc);
  };

  return (
    <ModalScreen closeCallback={closeCallback}>
      {/*<div className="post-new-play-caption">ВОЙТИ</div>*/}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
      <Form>
        <div className="post-new-play-input-block">
          <label className="post-new-play-label" htmlFor="comment">Логин</label>
          <Field
            as="input"
            className="post-new-play-field"
            id="login"
            name="login"
          />
        </div>
        <div className="post-new-play-input-block">
          <label className="post-new-play-label" htmlFor="comment">Пароль</label>
          <Field
            as="input"
            className="post-new-play-field"
            id="pass"
            name="pass"
          />
        </div>
        <button className="post-new-play-button" type="submit">ВХОД</button>
      </Form>
      </Formik>
    </ModalScreen>
  );
};

export default connect(null, {loginThunk})(AuthForm);
