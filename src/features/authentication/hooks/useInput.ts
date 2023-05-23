import { useCallback, useReducer, useMemo, useEffect } from "react";

import { emailRegex } from "../../../utils";

export enum ValidationType {
  IS_EMAIL_VALID = "IS_EMAIL_VALID",
  REQUIRED = "REQUIRED",
  IS_PASSWORD_VALID = "IS_PASSWORD_VALID",
  IS_PASSWORD_MATCH = "IS_PASSWORD_MATCH",
}

enum InputActionType {
  INPUT = "INPUT",
  VALIDATE = "VALIDATE",
  RESET = "RESET",
}

interface IAction {
  type: InputActionType;
  payload: string;
}

interface IState {
  value: string;
  isValidated: boolean;
  isTouched: boolean;
}

const initialState: IState = {
  value: "",
  isValidated: false,
  isTouched: false,
};

const inputStateReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case InputActionType.INPUT:
      return { value: action.payload, isTouched: true, isValidated: false };
    case InputActionType.VALIDATE:
      return { ...state, isValidated: true };
    case InputActionType.RESET:
      return { value: "", isValidated: false, isTouched: false };
    default:
      return state;
  }
};

const validateValue = (
  validateType: ValidationType,
  value: string,
  value2?: string
): { isValid: boolean; error: string | undefined } => {
  switch (validateType) {
    case ValidationType.REQUIRED:
      if (!value.trim()) {
        return { isValid: false, error: "Please fill out this field." };
      }
      return { isValid: true, error: undefined };

    case ValidationType.IS_EMAIL_VALID:
      const emailName = value.split("@")[0];
      if (!value.trim()) {
        return { isValid: false, error: "Sorry, email must not be empty." };
      } else if (!value.includes("@")) {
        return { isValid: false, error: "Sorry, your email must include '@'." };
      } else if (value.length < 6 || value.length > 30) {
        return {
          isValid: false,
          error:
            "Sorry, your username must be between 6 and 30 characters long.",
        };
      } else if (/^\d+$/.test(emailName)) {
        return {
          isValid: false,
          error:
            "Sorry, your username must include at least one alphabetical character (a-z).",
        };
      } else if (
        emailName[0] === "." ||
        emailName[emailName.length - 1] === "."
      ) {
        return {
          isValid: false,
          error:
            "Sorry, the first character or the last character of your username must be an ascii letter (a-z) or number (0-9).",
        };
      } else if (!emailRegex.test(value)) {
        return {
          isValid: false,
          error:
            "Sorry, please enter a valid email. Only letters (a-z), number (0-9), underscore (_) and periods (.)  are allowed.",
        };
      }
      return { isValid: true, error: undefined };

    case ValidationType.IS_PASSWORD_VALID:
      if (!value.trim()) {
        return { isValid: false, error: "Sorry, password must not be empty." };
      } else if (value.length < 8) {
        return {
          isValid: false,
          error: "Sorry, your password must be at least 8 characters long.",
        };
      } else if (!/^[A-Z]+$/.test(value[0])) {
        return {
          isValid: false,
          error:
            "Sorry, password should start with the uppercase alphabet character (A-Z).",
        };
      }
      return { isValid: true, error: undefined };

    case ValidationType.IS_PASSWORD_MATCH:
      if (!value.trim()) {
        return { isValid: false, error: "Sorry, password must not be empty." };
      } else if (value.length < 8) {
        return {
          isValid: false,
          error: "Sorry, your password must be at least 8 characters long.",
        };
      } else if (!/^[A-Z]+$/.test(value[0])) {
        return {
          isValid: false,
          error:
            "Sorry, password should start with the uppercase alphabet character (A-Z).",
        };
      } else if (value !== value2) {
        return {
          isValid: false,
          error:
            "Sorry, your password and confirmation password must be matched.",
        };
      }
      return { isValid: true, error: undefined };

    default:
      return { isValid: true, error: undefined };
  }
};

let inputTimer: NodeJS.Timeout;

const useInput = (
  validateType: ValidationType,
  option?: { password: string }
) => {
  clearTimeout(inputTimer);

  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const valResult: { isValid: boolean; error: string | undefined } =
    validateValue(validateType, inputState.value, option?.password);

  useEffect(() => {
    if (inputState.isTouched) {
      inputTimer = setTimeout(() => {
        dispatch({ type: InputActionType.VALIDATE, payload: "" });
      }, 1000);
    }
  }, [inputState.value, inputState.isTouched]);

  const errMessage = useMemo(
    () =>
      inputState.isTouched
        ? inputState.isValidated
          ? valResult.error
          : undefined
        : undefined,
    [inputState.isValidated, inputState.isTouched]
  );

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      dispatch({ type: InputActionType.INPUT, payload: event.target.value });
    },
    []
  );

  const resetValue = useCallback(() => {
    dispatch({ type: InputActionType.RESET, payload: "" });
  }, []);

  return {
    value: inputState.value,
    isValid: valResult.isValid,
    errMessage,
    handleValueChange,
    resetValue,
  };
};

export default useInput;

export interface IUserInputResult {
  value: string;
  isValid: boolean;
  errMessage: string | undefined;
  handleValueChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  resetValue: () => void;
}
