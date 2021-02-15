import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const location = useLocation();

  const currentUser = localStorage.getItem('user') || null;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : location.state && location.state.from ? (
          history.push(location.state.from)
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.any
};
