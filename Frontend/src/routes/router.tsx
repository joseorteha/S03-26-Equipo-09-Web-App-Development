import { createRouter, Outlet, createRoute, createRootRoute } from '@tanstack/react-router';
import { Home } from '../pages/Home';
import { DashboardPage } from '../pages/Dashboard';
import { DashboardLayout } from '../components/layout/DashboardLayout'; // Importas tu nuevo layout

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home, // La Home usa su propio diseño interno
});

// Definimos la ruta del Layout del Dashboard
const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'dashboard-layout',
  component: DashboardLayout, // <--- USAMOS EL COMPONENTE DE TU CARPETA LAYOUT
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardLayoutRoute.addChildren([dashboardIndexRoute]),
]);

export const router = createRouter({ routeTree });