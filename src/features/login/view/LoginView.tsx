import { AuthShell } from '@/shared-components/AuthShell/AuthShell';
import { AuthTextField } from '@/shared-components/AuthTextField/AuthTextField';

import { useLoginViewModel } from '../viewmodel/useLoginViewModel';

export function LoginView(): JSX.Element {
  // View layer: renders UI only and delegates all behavior to the ViewModel.
  const viewModel = useLoginViewModel();

  return (
    <AuthShell
      activeRoute="login"
      formTitle={viewModel.heading}
      formSubtitle={viewModel.subheading}
      submitLabel={viewModel.isSubmitting ? 'SIGNING IN...' : 'LOG-IN'}
      submitDisabled={!viewModel.canSubmit}
      onSubmit={viewModel.onSubmit}
      footerPrompt="Need an account?"
      footerLinkLabel="Sign-up"
      footerLinkTo="/signup"
    >
      <AuthTextField
        id="login-email"
        label="EMAIL"
        type="email"
        value={viewModel.values.email}
        placeholder="your_email@yourmail.com"
        onChange={(value) => viewModel.onFieldChange('email', value)}
        error={viewModel.errors.email}
      />
      <AuthTextField
        id="login-password"
        label="PASSWORD"
        type="password"
        value={viewModel.values.password}
        placeholder="****************"
        onChange={(value) => viewModel.onFieldChange('password', value)}
        error={viewModel.errors.password}
      />
    </AuthShell>
  );
}
