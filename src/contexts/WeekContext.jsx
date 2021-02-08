import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
export const WeekContext = createContext();

WeekProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const WeekProvider = ({ children }) => {
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('isoweek'));
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek.format('MM/DD/YYYY') + ' - ' + moment(startOfWeek).add(5, 'days').format('MM/DD/YYYY')
  );

  useEffect(() => {
    setCurrentWeek(startOfWeek.format('MM/DD/YYYY') + ' - ' + moment(startOfWeek).add(5, 'days').format('MM/DD/YYYY'));
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
