import './postNewPlay.css';
import { connect } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef, useEffect } from "react";

registerLocale('ru', ru);

const mapStateToProps = state => {
  return {
    players: state.players.items
  }
}

const initialValues = {
  game: "",
  ddate: null,
};
const onSubmit = values => {

};
const validate = values => {
  const errors = {};
  if (!values.game) {errors.game = `game is required`;}
  if (!values.ddate) {errors.ddate = `ddate is required`;}
  return errors;
};


const PostNewPlay = ({players, setShowModal}) => {

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
                <label className="post-new-play-label" htmlFor="game">Игра</label>
                <Field
                  className="post-new-play-field"
                  id="game"
                  name="game"
                  type="text"
                />
                <div className="post-new-play-error">
                <ErrorMessage name="game"/>
                </div>
              </div>
              {players.map((item) =>
                <div className="player-line">
                  <input
                    type="checkbox"
                    checked={true}
                  />
                  <div className="player-label">{item.name}</div>
                </div>
              )
              }
              <div className="post-new-play-input-block">
                <label className="post-new-play-label" htmlFor="comment">Комментарий</label>
                <Field
                  className="post-new-play-field-comment"
                  id="comment"
                  name="comment"
                  type="text"
                />
              </div>

              <button className="post-new-play-button">Добавить</button>
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

