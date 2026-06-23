import { lazy, Suspense, type JSX } from 'react';
import { Navigate, useRoutes, type RouteObject } from 'react-router-dom';

const DashboardView = lazy(async () => {
  const module = await import('../features/dashboard/view/DashboardView');

  return { default: module.DashboardView };
});

const LoginView = lazy(async () => {
  const module = await import('../features/login/view/LoginView');

  return { default: module.LoginView };
});

const SignUpView = lazy(async () => {
  const module = await import('../features/signup/view/SignUpView');

  return { default: module.SignUpView };
});

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading login...</div>}>
        <LoginView />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<div>Loading signup...</div>}>
        <SignUpView />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardView />
      </Suspense>
    ),
  },
];

export function AppRoutes(): JSX.Element | null {
  return useRoutes(routes);
}

export { routes };
