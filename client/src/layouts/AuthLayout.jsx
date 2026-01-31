import {Outlet, Navigate} from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace/>;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout;