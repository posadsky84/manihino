import './postNewPlay.css';
import { connect } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormikContext } from "formik";
import { useCallback, useRef, useEffect, useState } from "react";
import React from "react";

registerLocale('ru', ru);

const mapStateToProps = state => {
  return {
    players: state.players.items
  }
}

const initialValues = {
  gameId: "",
  ddate: null,
  counts: false,
  comment: "",
  played: [true, true, false, true],
  scores: [10, 12, 14, 16],
  winner: "2",
};
const onSubmit = values => {



  const data = {
    gameId: values.gameId,
    ddate: values.ddate,
    counts: values.counts,
    comment: values.comment,

  }

};


const validate = values => {
  const errors = {};
  if (!values.gameId) {
    errors.gameId = `game is required`;
  }
  if (!values.ddate) {
    errors.ddate = `ddate is required`;
  }
  return errors;
};

const PlayersArea = ({ players }) => {

  const formikProps = useFormikContext();

  useEffect(() => {
    const curWinner = formikProps.values.scores.indexOf(Math.max(...formikProps.values.scores)) + 1;
    formikProps.setFieldValue("winner", `${curWinner}`);
  }, [formikProps.values.scores])


  return  <>
    {players.map((item) =>
      <div key={`raw${item.id}`} className="player-raw">
        <input type="checkbox" checked={true} />
        <div className="player-label">{item.name}</div>
        <Field className="player-score" name={`scores[${item.id - 1}]`} type="number" />
        <Field type="radio" name={`winner`} id={item.id} value={`${item.id}`} />
        <label className="post-new-play-label" htmlFor={item.id}>{item.name}</label>
      </div>
    )
    }</>;
}




const PostNewPlay = ({ players, setShowModal }) => {

  const ref = useRef();
  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <div className="modal-back">
      <div className="post-new-play-modal" ref={ref}>
        <div className="post-new-play-caption">Добавить партию</div>
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
          <Form>
            <div className="post-new-play-input-block">
              <label className="post-new-play-label" htmlFor="ddate">Дата</label>
              <Field name="ddate">
                {({ form, field }) => {
                  const { setFieldValue } = form;
                  const { value } = field;
                  return <DatePicker className="post-new-play-field" id="ddate" locale="ru" {...field} selected={value}
                                     onChange={val => setFieldValue("ddate", val)}/>
                }}
              </Field>
              <div className="post-new-play-error">
                <ErrorMessage name="ddate"/>
              </div>
            </div>
            <div className="post-new-play-input-block">
              <label className="post-new-play-label" htmlFor="gameId">Игра</label>
              <Field
                className="post-new-play-field"
                id="gameId"
                name="gameId"
                type="text"
              />
              <div className="post-new-play-error">
                <ErrorMessage name="gameId"/>
              </div>
            </div>
            <PlayersArea players={players} />
            <div className="post-new-play-input-block">
              <label className="post-new-play-label" htmlFor="comment">Комментарий</label>
              <Field
                className="post-new-play-field-comment"
                id="comment"
                name="comment"
                as="textarea"
              />
            </div>

            <button type="submit" className="post-new-play-button"
            >Добавить
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );

}



function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}

export default connect(mapStateToProps)(PostNewPlay);
