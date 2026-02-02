import {Outlet, Navigate} from 'react-router-dom';

const AuthLayout = () => {
  // const isAuthenticated = localStorage.getItem("token");

  // if (isAuthenticated) {
  //   return <Navigate to="/home" replace/>;
  // }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout;