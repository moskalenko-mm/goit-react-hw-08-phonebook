import { Navigate, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './AppBar/AppBar';
import { lazy, useEffect } from 'react';
import Loader from './Loader/Loader';
import SignIn from 'pages/SignIn';

import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from 'redux/selector';
import { refreshUser } from 'redux/auth/authOperations';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';

const SignUp = lazy(() => import('../pages/SingUp'));
const Contacts = lazy(() => import('../pages/Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<ResponsiveAppBar />}>
        <Route
          index
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<SignIn />}
            ></RestrictedRoute>
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<SignUp />}
                ></RestrictedRoute>
              }
            />
          }
        />
        <Route
          path="contacts"
          element={<PrivateRoute component={<Contacts />}></PrivateRoute>}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
