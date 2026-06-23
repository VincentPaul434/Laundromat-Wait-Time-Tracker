import { AuthShell } from '@/shared-components/AuthShell/AuthShell';
import { AuthTextField } from '@/shared-components/AuthTextField/AuthTextField';

import { useSignUpViewModel } from '../viewmodel/useSignUpViewModel';

export function SignUpView(): JSX.Element {
  // View layer: renders UI only and delegates all behavior to the ViewModel.
  const viewModel = useSignUpViewModel();

  return (
    <AuthShell
      activeRoute="signup"
      formTitle={viewModel.heading}
      formSubtitle={viewModel.subheading}
      submitLabel={viewModel.isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      submitDisabled={!viewModel.canSubmit}
      onSubmit={viewModel.onSubmit}
      footerPrompt="Have an account?"
      footerLinkLabel="Log-in"
      footerLinkTo="/login"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthTextField
          id="signup-first-name"
          label="FIRST NAME"
          value={viewModel.values.firstName}
          placeholder="John"
          onChange={(value) => viewModel.onFieldChange('firstName', value)}
          error={viewModel.errors.firstName}
        />
        <AuthTextField
          id="signup-last-name"
          label="LAST NAME"
          value={viewModel.values.lastName}
          placeholder="Junathan"
          onChange={(value) => viewModel.onFieldChange('lastName', value)}
          error={viewModel.errors.lastName}
        />
      </div>
      <AuthTextField
        id="signup-email"
        label="EMAIL"
        type="email"
        value={viewModel.values.email}
        placeholder="your_email@yourmail.com"
        onChange={(value) => viewModel.onFieldChange('email', value)}
        error={viewModel.errors.email}
      />
      <AuthTextField
        id="signup-password"
        label="PASSWORD"
        type="password"
        value={viewModel.values.password}
        placeholder="****************"
        onChange={(value) => viewModel.onFieldChange('password', value)}
        error={viewModel.errors.password}
      />
      <AuthTextField
        id="signup-confirm-password"
        label="CONFIRM PASSWORD"
        type="password"
        value={viewModel.values.confirmPassword}
        placeholder="****************"
        onChange={(value) => viewModel.onFieldChange('confirmPassword', value)}
        error={viewModel.errors.confirmPassword}
      />
    </AuthShell>
  );
}
