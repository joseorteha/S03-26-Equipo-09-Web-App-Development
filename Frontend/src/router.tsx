import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashboardPage } from './pages/Dashboard';
import { ContactosPage } from './pages/Contactos';
import { SegmentacionPage } from './pages/Segmentacion';
import { MetricasPage } from './pages/Metricas';
import InboxPage from './pages/Inbox';
import MiInboxPage from './pages/MiInbox';
import { DashboardLayout } from './components/layout/DashboardLayout';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'dashboard-layout',
  component: DashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const contactosRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/contactos',
  component: ContactosPage,
});

const segmentacionRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/segmentacion',
  component: SegmentacionPage,
});

const metricasRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/metricas',
  component: MetricasPage,
});

const inboxRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/inbox',
  component: InboxPage,
});

const miInboxRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/mi-inbox',
  component: MiInboxPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    contactosRoute,
    segmentacionRoute,
    metricasRoute,
    inboxRoute,
    miInboxRoute,
  ]),
]);

export const router = createRouter({ routeTree });

// Registro para seguridad de tipos
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}