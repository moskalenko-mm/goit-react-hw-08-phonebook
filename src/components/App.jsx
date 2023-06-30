import { Navigate, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './AppBar/AppBar';
import { Suspense, lazy, useEffect } from 'react';
import Loader from './Loader/Loader';
import SignIn from 'pages/SignIn';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from 'redux/selector';
import { refreshUser } from 'redux/auth/authOperations';

const SignUp = lazy(() => import('../pages/SingUp'));
const Contacts = lazy(() => import('../pages/Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<ResponsiveAppBar />}>
        {isLoggedIn ? (
          <Route
            index
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <Contacts />
                </Suspense>
              </PrivateRoute>
            }
          />
        ) : (
          <Route index element={<SignIn />} />
        )}
        <Route
          path="register"
          element={
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Contacts />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
