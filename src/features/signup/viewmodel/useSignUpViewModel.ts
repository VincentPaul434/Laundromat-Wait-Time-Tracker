import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DEFAULT_SIGN_UP_FIELD_ERRORS,
  DEFAULT_SIGN_UP_FORM_VALUES,
  type SignUpFieldErrors,
  type SignUpFormValues,
} from '../model/signup.model';

export interface SignUpViewModel {
  heading: string;
  subheading: string;
  values: SignUpFormValues;
  errors: SignUpFieldErrors;
  isSubmitting: boolean;
  canSubmit: boolean;
  onFieldChange: (field: keyof SignUpFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useSignUpViewModel(): SignUpViewModel {
  // ViewModel layer: owns form state, validation, and navigation behavior.
  const navigate = useNavigate();
  const [values, setValues] = useState<SignUpFormValues>(DEFAULT_SIGN_UP_FORM_VALUES);
  const [errors, setErrors] = useState<SignUpFieldErrors>(DEFAULT_SIGN_UP_FIELD_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const canSubmit = useMemo(() => {
    return Object.values(values).every((value) => value.trim().length > 0) && !isSubmitting;
  }, [isSubmitting, values]);

  const onFieldChange = (field: keyof SignUpFormValues, value: string): void => {
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

    const nextErrors: SignUpFieldErrors = {
      firstName: values.firstName.trim() ? '' : 'First name is required.',
      lastName: values.lastName.trim() ? '' : 'Last name is required.',
      email: values.email.includes('@') ? '' : 'Enter a valid email address.',
      password: values.password.length >= 8 ? '' : 'Password must be at least 8 characters.',
      confirmPassword:
        values.confirmPassword === values.password ? '' : 'Passwords do not match.',
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      navigate('/dashboard');
    }, 450);
  };

  return {
    heading: 'Sign-up',
    subheading: 'Create your account to save branch preferences and manage pickup requests.',
    values,
    errors,
    isSubmitting,
    canSubmit,
    onFieldChange,
    onSubmit,
  };
}
