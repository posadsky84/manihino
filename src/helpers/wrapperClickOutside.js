import { useEffect, useRef } from 'react';

/**
 * этот компонент принимает closeCallback, который потом идет в список зависимостей useEffect
 * и по проекту ты передаешь туда стрелочную функцию, которая создается на каждый рендер, те у closeCallback на каждом рендере будет
 * новый референс и будет очень много вызовов useEffect, соответственно много вызовов document.addEventListener и document.removeEventListener
 *
 * чтобы такое пофиксить можно либо оборачивать в useCallback то что передаешь в closeCallback,
 * либо есть хак:
 *
 * const closeCallbackRef = useRef(closeCallback);
 * closeCallbackRef.current = closeCallback;
 *
 * useEffect(() => {
 *     // useEffect не будет вызываться заново при изменении closeCallback, т.к. реф не меняется
 *     // но сама функция closeCallback всегда будет актуальной (closeCallbackRef.current)
 *
 *     const listener = () => {
 *         closeCallbackRef.current();
 *     }
 *     ...
 * }, [closeCallbackRef]);
 */
const WrapperClickOutside = ({ closeCallback, children }) => {
  const ref = useRef();
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        closeCallback();
      };
      document.addEventListener(`mousedown`, listener);
      document.addEventListener(`touchstart`, listener);
      return () => {
        document.removeEventListener(`mousedown`, listener);
        document.removeEventListener(`touchstart`, listener);
      };
    },
    [ref, closeCallback],
  );

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};

export default WrapperClickOutside;
