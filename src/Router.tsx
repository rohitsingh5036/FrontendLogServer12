import React, { useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { Applications } from './components/Applications/Applications';
import ChangePassword from './components/Dashboard/DashboardNavbar/ChangePassword';
import ApplicationDetail from './components/Applications/ApplicationDetail';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/applications',
    element: <Applications />,
  },
  
  {
    path: '/ChangePassword',
    element: <ChangePassword />,
  },
];

const RouterWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loadingBarRef = useRef<LoadingBarRef | null>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      loadingBarRef.current?.continuousStart();
      setTimeout(() => {
        loadingBarRef.current?.complete();
      }, 200); // Adjust this timeout as needed
    };

    handleRouteChange(); // Show loading bar on initial render

    // Listen for location changes
    return () => {
      // This cleanup function will run before the next effect, 
      // effectively catching route changes
      handleRouteChange();
    };
  }, [location]);

  return (
    <>
      <LoadingBar color="#fe7044" ref={loadingBarRef} />
      {routes.find(route => route.path === location.pathname)?.element}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <RouterWrapper />,
  },
  {
    path: '/applications/:appName',
    element: <ApplicationDetail />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}