// Utility functions and react components.

import { useState, useReducer, useCallback, useEffect, useRef } from "react";

function DisplayErrors({ errors }) {
  if (!errors) {
    return;
  }
  return (
    <div>
      {errors.map((m) => (
        <>
          {m}
          <br />
        </>
      ))}
    </div>
  );
}

function checkRE(text, regExp, msg) {
  const pass = regExp.test(text);
  if (pass) {
    return [];
  }
  return [msg];
}

// function useButtonFn(onClick) {
//   const buttonProps = { onClick: onClick };
//   return [buttonProps];
// }

// function useButton() {
//   const [buttonClicks, setButtonClicks] = useState(0);
//   const buttonProps = { onClick: () => setButtonClicks(buttonClicks + 1) };
//   return [buttonClicks, buttonProps];
// }

// useButton seems to be very versatile.
function useButton(onClick = () => {}) {
  const [buttonClicks, setButtonClicks] = useState(0);
  function handleOnClick() {
    setButtonClicks(buttonClicks + 1);
    onClick();
  }
  const buttonProps = { onClick: handleOnClick };
  return [buttonProps, buttonClicks];
}

// function useButtonToggle(initialState = false) {
//   // very similar to https://usehooks.com/useToggle/
//   // Initialize the state
//   const [state, setState] = useState(initialState);
//
//   // Define and memorize toggler function in case we pass down the component,
//   // This function change the boolean value to it's opposite value
//   const toggle = useCallback(() => setState((state) => !state), []);
//
//   return [state, { onClick: toggle }];
// }

function useButtonReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => dispatch({ type: "onClick" }), []);
  return [state, { onClick: toggle }];
}

function useTextInput(initialValue, onChange = () => {}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return [
    {
      value,
      onChange: handleChange,
    },
    value,
  ];
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export {
  useButton,
  useButtonReducer,
  useTextInput,
  checkRE,
  DisplayErrors,
  useInterval,
};
