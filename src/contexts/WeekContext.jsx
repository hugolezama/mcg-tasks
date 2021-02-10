import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const WeekContext = createContext();

export const WeekProvider = ({ children }) => {
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('isoweek'));
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek.format('MMM DD') + ' - ' + moment(startOfWeek).add(5, 'days').format('MMM DD')
  );

  useEffect(() => {
    setCurrentWeek(startOfWeek.format('MMM DD') + ' - ' + moment(startOfWeek).add(5, 'days').format('MMM DD'));
  }, [startOfWeek]);

  return (
    <WeekContext.Provider
      value={{
        startOfWeek,
        setStartOfWeek,
        currentWeek,
        setCurrentWeek
      }}
    >
      {children}
    </WeekContext.Provider>
  );
};

WeekProvider.propTypes = {
  children: PropTypes.node.isRequired
};
