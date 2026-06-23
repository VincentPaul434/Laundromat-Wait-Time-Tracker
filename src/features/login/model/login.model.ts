export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFieldErrors {
  email: string;
  password: string;
}

export interface LoginViewState {
  values: LoginFormValues;
  errors: LoginFieldErrors;
  isSubmitting: boolean;
}

export const DEFAULT_LOGIN_FORM_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

export const DEFAULT_LOGIN_FIELD_ERRORS: LoginFieldErrors = {
  email: '',
  password: '',
};

export const DEFAULT_LOGIN_VIEW_STATE: LoginViewState = {
  values: DEFAULT_LOGIN_FORM_VALUES,
  errors: DEFAULT_LOGIN_FIELD_ERRORS,
  isSubmitting: false,
};
