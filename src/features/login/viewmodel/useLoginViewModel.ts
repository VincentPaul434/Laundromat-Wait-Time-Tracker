import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DEFAULT_LOGIN_FIELD_ERRORS,
  DEFAULT_LOGIN_FORM_VALUES,
  type LoginFieldErrors,
  type LoginFormValues,
} from '../model/login.model';

export interface LoginViewModel {
  heading: string;
  subheading: string;
  values: LoginFormValues;
  errors: LoginFieldErrors;
  isSubmitting: boolean;
  canSubmit: boolean;
  onFieldChange: (field: keyof LoginFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useLoginViewModel(): LoginViewModel {
  // ViewModel layer: owns form state, validation, and navigation behavior.
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginFormValues>(DEFAULT_LOGIN_FORM_VALUES);
  const [errors, setErrors] = useState<LoginFieldErrors>(DEFAULT_LOGIN_FIELD_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const canSubmit = useMemo(() => {
    return values.email.trim().length > 0 && values.password.trim().length > 0 && !isSubmitting;
  }, [isSubmitting, values.email, values.password]);

  const onFieldChange = (field: keyof LoginFormValues, value: string): void => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: '',
    }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const nextErrors: LoginFieldErrors = {
      email: values.email.includes('@') ? '' : 'Enter a valid email address.',
      password: values.password.length >= 8 ? '' : 'Password must be at least 8 characters.',
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      navigate('/dashboard');
    }, 450);
  };

  return {
    heading: 'Log-in',
    subheading: 'Check machine status, pickup requests, and branch activity in one place.',
    values,
    errors,
    isSubmitting,
    canSubmit,
    onFieldChange,
    onSubmit,
  };
}
