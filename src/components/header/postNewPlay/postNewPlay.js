import React, { useRef, useEffect } from 'react';
import './postNewPlay.css';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
} from 'formik';
import WinnerIcon from '../../../winnerIcon';
import GamesDropDown from './gamesDropDown/gamesDropDown';
import { addPlayThunk } from '../../../redux/ui-reducer';

registerLocale(`ru`, ru);

const mapStateToProps = state => ({
  players: state.players.items,
});

const initialValues = {
  gameId: null,
  ddate: null,
  counts: false,
  comment: ``,
  played: [true, true, true, true],
  scores: [null, null, null, null],
  winner: null,
};

const onSubmit = (
  values,
  reloadFunc,
  setShowModal,
  addPlayThunk) => {
  const data = {
    gameId: values.gameId,
    ddate: `${values.ddate.getFullYear()}-${(`0${values.ddate.getMonth() + 1}`)
      .slice(-2)}-${(`0${values.ddate.getDate() + 1}`)
      .slice(-2)}`,
    counts: values.counts,
    comment: values.comment,
    players: values.played.map((item, index) => item
      ? {
        playerId: index + 1,
        score: values.scores[index],
        winner: (+values.winner === index + 1),
      }
      : null).filter(Boolean),
  };

  addPlayThunk(data, () => {
    reloadFunc();
    setShowModal();
  });
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
    formikProps.setFieldValue(`winner`, `${curWinner}`);
  }, [formikProps.values.scores]);

  // TODO Нужно завернуть в useCallback
  const uncheckOnClick = (e, itemId) => {
    if (+formikProps.values.winner === +itemId) {
      e.preventDefault();
      formikProps.setFieldValue(`winner`, `0`);
    }
  };

  return (
    <>
      {players.map(item => (
        <div className="player-raw" key={`raw${item.id}`}>
          <input className="player-input" checked type="checkbox" />
          <div className="player-label">{item.name}</div>
          <Field className="player-score" name={`scores[${item.id - 1}]`} type="number" />
          <label
            className={`radio-label ${+formikProps.values.winner === +item.id ? `selected` : ``}`}
            htmlFor={item.id}
            onClick={e => uncheckOnClick(e, item.id)}
          >
            <WinnerIcon className={`winner-icon ${+formikProps.values.winner === +item.id ? `selected` : ``}`} />
          </label>
          <Field
            id={item.id}
            name="winner"
            type="radio"
            value={`${item.id}`}
          />
        </div>
      ))}
    </>
  );
};

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener(`mousedown`, listener);
      document.addEventListener(`touchstart`, listener);
      return () => {
        document.removeEventListener(`mousedown`, listener);
        document.removeEventListener(`touchstart`, listener);
      };
    },
    [ref, handler],
  );
}

const PostNewPlay = ({ players, setShowModal, reloadFunc, addPlayThunk }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setShowModal(false));

  return (
    <div className="modal-back">
      <div className="post-new-play-modal" ref={ref}>
        <div className="post-new-play-caption">Добавить партию</div>
        <Formik initialValues={initialValues} onSubmit={values => onSubmit(values, reloadFunc, setShowModal, addPlayThunk)} validate={validate}>
          <Form autoComplete="off">
            <div className="post-new-play-input-block">
              <label className="post-new-play-label" htmlFor="ddate">Дата</label>
              <Field name="ddate">
                {({ form, field }) => {
                  const { setFieldValue } = form;
                  const { value } = field;
                  return (
                    <DatePicker
                      className="post-new-play-field"
                      id="ddate"
                      locale="ru"
                      {...field}
                      onChange={val => setFieldValue(`ddate`, val)}
                      selected={value}
                    />
                  );
                }}
              </Field>
              <div className="post-new-play-error">
                <ErrorMessage name="ddate" />
              </div>
            </div>
            <label className="post-new-play-label" htmlFor="gameId">Игра</label>
            <Field name="gameId">
              {({ form, field }) => {
                const { setFieldValue } = form;
                const { value } = field;
                return (
                  <GamesDropDown gameId={value} setFieldValue={setFieldValue} />
                );
              }}
            </Field>

            <PlayersArea players={players} />
            <div className="post-new-play-input-block">
              <label className="post-new-play-label" htmlFor="comment">Комментарий</label>
              <Field
                as="textarea"
                className="post-new-play-field-comment"
                id="comment"
                name="comment"
              />
            </div>
            <label className="player-label" htmlFor="counts">Идет в зачет</label>
            <Field
              id="counts"
              name="counts"
              type="checkbox"
            />
            <button className="post-new-play-button" type="submit">Добавить</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, { addPlayThunk })(PostNewPlay);
