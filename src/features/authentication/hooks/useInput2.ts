import { useReducer } from "react";

enum InputActionType {
  INPUT = "INPUT",
  BLUR = "BLUR",
  RESET = "RESET",
}

interface IAction {
  type: InputActionType;
  payload: string;
}

interface IState {
  value: string;
  isTouched: boolean;
}

const initialState: IState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case InputActionType.INPUT:
      return { ...state, value: action.payload };
    case InputActionType.BLUR:
      return { ...state, isTouched: true };
    case InputActionType.RESET:
      return { isTouched: false, value: "" };
    default:
      return state;
  }
};

const useInput = () => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  // const valueIsValid = validateValue(inputState.value);
  // const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: InputActionType.INPUT, payload: event.target.value });
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLElement>) => {
    dispatch({ type: InputActionType.BLUR, payload: "" });
  };

  const reset = () => {
    dispatch({ type: InputActionType.RESET, payload: "" });
  };
};

export default useInput;
