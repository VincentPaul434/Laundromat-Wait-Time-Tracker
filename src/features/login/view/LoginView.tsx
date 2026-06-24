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
      submitLabel={viewModel.isSubmitting ? 'Signing in...' : 'Log in'}
      submitDisabled={!viewModel.canSubmit}
      onSubmit={viewModel.onSubmit}
      footerPrompt="Need an account?"
      footerLinkLabel="Sign-up"
      footerLinkTo="/signup"
    >
      <AuthTextField
        id="login-email"
        label="Email"
        type="email"
        value={viewModel.values.email}
        placeholder="your_email@yourmail.com"
        onChange={(value) => viewModel.onFieldChange('email', value)}
        error={viewModel.errors.email}
      />
      <AuthTextField
        id="login-password"
        label="Password"
        type="password"
        value={viewModel.values.password}
        placeholder="****************"
        onChange={(value) => viewModel.onFieldChange('password', value)}
        error={viewModel.errors.password}
      />
    </AuthShell>
  );
}
