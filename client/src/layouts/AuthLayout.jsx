import {Outlet, Navigate} from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout;