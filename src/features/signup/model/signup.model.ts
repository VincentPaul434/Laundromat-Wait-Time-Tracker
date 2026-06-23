export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFieldErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpViewState {
  values: SignUpFormValues;
  errors: SignUpFieldErrors;
  isSubmitting: boolean;
}

export const DEFAULT_SIGN_UP_FORM_VALUES: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const DEFAULT_SIGN_UP_FIELD_ERRORS: SignUpFieldErrors = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const DEFAULT_SIGN_UP_VIEW_STATE: SignUpViewState = {
  values: DEFAULT_SIGN_UP_FORM_VALUES,
  errors: DEFAULT_SIGN_UP_FIELD_ERRORS,
  isSubmitting: false,
};
